import jwt from "jsonwebtoken";
import { RoleEnum, SignatureEnum } from "../enums/user.enum.js";
import {
  EXPIRESIN,
  JWT__ADMIN_SECRET_KEY,
  JWT__USER_SECRET_KEY,
  REFRESH__ADMINTOKEN,
  REFRESH__USERTOKEN,
  REFRESH_TOKEN_EXPIRESIN,
} from "../../../Config/config.service.js";
import { v4 as uuidv4 } from 'uuid';

export const generateToken = (
  payload,
  secretKey = JWT__USER_SECRET_KEY,
  options = {
    expiresIn: EXPIRESIN,
    issuer: "http://localhost:3000",
    audience: "http://localhost:4500",
  },
) => {
  return jwt.sign(payload, secretKey, options);
};

export const verifyToken = ({ token, secretKey = JWT__USER_SECRET_KEY }) => {
  return jwt.verify(token, secretKey);
};

export const getsignature = async ({ signatureLevel = SignatureEnum.User }) => {
  let signature = { accessSignature: undefined, refreshSignature: undefined };
  const level = String(signatureLevel).toLowerCase(); 
  switch (level) {
    case "admin":
    case String(SignatureEnum.Admin).toLowerCase():
      signature.accessSignature = JWT__ADMIN_SECRET_KEY;
      signature.refreshSignature = REFRESH__ADMINTOKEN;
      break;

    case "user":
    case "bearer": 
    case String(SignatureEnum.User).toLowerCase():
    default:
      signature.accessSignature = JWT__USER_SECRET_KEY;
      signature.refreshSignature = REFRESH__USERTOKEN;
      break;
  }
  return signature;
};

export const getNewLoginCredientials = async (user, signatureLevel) => {
  let signature = await getsignature({
    signatureLevel:
      user.role != RoleEnum.Admin ? SignatureEnum.User : SignatureEnum.Admin,
  });
  console.log(signature);
 const jwtid = uuidv4();

const accessToken = generateToken(
  { _id: user._id, role: user.role }, // ✅ payload مباشر
  signature.accessSignature,
  {
    expiresIn: EXPIRESIN,
    jwtid: jwtid,
  }
);

const refreshToken = generateToken(
  { _id: user._id, role: user.role },
  signature.refreshSignature,
  {
    expiresIn: REFRESH_TOKEN_EXPIRESIN,
    jwtid: jwtid,
  }
  );
  return { accessToken, refreshToken };
};
