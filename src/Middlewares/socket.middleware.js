const jwt = require("jsonwebtoken");
const UserModel = require("../Models/user.model");
const commonUtilsObj = require("../Utils/commonUtils.utils");

const authenticateSocketUser = async (token) => {
  try {

    let decryptedToken;
    try {
      try {
        decryptedToken = await commonUtilsObj.decryptToken(token);
      } catch (error) {
        console.log("ERROR:",error)
      }
      
     } catch (decryptError) {
          console.error('Token decryption failed:', decryptError.message);
          throw new Error("Token decryption failed");
        }
    
    const decoded = jwt.verify(decryptedToken,process.env.JWT_SECRET);
    
    const user = await UserModel.findOne({
      _id: decoded.id,
      is_active: true,
    }).select("_id email user_type role");

    if (!user) throw new Error("User not found or inactive");

    return user;
  } catch (err) {
    throw new Error("Invalid socket token");
  }
};

module.exports = { authenticateSocketUser };
