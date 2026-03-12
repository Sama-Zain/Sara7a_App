import { TokenTypeEnum } from "../Utils/enums/user.enum.js";
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from "../Utils/response/error.response.js";
import { getsignature, verifyToken } from "../Utils/tokens/token.js";
import User from "../DB/Models/user.model.js";
import { findById } from "../DB/database.repository.js";
// decode token---> get user and decoded token
export const decodedToken = async ({
  authorization,
  tokenType = TokenTypeEnum.Access,
}) => {
  if (!authorization || typeof authorization !== "string") {
    throw BadRequestException({ message: "Authorization header is required" });
  }
  const [Bearer, token] = authorization.split(" ");
  if (!Bearer || !token)
    throw BadRequestException({ message: "Invalid token" });
  //  console.log(Bearer);

  // find signature by bearer
  let signature = await getsignature({ signatureLevel: Bearer }); // user or admin
  console.log(Bearer, signature);

  const decoded = verifyToken({
    token,
    secretKey:
      tokenType === TokenTypeEnum.Access
        ? signature.accessSignature
        : signature.refreshSignature,
  });
  // find user by id
  const user = await findById({ model: User, id: decoded.payload?._id });
  if (!user) {
    throw NotFoundException({ message: "User not found" });
  }
  return { user, decoded };
};
// middleware for authentication
export const authentication = ({
  tokenType = TokenTypeEnum.Access,
}) => {
  return async (req, res, next) => {
    const { user, decoded } = (await decodedToken({
      authorization: req.headers.authorization,
      tokenType,
    })) || {};
    req.user = user;
    req.decoded = decoded;
    return next();
  };
};

// middleware for authorization
export const authorization = ({ role = [] }) => {
  return async (req, res, next) => {
    const userRole = Number(req.user.role);
    if (!role.includes(userRole)) {
      throw UnauthorizedException({ message: "User not authorized" });
    }
    return next();
  };
};
