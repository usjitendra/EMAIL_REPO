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


  emailSendsunil = tryCatchFn(async (req, res, next) => {
    const { email } = req.body;

    // transporter config
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER_S,
        pass: process.env.EMAIL_PASS_S,
      },
    });

    // mail options
    const mailOptions = {
      from: process.env.EMAIL_USER_S,
      to: email,
      subject:
        "Application for Full Stack Engineer | 2+ Years Experience | Node.js • AWS • Docker",
      text: `
Hi,

I hope this email finds you well.

I am writing to express my interest in the Full Stack Engineer role at your organization.

With 2 years of professional experience, I specialize in building production-grade backend systems and managing cloud infrastructure. In my current role, I have:

- Architected and deployed secure multi-tier AWS architectures, including VPC (Public/Private subnets), Auto Scaling, and ALB.

- Optimized system performance by implementing a Redis caching layer, reducing average database query load by 60%.

- Containerized full-stack applications using Docker and Docker Compose, cutting image sizes by 40%.

- Developed complex features like RBAC with granular permissions and automated scheduling workflows for international clients.

I am a BCA graduate from Sardar Patel University with a CGPA of 8.87/10.0, ranked 7th in the University. My technical foundation in Node.js, combined with hands-on DevOps expertise, allows me to deliver high-performance, production-ready solutions.

I have attached my resume for your review and would welcome the opportunity to discuss how my skills can contribute to your engineering team.

Best regards,  
Sunil Shekhawat  
📱 +91 9925512382  
LinkedIn: https://www.linkedin.com/in/sunil-sinh-shekhawat-0a7057232/
    `,
      attachments: [
        {
          filename: "Sunil.pdf",
          path: path.join(__dirname, "../email/Sunil_Shekhawat_Resume.pdf"),
        },
      ],
    };

    // send mail
    await transporter.sendMail(mailOptions);

    return responseHandler.successResponse(
      res,
      200,
      "Email sent successfully"
    );
  });


}

module.exports = new AuthController();

