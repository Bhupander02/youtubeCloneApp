// routes/channel.js
import express from 'express';
import { createChannel, getChannel } from '../controllers/channelController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET a channel's info (Public - anyone can view a channel)
router.get('/:id', getChannel);

// POST create a channel (Protected - must be logged in)
router.post('/', verifyToken, createChannel);

export default router;