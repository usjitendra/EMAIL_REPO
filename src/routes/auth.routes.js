const express = require("express");
const router = express.Router();
const authControllerobj = require("../controllers/auth.controller");
const authMiddleware = require("../Middlewares/auth.middleware");


router.get("/get-permission", authMiddleware, authControllerobj.getUserPermissions);
router.post("/send", authControllerobj.emailSend)
router.post("/delhi", authControllerobj.emailSendDelhi)
router.post("/sunil", authControllerobj.emailSendsunil)



module.exports = router;