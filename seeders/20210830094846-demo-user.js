const crypto = require("crypto");
("use strict");

const password = "qwe123";
const userEmail = "example@example.com";
const userHash = crypto
  .pbkdf2Sync(password, userEmail, 1000, 64, `sha512`)
  .toString(`hex`);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        fullname: "Someone",
        email: userEmail,
        dob: "2010-01-01",
        hash: userHash,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
