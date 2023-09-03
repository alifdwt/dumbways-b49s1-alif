const multer = require("multer");

const store = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads");
    cb(null, "src/assets/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
  },
});

const upload = multer({
  storage: store,
});

module.exports = upload;
