import joi from "joi";
import { GenderEnum, RoleEnum } from "../Utils/enums/user.enum.js";
import { BadRequestException } from "../Utils/response/error.response.js";
import { Types } from "mongoose";

export const generalFields = {
    firstName: joi.string().min(3).max(50).message({
      "string.base": "First Name must be a string",
      "string.min": "First Name must be at least 3 characters",
      "string.max": "First Name must be less than 50 characters",
    }),
    lastName: joi.string().min(3).max(50).message({
      "string.base": "Last Name must be a string",
      "string.min": "Last Name must be at least 3 characters",
      "string.max": "Last Name must be less than 50 characters",
    }),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: true } }),
    password: joi.string().min(6).max(100),
    confirmPassword: joi.string().valid(joi.ref("password")).messages({
      "any.only": "Passwords do not match",
    }),
    phoneNumber: joi.string().pattern(/^01[0125][0-9]{8}$/),
    gender: joi.string().valid(...Object.values(GenderEnum)),
    role: joi.string().valid(...Object.values(RoleEnum)),
    file:{
      fieldname: joi.string(),
      originalname: joi.string(),
      mimetype: joi.string(),
      encoding: joi.string(),
      size: joi.number().positive(),
      destination: joi.string(),
      filename: joi.string(),
      path: joi.string(),
      finalPath: joi.string(),
    },
    // custom validation
    id: joi.string().custom((value, helper) => {
      return (
        Types.ObjectId.isValid(value) || helper.message("Invalid ObjectId")
      );
    }),
};
export const validation = (schema) => {
  return (req, res, next) => {
    const validationError = [];
    for (const key of Object.keys(schema)) {
      const { error } = schema[key].validate(req[key], {
        abortEarly: false,
      });
      if (error) {
        validationError.push({
          key,
          details: error.details.map((err) => ({
            message: err.message,
            path: err.path,
            type: err.type,
            context: err.context,
          })),
        });
      }
    }
    if (validationError.length > 0) {
      return BadRequestException("Validation Error", validationError);
    }
    next();
  };
};
