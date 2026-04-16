import { Router } from "express";
import * as userService from "./user.service.js";
import {
  authentication,
  authorization,
} from "../../Middleware/auth.middleware.js";
import { RoleEnum, TokenTypeEnum } from "../../Utils/enums/user.enum.js";
import { filevalidation, localFile } from "../../Utils/multer/local.multer.js";
import { validation } from "../../Middleware/validation.middleware.js";
import { updatedCoverSchema, updatedProfileSchema } from "./user.validation.js";
const router = Router();

router.get(
  "/",
  authentication({
    tokenType: TokenTypeEnum.Access,
  }),
  authorization({ role: [RoleEnum.User] }),
  userService.getprofile,
); // http://localhost:3000/api


router.patch(
  "/update-profile",
  authentication({
    tokenType: TokenTypeEnum.Access,
  }),
  authorization({ role: [RoleEnum.User] }),
  localFile({
    customPath: "users",
    validation: [...filevalidation.images],
  }).single("attach"),
  validation(updatedProfileSchema),
  userService.fileUpload,
); // http://localhost:3000/api/user/update-profile



router.patch(
  "/update-cover",
  authentication({
    tokenType: TokenTypeEnum.Access,
  }),
  authorization({ role: [RoleEnum.User] }),
  localFile({
    customPath: "users",
    validation: [...filevalidation.images],
  }).array("attach", 5),
  validation(updatedCoverSchema),
  userService.coverUpload,
); // http://localhost:3000/api/user/update-cover
export default router;

