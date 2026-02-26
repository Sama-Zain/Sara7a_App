import {Router} from "express";
import * as authService from "./auth.service.js";
const router = Router();
router.post("/signup",authService.signup); // http://localhost:3000/signup

router.post("/login",authService.login); // http://localhost:3000/login

export default router;
