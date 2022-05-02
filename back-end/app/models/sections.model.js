module.exports = (sequelize, Sequelize) => {
    const Section = sequelize.define("sections", {
        sectionID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });
    return Section;
}