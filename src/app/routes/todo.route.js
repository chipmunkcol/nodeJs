import express from 'express';
const router = express.Router();

import todoController from "../controllers/todo.controller.js";

// todo CRUD router /api/todo
router.get('/getDB', todoController.getDB);

router.post('/postDB', todoController.postDB);

router.delete('/deleteDB', todoController.deleteDB);

export default router;