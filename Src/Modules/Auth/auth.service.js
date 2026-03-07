import User from "../../DB/Models/user.model.js";
import { create, findById, findOne } from "../../DB/database.repository.js";
import { BadRequestException, ConflictException, NotFoundException } from "../../Utils/response/error.response.js";
import { algorithmEnum } from "../../Utils/enums/security.enum.js";
import { successResponse } from "../../Utils/response/succes.response.js";
import { generateHash, compareHash } from "../../Utils/security/hash.security.js";
import { encryption } from "../../Utils/security/encryption.security.js";
import { generateToken, verifyToken } from "../../Utils/tokens/token.js";
import { JWT_SECRET_KEY, REFRESH_TOKEN, REFRESH_TOKEN_EXPIRESIN } from "../../../Config/config.service.js";
export const signup = async (req, res) => {
    const { firstName, lastName, email, password, phoneNumber, gender, role } = req.body;
    // check if user already exists
    const user = await findOne({ model: User, filter: { email } });
    if (user) {
        return ConflictException({ message: "User already exists" });
    }
    // hash password
    const hashedPassword = await generateHash({ plainText: password, algo: algorithmEnum.bcrypt });
    // encrypt phone
    const encryptedPhone = await encryption(phoneNumber);
    // create user
    const newuser = await create({
        model: User,
        data: { firstName, lastName, email, password: hashedPassword, phoneNumber: encryptedPhone, gender, role }
    });

    return successResponse({ res, message: "User created successfully", data: newuser, statusCode: 201 });
}
// login user
export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await findOne({ model: User, filter: { email } });
    if (!user) {
        return NotFoundException({ message: "User not found" });
    }
    // check if password is valid
    const isMatch = await compareHash({ plainText: password, hashValue: user.password, algo: algorithmEnum.bcrypt });
    if (!isMatch) {
        return BadRequestException({ message: "Invalid email or password" });
    }
    const token = generateToken({ id: user._id, email: user.email });
    // refresh token
    const refreshToken = generateToken(
       { id: user._id, email: user.email }, // الـ payload (الـ argument الأول)
       secretKey=REFRESH_TOKEN,                       // الـ secretKey (الـ argument الثاني)
    { expiresIn: REFRESH_TOKEN_EXPIRESIN } // الـ options (الـ argument الثالث)
    )
    return successResponse({ res, message: "User login successfully", data: { token, refreshToken }, statusCode: 200 });
}
export const refreshToken = async (req, res) => {

    const refreshToken = req.headers.refreshtoken;

    const decoded = await verifyToken(refreshToken, REFRESH_TOKEN);

    if (!decoded) {
        return BadRequestException({ message: "Invalid refresh token" });
    }

    const user = await findById({
        model: User,
        id: decoded.id
    });

    if (!user) {
        return NotFoundException({ message: "User not found" });
    }

    const accessToken = generateToken({
        id: user._id,
        email: user.email
    },
);

    return successResponse({
        res,
        message: "Token refreshed successfully",
        data: { token: accessToken },
        statusCode: 200
    });
};