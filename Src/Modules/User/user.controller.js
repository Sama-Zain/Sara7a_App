import { Router } from "express";
import * as userService from "./user.service.js";
import { authentication } from "../../Middleware/auth.middleware.js";
import { TokenTypeEnum } from "../../Utils/enums/user.enum.js";
const router = Router();
router.get("/",authentication({tokenType:TokenTypeEnum.Access
}) ,userService.getprofile); // http://localhost:3000/api

export default router;




