const express = require("express");
const fileupload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const excelToJson = require("convert-excel-to-json");
const fs = require("fs");
const path = require("path");
const DB = require("./db");
const User = require("./insertExdata");
const { default: mongoose } = require("mongoose");
DB();

const app = express();
app.use(cors());
app.use(fileupload());
app.use(express.static("files"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/upload", async (req, res) => {
  try {
    const newpath = __dirname + "/excelData/";
    const file = req.files.file;
    const filename = file.name;
    const exData = excelToJson({
      sourceFile: newpath + filename,
    });
    const js = JSON.stringify(exData);
    const data = new User({ list: js, fileName: filename });
    await data.save();
    console.log("JSON file has been saved.");
    mongoose.connection.close();
    res.status(200).send({ message: "File Uploaded", code: 200 });
  } catch (error) {
    res.status(500).send({ message: "File upload failed", code: 200 });
  }

  // file.mv(`${newpath}${filename}`, async (err) => {
  //   if (err) {
  //     res.status(500).send({ message: "File upload failed", code: 200 });
  //   }

  //   fs.writeFile("output.json", js, "utf8", function (err) {
  //     if (err) {
  //       console.log("An error occured.");
  //       return console.log(err);
  //     }
  //     console.log("JSON file has been saved.");
  //   });
  // res.status(200).send({ message: "File Uploaded", code: 200 });
  // });
});

app.get("/getExData", (req, res) => {
  User.findOne()
    .then((data) => {
      res.status(200).send({ message: "File Uploaded", data, code: 200 });
    })
    .catch(() => {
      res.status(500).send({ message: "somthing is wrong" });
    });
});
app.listen(5000, () => {
  console.log("Server running successfully on 5000");
});
