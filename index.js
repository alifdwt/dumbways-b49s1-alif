const express = require("express");
const app = express();
const PORT = 5000;
const path = require("path");

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

app.get("/", (req, res) => {
  res.render("index", { contentBlog });
});

app.get("/form-blog", (req, res) => {
  res.render("form-blog");
});

app.post("/form-blog", (req, res) => {
  const {
    projectName,
    authorName,
    startDate,
    endDate,
    description,
    inputNodejs,
    inputReactjs,
    inputVuejs,
    inputJavascript,
  } = req.body;

  const durasi = getDurasi(startDate, endDate);

  const content = {
    projectName,
    authorName,
    postedAt: getFullTime(new Date()),
    startDate,
    endDate,
    description,
    inputNodejs,
    inputReactjs,
    inputVuejs,
    inputJavascript,
    durasi,
  };
  // console.log("Project Name: ", projectName);
  // console.log("Start Date: ", startDate);
  // console.log("End Date: ", endDate);
  // console.log("Description: ", description);
  // console.log("Node JS: ", inputNodejs);
  // console.log("React JS: ", inputReactjs);
  // console.log("Next JS: ", inputNextjs);
  // console.log("TypeScript: ", inputTypescript);

  contentBlog.push(content);
  content.ids = contentBlog.length - 1;
  // console.log(contentBlog);
  res.redirect("/");
});

app.get("/edit-blog/:id", (req, res) => {
  const id = req.params.id;

  res.render("edit-blog", { data: contentBlog[id] });
});

app.post("/edit-blog/:id", (req, res) => {
  // const id = req.params.id;
  let editURL = req.originalUrl;
  console.log(editURL);

  const {
    ids,
    projectName,
    authorName,
    startDate,
    endDate,
    description,
    inputNodejs,
    inputReactjs,
    inputVuejs,
    inputJavascript,
    inputImg,
  } = req.body;

  const durasi = getDurasi(startDate, endDate);

  const content = {
    ids,
    projectName,
    authorName,
    postedAt: getFullTime(new Date()),
    startDate,
    endDate,
    description,
    inputNodejs,
    inputReactjs,
    inputVuejs,
    inputJavascript,
    inputImg,
    durasi,
  };
  console.log(content);

  contentBlog.splice(ids, 1, content);
  res.redirect("/");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/blog-content/:id", (req, res) => {
  const id = req.params.id;

  res.render("blog-content", { data: contentBlog[id] });
});

app.get("/delete-blog/:id", (req, res) => {
  const id = req.params.id;

  contentBlog.splice(id, 1);
  res.redirect("/");
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
    return `Durasi: ${durasiYear} tahun`;
  } else if (durasiMonth > 0) {
    return `Durasi: ${durasiMonth} bulan`;
  } else if (durationInDays > 0) {
    return `Durasi: ${durationInDays} hari`;
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
