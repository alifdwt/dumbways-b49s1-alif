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
    inputNextjs: "on",
    inputTypescript: "on",
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
    inputNextjs: "on",
    inputTypescript: "",
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
    inputNextjs,
    inputTypescript,
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
    inputNextjs,
    inputTypescript,
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
  res.redirect("/");
});
contentBlog.forEach((blog) => {
  blog.durasi = getDurasi(blog.startDate, blog.endDate);
});
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
  // return durationInDays;
}
function getFullTime(time) {
  let monthName = [
    "January",
    "February",
    "March",
    "Apr",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let date = time.getDate();
  let monthIndex = time.getMonth();
  let year = time.getFullYear();
  let hours = time.getHours();
  let minutes = time.getMinutes();

  if (hours <= 9) {
    hours = "0" + hours;
  } else if (minutes <= 9) {
    minutes = "0" + minutes;
  }

  return `${date} ${monthName[monthIndex]} ${year} ${hours}:${minutes} WIB`;
}

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/blog-content/:id", (req, res) => {
  const id = req.params.id;

  res.render("blog-content", { data: contentBlog[id] });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// console.log(contentBlog);
// contentBlog.forEach((blog) => {
//   blog.durasi =
//     (new Date(blog.endDate).getTime() - new Date(blog.startDate).getTime()) /
//     86400000;
// });
