import { v4 as uuidv4 } from "uuid";

class StoreFileController {

  postFile = (req, res) => {
    const data = req.body.data;

    const filePath = path.resolve("./src/data/data.json");
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const fileData = JSON.parse(fileContent);
  
    fileData.push({ id: uuidv4(), data });
  
    fs.writeFileSync(filePath, JSON.stringify(fileData));
  
    res.redirect("/store-data");
  }
};

export default new StoreFileController();
  
