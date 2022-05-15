const router = require("express").Router();
const userCtrl = require("../controllers/user.controller");
const authentication = require("../middleware/tokenAuth");
const multer = require("../middleware/multer-config_avatar");
const checkEmail = require("../middleware/domainMailCheck");
const pwdValidation = require("../middleware/pwdValidation");


router.post("/signup", multer, checkEmail, pwdValidation.checkPwd, pwdValidation.confirmPwd, userCtrl.userSignup);
router.post("/login", checkEmail, userCtrl.userLogin);

// available for the owner account and user admin
router.delete("/", authentication, userCtrl.deleteUserAccount);
/*
router.put("/avatar", authentication, multer, userCtrl.updateAvatar);
router.put("/password", authentication, pwdValidation.checkPwd, pwdValidation.confirmPwd, userCtrl.updatePassword);

adminOnly:
router.put("/ban", authentication, userCtrl.banUser);

*/
module.exports = router;