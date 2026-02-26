import User  from "../../DB/Models/user.model.js";
import { create, findOne } from "../../DB/database.repository.js";
import { ConflictException, NotFoundException } from "../../Utils/response/error.response.js";
import { successResponse } from "../../Utils/response/succes.response.js";
export const signup = async (req,res)=>{
    const {firstName,lastName,email,password,gender,role} = req.body;
    const user = await findOne({model:User,filter:{email}});
    if(user){
        return ConflictException({message:"User already exists"});
    }
    const newuser = await create({
    model:User,
    data:{firstName,lastName,email,password,gender,role}});

    return successResponse({message:"User created successfully",data:newuser,statusCode:201});
}
export const login = async (req,res)=>{
    const {email,password} = req.body;
    const user = await findOne({model:User,filter:{email}});
    if(!user){
        return NotFoundException({message:"User not found"});
    }
    return successResponse({message:"User login successfully",data:user,statusCode:200});
    
}