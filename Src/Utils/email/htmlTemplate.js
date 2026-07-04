export const template = (data) => `

        <div style="font-family: Arial, sans-serif; background-color:#f4f4f4; padding:20px;">
        
        <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 5px 15px rgba(0,0,0,0.1);">
        
        <div style="background: linear-gradient(135deg, #8e2de2, #ff6ec4); padding:20px; text-align:center; color:white;">
        <h1 style="margin:0;">Welcome to Sara7a-App 💌</h1>
        </div>
         
        <div style="padding:25px; color:#333;">
            <h1 style="margin:0;">Hello ${data.firstName},</h1>
        <p style="font-size:16px;">Your account has been created successfully 🎉</p>
        
        <div style="background:#f9f9f9; padding:15px; border-radius:8px; margin:20px 0;">
        <p style="margin:5px 0;"><strong>Email:</strong> ${data.to}</p>
        <p style="margin-bottom:10px; font-size:14px; color:#777;">
        Use this OTP to verify your account:
        </p>
        <h2 style="
        letter-spacing:5px;
        font-size:28px;
        color:#8e2de2;
        margin:0;
        background:#f9f9f9;
        ">
        ${data.otp}
        </h2>
        
        </div>
        
        <p style="font-size:14px; color:#777;">
        Please keep your login details safe and do not share them with anyone.
        </p>
        
        <div style="text-align:center; margin:25px 0;">
        <a href="#" style="
        background: linear-gradient(135deg, #8e2de2, #ff6ec4);
        color:white;
            padding:12px 25px;
            text-decoration:none;
            border-radius:25px;
            font-size:16px;
            display:inline-block;
            ">
            Login Now
            </a>
            </div>
            
            <p style="font-size:13px; color:#999; text-align:center;">
            If you have any questions, contact us at 
            <a href="mailto:sara7a@gmail.com" style="color:#8e2de2;">sara7a@gmail.com</a>
            </p>
            </div>
            
            <div style="background:#f4f4f4; text-align:center; padding:15px; font-size:12px; color:#aaa;">
            © 2026 Sara7a. All rights reserved.
      </div>
      
    </div>
    </div>
`;