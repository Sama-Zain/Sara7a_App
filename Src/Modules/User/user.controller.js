import {Router} from "express";
import * as userService from "./user.service.js";
const router = Router();    
router.get("/:id",userService.getprofile); // http://localhost:3000/api/user/5f8c1b5a0a8a5c0d0e0f

export default router;