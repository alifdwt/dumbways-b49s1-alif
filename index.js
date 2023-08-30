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

app.get("/", async (req, res) => {
  try {
    const query = `SELECT * FROM content_blogs;`;
    let obj = await sequelize.query(query, { type: QueryTypes.SELECT });
    console.log(obj);

    res.render("index", { contentBlog: obj });
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
      inputNodejs,
      inputReactjs,
      inputVuejs,
      inputJavascript,
      inputImg,
    } = req.body;
    const selectedValues = [];
    if (inputNodejs) selectedValues.push('"nodejs"');
    if (inputReactjs) selectedValues.push('"reactjs"');
    if (inputVuejs) selectedValues.push('"vuejs"');
    if (inputJavascript) selectedValues.push('"javascript"');

    const durasi = getDurasi(startDate, endDate);
    await sequelize.query(
      `INSERT INTO content_blogs(project_name, author_name, start_date, end_date, description, technologies, input_img, durasi, "createdAt", "updatedAt") VALUES ('${projectName}', '${authorName}', '${startDate}', '${endDate}', '${description}', '[${selectedValues}]', '${inputImg}', '${durasi}', NOW(), NOW());`
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
    res.render("edit-blog", { data: obj[0] });
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
      inputNodejs,
      inputReactjs,
      inputVuejs,
      inputJavascript,
      inputImg,
    } = req.body;
    const selectedValues = [];
    if (inputNodejs) selectedValues.push('"nodejs"');
    if (inputReactjs) selectedValues.push('"reactjs"');
    if (inputVuejs) selectedValues.push('"vuejs"');
    if (inputJavascript) selectedValues.push('"javascript"');

    const durasi = getDurasi(startDate, endDate);
    await sequelize.query(
      `UPDATE content_blogs
      SET project_name = '${projectName}', author_name = '${authorName}', start_date = '${startDate}', end_date = '${endDate}', description = '${description}', technologies = '[${selectedValues}]', input_img = '${inputImg}', "updatedAt" = '${getFullTime(
        new Date()
      )}'
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
