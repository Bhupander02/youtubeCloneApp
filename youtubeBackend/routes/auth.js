import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// Route for User Registration (POST /api/auth/register)
router.post('/register', register);

// Route for User Login (POST /api/auth/login)
router.post('/login', login);

export default router;