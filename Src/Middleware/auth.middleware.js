import { TokenTypeEnum } from "../Utils/enums/user.enum.js";
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from "../Utils/response/error.response.js";
import { getsignature, verifyToken } from "../Utils/tokens/token.js";
import User from "../DB/Models/user.model.js";
import Token from "../DB/Models/token.model.js";
// decode token---> get user and decoded token
export const decodedToken = async ({
  authorization,
  tokenType = TokenTypeEnum.Access,
}) => {
  if (!authorization || typeof authorization !== "string") {
    throw BadRequestException({ message: "Authorization header is required" });
  }

  const [prefix, token] = authorization.split(" "); // prefix هيكون "Admin" أو "User"
  if (!prefix || !token) throw BadRequestException({ message: "Invalid token" });

  const signature = await getsignature({ signatureLevel: prefix });
  const decoded = verifyToken({
    token,
    secretKey:
      tokenType === TokenTypeEnum.Access
       ? signature.accessSignature
       : signature.refreshSignature,
  });
  const jti = decoded.jti;
  if (jti) {
    const isRevoked = await Token.findOne({ jti });
    if (isRevoked) {
      throw UnauthorizedException({
        message: "Token revoked, please login again",
      });
    }
  }
  const user = await User.findById(decoded._id || decoded.payload?._id);
  if (!user) {
    throw NotFoundException({ message: "User not found" });
  }
  if (user.changeCredientialsTime) {
    const changeTime = parseInt(user.changeCredientialsTime.getTime() / 1000);
    if (changeTime > decoded.iat) {
      throw UnauthorizedException({
        message: "Token expired due to credential change",
      });
    }
  }
  return { user, decoded };
};
// middleware for authentication
export const authentication = ({ tokenType = TokenTypeEnum.Access }) => {
  return async (req, res, next) => {
    const { user, decoded } =
      (await decodedToken({
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
