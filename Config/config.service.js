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
