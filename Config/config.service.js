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
export const JWT_SECRET_KEY = process.env.TOKEN_ACCESS_SECRET_KEY;
export const EXPIRESIN = parseInt(process.env.ACCESS_EXPIRES);
