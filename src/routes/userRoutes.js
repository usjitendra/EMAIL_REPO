const express = require("express");
const router = express.Router();
const userControllerObj = require("../controllers/userController");
const authMiddleware = require("../Middlewares/auth.middleware");
const responseHandler = require("../Utils/responseHandler.utils");
const teamsNotificationService = require("../Utils/microsoft-notification.utils");
const { useConnection } = require("../Models/user.model");
router.post("/register", userControllerObj.registerUser);
router.post("/login", userControllerObj.loginUser);
router.post("/verify-user-sso", userControllerObj.verifyUserForSSO);

router.get("/get-all", userControllerObj.getAllUserDetails)
router.patch("/toggle-status/:userId", userControllerObj.toggleUserStatus)
router.put("/edit/:userId", (req, res, next) => { console.log("heyyyy"); next() }, userControllerObj.updateUser)


module.exports = router;

