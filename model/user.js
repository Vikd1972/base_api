const Sequelize = require("sequelize");

//var crypto = require("crypto");

const sequelize = new Sequelize("user2db", "user2", "root1234", {
  dialect: "postgres"
 });

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  fullname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  dob: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

module.exports = User;
