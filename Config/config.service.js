import {resolve} from "path";
import dotenv from "dotenv";

const envPath ={
    dev:"dev.env",
    prod:"prod.env"
}
dotenv.config({ path: resolve(`./Config/${envPath.dev}`) });
export const PORT = process.env.PORT || 4000;
export const MONGODB_URI = process.env.MONGODB_URI;
export const SALT = parseInt(process.env.SALT);
export const ENCRYPTION_SECRET_KEY = process.env.ENCRYPTION_SECRET_KEY;
//USER
export const JWT__USER_SECRET_KEY = process.env.TOKEN_ACCESS_USER_SECRET_KEY;
export const REFRESH__USERTOKEN = process.env.TOKEN_REFRESH_USER_SECRET_KEY;
//ADMIN
export const JWT__ADMIN_SECRET_KEY = process.env.TOKEN_ACCESS_ADMIN_SECRET_KEY;
export const REFRESH__ADMINTOKEN = process.env.TOKEN_REFRESH_ADMIN_SECRET_KEY;
// EXPIRESIN
export const EXPIRESIN = parseInt(process.env.ACCESS_EXPIRES);
export const REFRESH_TOKEN_EXPIRESIN = parseInt(process.env.REFRESH_EXPIRES);