'use strict';

const data = require("../user.json")
data.forEach(el => {
  el.createdAt = new Date()
  el.updatedAt = new Date()
})

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert("Users", data)
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete("Users", null)
  }
};
