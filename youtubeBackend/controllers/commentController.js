// controllers/commentController.js
import Comment from '../models/Comment.js';

// CREATE a comment
export const addComment = async (req, res) => {
  try {
    const { videoId, text } = req.body;
    // We get the userId from the JWT token middleware!
    const userId = req.user.id; 

    const newComment = new Comment({ videoId, userId, text });
    await newComment.save();

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Failed to add comment" });
  }
};

// READ comments for a specific video
export const getCommentsByVideo = async (req, res) => {
  try {
    // Find all comments for this video and populate the user's name and avatar
    const comments = await Comment.find({ videoId: req.params.videoId })
                                  .populate('userId', 'username avatar')
                                  .sort({ createdAt: -1 }); // Newest first
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch comments" });
  }
};

// UPDATE a comment
export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // Ensure the user updating the comment is the one who wrote it
    if (comment.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only update your own comments" });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $set: { text: req.body.text } },
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: "Failed to update comment" });
  }
};

// DELETE a comment
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // Ensure the user deleting the comment is the one who wrote it
    if (comment.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only delete your own comments" });
    }

    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete comment" });
  }
};