import { BadRequestException, ConflictException, NotFoundException } from "../../Utils/response/error.response.js";
import { successResponse } from "../../Utils/response/succes.response.js";
import User from "../../DB/Models/user.model.js";
import * as database from "../../DB/database.repository.js";
import { decryption } from "../../Utils/security/encryption.security.js";
export const getprofile = async (req,res)=>{
    const {id} = req.params;
    const user= await database.findById({model:User,id});
    if(!user){
        return NotFoundException({message:"User not found"});
    }
    user.phoneNumber = await decryption(user.phoneNumber);
    return successResponse({res,message:"User found",data:user,statusCode:200});
}