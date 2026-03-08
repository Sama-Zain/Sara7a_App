
import { successResponse } from "../../Utils/response/succes.response.js";
import { decryption } from "../../Utils/security/encryption.security.js";
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
