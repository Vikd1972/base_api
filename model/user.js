const Sequelize = require("sequelize");
var crypto = require("crypto");

// определяем модель User
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
  password: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  dob: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  hash: {
    type: Sequelize.STRING,
    autoIncrement: true,
    allowNull: false,
  },
  salt: {
    type: Sequelize.STRING,
    autoIncrement: true,
    allowNull: false,
  },
});

const setPassword = (password, id) => {
  const saltValue = crypto.randomBytes(16).toString("hex");
  const hashValue = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `base_API`)
    .toString(`hex`);
  User.update(
    { hash: hashValue, salt: saltValue },
    {
      where: {
        id: id,
      },
    }
  ).then((res) => {
    console.log(res);
  });
};

const checkPassword = (password, id) => {
  const hashValue = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `base_API`)
    .toString(`hex`);
    User.findOne({ where: { id: id } })
      .then((user) => {
        if (!user) return;
        return user.hash === hashValue;
      })
      .catch((err) => console.log(err));
  
};

module.exports = User;
