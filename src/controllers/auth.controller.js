const responseHandler = require("../Utils/responseHandler.utils");
const { tryCatchFn } = require("../Utils/tryCatch.utils");
const commonUtilsObj = require("../Utils/commonUtils.utils");
const fs = require('fs');
const path = require('path');
const nodemailer = require("nodemailer");



// const TokenModel = require("../Models/token.model");

class AuthController {
  constructor() { }

  //   refreshToken = tryCatchFn(async (req, res, next) => {
  //     const { refresh_token } = req.body;

  //     if (!refresh_token) {
  //       return responseHandler.errorResponse(
  //         res,
  //         401,
  //         "Refresh token is required."
  //       );
  //     }

  //     const decrypted = await commonUtilsObj.decryptToken(refresh_token);
  //     if (!decrypted) {
  //       return responseHandler.errorResponse(
  //         res,
  //         500,
  //         "Failed to decrypt token."
  //       );
  //     }

  //     const decoded = await commonUtilsObj.verifyToken(decrypted);
  //     if (!decoded) {
  //       return responseHandler.errorResponse(
  //         res,
  //         401,
  //         "Invalid or expired refresh token."
  //       );
  //     }

  //     const existingToken = await TokenModel.findOne({
  //       user_id: decoded.id,
  //       token: refresh_token,
  //     }).populate("user_id");

  //     // console.log("existing : ", existingToken);

  //     if (!existingToken || !existingToken?.user_id) {
  //       return responseHandler.errorResponse(res, 401, "Un-Authorized.");
  //     }


  //     const newTokens = await commonUtilsObj.generateTokens(
  //       existingToken?.user_id,
  //       existingToken?.user_id?.email,
  //       existingToken?.user_id?.user_type,
  //         existingToken?.user_id?.is_verified
  //     );
  //     // console.log("newTokens", newTokens);
  //     return responseHandler.successResponse(
  //       res,
  //       200,
  //       "Access token refreshed.",
  //       {
  //         accessToken: newTokens.accessToken,
  //       }
  //     );
  //   });



  getUserPermissions = tryCatchFn(async (req, res, next) => {

    return responseHandler.successResponse(
      res,
      200,
      "User retrieved successfully.",
      req?.user
    );
  });


  emailSend = tryCatchFn(async (req, res, next) => {


    const { email } = req.body;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,  // use env
        pass: process.env.EMAIL_PASS,  // use env
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email, // change to HR email
      subject: "Application for MERN Stack Developer Role",
      text: `
I hope this email finds you well.

My name is Jitendra Singh Chauhan, and I’m a MERN Stack Developer with 2 years of experience in building scalable and high-performance web applications.

I’m reaching out to explore potential opportunities with your team, as I’m confident that my skills in React, Node.js, Express, and MongoDB could contribute effectively to your ongoing projects.

I’ve attached my resume for your review. If you’re currently hiring for a MERN Stack role, I’d be glad to discuss how I can add value to your team. Would you be available for a quick call sometime this week?

Looking forward to your response.

Best regards,  
Jitendra Singh Chauhan  
📧 usjitendra055@gmail.com  
📱 +91 6387056457
`,
      attachments: [
        {
          filename: "resume.pdf",
          path: path.join(__dirname, "../email/Jitendra_CV.pdf"),
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    return responseHandler.successResponse(
      res,
      200,
      "successfully"
    );
  });


  emailSendDelhi = tryCatchFn(async (req, res, next) => {


    const { email } = req.body;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,  // use env
        pass: process.env.EMAIL_PASS,  // use env
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email, // change to HR email
      subject: "Application for MERN Stack Developer Role",
      text: `
I hope this email finds you well.

My name is Jitendra Singh Chauhan, and I’m a MERN Stack Developer with 2 years of experience in building scalable and high-performance web applications.

I’m reaching out to explore potential opportunities with your team, as I’m confident that my skills in React, Node.js, Express, and MongoDB could contribute effectively to your ongoing projects.

I’ve attached my resume for your review. If you’re currently hiring for a MERN Stack role, I’d be glad to discuss how I can add value to your team. Would you be available for a quick call sometime this week?

Looking forward to your response.

Best regards,  
Jitendra Singh Chauhan  
📧 usjitendra055@gmail.com  
📱 +91 6387056457
`,
      attachments: [
        {
          filename: "resume.pdf",
          path: path.join(__dirname, "../email/Jitendra.pdf"),
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    return responseHandler.successResponse(
      res,
      200,
      "successfully"
    );
  });


}

module.exports = new AuthController();

