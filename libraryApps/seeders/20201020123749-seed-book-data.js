'use strict';

const data = require("../books.json")
data.forEach(el => {
  el.createdAt = new Date()
  el.updatedAt = new Date()
})

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert("Books", data)
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete("Books", null)
  }
};
