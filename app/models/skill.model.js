module.exports = (sequelize, Sequelize) => {
    const Skill = sequelize.define("skills", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      }
    });
  
    return Skill;
  };