import connectDB from "./DB/connections.js";
import {authRouter, userRouter} from "./Modules/index.js";
import { globalErrorHandler, NotFoundException } from "./Utils/response/error.response.js";
import { successResponse } from "./Utils/response/succes.response.js";
const bootstrap = async (app,express) => {
    app.use(express.json());
    await connectDB();
    app.get("/",(req,res)=>{
        return successResponse(res,201,"Welcome to Sara7a API")
    })

    app.use("/api/auth",authRouter);
    app.use("/api/user",userRouter);
    
    app.all("/*dummy",(req,res)=>{
        throw NotFoundException({message:"Not Found Handler"})
    })
    app.use(globalErrorHandler);

}
export default bootstrap;