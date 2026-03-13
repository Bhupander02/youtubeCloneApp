// controllers/videoController.js
import Video from '../models/Video.js';

// CREATE a new video
export const createVideo = async (req, res) => {
  try {
    // We will get the uploader's ID from the JWT token later
    const { title, description, thumbnailUrl, videoUrl, category, uploaderId } = req.body;

    const newVideo = new Video({
      title,
      description,
      thumbnailUrl,
      videoUrl,
      category,
      uploader: uploaderId 
    });

    const savedVideo = await newVideo.save();
    res.status(201).json(savedVideo);
  } catch (error) {
    console.error("Error creating video:", error);
    res.status(500).json({ message: "Failed to create video" });
  }
};

// READ (Get all videos for the Home Page)
export const getAllVideos = async (req, res) => {
  try {
    // Populate replaces the 'uploader' ID with the actual user's name and avatar
    const videos = await Video.find().populate('uploader', 'username avatar');
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch videos" });
  }
};

// READ (Get a single video for the Video Player Page)
export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate('uploader', 'username avatar');
    if (!video) return res.status(404).json({ message: "Video not found" });
    
    // Increment views when a video is fetched
    video.views += 1;
    await video.save();

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch video" });
  }
};

// UPDATE a video
export const updateVideo = async (req, res) => {
  try {
    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id, 
      { $set: req.body }, 
      { new: true }
    );
    res.status(200).json(updatedVideo);
  } catch (error) {
    res.status(500).json({ message: "Failed to update video" });
  }
};

// DELETE a video
export const deleteVideo = async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete video" });
  }
};