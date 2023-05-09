import viewRoute from '../routes/view.route.js'
import todoRoute from '../routes/todo.route.js'
import storeFileRoute from '../routes/store-file.route.js'
import profileRoute from '../routes/profile.route.js'
import express from 'express';

class Router {
  
  route = (app) => {
    try {
      app.use('/', viewRoute);
      app.use('/api/store-file', storeFileRoute);
      app.use('/api/todo', todoRoute);
      app.use('/api/profile', profileRoute);
      
      // app.use('/images', express.static('./src/images'));
      app.use((req, res) => { res.status(404).send('없는 주소입니다아아!!') });
    } catch(err) {
      console.log('err: ', err);
    }
  }
}

export default new Router();