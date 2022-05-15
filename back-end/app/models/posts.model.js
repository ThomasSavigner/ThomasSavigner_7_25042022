
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
        hashtags: {
            type: Sequelize.STRING,
            allowNull: false,
            set(val) {
                this.setDataValue("hashtags", JSON.stringify([val], ","))
            },
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
        readers: {
            type: Sequelize.STRING,
            allowNull: true,
            set(val) {
                this.setDataValue("readers", JSON.stringify([val], ","))
            },
        },
        likes: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        likers: {
            type: Sequelize.STRING,
            allowNull: true,
            set(val) {
                this.setDataValue("likers", JSON.stringify([val], ","))
            },
        },    
        
    });
    return Post;
};