"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert(
      "content_blogs",
      [
        {
          ids: 1,
          project_name: "Membuat Situs Web Dinamis Menggunakan Microsoft Excel",
          author_name: "Alif Dewantara",
          start_date: "2023-06-08",
          end_date: "2023-08-08",
          description:
            "Saat ini, membangun situs web dinamis tampaknya menjadi hal yang kompleks, membutuhkan pemahaman mendalam tentang bahasa pemrograman dan platform pengembangan web yang berbeda.",
          input_img:
            "https://imgx.sonora.id/crop/0x0:0x0/x/photo/2022/11/22/exceljpg-20221122022008.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
