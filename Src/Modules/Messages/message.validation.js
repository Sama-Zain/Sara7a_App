import joi from "joi";
import { generalFields } from "../../Middleware/validation.middleware.js";

export const sendMessageValidation = {
   params: joi.object({
    receiverId: generalFields.id.required(),
   }),
   body: joi.object({
    content: generalFields.content.required(),
   }),
}
