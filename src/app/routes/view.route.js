import express from "express";
const router = express.Router();

import fs from "fs";
import multer from "multer";
import path from "path";

// view router
router.get("/", (req, res) => {
  // const indexPath = path.join(__dirname, 'index');
  // fs.readFileSync(path.resolve(indexPath));
  const filePath = path.resolve("./src/views/index.html");
  const htmlContent = fs.readFileSync(filePath, "utf-8");
  res.send(htmlContent);
});

router.get("/write", (req, res) => {
  const filePath = path.resolve("./src/views/write.html");
  const htmlContent = fs.readFileSync(filePath, "utf-8");
  res.send(htmlContent);
});


// 파일 업로드 (DataBase)
router.get("/profile", (req, res) => {

  const filePath = path.resolve("./src/views/file.html");
  const htmlFile = fs.readFileSync(filePath, "utf-8"); 
  res.send(htmlFile);
});

/*
  하드디스크에 저장
  (1) 기본페이지
  (2) 디테일페이지
*/

router.get("/store-data", (req, res) => {
  const filePath = path.resolve("./src/data/data.json");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const fileData = JSON.parse(fileContent);

  let addHtmlTag = "<ul>";

  for (const storeData of fileData) {
    addHtmlTag += `
    <li>
      <a href='/store-data/${storeData.id}'>${storeData.data}</a>
    </li>`;
  }

  addHtmlTag += "</ul>";

  res.send(addHtmlTag);
});

router.get("/store-data/:detailId", (req, res) => {
  const detailId = req.params.detailId;

  try {
    const filePath = path.resolve("./src/data/data.json");
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const fileData = JSON.parse(fileContent);

    const detailData = fileData.filter((v) => v.id === detailId);

    const htmlTag = `
      <h1>${detailData[0].data} 디테일 페이지 입니다!</h1>
    `;  
    res.send(htmlTag);
  } catch (err) {
    console.log("err: ", err);
  }
});

// 파일 업로드 (하드디스크)
router.get("/store-file", (req, res) => {
  res.send(
    '<form action="/api/store-file/post" method="post"><input type="text" name="data"/><button>json파일에 저장</button></form>'
  );
});

export default router;
