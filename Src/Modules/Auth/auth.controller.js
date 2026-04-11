import { Router } from "express";
import * as authService from "./auth.service.js";
import * as authValidation from "./auth.validation.js";
import { validation } from "../../Middleware/validation.middleware.js";
import { localFile } from "../../Utils/multer/local.multer.js";
const router = Router();
router.post(
  "/signup",
  localFile().single("attach"),
  validation(authValidation.signupSchema),
  authService.signup,
); // http://localhost:3000/api/auth/signup
router.post(
  "/login",
  validation(authValidation.loginSchema),
  authService.login,
); // http://localhost:3000/api/auth/login
router.post("/refresh-token", authService.refreshToken); // http://localhost:3000/api/auth/refresh-token
router.post("/social-login", authService.socialLogin); // http://localhost:3000/api/auth/social-login

export default router;
