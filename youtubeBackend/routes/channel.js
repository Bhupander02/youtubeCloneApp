import express from 'express';
import { createChannel, getChannel } from '../controllers/channelController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// This line handles the GET request: http://localhost:5000/api/channels/:id
// The ':id' here is what your controller picks up as req.params.id
router.get('/:id', getChannel);

// This handles the POST request to create the channel
router.post('/', verifyToken, createChannel);

export default router;