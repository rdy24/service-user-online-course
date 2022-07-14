"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        name: "Raflizar Deswandi Yahya",
        profession: "Fullstack Developer",
        role: "admin",
        email: "admin123@gmail.com",
        password: await bcrypt.hash("12345678", 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "John Doe",
        profession: "Front End Developer",
        role: "student",
        email: "john@gmail.com",
        password: await bcrypt.hash("12345678", 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
