import nodemailer from "nodemailer";
import { User_Email, User_Password } from "../../../Config/config.service.js";

export async function sendEmail({ to = "", subject = "", text = "", html = "", attachments = [] ,
    cc = "", bcc = ""
}) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: User_Email,
            pass: User_Password
        },
    });
    try {
        const info = await transporter.sendMail({
            from: `"Sara7a-App" <${User_Email}>`,
            to,
            subject,
            text,
            html,
            attachments,
            cc,
            bcc,
        });
        
        console.log("Message sent: %s", info.messageId);
    } catch (err) {
        console.error("Error while sending mail:", err);
    }
}
export const emailSubject = {
    welcome: "Welcome to Sara7a-App",
    contactUs: "Contact Us",
    confirmEmail: " Confirm Your Email",
    resetPassword: "Reset Password",
    verifyEmail: "Verify Email",
}