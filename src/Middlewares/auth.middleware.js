const jwt = require('jsonwebtoken');
const UserModel = require("../Models/user.model");
const responseHandler = require('../Utils/responseHandler.utils');
const commonUtilsObj = require("../Utils/commonUtils.utils");
const CryptoJS = require("crypto-js");

// const userCache = new Map();

const CACHE_TTL = 300000;

const authMiddleware = async (req, res, next) => {
  try {

    let encryptedToken;
    const authHeader = req.headers.authorization;
    // console.log("authHeader: ",authHeader)
    if (authHeader && authHeader.startsWith('Bearer ')) {
      encryptedToken = authHeader.split(' ')[1];
    }

    if (!encryptedToken && req.cookies && req.cookies.token) {
      encryptedToken = req.cookies.token;
    }
    if (!encryptedToken || !encryptedToken.trim()) {
      return responseHandler.errorResponse(
        res,
        401,
        'Authentication token missing'
      );
    }
    let decryptedToken;
    try {
      decryptedToken = await commonUtilsObj.decryptToken(encryptedToken);
      if (!decryptedToken) {
        return responseHandler.errorResponse(res, 401, 'Invalid token encryption');
      }
    } catch (decryptError) {
      console.error('Token decryption failed:', decryptError.message);
      return responseHandler.errorResponse(res, 401, 'Token decryption failed');
    }

    let decoded;
    try {
      decoded = jwt.verify(decryptedToken, process.env.JWT_SECRET, {
        algorithms: [process.env.JWT_ALGORITHM],
        clockTolerance: 30 // Allow 30 seconds clock skew
      });
    } catch (jwtError) {
      if (jwtError instanceof jwt.TokenExpiredError) {
        return responseHandler.errorResponse(res, 401, 'Session expired - please login again');
      } else if (jwtError instanceof jwt.JsonWebTokenError) {
        console.error('JWT Verification Error:', jwtError.message);
        return responseHandler.errorResponse(res, 401, 'Invalid token');
      } else {
        console.error('JWT Unknown Error:', jwtError.message);
        return responseHandler.errorResponse(res, 401, 'Authentication failed');
      }

    }

    if (!decoded?.id || !decoded?.user_type) {
      return responseHandler.errorResponse(res, 401, 'Invalid token payload');
    }
    if (!isValidObjectId(decoded.id)) {
      return responseHandler.errorResponse(res, 401, 'Invalid user identifier');
    }

    let user;

    try {
      user = await UserModel.findOne({
        _id: decoded.id,
      }).populate("role").select('_id email full_name user_type is_verified ').lean();

    } catch (dbError) {
      console.error('Database query failed:', dbError.message);
      return responseHandler.errorResponse(res, 500, 'Internal authentication error');
    }

    if (!user) {
      return responseHandler.errorResponse(res, 401, 'User not found or inactive');
    }

    req.user = {
      id: user._id.toString(),
      email: user.email,
      full_name: user.full_name,
      user_type: user.user_type,
      originalToken: encryptedToken,
      tokenIssuedAt: decoded.iat,
      tokenExpiresAt: decoded.exp,
      sessionId: decoded.sessionId || null,
      role_id: user?.role || null
    };
    // console.log("rq.user:",req.user)
    // console.log("reoleee", user.role)
    res.set({
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block'
    });

    // console.log('me to aa gaya last me try k andar h')

    next();

    // console.log("req..user : ",req.user)
  } catch (error) {
    console.error('Authentication middleware error:', {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      userAgent: req.headers['user-agent'],
      ip: req.ip
    });
    return responseHandler.errorResponse(res, 500, 'Internal authentication error');
  }
};

const isValidObjectId = (id) => {
  const mongoose = require('mongoose');
  return mongoose.Types.ObjectId.isValid(id) && String(new mongoose.Types.ObjectId(id)) === id;
};


module.exports = authMiddleware;