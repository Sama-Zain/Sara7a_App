import {Router} from "express";
import * as authService from "./auth.service.js";
const router = Router();
router.post("/signup",authService.signup); // http://localhost:3000/api/auth/signup
router.post("/login",authService.login); // http://localhost:3000/api/auth/login

export default router;
