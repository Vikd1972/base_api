const crypto = require("crypto");
("use strict");

const password = "rty456";
const userEmail = "somebody@gmail.com";
const userHash = crypto
  .pbkdf2Sync(password, userEmail, 1000, 64, `sha512`)
  .toString(`hex`);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        fullname: "Somebody",
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
