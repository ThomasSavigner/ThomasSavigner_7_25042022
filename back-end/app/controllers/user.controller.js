
//  Functions for CRUD operations on user model

const db = require("../models");
const User = db.Users;
const Department = db.Departments;
const Role = db.Roles;


exports.createDepartment = (department) => {
    return Department.create( {
        name: department.name,
    })
    .then((department) => {
        console.log(">> Created department: " + JSON.stringify(department, null, 4));
        return department;
    })
    .catch((err) => {
        console.log(">> Error while creating tutorial: ", err);
    });
};

exports.createRole = (role) => {
    return Role.create({
        userRole: role.userRole,
    })
    .then((role) => {
        console.log(">> Created role: " + JSON.stringify(role, null, 4));
        return role;
    })
    .catch((err) => {
        console.log(">> Error while creating role: ", err);
    });
};
