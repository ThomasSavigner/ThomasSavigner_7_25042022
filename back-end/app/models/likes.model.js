
// log of likes table model
module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define("likes", {
        likeID: {
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
    return Like;
};