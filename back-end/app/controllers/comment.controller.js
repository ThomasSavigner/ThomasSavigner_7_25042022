
//  imports
const db = require("../models");
const Post = db.Posts;
const Comment = db.Comments;

//        controllers for CRUD operations on comments table and associates

exports.createComment = (req, res) => {

    //  Validation !

    const myComment = {
        userID: req.auth.tokenUserId,
        postID: req.params['postID'],
        content: req.body.content,
    }

    Comment.create(myComment)
        .then((data) => { res.status(200).send(data)})
        .catch((error) => { res.status(500).send(error)})
    

    const postID = myComment.postID
   
    Post.findOne({where: {postID: postID}})
        .then( (post) => {
            post.postCommentsModifiedAt = Date.now();
            post.save()
                .then(console.log("Post concerned: updateAt column updated"))
                .catch((error) => res.status(500).send( {error : "Problem while reccording post update time, try again" } ))
        })
}