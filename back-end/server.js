const express = require("express");
const cors = require("cors");
const app = express();
const path = require('path');
const db = require("./app/models");
const userRoutes = require("./app/routes/user.routes");
const postRoutes = require("./app/routes/post.routes");
const commentRoutes = require("./app/routes/comment.routes");
//const fakeUser = require('./fake-seeds.users');
//const fakePost = require("./fake-seeds.posts");
//const fakeComment = require("./fake-seeds.comments");

// use of CORS
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*")
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization")
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS")
	next()
})
/*
var corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));
*/
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// ****   connection & synchronization app models with database
db.sequelize.sync({ /*alter: true*/ /*force: true*/})
  .then( () => { 
    console.log("Synchronization models/database complete");
  })
  .then( () => {
        
    //*** Add data */  
    //fakeUser.createFakeUser()
    //fakePost.createFakePosts()
    //fakeComment.createFakeComments()
    
  })


//  the user routes will be use for all requests to /api/auth
app.use('/api/auth', userRoutes);

//  Every request made to /api/post will call the post routes
app.use('/api/posts', postRoutes);

//  Every request made to /api/comments will call the comment routes
app.use('/api/comments', commentRoutes);


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hello World !!!" });
  }
);

//  enable the files download from/to the in server's folders
app.use('/uploads/user-avatars', express.static( path.join(__dirname, '/uploads/user-avatars') ));
app.use('/uploads/post-images', express.static( path.join(__dirname, '/uploads/post-images') ));

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  }
);
