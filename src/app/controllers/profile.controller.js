
import profileModel from '../models/profile.model.js';
import fs from 'fs'
import path from 'path'

class ProfileController {

  getDB = async(req, res) => {
    const result = {};

    try {
      const getDB = await profileModel.getDB();
      if (getDB) {

        result.result = true;
        result.data = getDB;
      }; 
    } catch(err) {
      console.log('err: ', err);
      result.result = false;
    }

    res.send(result);
  }

  postDB = async(req, res) => {
    const result = {};
    
    try {
        const resultDB = await profileModel.postDB(req);
      
        if (resultDB) {
          res.redirect('/profile');
        };
    } catch(err) {
      console.log(err);
      result.result = false;
      
      res.send(result);
    }
  }
    
  deleteDB = async(req, res) => {
    const result = {};

    try {
      const resultDB = await profileModel.deleteDB(req);

      if (resultDB) {
        result.result = true;

      };

    } catch(err) {
      console.log('err: ', err);
      result.result = false;
    }
    
    res.send(result);
  }
};


export default new ProfileController();

