
// user table model

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        userID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        departmentID: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        avatarUrl: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        roleID: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    });
    return User;
};