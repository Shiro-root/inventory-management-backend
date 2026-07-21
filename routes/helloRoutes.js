import express from "express";
import {handleHome, handleAbout, handleContact} from '../controllers/helloController.js';

const router = express.Router();

router.get('/', handleHome);
router.get('/about', handleAbout);
router.get ('/contact', handleContact);

export default router;