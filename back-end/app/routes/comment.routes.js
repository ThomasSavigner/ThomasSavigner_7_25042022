const router = require("express").Router();
const commentCtrl = require("../controllers/comment.controller");
const authentication = require("../middleware/tokenAuth");

router.post("/:postID", authentication, commentCtrl.createComment);
/*
router.get("/:email", authentication, commentCtrl.getAllMyComments);
router.put("/:commentID", authentication, commentCtrl.updateComment);
router.delete("/:commentID", authentication, commentCtrl.deleteComment);
router.delete("/:email", authentication, commentCtrl.deleteAllMyComments);

//  **admin only**
router.put("/statut/:commentID", authentication, commentCtrl.unpublishComment);
*/
module.exports = router;