
//  imports

const fs = require("fs");
const { Sequelize } = require("../models");
const db = require("../models");
const Post = db.Posts;
const User = db.Users;

const Op = Sequelize.Op;

//        controllers for CRUD operations on posts table and associates

exports.createPost = (req, res) => {

    let imagePath = ""
    if (req.file) {
        imagePath = `${req.protocol}://${req.get("host")}/uploads/post-images/${req.file.filename}`
    } else {
        imagePath = ""
    }

    const myPost = {
        userID: req.auth.tokenUserId,
        hashtags: req.body.hashtags,
        topic: req.body.topic,
        article: req.body.article,
        imageUrl: imagePath,
    }

    Post.create(myPost)
        .then((data) => { res.status(200).send(data)})
        .catch((error) => { res.status(500).send(error)})        

}

exports.feedsProvider = (req, res) => {
         
            Post.findAll({
                where: {
                    isPublish: true,
                },
                attributes: ['postID', 'hashtags', 'topic', 'article', 'imageUrl', 
                                'postCommentsModifiedAt', 'readings', 'likes',
                            ],
                include: [{
                    
                    association: 'userP',
                    attributes: ['firstName', 'lastName', 'avatarUrl'],
                    include: [{
                        association: 'department',
                        attributes: ['name'],
                    }],
                }],
                order: [['postCommentsModifiedAt', 'DESC']]
                })
                .then((posts) => {
                    res.status(200).json({'result': posts/*, 'count': data.count, 'pages': pages*/});
                });
}

exports.feedsAtLogin = (req, res) => {
   
    User.findOne({
        where: {
            userID: req.auth.tokenUserId,
        }
    },)
        .then( (user) => {
            const lastLogoutDate = user.loggedOutAt;
             
            let limit = 5;
            let offset = 0;
            
            Post.findAndCountAll({
                    where: {
                        isPublish: true,
                        postCommentsModifiedAt: {
                            [Op.gte]: lastLogoutDate,
                        }}
                })
                .then((data) => {
                    let page = req.params['page'];
                    let pages = Math.ceil(data.count / limit);
                    
                    offset = limit * (page - 1);
                    
                    Post.findAll({
                        where: {
                            isPublish: true,
                            postCommentsModifiedAt: {
                                [Op.gte]: lastLogoutDate,
                            }
                        },
                        attributes: ['postID', 'hashtags', 'topic', 'article', 'imageUrl', 
                                        'createdAt','postCommentsModifiedAt', 'readings', 'likes',
                                    ],
                        include: [{
                            association: 'userP',
                            attributes: ['firstName', 'lastName', 'avatarUrl'],
                            include: [{
                                association: 'department',
                                attributes: ['name'],
                            }],
                        }],
                        limit: limit,
                        offset: offset,
                        order: [['postCommentsModifiedAt', 'DESC']]
                        })
                        .then((posts) => {          //  ******* add next page: bool
                            res.status(200).json({'result': posts, 'count': data.count, 'pages': pages});
                        })
                        .catch((err) => { res.status(404).send("Problem at results pagination")});
                    })

        })
        .catch((err) => { res.status(404).send("User not found !")})

}

exports.focusOnPostandComments = (req, res) => {

    Post.findOne({
            where: {
                postId: req.params['postID'],
            },
            attributes: ['postID', 'hashtags', 'topic', 'article', 'imageUrl', 
                            'createdAt', 'postCommentsModifiedAt', 'readings', 'readers',
                            'likes', 'likers',
            ],
            include: [{
                association: 'userP',
                attributes: ['firstName', 'lastName', 'avatarUrl'],
                include: [{
                    association: 'department',
                    attributes: ['name'],
                }],
            }, {
                association: 'pstComments',
                where: {
                    isPublish: true
                },
                attributes: ['commentID', 'userID', 'postID', 'content', 'createdAt'],
                include: [{
                    association: 'userC',
                    attributes: ['firstName', 'lastName', 'avatarUrl'],
                }],
            }],
        })
        .then((data) => {
            const everRead = data.readers.includes(req.auth.tokenUserId)
            if (!everRead) {    //  increment post.readings, save reader
                Post.findOne({
                    where: {postID:req.params['postID']}
                    })
                    .then((post)=>{
                        let readingsNbr = post.readings+1;
                        let readersArray = post.readers;
                        readersArray.push(req.auth.tokenUserId);
                        post.set({
                            readings:readingsNbr,
                            readers: readersArray,
                        })
                        post.save()
                            .then(
                                console.log("reading inc, reader added ; Post updated")  
                            )   
                            .catch((error) => res.status(500).send("Problem while saving new reader, try again - error"+error ))
                    })
            }

            //  Did the readers ever like post ?
            let heartHasColor = "";
            if (data.likers.includes(req.auth.tokenUserId)) {
                heartHasColor = true;    
            } else {        //  Boolean variable for customizing user front interface
                heartHasColor = false;
            }

            res.status(200).json({'postComments': data,  'heartHasColor': heartHasColor})
        })
        .catch((err) => { res.status(404).send("I don't find it ! Try again...later...")})

}

exports.getAllMyPosts = (req, res) => {

    let limit = 1;
    let offset = 0;
    
    Post.findAndCountAll({
            where: {
                isPublish: true,
                userID: req.params['userID'],
            }
         })
        .then((data) => {
            let page = req.params['page'];
            let pages = Math.ceil(data.count / limit);
            
            offset = limit * (page - 1);
            
            Post.findAll({
                where: {
                    isPublish: true,
                    userID: req.params['userID'],
                },
                attributes: ['postID', 'hashtags', 'topic', 'article', 'imageUrl', 
                                'postCommentsModifiedAt', 'readings', 'likes',
                            ],
                include: [{
                    association: 'pstComments',
                    where: {
                        isPublish: true
                    },
                    attributes: ['content'],
                    include: [{
                        association: 'userC',
                        attributes: ['firstName', 'lastName', 'avatarUrl'],
                    }]
                }],
                limit: limit,
                offset: offset,
                order: [['postCommentsModifiedAt', 'DESC']]
            })
                .then((posts) => {          //  ******* add next page: bool
                    res.status(200).json({'results': posts, 'count': data.count, 'pages': pages});
                });
        })
        .catch((error) => {res.status(500).send('Internal Server Error ::> '+error)})

}

exports.updatePost = (req, res) => {

    Post.findOne({
        where: {
            postID: req.params['postID'],
            isPublish: true,
        },
        })
        .then( (post) => {

            if (post.userID !== req.auth.tokenUserId) {
                res.status(403).send("Unauthorized request: you're not the post's author")                
            }

            if (req.file) {

                fileName = post.imageUrl.split('/uploads/post-images/')[1];
                fs.unlinkSync(`uploads/post-images/${fileName}`);
            
            }

            const postUpdated = req.file ? {
                ...req.body,
                postCommentsModifiedAt: Date.now(),
                imageUrl: `${req.protocol}://${req.get('host')}/uploads/post-images/${req.file.filename}`
            } : {
                ...req.body,
                postCommentsModifiedAt: Date.now(),
                imageUrl: post.imageUrl,
            }

            Post.update(postUpdated, {
                where: {
                    postID: req.params['postID'],
                    isPublish: true,
                },
                })
                .then( () => {
                    res.status(200).send("Post Updated")
                })   
                .catch((err) => { res.status(500).send("Problem at updating DB: " + err)})
        
        })
        .catch((err) => { res.status(500).send("Internal Server error : " + err)})

}

exports.likePost = (req, res) => {
 
    Post.findOne({
        where: {
            postID: req.params['postID'],
            isPublish: true,
        },
        })
        .then( (post) => {

            if (post.userID === req.auth.tokenUserId) {
                res.status(403).send("Unauthorized request: You can't like your post")                
            }

            //  Did user ever like post ?
            let likersArray = post.likers
            const everLiked = likersArray.includes(req.auth.tokenUserId)
            if (!everLiked) {    //  increment post.likers, save liker
                let likesNbr = post.likes+1
                likersArray.push(req.auth.tokenUserId);
                post.set({
                    likes: likesNbr,
                    likers: likersArray,
                })
                post.save()
                    .then(
                        res.status(200).send("Like saved")  
                    )   
                    .catch((error) => res.status(500).send( {error : "Problem while saving like, try again" } ))
            } else {
                res.status(403).send("You ever liked post")
            }
        })
        .catch((err) => { res.status(500).send("Problem : " + err)})

}

exports.deletePost = (req, res) => {

    Post.findOne({
            where: {
                postID: req.params['postID'],
                isPublish: true,
            }
        })
        .then((post) => {

            if (post.userID !== req.auth.tokenUserId) {
                res.status(403).send("Delete process cancelled: you're not the post owner !")
            }

            const filename = post.imageUrl.split('/uploads/post-images/')[1];
            fs.unlink(`./uploads/post-images/${filename}`, ()=>{})

            Post.destroy({
                    where: {
                        postID: req.params['postID'],
                        isPublish: true,
                    }
                })
                .then( () => {
                    res.status(200).send("Post deleted")
                })
                .catch((err) => {res.send("Deletion failed - error ::>" + err)})
            
        })
        .catch((err) => {res.status(500).send("Problem :::> " + err)})

}

exports.deleteAllMyPostsAndCo = (req, res) => {
    
    const userIDValue = parseInt(req.params['userID'])

    if (userIDValue !== req.auth.tokenUserId) {
        res.status(403).send("Deletion process cancelled: you're not the posts owner !")
    }

    Post.findAndCountAll({
            where: {
                userID: req.params['userID'],
                isPublish: true,
            }
        })
        .then((data) => {
            
            for (i=0; i < data.count; i++) {
                const filename = data.rows[i]['imageUrl'].split('/uploads/post-images/')[1];
                fs.unlink(`./uploads/post-images/${filename}`, () => {
                    console.log("files deleted")
                })
            }
                   
            Post.destroy({
                    where: {
                        userID: req.params['userID'],
                        isPublish: true,
                    }
                })
                .then( () => {
                    res.status(200).send("Posts deleted")
                    console.log("Posts deleted")
                })
                .catch((err) => {res.status(500).send("Deletions failed- error ::> " + err)})
            })
        .catch((err)=>{res.status(500).send(err)})
        
}

exports.getTopPosts = (req, res) => {
    
    const ranks = parseInt(req.params['limit']);

    Post.findAll({
            where: {isPublish: true},
            order: [['likes', 'DESC']],
            include: [{
                association: 'userP',
                attributes: ['firstName', 'lastName', 'avatarUrl'],
                include: [{
                    association: 'department',
                    attributes: ['name'],
                }]
            }],
            limit: ranks,
        })
        .then((postsliked)=>{
            let results = [];
            for (i=0; i< ranks; i++) {
                this["postNumber"+i] = {
                    postID: postsliked[i].postID,
                    userID: postsliked[i].userID,
                    firstName: postsliked[i].userP.firstName,
                    lastName: postsliked[i].userP.lastName,
                    department: postsliked[i].userP.department.name,
                    avatarUrl: postsliked[i].userP.avatarUrl,
                    hashtags: postsliked[i].hashtags,
                    topic: postsliked[i].topic,
                    article: postsliked[i].article,
                    imageUrl: postsliked[i].imageUrl,
                    postCommentsModifiedAt: postsliked[i].postCommentsModifiedAt,
                    readings: postsliked[i].readings,
                    likes: postsliked[i].likes,
                }
                results.push(JSON.stringify(this["postNumber"+i]))
            }
        
            res.status(200).send("Posts Top"+ranks+" :::> "+results)
        })
        .catch((err) => {res.status(500).send("Something wrong to get posts top ten" + err)})    


}

exports.getTheNLastPosts = (req, res) => {

    const ranks = parseInt(req.params['limit']);

    Post.findAll({
        where: {isPublish: true},
        order: [['postCommentsModifiedAt', 'DESC']],
        include: [{
            association: 'userP',
            attributes: ['firstName', 'lastName', 'avatarUrl'],
            include: [{
                association: 'department',
                attributes: ['name'],
            }]
        }],
        limit: ranks,
        })
        .then((lastPosts)=>{
            let results = [];
            for (i=0; i< ranks; i++) {
                this["postNumber"+i] = {
                    postID: lastPosts[i].postID,
                    userID: lastPosts[i].userID,
                    firstName: lastPosts[i].userP.firstName,
                    lastName: lastPosts[i].userP.lastName,
                    department: lastPosts[i].userP.department.name,
                    avatarUrl: lastPosts[i].userP.avatarUrl,
                    hashtags: lastPosts[i].hashtags,
                    topic: lastPosts[i].topic,
                    article: lastPosts[i].article,
                    imageUrl: lastPosts[i].imageUrl,
                    postCommentsModifiedAt: lastPosts[i].postCommentsModifiedAt,
                    readings: lastPosts[i].readings,
                    likes: lastPosts[i].likes,
                }
                results.push(JSON.stringify(this["postNumber"+i]))
            }
            
            res.status(200).send("Last "+ranks+" Posts :::>" + results)})
        .catch((err)=>{{res.status(500).send("Something wrong to get last posts headers" + err)}})

}

exports.unpublishPost = (req, res) => {
    
    const amIAdmin = () => {
        
        User.findOne( {where: {userID: req.auth.tokenUserId} })
            .then( (admin) => {
                const boolAdmin = admin.isAdmin;
                return boolAdmin;
            })
            .catch((error) => res.status(500).send({error}))
    }

    Post.findOne( {where: {postID: req.params['postID']}} )
        .then( (post) => {

            if (amIAdmin === false) {
                res.status(403).send("Unauthorized request !..: don't think about it")
            } else {
                if (post.isPublish === true) {
                    post.isPublish = false
                    console.log("Post unpublished")
                } else {
                    post.isPublish = true
                    console.log("Post published")
                }
            };
    
            post.save()
                .then(res.status(200).send("Post publish status modified"))
                .catch((error) => {res.status(500).send( "Problem while saving new publish status :::> " + error )})
        })   
        .catch((error) => res.status(500).send({error}))

}