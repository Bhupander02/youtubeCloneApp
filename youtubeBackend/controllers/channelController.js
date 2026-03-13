// controllers/channelController.js
import Channel from '../models/Channel.js';
import User from '../models/User.js';

// CREATE a new channel
export const createChannel = async (req, res) => {
  try {
    const { channelName, description, channelBanner } = req.body;
    const userId = req.user.id; // We get this from your JWT verifyToken middleware

    // 1. Create the channel
    const newChannel = new Channel({
      channelName,
      description,
      channelBanner,
      owner: userId
    });
    
    const savedChannel = await newChannel.save();

    // 2. Add the channel to the User's "channels" array
    await User.findByIdAndUpdate(userId, {
      $push: { channels: savedChannel._id }
    });

    res.status(201).json(savedChannel);
  } catch (error) {
    console.error("Error creating channel:", error);
    res.status(500).json({ message: "Failed to create channel" });
  }
};

// READ channel details
export const getChannel = async (req, res) => {
  try {
    // Fetch the channel and populate the owner's username and avatar
    const channel = await Channel.findById(req.params.id).populate('owner', 'username avatar');
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }
    
    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch channel information" });
  }
};