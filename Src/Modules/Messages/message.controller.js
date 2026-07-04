import { Router } from "express";
import * as messageService from "./message.service.js";
import * as messageValidation from "./message.validation.js";
import { validation } from "../../Middleware/validation.middleware.js";
import { authorization , authentication } from "../../Middleware/auth.middleware.js";
import { RoleEnum, TokenTypeEnum } from "../../Utils/enums/user.enum.js";
const router = Router();

router.post(
  "/send-message/:receiverId",
  validation(messageValidation.sendMessageValidation),
  messageService.sendMessage,
); // http://localhost:3000/api/message/send-message/:receiverId
// get message to specific user
router.get(
  "/get-message",
  authentication({ tokenType: TokenTypeEnum.Access }),
  authorization({ role: [RoleEnum.User] }),
  messageService.getMessage,
); // http://localhost:3000/api/message

router.get(
  "/get-message-admin",
  authentication({ tokenType: TokenTypeEnum.Access }),
    authorization({ role: [RoleEnum.Admin] }),
  messageService.getMessageAll,
); // http://localhost:3000/api/message

export default router;
