import { Router } from "express";
import * as userService from "./user.service.js";
import { authentication, authorization } from "../../Middleware/auth.middleware.js";
import { RoleEnum, TokenTypeEnum } from "../../Utils/enums/user.enum.js";
const router = Router();
router.get("/", authentication({
    tokenType: TokenTypeEnum.Access
}),
 authorization({role:[RoleEnum.User]}),
    userService.getprofile); // http://localhost:3000/api

export default router;





