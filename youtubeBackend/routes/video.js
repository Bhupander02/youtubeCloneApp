// routes/video.js
import express from 'express';
import { createVideo, getAllVideos, getVideoById, updateVideo, deleteVideo } from '../controllers/videoController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// PUBLIC ROUTES (Anyone can view videos)
router.get('/', getAllVideos);
router.get('/:id', getVideoById);

// PROTECTED ROUTES (Requires a valid JWT token)
router.post('/', verifyToken, createVideo);
router.put('/:id', verifyToken, updateVideo);
router.delete('/:id', verifyToken, deleteVideo);

export default router;