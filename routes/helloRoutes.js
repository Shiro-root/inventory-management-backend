import express from "express";
import {handleHome, handleAbout, handleContact} from '../controllers/helloController.js';
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/', handleHome);
router.get('/about', handleAbout);
router.get ('/contact',verifyToken, handleContact);

export default router;