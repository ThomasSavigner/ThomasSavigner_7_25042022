
// posts table model
module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("posts", {
        postID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        userID: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        sectionID: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        topic: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        article: {
            type: Sequelize.TEXT('long'),
            allowNull: false,
        },
        imageUrl: {
            type: Sequelize.STRING
        },
        readings: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        likes: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },    
        
    });
    return Post;
};