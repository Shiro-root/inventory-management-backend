import { newCategory, readAllCategory, readCategory, updateCategory, deleteCategory } from '../controllers/categoryController.js'
import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();
router.post('/', newCategory);
router.get('/', readAllCategory);
router.get('/:id', readCategory);
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)

export default router;
