const express = require("express");
const cors = require("cors");
const app = express();
const path = require('path');
const db = require("./app/models");
const userRoutes = require("./app/routes/user.routes");

//const postRoutes = require("./app/routes/post.routes");
//const commentRoutes = require("./app/routes/comment.routes");


// use of CORS
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// ****   connection & synchronization app models with database
db.sequelize.sync({ /*force: true */})
  .then( () => { 
    console.log("Synchronization models/database complete");
  }
);


//  the user routes will be use for all requests to /api/auth
app.use('/api/auth', userRoutes);

//  Every request made to /api/post will call the post routes
//app.use('/api/posts', postRoutes);

//  Every request made to /api/comments will call the comment routes
//app.use('/api/comments', commentRoutes);


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hello World !!!" });
  }
);

//  enable the files download from/to the in server's folders
app.use("/images", express.static( path.join(__dirname, "/uploads/user-avatars") ));
//app.use('uploads/post-images', express.static( path.join(__dirname, 'uploads/post-images')));


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  }
);