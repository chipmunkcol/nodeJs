import express from 'express';
const router = express.Router();

import fs from 'fs';
import path from 'path';

// import {} from '../../views/index.html'
// view router
router.get('/', (req, res) => { 
  
  // const indexPath = path.join(__dirname, 'index');
  // fs.readFileSync(path.resolve(indexPath));
  const filePath = path.resolve('./src/views/index.html');
  const htmlContent = fs.readFileSync(filePath, 'utf-8');
  res.send(htmlContent);
});

router.get('/write', (req, res) => {
  const filePath = path.resolve('./src/views/write.html');
  const htmlContent = fs.readFileSync(filePath, 'utf-8');
  res.send(htmlContent);
});

export default router;