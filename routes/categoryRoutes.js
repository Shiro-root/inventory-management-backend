import { newCategory, readAllCategory, readCategory, updateCategory, deleteCategory } from '../controllers/categoryController.js'
import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();
router.post('/',verifyToken, newCategory);
router.get('/',verifyToken, readAllCategory);
router.get('/:id',verifyToken, readCategory);
router.put('/:id', verifyToken, updateCategory)
router.delete('/:id',verifyToken, deleteCategory)

export default router;
