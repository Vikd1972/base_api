"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn("userdb5s", "gender", {
      type: Sequelize.STRING,
      defaultValue: "male",
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn("userdb5s", "gender");
  },
};
