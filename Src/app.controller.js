import connectDB from "./DB/connections.js";
import { authRouter, userRouter , messageRouter} from "./Modules/index.js";
import { corsOptions } from "./Utils/cors/cors.utils.js";
import {
  globalErrorHandler,
  NotFoundException,
} from "./Utils/response/error.response.js";
import { successResponse } from "./Utils/response/succes.response.js";
import cors from "cors";
import path from "path";
import helmet from "helmet";
import { emailSubject, sendEmail } from "./Utils/email/email.js";
const bootstrap = async (app, express) => {
  app.use(express.json(), cors(corsOptions()), helmet());
  await connectDB();
  // await sendEmail({
  //   to: "samaeng702@gmail.com",
  //   subject: emailSubject.welcome,
  // });  
  app.get("/", (req, res) => {
    return successResponse(res, 201, "Welcome to Sara7a API");
  });
  app.use("/uploads", express.static(path.resolve("Src/uploads")));
  app.use("/api/auth", authRouter);
  app.use("/api/user", userRouter);
  app.use("/api/message", messageRouter);
  app.all("/*dummy", (req, res) => {
    throw NotFoundException({ message: "Not Found Handler" });
  });
  app.use(globalErrorHandler);
};
export default bootstrap;
