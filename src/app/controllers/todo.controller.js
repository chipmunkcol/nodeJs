import todoModel from "../models/todo.model.js";

class TodoController {

  getDB = async(req, res) => {
    const result = {};

    try {
      const dbData = await todoModel.getDB();
      result.result = true;
      result.data = { dbData };
    } catch (err) {
      console.log('err: ', err);
      result.result = false;
    }

    res.send(result);
  }

  postDB = async(req, res) => {
    const result = {};

    try {
      const ModelResult = await todoModel.postDB(req);
      
      if (ModelResult) {
        res.redirect('/');
      }
    } catch (err) {
      console.log('err: ', err);
      result.result = false;
      
      res.send(result);
    }
  }

  deleteDB = async(req, res) => {
    const result = {};
    
    try {
      const modelResult = await todoModel.deleteDB(req);
      
      if (modelResult) {
        result.result = true;
      }
    } catch (err) {
      result.result= false;
    }
  
    res.send(result);
  }
}

export default new TodoController();