
// log of readings table model
module.exports = (sequelize, Sequelize) => {
    const Reading = sequelize.define("readings", {
        readingID: {
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
    return Reading;
};