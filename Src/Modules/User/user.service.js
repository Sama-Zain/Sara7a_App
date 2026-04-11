
import { findByIdAndUpdate } from "../../DB/database.repository.js";
import { successResponse } from "../../Utils/response/succes.response.js";
import { decryption } from "../../Utils/security/encryption.security.js";
import  User  from "../../DB/models/user.model.js"; 
export const getprofile = async (req, res) => {
  const user = req.user; 
  if(user){
    user.phoneNumber=  await decryption(user.phoneNumber);
  }
  return successResponse({
    res,
    message: "User found",
    data: user, 
    statusCode: 200,
  });
};

export const fileUpload = async (req, res) => {
  const user = await findByIdAndUpdate({
        model: User,
        id: req.user._id,
        update: { profilePicture: req.file.finalPath },
    });
   return successResponse({
    res,
    message: "File uploaded successfully",
    data: user,
    statusCode: 200,
  });
};
