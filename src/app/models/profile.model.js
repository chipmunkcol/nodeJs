import { client } from "../../resources/postgreSQL.js";

class ProfileModel {

  getDB = async() => {

    try {

      const query = `
      SELECT name, filename, filepath FROM test_profile; 
      `;
      const getDB = await client.query(query);

      return getDB.rows;
    } catch {

      return false;
    }
  }

  postDB = async(req, res) => {
    try {
      const filePath = req.file.destination;
      const fileName = req.file.filename;
      const name = req.body.name;

      const query = `
          INSERT
            INTO test_profile
              (name, filename, filepath, created)
            VALUES
              ('${name}', '${fileName}', '${filePath}', CURRENT_TIMESTAMP);
          `;
        
      await client.query(query);

      return true;
    } catch {

      return false;
    }
  }
};

export default new ProfileModel();
