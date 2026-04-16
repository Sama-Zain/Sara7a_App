import joi from "joi";
import { generalFields } from "../../Middleware/validation.middleware.js";
import { filevalidation } from "../../Utils/multer/local.multer.js";
export const updatedProfileSchema = {
    file: joi.object({
        fieldname: generalFields.file.fieldname.valid("attach").required(),
        originalname: generalFields.file.originalname.required(),
        mimetype: generalFields.file.mimetype.valid(...filevalidation.images).required(),
        encoding: generalFields.file.encoding.required(),
        size: generalFields.file.size.max(1024 * 1024 * 5).required(),
        destination: generalFields.file.destination.required(),
        filename: generalFields.file.filename.required(),
        path: generalFields.file.path.required(),
        finalPath: generalFields.file.finalPath.required(),
    }),
}

export const updatedCoverSchema = {
        files: joi.array().items(joi.object({
        fieldname: generalFields.file.fieldname.valid("attach").required(),
        originalname: generalFields.file.originalname.required(),
        mimetype: generalFields.file.mimetype.valid(...filevalidation.images).required(),
        encoding: generalFields.file.encoding.required(),
        size: generalFields.file.size.max(1024 * 1024 * 5).required(),
        destination: generalFields.file.destination.required(),
        filename: generalFields.file.filename.required(),
        path: generalFields.file.path.required(),
        finalPath: generalFields.file.finalPath.required(),
        })),
}