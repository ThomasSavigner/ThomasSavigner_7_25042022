
// roles of users table model
module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
        roleID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        userRole: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    })
    return Role;
};