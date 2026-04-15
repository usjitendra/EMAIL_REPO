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
      to: email,
      subject: "Application for Full Stack Developer | MERN Stack ",
      text: `
Dear Hiring Manager,

I hope you're having a great week.

My name is Jitendra Singh Chauhan, and I am a Full Stack Developer with over 2 years of professional experience in building production-grade applications. My core expertise lies in the MERN stack, but I also have hands-on experience with performance optimization, Redis caching, and AWS infrastructure (EC2, S3, Docker).

Key Highlights of my experience:
* Specialized in building scalable backend systems with Node.js & Express.
* Expert in MongoDB Aggregation Pipelines and Schema design.
* Developed complex features like Automated Fee Calculation and real-time chat systems using Socket.io.
* Strong grip on frontend optimization with React.js.

I’ve attached my resume for your review. I am confident that my ability to build end-to-end scalable solutions can add immediate value to your engineering team.

Are you available for a brief introductory call this week? I'd love to discuss how my technical background aligns with your current requirements.

Best regards,

Jitendra Singh Chauhan
Full Stack Developer
📧 usjitendra055@gmail.com
📱 +91 6387056457
`,
      attachments: [
        {
          filename: "Jitendra_CV.pdf", // Filename thoda professional rakho
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
      to: email,
      subject: "Application for Full Stack Developer | MERN Stack ",
      text: `
Dear Hiring Manager,

I hope you're having a great week.

My name is Jitendra Singh Chauhan, and I am a Full Stack Developer with over 2 years of professional experience in building production-grade applications. My core expertise lies in the MERN stack, but I also have hands-on experience with performance optimization, Redis caching, and AWS infrastructure (EC2, S3, Docker).

Key Highlights of my experience:
* Specialized in building scalable backend systems with Node.js & Express.
* Expert in MongoDB Aggregation Pipelines and Schema design.
* Developed complex features like Automated Fee Calculation and real-time chat systems using Socket.io.
* Strong grip on frontend optimization with React.js.

I’ve attached my resume for your review. I am confident that my ability to build end-to-end scalable solutions can add immediate value to your engineering team.

Are you available for a brief introductory call this week? I'd love to discuss how my technical background aligns with your current requirements.

Best regards,

Jitendra Singh Chauhan
Full Stack Developer
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
      subject: "Full Stack Developer – Open to Opportunities | 2+ Year Experience",
      text: `Hi,

I hope you're doing well. I'm Sunil Shekhawat, a Full Stack Developer with 2+ year of hands-on experience building and deploying production-grade applications for clients across Australia, India, Canada, and the Middle East.

My core stack includes Node.js, Express.js, React.js, MongoDB, Redis, and AWS — and I've worked on real-world systems serving thousands of users with a focus on performance, scalability, and clean architecture.

A few highlights from my experience:
• Reduced DB query load by ~60% using Redis caching on high-traffic endpoints
• Containerised full-stack apps with Docker, cutting image size by ~40%
• Built RBAC systems, REST APIs, real-time chat (Socket.IO), and payment integrations
• Provisioned AWS infrastructure (EC2, S3, ALB, Route 53, Auto Scaling)

I'm actively exploring Full Stack Developer opportunities and would love to connect if there's a relevant opening at your organization.

I've attached my resume for your reference. Happy to jump on a quick call at your convenience.

Thank you for your time!

Best regards,
Sunil Shekhawat
+91 9925512382
linkedin.com/in/sunil-shekhawat`,
      attachments: [
        {
          filename: "Sunil_Shekhawat_Resume.pdf",
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

