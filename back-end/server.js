const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/models");
const controller = require("./app/controllers/user.controller");

// use of CORS
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


const run = async () => {
  
  // departments creation in db
  const dpt1 = await controller.createDepartment({
    name: "Administration",
  });
  const dpt2 = await controller.createDepartment({
    name: "Finances",
  });
  const dpt3 = await controller.createDepartment({
    name: "Comptabilité",
  });
  const dpt4 = await controller.createDepartment({
    name: "SSI",
  });
  const dpt5 = await controller.createDepartment({
    name: "Marketing",
  });
  const dpt6 = await controller.createDepartment({
    name: "Logistique",
  });

  // roles creation in db
  const role1 = await controller.createRole({
    userRole: "user",
  });
  const role2 = await controller.createRole({
    userRole: "admin",
  });
  const role3 = await controller.createRole({
    userRole: "root",
  });
}

// connection & synchronization app models with database
db.sequelize.sync({ force: true })
  .then( () => { 
    console.log("Synchronization models/database complete");
  run();
  }
);


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hello World !!!" });
  }
);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  }
);