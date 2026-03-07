import {Router} from "express";
import * as userService from "./user.service.js";
const router = Router();    
router.get("/",userService.getprofile); // http://localhost:3000/api

export default router;



