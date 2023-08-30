const express = require("express");
const app = express();
const PORT = 5000;
const path = require("path");

// Sequelize init
const config = require("./src/config/config.json");
const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = new Sequelize(config.development);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

// Asset Files
app.use(express.static(path.join(__dirname, "src/assets")));
app.use(express.urlencoded({ extended: false }));

const contentBlog = [
  {
    projectName: "Membuat Situs Web Dinamis Menggunakan Microsoft Excel",
    authorName: "Alif Dewantara",
    postedAt: getFullTime(new Date()),
    startDate: "2023-06-08",
    endDate: "2023-08-08",
    description:
      "Saat ini, membangun situs web dinamis tampaknya menjadi hal yang kompleks, membutuhkan pemahaman mendalam tentang bahasa pemrograman dan platform pengembangan web yang berbeda. Namun, apa yang mungkin Anda tidak ketahui adalah bahwa Anda bisa membuat situs web dinamis dengan menggunakan Microsoft Excel. Ya, Anda tidak salah baca! Excel, yang biasanya digunakan untuk pekerjaan spreadsheet, dapat digunakan untuk membuat situs web yang menakjubkan dan interaktif. Mari kita jelajahi cara melakukan ini.",
    inputNodejs: "on",
    inputReactjs: "on",
    inputVuejs: "on",
    inputJavascript: "on",
    inputImg:
      "https://imgx.sonora.id/crop/0x0:0x0/x/photo/2022/11/22/exceljpg-20221122022008.jpg",
  },
  {
    projectName: "Membangun Situs Streaming Film dengan Fortran",
    authorName: "Alif Dewantara",
    postedAt: getFullTime(new Date()),
    startDate: "2023-07-01",
    endDate: "2023-08-20",
    description:
      "Fortran, yang sering dianggap sebagai bahasa pemrograman 'kuno', mungkin bukan yang pertama kali terlintas dalam pikiran Anda saat berpikir tentang membangun situs streaming film. Namun, dengan perkembangan teknologi dan perangkat lunak, Fortran tetap menjadi bahasa pemrograman yang sangat kuat dan dapat digunakan untuk mencapai hal-hal yang mungkin tidak Anda duga. Dalam artikel ini, kami akan membahas bagaimana Anda dapat menggunakan Fortran untuk membangun situs streaming film yang dapat bersaing dengan platform modern lainnya.",
    inputNodejs: "on",
    inputReactjs: "",
    inputVuejs: "on",
    inputJavascript: "",
    inputImg: "https://www.matecdev.com/img/Fortran_code_logo.png",
  },
  {
    projectName: "Jual Beli Daring dengan fitur Cash On Delivery",
    authorName: "Alif Dewantara",
    postedAt: getFullTime(new Date()),
    startDate: "2022-07-01",
    endDate: "2023-08-20",
    description:
      "Dalam era digital saat ini, jual beli daring telah menjadi cara yang sangat populer untuk berbelanja. Namun, ada saat-saat ketika konsumen masih merasa lebih nyaman dengan metode pembayaran tradisional seperti 'Cash On Delivery' (COD), di mana pembayaran dilakukan saat barang tiba di tangan mereka. Bagi penjual daring, menawarkan opsi pembayaran COD dapat meningkatkan kepercayaan konsumen dan meningkatkan penjualan. Pilihan COD dapat membantu Anda menarik lebih banyak konsumen, terutama di pasar di mana pembayaran daring mungkin masih kurang umum. Selalu pastikan untuk memberikan layanan yang baik kepada pelanggan Anda, terlepas dari metode pembayaran yang mereka pilih.",
    inputNodejs: "on",
    inputReactjs: "on",
    inputVuejs: "",
    inputJavascript: "on",
    inputImg:
      "https://assets.digination.id/crop/0x0:0x0/x/photo/2018/10/10/97767959.jpg",
  },
  {
    projectName: "Situs Edukasi Teknologi Budidaya Rumput Ternak",
    authorName: "Alif Dewantara",
    postedAt: getFullTime(new Date()),
    startDate: "2022-07-01",
    endDate: "2023-01-20",
    description:
      "Teknologi terus berperan penting dalam sektor pertanian dan peternakan. Salah satu aspek yang semakin mendapat perhatian adalah budidaya rumput ternak yang efisien. Untuk mendukung perkembangan ini, situs edukasi teknologi budidaya rumput ternak dapat menjadi sumber daya berharga bagi peternak dan petani. Situs edukasi tentang budidaya rumput ternak adalah sumber daya penting untuk meningkatkan produksi ternak dan keberlanjutan sektor pertanian. Mendorong petani dan peternak untuk mengakses pengetahuan ini dapat berdampak positif pada hasil produksi dan kesejahteraan peternakan.",
    inputNodejs: "on",
    inputReactjs: "",
    inputVuejs: "on",
    inputJavascript: "on",
    inputImg:
      "https://www.algardata.com/wp-content/uploads/2021/10/Agrotech-transformacao-digital-na-agricultura-hero-1920x1080.jpg",
  },
  {
    projectName: "DebtPay, Aplikasi Pelunas Hutang",
    authorName: "Alif Dewantara",
    postedAt: getFullTime(new Date()),
    startDate: "2022-07-01",
    endDate: "2023-01-20",
    description:
      "Hidup di era digital memberikan kita akses ke berbagai alat yang dapat membantu mengatur keuangan pribadi dengan lebih efisien. Salah satu tantangan finansial yang banyak orang hadapi adalah manajemen hutang. Bagi yang ingin merencanakan pelunasan hutang secara lebih terstruktur dan efektif, ada aplikasi pelunas hutang yang dapat memberikan bantuan berharga. Dalam artikel ini, kita akan menjelajahi aplikasi-aplikasi ini dan bagaimana mereka dapat membantu Anda mengatasi hutang dengan lebih baik.",
    inputNodejs: "on",
    inputReactjs: "on",
    inputVuejs: "on",
    inputJavascript: "on",
    inputImg:
      "https://debtline.co.za/wp-content/uploads/2021/06/what-is-debt-review.webp",
  },
];

app.get("/", async (req, res) => {
  try {
    const query = `SELECT * FROM content_blogs;`;
    let obj = await sequelize.query(query, { type: QueryTypes.SELECT });
    const data = obj.map((res) => ({
      ...res,
      tecnologies: ["nodejs", "reactjs"],
    }));
    console.log(data);

    res.render("index", { contentBlog: data });
  } catch (error) {
    console.log(error);
  }
});

app.get("/form-blog", (req, res) => {
  res.render("form-blog");
});

app.post("/form-blog", async (req, res) => {
  try {
    const {
      projectName,
      authorName,
      startDate,
      endDate,
      description,
      // inputNodejs,
      // inputReactjs,
      // inputVuejs,
      // inputJavascript,
      inputImg,
    } = req.body;

    const durasi = getDurasi(startDate, endDate);
    await sequelize.query(
      `INSERT INTO content_blogs(project_name, author_name, start_date, end_date, description, input_img, durasi, "createdAt", "updatedAt") VALUES ('${projectName}', '${authorName}', '${startDate}', '${endDate}', '${description}', '${inputImg}', '${durasi}', NOW(), NOW());`
    );

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

app.get("/edit-blog/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = `SELECT * FROM content_blogs WHERE id=${id}`;

    let obj = await sequelize.query(query, { type: QueryTypes.SELECT });
    const data = obj.map((res) => ({
      ...res,
      tecnologies: ["nodejs", "reactjs"],
    }));
    res.render("edit-blog", { data: data[0] });
  } catch (error) {
    console.log(error);
  }
});

app.post("/edit-blog/:id", async (req, res) => {
  try {
    const {
      ids,
      projectName,
      authorName,
      startDate,
      endDate,
      description,
      // inputNodejs,
      // inputReactjs,
      // inputVuejs,
      // inputJavascript,
      inputImg,
    } = req.body;

    const durasi = getDurasi(startDate, endDate);
    await sequelize.query(
      `UPDATE content_blogs
      SET project_name = '${projectName}', author_name = '${authorName}', start_date = '${startDate}', end_date = '${endDate}', description = '${description}', input_img = '${inputImg}, "updatedAt" = '${new Date()}'
      WHERE id=${ids}`
    );

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/blog-content/:id", async (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM content_blogs WHERE id=${id};`;
  let obj = await sequelize.query(query, { type: QueryTypes.SELECT });
  const data = obj.map((res) => ({
    ...res,
    tecnologies: ["nodejs", "reactjs"],
  }));

  res.render("blog-content", { data: data[0] });
});

app.get("/delete-blog/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await sequelize.query(`DELETE FROM content_blogs WHERE id=${id}`);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Functions
contentBlog.forEach((blog, index) => {
  blog.durasi = getDurasi(blog.startDate, blog.endDate);
  blog.ids = index;
});
// console.log(contentBlog);
function getDurasi(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDifference = end - start;
  const durationInDays = Math.floor(timeDifference / (1000 * 3600 * 24));
  let daysInMonth = 30;
  let monthsInYear = 12;
  let durasiMonth = Math.floor(durationInDays / daysInMonth);
  let durasiYear = Math.floor(durationInDays / (daysInMonth * monthsInYear));

  if (durasiYear > 0) {
    return `${durasiYear} tahun`;
  } else if (durasiMonth > 0) {
    return `${durasiMonth} bulan`;
  } else if (durationInDays > 0) {
    return `${durationInDays} hari`;
  } else {
    return "";
  }
}

function getFullTime(time) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  }).format(time);
}
