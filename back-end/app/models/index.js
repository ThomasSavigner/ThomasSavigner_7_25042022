
//*****     Database parameters and structure     *****

const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

//*** connection to db
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

//*** test database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection to database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  })
;

//*** database structure
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//* import of table models
db.Users = require("./users.model")(sequelize, Sequelize);
db.Roles = require("./roles.model")(sequelize, Sequelize);
db.Departments = require("./departments.model")(sequelize, Sequelize);
db.Posts = require("./posts.model")(sequelize, Sequelize);
db.Sections = require("./sections.model")(sequelize, Sequelize);
db.Comments = require("./comments.model")(sequelize, Sequelize);
db.Readings = require("./readings.model")(sequelize, Sequelize);
db.Likes = require("./likes.model")(sequelize, Sequelize);



//* associations between tables

//users-departments - 1:M association
db.Departments.hasMany(db.Users, {
  as: "dptUsers",
  foreignKey: "departmentID",
  }
);
db.Users.belongsTo(db.Departments, {
  as: "department",
  foreignKey: "departmentID",
  }
);

// users-roles - 1:M association
db.Roles.hasMany(db.Users, { 
  as: "roleUsers",
  foreignKey: "roleID",
  }
);
db.Users.belongsTo(db.Roles, {
  as: "role",
  foreignKey: "roleID",
  }
);

module.exports = db;