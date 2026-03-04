import User  from "../../DB/Models/user.model.js";
import { create, findOne } from "../../DB/database.repository.js";
import { BadRequestException, ConflictException, NotFoundException } from "../../Utils/response/error.response.js";
import { algorithmEnum } from "../../Utils/enums/security.enum.js";
import { successResponse } from "../../Utils/response/succes.response.js";
import { generateHash } from "../../Utils/security/hash.security.js";

export const signup = async (req,res)=>{
    const {firstName,lastName,email,password,gender,role} = req.body;
    // check if user already exists
    const user = await findOne({model:User,filter:{email}});
    if(user){
        return ConflictException({message:"User already exists"});
    }
    // hash password
    const hashedPassword = await generateHash({plainText:password,algo:algorithmEnum.bcrypt});
    // create user
    const newuser = await create({
    model:User,
    data:{firstName,lastName,email,password,gender,role}});

    return successResponse({message:"User created successfully",data:newuser,statusCode:201});
}

// login user
export const login = async (req,res)=>{
    const {email,password} = req.body;
    const user = await findOne({model:User,filter:{email}});
    if(!user){
        return NotFoundException({message:"User not found"});
    }
    // check if password is valid
    const isMatch = await compareHash({plainText:password,hashValue:user.password,algo:algorithmEnum.bcrypt});
    if(!isMatch){
        return BadRequestException({message:"Invalid email or password"});
    }
    return successResponse({message:"User login successfully",data:user,statusCode:200});
    
}