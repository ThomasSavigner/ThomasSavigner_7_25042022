const router = require("express").Router();
const userCtrl = require("../controllers/user.controller");
const authentication = require("../middleware/tokenAuth");
const multer = require("../middleware/multer-config_avatar");
const checkEmail = require("../middleware/domainMailCheck");
const pwdValidation = require("../middleware/pwdValidation");


router.post("/signup", multer, checkEmail, pwdValidation.checkPwd, pwdValidation.confirmPwd, userCtrl.userSignup);
router.post("/login", checkEmail, userCtrl.userLogin);
router.delete("/user/:email", authentication, userCtrl.deleteUserAccount);
router.put("/avatar/:email", authentication, multer, userCtrl.updateAvatar);
router.put("/password/:email", authentication, pwdValidation.checkPwd, pwdValidation.confirmPwd, userCtrl.updatePassword);

//*********adminOnly:
router.put("/ban/:email", authentication, userCtrl.banishUser);

module.exports = router;