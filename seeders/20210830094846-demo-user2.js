const crypto = require("crypto");
("use strict");

const password = "qwe456";
const userEmail = "nobody@gmail.com";
const userHash = crypto
  .pbkdf2Sync(password, userEmail, 1000, 64, `sha512`)
  .toString(`hex`);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("userdb5s", [
      {
        fullname: "Nobody",
        email: userEmail,
        dob: "2010-01-01",
        hash: userHash,
        createdAt: new Date(),
        updatedAt: new Date(),
        gender: "men",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("userdb5s", null, {});
  },
};
