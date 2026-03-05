import jwt from "jsonwebtoken";
import { EXPIRESIN, JWT_SECRET_KEY } from "../../../Config/config.service.js";
export const generateToken = (
    payload,
    secretKey=JWT_SECRET_KEY,
    options={
        expiresIn:EXPIRESIN,
        issuer: "http://localhost:3000", 
        audience: "http://localhost:4500"
    })=>{
        return jwt.sign(payload,secretKey,options);
    };

export const verifyToken = (token,secretKey=JWT_SECRET_KEY)=>{
    return jwt.verify(token,secretKey);
}