
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
                    attributes: ['firstName', 'lastName'],
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
    
    //let lastLogoutDate = " ";

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
                            attributes: ['firstName', 'lastName'],
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
                            'postCommentsModifiedAt', 'readings', 'likes',
            ],
            include: [{
                association: 'userP',
                attributes: ['firstName', 'lastName'],
                include: [{
                    association: 'department',
                    attributes: ['name'],
                }],
            }, {
                association: 'pstComments',
                attributes: ['userID', 'postID', 'content'],
                include: [{
                    association: 'userC',
                    attributes: ['firstName', 'lastName'],
                }],
            }],
        })
        .then((data) => {
            res.status(200).json(data)
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
                    attributes: ['content'],
                    include: [{
                        association: 'userC',
                        attributes: ['firstName', 'lastName'],
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

