import express, { Router } from 'express';
const router = express.Router();

import todoController from "../controllers/todo.controller.js";

// todo CRUD router
router.get('/getDB', todoController.getDB);

router.post('/postDB', todoController.postDB);

router.delete('/deleteDB', todoController.deleteDB);

export default router;