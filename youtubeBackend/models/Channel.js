// models/Channel.js
import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema({
  channelName: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  description: {
    type: String,
    default: "Welcome to my channel!",
  },
  channelBanner: {
    type: String,
    default: "https://example.com/banners/default_banner.png",
  },
  subscribers: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

export default mongoose.model('Channel', channelSchema);