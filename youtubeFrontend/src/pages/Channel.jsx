// src/pages/Channel.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Channel() {
  const { channelId } = useParams(); // Grabs ID from URL: /channel/123
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        // 1. Get Channel User Details
        const userRes = await axios.get(`http://localhost:5000/api/users/find/${channelId}`);
        setChannel(userRes.data);

        // 2. Get all videos uploaded by this specific channel/user
        const videoRes = await axios.get(`http://localhost:5000/api/videos/user/${channelId}`);
        setVideos(videoRes.data);
      } catch (err) {
        console.error("Error fetching channel data", err);
      }
    };
    fetchChannelData();
  }, [channelId]);

  if (!channel) return <div className="p-8">Loading channel...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Channel Header Section */}
      <div className="flex items-center gap-6 mb-8 border-b pb-8">
        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-4xl font-bold text-white">
          {channel.username[0].toUpperCase()}
        </div>
        <div>
          <h1 className="text-3xl font-bold">{channel.username}</h1>
          <p className="text-gray-600">@{channel.username.toLowerCase()} • {channel.subscribers || 0} subscribers</p>
          <button className="mt-4 bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800">
            Subscribe
          </button>
        </div>
      </div>

      {/* Videos Grid */}
      <h2 className="text-xl font-bold mb-4">Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div key={video._id} className="cursor-pointer group">
              <img src={video.thumbnailUrl} className="rounded-xl w-full aspect-video object-cover" alt="" />
              <h3 className="font-bold mt-2 group-hover:text-blue-600">{video.title}</h3>
              <p className="text-sm text-gray-600">{video.views} views</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">This channel hasn't uploaded any videos yet.</p>
        )}
      </div>
    </div>
  );
}