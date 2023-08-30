"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert(
      "content_blogs",
      [
        {
          project_name: "Membuat Situs Web Dinamis Menggunakan Microsoft Excel",
          author_name: "Alif Dewantara",
          start_date: "2023-06-08",
          end_date: "2023-08-08",
          description:
            "Saat ini, membangun situs web dinamis tampaknya menjadi hal yang kompleks, membutuhkan pemahaman mendalam tentang bahasa pemrograman dan platform pengembangan web yang berbeda.",
          // technologies: ["nodejs", "reactjs"],
          input_img:
            "https://imgx.sonora.id/crop/0x0:0x0/x/photo/2022/11/22/exceljpg-20221122022008.jpg",
          durasi: "2 bulan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          project_name: "Membangun Situs Streaming Film dengan Fortran",
          author_name: "Alif Dewantara",
          start_date: "2023-07-01",
          end_date: "2023-08-20",
          description:
            "Fortran, yang sering dianggap sebagai bahasa pemrograman 'kuno', mungkin bukan yang pertama kali terlintas dalam pikiran Anda saat berpikir tentang membangun situs streaming film.",
          // technologies: ["nodejs", "vuejs"],
          input_img: "https://www.matecdev.com/img/Fortran_code_logo.png",
          durasi: "1 bulan",
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
