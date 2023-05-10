import express from 'express';
import multer from 'multer';
import profileController from '../controllers/profile.controller.js';
const router = express.Router();

// multer 환경설정
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storageConfig });


// Router 설정 /api/profile 
router.get('/getDB', profileController.getDB);
router.post('/postDB', upload.single('image'), profileController.postDB);
router.delete('/deleteDB', profileController.deleteDB);


export default router;
