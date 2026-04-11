import joi from "joi";
import { generalFields } from "../../Middleware/validation.middleware.js";

// signup schema validation
export const signupSchema = {
  body: joi.object({
    firstName: generalFields.firstName.required(),
    lastName: generalFields.lastName.required(),
    email: generalFields.email.required(),
    password: generalFields.password.required(),
    phoneNumber: generalFields.phoneNumber.required(),
    gender: generalFields.gender.required(),
    role: generalFields.role.required(),
    confirmPassword: generalFields.confirmPassword.required(),
  }),
};
export const loginSchema = {
  body: joi.object({
    email: generalFields.email.required(),
    password: generalFields.password.required(),
  }),
};
