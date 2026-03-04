import {hash, compare} from "bcrypt";
import * as argon2 from "argon2";
import { SALT } from "../../../Config/config.service.js";
import { algorithmEnum } from "../enums/security.enum.js";

export const generateHash = async ({
    plainText,
    salt=SALT,
     algo=algorithmEnum.bcrypt
    })=>{
     let hashvalue="";
     switch(algo){
        case algorithmEnum.bcrypt:
            hashvalue = await hash(plainText,salt);
            break;
        case algorithmEnum.argon2:
            hashvalue = await argon2.hash(plainText);
            break;
        default:
            hashvalue = await hash(plainText,salt);
            break;
     }
     return hashvalue;
}
export const compareHash = async ({
    plainText,
    hashValue,
    algo=algorithmEnum.bcrypt
    })=>{
    let isMatch=false;
    switch(algo){
        case algorithmEnum.bcrypt:
            isMatch = await compare(plainText,hashValue);
            break;
        case algorithmEnum.argon2:
            isMatch = await argon2.verify(plainText,hashValue);
            break;
        default:
            isMatch = await compare(plainText,hashValue);
            break;
    }
    return isMatch;
}
     