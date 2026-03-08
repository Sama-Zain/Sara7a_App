import jwt from "jsonwebtoken";
import { RoleEnum, SignatureEnum } from "../enums/user.enum.js";
import { EXPIRESIN, JWT__ADMIN_SECRET_KEY, JWT__USER_SECRET_KEY, REFRESH__ADMINTOKEN, REFRESH__USERTOKEN, REFRESH_TOKEN_EXPIRESIN } from "../../../Config/config.service.js";
export const generateToken = (
    payload,
    secretKey=JWT__USER_SECRET_KEY,
    options={
        expiresIn:EXPIRESIN,
        issuer: "http://localhost:3000", 
        audience: "http://localhost:4500"
    })=>{
        return jwt.sign(payload,secretKey,options);
    };

export const verifyToken =  ({token,secretKey=JWT__USER_SECRET_KEY})=>{
    return jwt.verify(token,secretKey);
}
export const getsignature =  async({signatureLevel= SignatureEnum.User})=>{
    let signature={accessSignature:undefined,refreshSignature:undefined};
     switch(signatureLevel){ 
        case SignatureEnum.User:
         signature.accessSignature= JWT__USER_SECRET_KEY;
         signature.refreshSignature= REFRESH__USERTOKEN;
         break;
        case SignatureEnum.Admin:
         signature.accessSignature= JWT__ADMIN_SECRET_KEY;
         signature.refreshSignature= REFRESH__ADMINTOKEN;
         break;
         default:
          signature.accessSignature= JWT__USER_SECRET_KEY;
          signature.refreshSignature= REFRESH__USERTOKEN;
          break;
    } 
    return signature;  
}
export const getNewLoginCredientials = async (user,signatureLevel)=>{
    let signature=await getsignature({
        signatureLevel:
        user.role != RoleEnum.Admin? SignatureEnum.User : SignatureEnum.Admin
 } );
 console.log(signature);
 
 const accessToken = generateToken({
    payload:{_id:user._id,role:user.role},
    secretKey:signature.accessSignature,
    options:{
        expiresIn:EXPIRESIN
    }
 })
 const refreshToken = generateToken({ 
    payload:{_id:user._id,role:user.role},
    secretKey:signature.refreshSignature,
    options:{
        expiresIn:REFRESH_TOKEN_EXPIRESIN
    }
 })
 return {accessToken,refreshToken}
}
