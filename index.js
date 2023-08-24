const express = require("express");
const app = express();
const PORT = 5000;
const path = require("path");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

// Asset Files
app.use(express.static("src/assets"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/form-blog", (req, res) => {
  res.render("form-blog");
});

app.post("/form-blog", (req, res) => {
  const {
    projectName,
    startDate,
    endDate,
    description,
    inputNodejs,
    inputReactjs,
    inputNextjs,
    inputTypescript,
  } = req.body;

  console.log("Project Name: ", projectName);
  console.log("Start Date: ", startDate);
  console.log("End Date: ", endDate);
  console.log("Description: ", description);
  console.log("Node JS: ", inputNodejs);
  console.log("React JS: ", inputReactjs);
  console.log("Next JS: ", inputNextjs);
  console.log("TypeScript: ", inputTypescript);

  res.redirect("/");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/blog-content/:id", (req, res) => {
  res.render("blog-content");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
