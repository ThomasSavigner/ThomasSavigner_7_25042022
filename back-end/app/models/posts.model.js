
// posts table model
module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("posts", {
        postID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        section_id: {
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
        image: {
            type: Sequelize.BLOB
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