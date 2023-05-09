import storeFileController from '../controllers/store-file.controller.js';

import express from 'express';
const router = express.Router();

// /api/store-file
router.post("/post", storeFileController.postFile);

export default router;