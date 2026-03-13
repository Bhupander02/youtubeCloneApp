// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: "https://example.com/avatar/default.png" // Default avatar
  },
  channels: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Channel'
  }]
}, { timestamps: true });

export default mongoose.model('User', userSchema);