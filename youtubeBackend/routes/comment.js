// routes/comment.js
import express from 'express';
import { addComment, getCommentsByVideo, updateComment, deleteComment } from '../controllers/commentController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all comments for a video (Public)
router.get('/:videoId', getCommentsByVideo);

// Protected routes (Require login)
router.post('/', verifyToken, addComment);
router.put('/:id', verifyToken, updateComment);
router.delete('/:id', verifyToken, deleteComment);

export default router;