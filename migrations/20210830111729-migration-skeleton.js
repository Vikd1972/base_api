"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn("userdb5s", "gender", { type: Sequelize.STRING, allowNull: false, value: "men" });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn("userdb5s", "gender");
  },
};
