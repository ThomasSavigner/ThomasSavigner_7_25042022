const router = require("express").Router();
const postCtrl = require("../controllers/post.controller");
const authentication = require("../middleware/tokenAuth");
const multer = require("../middleware/multer-config_image");

router.post("/", authentication, multer, postCtrl.createPost);
/*
router.get("/", authentication, postCtrl.feedProvider);
router.get("/login/", authentication, postCtrl.getFeedSinceLastLogOut);
router.get("/:postID", authentication, postCtrl.focusOnPostandComments);    // includes: comments **** update readings
router.get("/:email", authentication, postCtrl.getAllMyPosts);      // includes: user
router.put("/:postID", authentication, multer, postCtrl.updatePost);
router.put("/like/:postID", authentication, postCtrl.likePost);
router.delete("/:postID", authentication, postCtrl.deletePost);     // includes: comments
router.delete("/:email", authentication, postCtrl.deleteAllMyPosts);    //includes: user

//  **notifications**
router.get("/hot-posts/", postCtrl.getTopPosts);    //  getTheMoreLikedPosts every laptime of 3 mintutes base on UpdateAt column
router.get("/last-posts/", postCtrl.getTheLastPosts);    //  getlastPosts every laptime of 3 mintutes base on UpdateAt column

//  **admin only**
router.put("/statut/:postID", authentication, postCtrl.unpublishPost);
*/
module.exports = router;