import { client } from "../../resources/postgreSQL.js";

class TodoModel {

  getDB = async() => {
    const query = `
      SELECT * FROM todolist
        ORDER BY created
    `;
    const data = await client.query(query);
    const result = data.rows;
    
    return result;
  }

  postDB = async(req) => {
    const query = `
      INSERT 
        INTO todolist 
          (todo, due, created)
        VALUES 
          ('${req.body.todo}', '${req.body.due}', CURRENT_TIMESTAMP)`;
    
    await client.query(query);
    const result = true;

    return result;
  }

  deleteDB = async(req) => {
    const query = `
      DELETE FROM todolist 
        WHERE id = ${req.body.id}`;
    
    await client.query(query);
    const result = true;

    return result;
  }
}

export default new TodoModel();