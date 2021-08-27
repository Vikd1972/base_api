const Sequelize = require("sequelize");

//var crypto = require("crypto");

const sequelize = new Sequelize("user2db", "user2", "root1234", {
  dialect: "postgres",
  host: "localhost",
  define: {
    timestamps: false,
  },
});


const User = sequelize.define("userdb2", {
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
    type: Sequelize.STRING,
    allowNull: false,
  },
  dob: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  token: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

sequelize
  .sync()
  .then((result) => console.log("Database synchronized"))
  .catch((err) => console.log(err));

module.exports = User;
