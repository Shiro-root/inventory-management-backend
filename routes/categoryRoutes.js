import { newCategory, readAllCategory, readCategory } from '../controllers/categoryController.js'
import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();
router.post('/api/categories',verifyToken, newCategory);
router.get('/api/categories', verifyToken, readAllCategory);
router.get('/api/categories/:id', readCategory);
// router.put('/api/categories/:id')
// router.delete('/api/categories/:id')

export default router;
