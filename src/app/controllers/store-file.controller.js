import { v4 as uuidv4 } from "uuid";
import path from 'path';
import fs from 'fs'

class StoreFileController {

  postFile = (req, res) => {

    try {
      const data = req.body.data;

      const filePath = path.resolve("./src/data/data.json");
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const fileData = JSON.parse(fileContent);
    
      fileData.push({ id: uuidv4(), data });
    
      fs.writeFileSync(filePath, JSON.stringify(fileData));
      res.redirect('/store-file');
    } catch(err) {
      console.log('err: ', err);
    };
  }
};

export default new StoreFileController();
  
