import User  from "../../DB/Models/user.model.js";
import { create, findOne } from "../../DB/database.repository.js";
import { BadRequestException, ConflictException, NotFoundException } from "../../Utils/response/error.response.js";
import { algorithmEnum } from "../../Utils/enums/security.enum.js";
import { successResponse } from "../../Utils/response/succes.response.js";
import { generateHash, compareHash } from "../../Utils/security/hash.security.js";
import { encryption } from "../../Utils/security/encryption.security.js";
import { generateToken } from "../../Utils/tokens/token.js";
export const signup = async (req,res)=>{
    const {firstName,lastName,email,password,phoneNumber,gender,role} = req.body;
    // check if user already exists
    const user = await findOne({model:User,filter:{email}});
    if(user){
        return ConflictException({message:"User already exists"});
    }
    // hash password
    const hashedPassword = await generateHash({plainText:password,algo:algorithmEnum.bcrypt});
    // encrypt phone
    const encryptedPhone = await encryption(phoneNumber);
    // create user
    const newuser = await create({
    model:User,
    data:{firstName,lastName,email,password:hashedPassword,phoneNumber:encryptedPhone,gender,role}
    });

    return successResponse({res,message:"User created successfully",data:newuser,statusCode:201});
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
    const token = generateToken({id:user._id,email:user.email});
    return successResponse({res,message:"User login successfully",data:{token},statusCode:200});
    
}