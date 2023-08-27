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
