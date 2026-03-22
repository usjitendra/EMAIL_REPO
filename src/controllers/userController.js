const UserModel = require("../Models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const responseHandler = require("../Utils/responseHandler.utils");
const { tryCatchFn } = require("../Utils/tryCatch.utils");
const moment = require("moment");
const RoleModel = require("../Models/role.model");
const mongoose = require("mongoose");
const commonUtilsObj = require("../Utils/commonUtils.utils")


class UserController {

  constructor() { }

  registerUser = tryCatchFn(async (req, res) => {
    const { name, email, phone, role, password, department, category, userType } =
      req.body;

    if (!name || !email) {
      return responseHandler.errorResponse(
        res,
        400,
        "Full name, email and password are required."
      );
    }
    const user_type = userType || "Team_Member"; // default to Team_Member if not provided

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return responseHandler.errorResponse(res, 400, "Invalid email format.");
    }

    if (password.length < 5) {
      return responseHandler.errorResponse(res, 400, "Password must be at least 5 characters long.");
    }

    const existingUser = await UserModel.findOne({
      email: email.toLowerCase(),
    });
    if (existingUser) {
      return responseHandler.errorResponse(
        res,
        409,
        "A user with this email already exists."
      );
    }

    // const categoryExists = await CategoryModel.findById(category);
    // if (!categoryExists) {
    //   return responseHandler.errorResponse(
    //     res,
    //     400,
    //     "Department/category does not exist."
    //   );
    // }

    if (role) {
      const roleExists = await RoleModel.findById(role);
      if (!roleExists) {
        return responseHandler.errorResponse(res, 400, "Role does not exist.");
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);



    const newUser = await UserModel.create({
      full_name: name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
      // department: category,
      // user_type: ,
      is_verified: true,
      phone: phone,
    });

    //   const emailBody = await emailTemplate.sendCredentials(
    //     newUser?.full_name,
    //     newUser?.email,
    //     "000000"
    //   );


    //  const rs=  await emailHandler.emailSend(
    //     newUser.email,
    //     emailBody,
    //     "Your Password",
    //     "",
    //     []
    //  );
    // console.log("rs: ",rs)
    //s unil
    console.log("hi")
    return responseHandler.successResponse(
      res,
      201,
      "User created successfully.",
      {
        _id: newUser._id,
        full_name: newUser.full_name,
        email: newUser.email,
        user_type: newUser.user_type,
        is_verified: newUser.is_verified,
      }
    );
  });

  loginUser = tryCatchFn(async (req, res) => {
    const { email, password, microsoftAuth, microsoftUserData } = req.body;

    // If it's Microsoft auth, handle it differently
    if (microsoftAuth && microsoftUserData) {
      console.log("Microsoft SSO login attempt for:", microsoftUserData.email);

      // Find user by Microsoft email
      const user = await UserModel.findOne({ email: microsoftUserData.email }).populate('role');

      if (!user) {
        return responseHandler.errorResponse(res, 400, "Microsoft user not found in system", {});
      }

      if (!user?.is_active) {
        return responseHandler.errorResponse(res, 403, "You are inactive. Please contact to admin!", {});
      }

      // Generate tokens and proceed with login
      const tokens = await commonUtilsObj.generateTokens(
        user._id,
        user.email,
        user.user_type,
        false
      );

      const cleanUser = {
        _id: user._id,
        full_name: user.full_name,
        email: user.email,
        user_type: user.user_type,
        is_verified: user.is_verified,
        assigned_companies: user.assigned_companies,
        role: user?.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      const responseData = {
        user: cleanUser,
        accessToken: tokens.accessToken,
      };

      return responseHandler.successResponse(
        res,
        200,
        "Microsoft login successful.",
        responseData
      );
    }

    // Regular email/password authentication (your existing code)
    if (!email || !password) {
      return responseHandler.errorResponse(res, 400, "Email and password are required", {});
    }

    const user = await UserModel.findOne({ email }).populate('role');

    if (!user) {
      return responseHandler.errorResponse(res, 400, "Invalid credentials", {});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return responseHandler.errorResponse(res, 400, "Invalid credentials", {});
    }

    if (!user?.is_active) {
      return responseHandler.errorResponse(res, 403, "You are inactive.Please contact to admin!", {});
    }

    const tokens = await commonUtilsObj.generateTokens(

      user._id,
      user.email,
      user.user_type,
      false
    );

    const cleanUser = {
      _id: user._id,
      full_name: user.full_name,
      email: user.email,
      user_type: user.user_type,
      is_verified: user.is_verified,
      assigned_companies: user.assigned_companies,
      role: user?.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    const responseData = {
      user: cleanUser,
      accessToken: tokens.accessToken,
    };

    res.cookie("token", tokens.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return responseHandler.successResponse(
      res,
      200,
      "Login successfully.",
      responseData
    );
  });
  // Add this to your userController or authController

  verifyUserForSSO = tryCatchFn(async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return responseHandler.errorResponse(res, 400, "Email is required", {});
    }

    const user = await UserModel.findOne({ email }).populate('role');

    if (!user) {
      return responseHandler.errorResponse(res, 404, "User not found. Please check your email or contact administrator.", {});
    }

    if (!user?.is_active) {
      return responseHandler.errorResponse(res, 403, "Your account is inactive. Please contact administrator.", {});
    }

    // If user exists and is active, return success (but don't login yet)
    return responseHandler.successResponse(
      res,
      200,
      "User verified successfully. Proceeding with Microsoft SSO.",
      { email: user.email, exists: true }
    );
  });





  forgotPassword = tryCatchFn(async (req, res, next) => {
    const { email } = req.body;

    const user = await UserModel.findOne({
      email: email?.trim()?.toLowerCase(),
    });

    if (!user) {
      return responseHandler.errorResponse(res, 404, "user not found !", null);
    }

    // const newOtp = commonUtilsObj.generateOTP();
    const newOtpExpiry = moment().add(20, "minutes").unix();

    user.otp = newOtp;
    user.otpExpires = newOtpExpiry;

    // const emailBody = await emailTemplate.sentOtp(user?.full_name, newOtp);

    const savedData = await user.save();
    return responseHandler.successResponse(
      res,
      200,
      "Forgot Password ! Otp Sent Successfully."
    );
  });

  verifyOtp = tryCatchFn(async (req, res, next) => {
    const { email, otp } = req?.body || {};

    const user = await UserModel.findOne({
      email: email?.toLowerCase(),
    });

    if (!user) {
      return responseHandler.successResponse(
        res,
        404,
        "User Not found !",
        null
      );
    }

    if (Number(user.otp) !== Number(otp)) {
      return responseHandler.successResponse(res, 404, "Invalid OTP", null);
    }

    const currentTime = moment().unix();
    if (currentTime > user.otpExpires) {
      return responseHandler.successResponse(res, 400, "OTP Expired", null);
    }

    user.otp = null;
    user.otpExpires = null;

    await user.save();

    return responseHandler.successResponse(
      res,
      200,
      "Otp Verified Successfully ."
    );
  });

  changePassword = tryCatchFn(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;

    const user = await UserModel.findById(userId);
    if (!user) {
      return responseHandler.successResponse(res, 404, "User not found", null);
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return responseHandler.successResponse(
        res,
        400,
        "Invalid current password",
        null
      );
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    return responseHandler.successResponse(
      res,
      200,
      "Password changed successfully",
      null
    );
  });

  toggleUserStatus = tryCatchFn(async (req, res, next) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return responseHandler.errorResponse(res, 400, "Invalid user ID.");
    }
    const toggleResult = await UserModel.findByIdAndUpdate(
      userId,
      [{ $set: { is_active: { $not: "$is_active" } } }],
      { new: true }
    );

    if (!toggleResult) {
      return responseHandler.errorResponse(res, 404, "User not found!");
    }

    return responseHandler.successResponse(
      res,
      200,
      "User updated successfully.",
      toggleResult
    );
  });

  getAllUserDetails = tryCatchFn(async (req, res) => {
    let { role, status, search = "", page = 1, limit = 100 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;
    // console.log("HEYYYYY")
    const matchFilter = { is_delete: false };

    // if (role) matchFilter.role = role;

    if (status) {
      if (status == "active") {
        // console.log("1")
        matchFilter.is_active = true;
      } else if (status == "inactive") {
        matchFilter.is_active = false;
        // console.log("2")
      }
    }

    if (search) {
      matchFilter.$or = [
        { full_name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    // console.log("req.query: ", JSON.stringify(req.query));
    console.log("matchFilter: ", matchFilter);

    const pipeline = [
      { $match: matchFilter },

      {
        $match: {
          email: { $ne: "super@gmail.com" },
        },
      },
      {
        $lookup: {
          from: "roles",
          localField: "role",
          foreignField: "_id",
          as: "role_details",
        },
      },
      { $unwind: { path: "$role_details", preserveNullAndEmptyArrays: true } },
      {
        $match: role ? { "role_details.role": role } : {},
      },
      // {
      //   $lookup: {
      //     from: "companies",
      //     localField: "assigned_companies",
      //     foreignField: "_id",
      //     as: "companies_details"
      //   }
      // },
      {
        $addFields: {
          assigned_company_count: { $size: "$assigned_companies" },
        },
      },

      {
        $lookup: {
          from: "categories",
          localField: "department",
          foreignField: "_id",
          as: "department_details",
        },
      },

      {
        $unwind: {
          path: "$department_details",
          // preserveNullAndEmptyArrays: true,
        },
      },

      {
        $facet: {
          paginatedResults: [{ $skip: skip }, { $limit: limit }],
          total_users: [{ $count: "count" }],
          active_users: [
            { $match: { is_active: true } },
            { $count: "count" },
          ],
          roles_by_user_count: [

            { $group: { _id: "$role_details.role", count: { $sum: 1 } } },
            { $project: { role: "$_id", count: 1, _id: 0 } },
          ],
          // assigned_clients: [
          //   { $unwind: "$assigned_companies" },
          //   { $group: { _id: "$assigned_companies" } },
          //   { $count: "count" }
          // ]
        },
      },
    ];

    const result = await UserModel.aggregate(pipeline);

    const data = result[0] || {};
    // console.log("result : ", JSON.stringify(result));
    // console.log("Data: ", data);

    console.log("Plantorm users: ", data.total_users?.[0]?.count || 0);
    console.log("Active users: ", data.active_users?.[0]?.count || 0);
    console.log("Roles by user count: ", data.roles_by_user_count || []);
    // console.log("Assigned clients: ", data.assigned_clients?.[0]?.count || 0); 
    return responseHandler.successResponse(
      res,
      200,
      "Dashboard fetched successfully",
      {
        users: data.paginatedResults || [],
        total_users: data.total_users?.[0]?.count || 0,
        active_users: data.active_users?.[0]?.count || 0,
        roles_by_user_count: data.roles_by_user_count || [],
        assigned_clients: data.assigned_clients?.[0]?.count || 0,
        pagination: {
          page,
          limit,
          totalPages: Math.ceil(
            (data.total_users?.[0]?.count || 0) / limit || 0
          ),
          hasNext:
            page < Math.ceil((data.total_users?.[0]?.count || 0) / limit || 0),
          hasPrev: page > 1,
        },
      }
    );
  });



  updateUser = tryCatchFn(async (req, res) => {
    const { userId } = req.params;
    let { name, email, password, role, department, category, userType, is_verified } =
      req.body;

    const user_type = userType; // to maintain consistent naming
    console.log("BOdy: ", req.body)
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return responseHandler.errorResponse(res, 400, "Invalid user ID.");
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return responseHandler.errorResponse(res, 400, "Invalid user ID.");
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return responseHandler.errorResponse(res, 404, "User not found.");
    }

    // Validate email
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return responseHandler.errorResponse(res, 400, "Invalid email format.");
      }

      const existingUser = await UserModel.findOne({
        email: email.toLowerCase(),
        _id: { $ne: userId },
      });

      if (existingUser) {
        return responseHandler.errorResponse(res, 409, "Email already exists with another account.");
      }
    }

    // Validate category
    const categoryToCheck = category || department;
    // if (categoryToCheck) {
    //   const categoryExists = await CategoryModel.findById(categoryToCheck);
    //   if (!categoryExists) {
    //     return responseHandler.errorResponse(res, 400, "Department/category does not exist.");
    //   }
    // }

    // Validate role
    if (role) {
      const roleExists = await RoleModel.findById(role);
      if (!roleExists) {
        return responseHandler.errorResponse(res, 400, "Role does not exist.");
      }
    }

    // Prepare update object dynamically
    const updateData = {
      ...(name && { full_name: name }),
      ...(req.body?.phone && { phone: req.body.phone }),
      ...(email && { email: email.toLowerCase() }),
      ...(role && { role }),
      ...(categoryToCheck && { department: categoryToCheck }),
      ...(user_type && { user_type }),
      ...(typeof is_verified === "boolean" && { is_verified }),
    };

    // Only update password if provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateData.password = hashedPassword;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    }).populate("role department", "name");

    return responseHandler.successResponse(res, 200, "User updated successfully.", {
      _id: updatedUser._id,
      full_name: updatedUser.full_name,
      email: updatedUser.email,
      role: updatedUser.role,
      department: updatedUser.department,
      user_type: updatedUser.user_type,
      is_verified: updatedUser.is_verified,
    });
  });

}

module.exports = new UserController();
//
