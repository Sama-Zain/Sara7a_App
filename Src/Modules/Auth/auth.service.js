import User from "../../DB/Models/user.model.js";
import {
  create,
  findById,
  findOne,
  updateOne,
} from "../../DB/database.repository.js";
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from "../../Utils/response/error.response.js";
import { algorithmEnum } from "../../Utils/enums/security.enum.js";
import { successResponse } from "../../Utils/response/succes.response.js";
import {
  generateHash,
  compareHash,
} from "../../Utils/security/hash.security.js";
import { encryption } from "../../Utils/security/encryption.security.js";
import {
  generateToken,
  getNewLoginCredientials,
  verifyToken,
} from "../../Utils/tokens/token.js";
import { OAuth2Client } from "google-auth-library";
import { CLIENT_ID } from "../../../Config/config.service.js";
import { logoutEnum } from "../../Utils/enums/user.enum.js";
import Token from "../../DB/Models/token.model.js";
import { emailSubject, sendEmail } from "../../Utils/email/email.js";
import { emailEmitter } from "../../Utils/email/email.events.js";
// signup user
export const signup = async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber, gender, role } =
    req.body;
  // check if user already exists
  const user = await findOne({ model: User, filter: { email } });
  if (user) {
    return ConflictException({ message: "User already exists" });
  }
  // hash password
  const hashedPassword = await generateHash({
    plainText: password,
    algo: algorithmEnum.bcrypt,
  });
  // encrypt phone
  const encryptedPhone = await encryption(phoneNumber);
  // create otp 6digit
  const otp = Math.floor(100000 + Math.random() * 900000); //random number between 100000 and 900000
  console.log(otp);
  
  const hashedOTP = await generateHash({
    plainText: otp.toString(),
    algo: algorithmEnum.bcrypt,
  });
  // create user
  const newuser = await create({
    model: User,
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber: encryptedPhone,
      gender,
      role,
      confirmEmailOTP: hashedOTP,
    },
  });
  // call event
    emailEmitter.emit("confirmEmail", { to: email, firstName, otp: otp });
  return successResponse({
    res,
    message: "User created successfully",
    data: { newuser },
    statusCode: 201,
  });
};
// login user
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await findOne({
    model: User, filter: {
      email,
      // freezedAt: {$exists: false}
      // confirmEmail: {$exists: true}
    }
  });
  if (!user) {
    return NotFoundException({ message: "User not found" });
  }
  // check if password is valid
  const isMatch = await compareHash({
    plainText: password,
    hashValue: user.password,
    algo: algorithmEnum.bcrypt,
  });
  if (!isMatch) {
    return BadRequestException({ message: "Invalid email or password" });
  }
  const credentials = await getNewLoginCredientials(user);
  return successResponse({
    res,
    message: "User login successfully",
    data: {
      accessToken: credentials.accessToken,
      refreshToken: credentials.refreshToken,
    },
    statusCode: 200,
  });
};
// refresh token
export const refreshToken = async (req, res) => {
  const refreshToken = req.headers.refreshtoken;
  const decoded = await verifyToken(refreshToken, REFRESH_TOKEN);
  if (!decoded) {
    return BadRequestException({ message: "Invalid refresh token" });
  }
  const user = await findById({
    model: User,
    id: decoded.id,
  });
  if (!user) {
    return NotFoundException({ message: "User not found" });
  }
  const accessToken = generateToken({
    id: user._id,
    email: user.email,
  });
  return successResponse({
    res,
    message: "Token refreshed successfully",
    data: { token: accessToken },
    statusCode: 200,
  });
};
// verify google account
async function verifyGoogleAccount({ idToken }) {
  const client = new OAuth2Client();
  const ticket = await client.verifyIdToken({
    idToken: idToken,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload;
}
// social login
export const socialLogin = async (req, res) => {
  const { idToken } = req.body;
  //verify token
  const { email, given_name, family_name, email_verified, picture } =
    await verifyGoogleAccount({ idToken });
  if (!email_verified) {
    return BadRequestException({ message: "Email not verified" });
  }
  const user = await findOne({ model: User, filter: { email } });
  if (user) {
    if (user.provider === ProviderEnum.Google) {
      const credentials = await getNewLoginCredientials(user);
      return successResponse({
        res,
        message: "User login successfully",
        data: { credentials },
        statusCode: 200,
      });
    }
  }
  // create user
  const newuser = await create({
    model: User,
    data: {
      firstName: given_name,
      lastName: family_name,
      email,
      provider: ProviderEnum.Google,
      profilePicture: picture,
    },
  });
  const credentials = await getNewLoginCredientials(newuser);
  return successResponse({
    res,
    message: "User created successfully",
    data: { credentials },
    statusCode: 200,
  });
};
// logout user
export const logout = async (req, res) => {
  const { flag } = req.body;
  let status = 200;
  const jti = req.decoded?.jti;
  const exp = req.decoded?.exp;
  switch (flag) {
    case logoutEnum.logout:
      if (!jti) {
        return res
          .status(400)
          .json({
            message: "Invalid Token Payload: jti missing",
            debug: req.decoded,
          });
      }
      await create({
        model: Token,
        data: {
          userId: req.user._id || req.decoded.payload?._id,
          jti: jti,
          expiresIn: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      });
      status = 201;
      break;
    case logoutEnum.logoutFromAll:
      await updateOne({
        model: User,
        filter: { _id: req.user._id },
        update: { changeCredientialsTime: Date.now() },
      });
      status = 200;
      break;
    default:
      status = 400;
      break;
  }
  return successResponse({
    res,
    message: "User logged out successfully",
    statusCode: status,
  });
};
