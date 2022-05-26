
//  imports

const fs = require("fs");
const { Sequelize } = require("../models");
const db = require("../models");
const Post = db.Posts;
const User = db.Users;

const Op = Sequelize.Op;

//        controllers for CRUD operations on posts table and associates

exports.createPost = (req, res) => {
    
    // Validation !

    let imagePath = ""
    if (req.file) {
        imagePath = `${req.protocol}://${req.get("host")}/uploads/post-images/${req.file.filename}`
    }

    const hashtagsArray = req.body.hashtags.match(/#\S+/g);

    const myPost = {
        userID: req.auth.tokenUserId,
        hashtags: hashtagsArray,
        topic: req.body.topic,
        article: req.body.article,
        imageUrl: imagePath,
    }

    Post.create(myPost)
        .then((data) => { res.status(200).send(data)})
        .catch((error) => { res.status(500).send(error)})        

}

exports.feedsProvider = (req, res) => {

    let limit = 5;
    let offset = 0;
    
    Post.findAndCountAll({
            where: {
                isPublish: true,
            }
         })
        .then((data) => {
            let page = req.params['page'];
            let pages = Math.ceil(data.count / limit);
            
            offset = limit * (page - 1);
            
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
                limit: limit,
                offset: offset,
                order: [['postCommentsModifiedAt', 'DESC']]
            })
                .then((posts) => {          //  ******* add next page: bool
                    res.status(200).json({'result': posts, 'count': data.count, 'pages': pages});
                });
        })
        .catch(function (error) {
            res.status(500).send('Internal Server Error');
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
                            'postCommentsModifiedAt', 'readings', 'readers',
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
                attributes: ['userID', 'postID', 'content'],
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
                        let readingsNbr = post.readings+1
                        let readersArray = JSON.parse(post.readers)
                        readersArray.push(req.auth.tokenUserId);
                        post.set({
                            readings:readingsNbr,
                            readers: readersArray,
                        })
                        post.save()
                            .then(
                                console.log("reading inc, reader added ; Post updated")  
                            )   
                            .catch((error) => res.status(500).send( {error : "Problem while saving new reader, try again" } ))
                    })
            }

            //  Did the readers ever like post ?
            let heartHasColor = "";
            if (data.likers.includes(req.auth.tokenUserId)) {
                heartHasColor = true;    
            } else {        //  Boolean variable for customizing user front interface
                heartHasColor = false;
            }

            res.status(200).json({'Focus on Post & its comments :-->': data,  'heartHasColor --->': heartHasColor})
        })
        .catch((err) => { res.status(404).send("I don't find it ! Try again...later...")})

}

exports.getAllMyPosts = (req, res) => {

    let limit = 1;
    let offset = 0;
    
    Post.findAndCountAll({
            where: {
                isPublish: true,
                userID: req.auth.tokenUserId,
            }
         })
        .then((data) => {
            let page = req.params['page'];
            let pages = Math.ceil(data.count / limit);
            
            offset = limit * (page - 1);
            
            Post.findAll({
                where: {
                    isPublish: true,
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
                    res.status(200).json({'result': posts, 'count': data.count, 'pages': pages});
                });
        })
        .catch(function (error) {
            res.status(500).send('Internal Server Error');
        });

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
        .catch((err) => { res.status(500).send("Problem : " + err)})

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
            let likersArray = JSON.parse(post.likers)
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



