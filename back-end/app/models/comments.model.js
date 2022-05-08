
// comments table model
module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comments", {
        commentID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        post_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        content: {
            type: Sequelize.TEXT('medium'),
            allowNull: false,
        },
    });
    return Comment;
};