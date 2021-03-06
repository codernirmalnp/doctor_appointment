

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    roleId:{
      type:Sequelize.INTEGER,
      references: {
        model: 'roles',
        key: 'id'
    },
    defaultValue:1

    }
  });

  return User;
};