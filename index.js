const express = require("express");
const app = express();
const PORT = 5000;
const path = require("path");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

// Asset Files
app.use(express.static(path.join(__dirname, "src/assets")));
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
  const id = req.params.id;
  const data = {
    id,
    title: "Kenali Ponsel Kentang Sejak Dini",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi beatae doloribus tempora dolore, veritatis laudantium quos quae totam libero hic nesciunt vero tenetur sint voluptas similique enim accusantium. Libero repellendus perspiciatis incidunt ipsum, quae, officia odit laborum ab aut ducimus eligendi deleniti sequi doloremque repellat eos facilis facere aliquid. Incidunt recusandae fugiat quas. Quisquam minus similique tempore, illo beatae rem sapiente? Adipisci rerum fugiat tempora corporis maiores! Architecto delectus perspiciatis quos tempore quisquam. Asperiores nulla repudiandae ad sint distinctio iste libero ipsa assumenda, illo iure rerum a id maxime nisi nemo tempore tempora, quisquam ullam, eveniet fugiat. Doloribus magni earum quasi impedit exercitationem possimus sunt, veritatis accusamus excepturi corrupti unde, omnis ullam enim voluptas est, saepe iste! Corporis consectetur nostrum nulla aut distinctio impedit! Ut perferendis repudiandae architecto culpa repellendus! Minima quia, quo dolor quam reprehenderit sint sit ullam nulla dolorem sequi molestias accusamus excepturi, consequatur dolorum? Qui ipsa distinctio veritatis vero est eaque dolore animi explicabo possimus deserunt, ratione aut delectus, at modi ab illum pariatur sint vitae? Quia, repellendus quo. Velit fugiat dolorum quibusdam eius fugit architecto excepturi officiis pariatur, aut nulla esse ipsum, nisi voluptatum non necessitatibus quas tempore! Laborum eaque perspiciatis et sed autem fugiat commodi?",
  };

  res.render("blog-content", { data });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
