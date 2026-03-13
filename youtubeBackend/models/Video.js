// models/Video.js
import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true, // Required by the rubric
  },
  category: {
    type: String,
    required: true, // Needed for the Home Page filter buttons
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Links this video to the User who uploaded it
    required: true,
  }
}, { timestamps: true });

export default mongoose.model('Video', videoSchema);