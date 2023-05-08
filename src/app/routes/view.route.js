import express from "express";
const router = express.Router();

import fs from "fs";
import multer from "multer";
import path from "path";

import { v4 as uuidv4 } from "uuid";

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

router.post("/store", (req, res) => {
  const data = req.body.data;

  const filePath = path.resolve("./src/data/data.json");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const fileData = JSON.parse(fileContent);

  fileData.push({ id: uuidv4(), data });

  fs.writeFileSync(filePath, JSON.stringify(fileData));

  res.redirect("/store-data");
});

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

// 파일 업로드
router.get("/file", (req, res) => {

  const filePath = path.resolve("./src/views/fileUpload.html");
  const htmlFile = fs.readFileSync(filePath, "utf-8"); 
  res.send(htmlFile);
});

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './src/images');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storageConfig });

router.post('/store-file', upload.single('image'), (req, res) => {
  const uploadedFile = req.file;
  const data = req.body.name;

  console.log('uploadedFile: ', uploadedFile);
  console.log('data: ', data);

  res.send('콘솔!')
});

export default router;
