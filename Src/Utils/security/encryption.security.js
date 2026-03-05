import crypto from "crypto";
import { ENCRYPTION_SECRET_KEY } from "../../../Config/config.service.js";
const ENCRYPTION_KEY = ENCRYPTION_SECRET_KEY;
const IV_LENGTH = 16;
// symmetric encryption
 export const encryption =  async(text)=>{
    const iv = crypto.randomBytes(IV_LENGTH);    
     const cipher = crypto.createCipheriv('aes-256-cbc',ENCRYPTION_KEY,iv);     
     let crypted = cipher.update(text,'utf8','hex');     
     crypted += cipher.final('hex');
     return `${iv.toString("hex")}:${crypted}`;
 };
export const decryption =  async(encrypted)=>{
    const [iv, encryptedtext] = encrypted.split(':');
    const binaryLike = Buffer.from(iv, 'hex');
     const decipher = crypto.createDecipheriv('aes-256-cbc',ENCRYPTION_KEY,binaryLike);
     let decrypted = decipher.update(encryptedtext,'hex','utf-8');
     decrypted += decipher.final('utf-8');
     return decrypted;
 };
