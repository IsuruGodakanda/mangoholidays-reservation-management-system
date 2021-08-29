import express from 'express';
const router = express.Router();

import { validRegister, validLogin } from '../middleware/validationMiddleware.js';

//Load Controllers

import { registerGuest, loginGuest } from '../controllers/authController.js';

router.post('/register', validRegister, registerGuest);

router.post('/', validLogin, loginGuest);

export default router;
