import express from "express";
const router = express.Router();

import fs from "fs";
import path from "path";

// view router
// router.get("/", (req, res) => {
//   // const indexPath = path.join(__dirname, 'index');
//   // fs.readFileSync(path.resolve(indexPath));
//   const filePath = path.resolve("./src/views/index.html");
//   const htmlContent = fs.readFileSync(filePath, "utf-8");
//   res.send(htmlContent);
// });

router.get("/write", (req, res) => {
  const filePath = path.resolve("./src/views/write.html");
  const htmlContent = fs.readFileSync(filePath, "utf-8");
  res.send(htmlContent);
});

//test
router.get("/", (req, res) => {
  res.send(
    '<form action="/store" method="post"><input type="text" name="data"/><button>json파일에 저장</button></form>'
  );
});

router.get("/store-data", (req, res) => {
  const filePath = path.resolve("./src/data/data.json");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const fileData = JSON.parse(fileContent);

  let addHtmlTag = "<ul>";

  for (const storeData of fileData) {
    addHtmlTag += `<li>${storeData}</li>`;
  }

  addHtmlTag += "</ul>";

  res.send(addHtmlTag);
});

router.post("/store", (req, res) => {
  const data = req.body.data;

  const filePath = path.resolve("./src/data/data.json");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const fileData = JSON.parse(fileContent);

  fileData.push(data);

  fs.writeFileSync(filePath, JSON.stringify(fileData));

  res.redirect("/store-data");
});

export default router;
