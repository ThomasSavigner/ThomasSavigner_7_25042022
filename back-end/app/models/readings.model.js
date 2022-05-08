
// log of readings table model
module.exports = (sequelize, Sequelize) => {
    const Reading = sequelize.define("readings", {
        readingID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        postID: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        userID: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    });
    return Reading;
};