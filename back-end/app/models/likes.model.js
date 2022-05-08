
// log of likes table model
module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define("likes", {
        likeID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        post_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    });
    return Like;
};