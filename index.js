const express = require("express");
const app = express();
const PORT = 5000;
const path = require("path");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const upload = require("./src/middlewares/uploadFiles");

// Sequelize init
const config = require("./src/config/config.json");
const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = new Sequelize(config.development);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

// Asset Files
app.use(express.static(path.join(__dirname, "src/assets")));
app.use(express.static(path.join(__dirname, "src/uploads")));
app.use(express.urlencoded({ extended: false }));

// Flash setup
app.use(flash());

// Cookies Setup
app.use(
  session({
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 2,
    },
    store: new session.MemoryStore(),
    saveUninitialized: true,
    resave: false,
    secret: "secretValue",
  })
);

app.get("/", async (req, res) => {
  try {
    const userId = req.session.userId;
    const isLogin = req.session.isLogin;
    let query;
    if (!isLogin) {
      query = `
        SELECT c.id, c.user_id, project_name, u.name, start_date, end_date, description, technologies, input_img, durasi, c."createdAt", c."updatedAt"
        FROM content_blogs AS c
        LEFT JOIN users AS u
          ON c.user_id = u.id
        ORDER BY c.id DESC
        `;
    } else {
      query = `
        SELECT c.id, c.user_id, project_name, u.name, start_date, end_date, description, technologies, input_img, durasi, c."createdAt", c."updatedAt"
        FROM content_blogs AS c
        LEFT JOIN users AS u
          ON c.user_id = u.id
        WHERE c.user_id = ${userId}
        ORDER BY c.id DESC
      `;
    }
    let obj = await sequelize.query(query, { type: QueryTypes.SELECT });
    const data = obj.map((res) => ({
      ...res,
      isLogin: req.session.isLogin,
    }));

    res.render("index", {
      contentBlog: data,
      isLogin: req.session.isLogin,
      user: req.session.user,
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/form-blog", (req, res) => {
  res.render("form-blog", { userName: req.session.user });
});

app.post("/form-blog", upload.single("inputImg"), async (req, res) => {
  try {
    const {
      projectName,
      startDate,
      endDate,
      description,
      inputNodejs,
      inputReactjs,
      inputVuejs,
      inputJavascript,
    } = req.body;
    const { userId } = req.session;
    const inputImg = req.file.filename;

    const selectedValues = [];
    if (inputNodejs) selectedValues.push('"nodejs"');
    if (inputReactjs) selectedValues.push('"reactjs"');
    if (inputVuejs) selectedValues.push('"vuejs"');
    if (inputJavascript) selectedValues.push('"javascript"');

    const durasi = getDurasi(startDate, endDate);
    await sequelize.query(
      `INSERT INTO content_blogs(user_id, project_name, start_date, end_date, description, technologies, input_img, durasi, "createdAt", "updatedAt")
       VALUES ('${userId}', '${projectName}', '${startDate}', '${endDate}', '${description}', '[${selectedValues}]', '${inputImg}', '${durasi}', NOW(), NOW());`
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
    res.render("edit-blog", { data: obj[0], userName: req.session.user });
  } catch (error) {
    console.log(error);
  }
});

app.post("/edit-blog/:id", upload.single("inputImg"), async (req, res) => {
  try {
    const {
      ids,
      projectName,
      startDate,
      endDate,
      description,
      inputNodejs,
      inputReactjs,
      inputVuejs,
      inputJavascript,
    } = req.body;
    const inputImg = req.file.filename;

    const selectedValues = [];
    if (inputNodejs) selectedValues.push('"nodejs"');
    if (inputReactjs) selectedValues.push('"reactjs"');
    if (inputVuejs) selectedValues.push('"vuejs"');
    if (inputJavascript) selectedValues.push('"javascript"');

    const durasi = getDurasi(startDate, endDate);
    await sequelize.query(
      `UPDATE content_blogs
      SET project_name = '${projectName}', start_date = '${startDate}', end_date = '${endDate}', description = '${description}', technologies = '[${selectedValues}]', input_img = '${inputImg}', durasi = '${durasi}', "updatedAt" = '${getFullTime(
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
  // const query = `SELECT * FROM content_blogs WHERE id=${id};`;
  const query = `
    SELECT c.id, c.user_id, project_name, u.name, start_date, end_date, description, technologies, input_img, durasi, c."createdAt", c."updatedAt"
    FROM content_blogs AS c
    LEFT JOIN users AS u
      ON c.user_id = u.id
    WHERE c.id = ${id}
    ORDER BY c.id DESC
  `;
  let obj = await sequelize.query(query, { type: QueryTypes.SELECT });
  res.render("blog-content", { contentBlog: obj[0] });
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

app.get("/register", (req, res) => {
  res.render("form-register");
});

app.post("/register", async (req, res) => {
  try {
    const { inputName, inputEmail, inputPassword } = req.body;
    const salt = 10;
    await bcrypt.hash(inputPassword, salt, (error, hashPassword) => {
      const query = `INSERT INTO users(
        name, email, password, "createdAt", "updatedAt")
        VALUES ('${inputName}', '${inputEmail}', '${hashPassword}', NOW(), NOW());`;
      sequelize.query(query);
      res.redirect("/login");
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/login", (req, res) => {
  res.render("form-login");
});

app.post("/login", async (req, res) => {
  try {
    const { inputEmail, inputPassword } = req.body;
    const query = `SELECT * FROM users WHERE email = '${inputEmail}'`;
    let obj = await sequelize.query(query, { type: QueryTypes.SELECT });
    // console.log(obj);
    if (!obj.length) {
      req.flash("warning", "You're not registered yet.");
      return res.redirect("/login");
    }

    await bcrypt.compare(inputPassword, obj[0].password, (error, result) => {
      if (!result) {
        req.flash("danger", "Invalid email or password!");
        return res.redirect("/login");
      } else {
        req.session.isLogin = true;
        req.session.userId = obj[0].id;
        req.session.user = obj[0].name;
        req.flash("success", "Log in success!");
        res.redirect("/");
      }
    });
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
