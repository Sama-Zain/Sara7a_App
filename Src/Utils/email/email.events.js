import { EventEmitter } from "node:events";
import { emailSubject, sendEmail } from "./email.js";
import { template } from "./htmlTemplate.js";
export const emailEmitter = new EventEmitter();

emailEmitter.on("confirmEmail", async (data) => {
    await sendEmail({
        to: data.to,
        subject: emailSubject.confirmEmail,
        html: template({
            firstName: data.firstName,
            otp: data.otp,
            to: data.to
        }),
    }).catch((error) => {
        console.error("Error sending Confirm Email:", error);
    });
});
