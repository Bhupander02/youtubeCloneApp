import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";

export default function Home() {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]); // Real video state
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All", "React", "JavaScript", "Web Development", "Data Structures", "Gaming", "Music", "Podcasts",
  ];

  // 1. Fetch videos from your Backend
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/videos");
        setVideos(res.data);
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };
    fetchVideos();
  }, []);

  // 2. Filter logic based on live data
  const filteredVideos =
    activeCategory === "All"
      ? videos
      : videos.filter((video) => video.category === activeCategory);

  const handleVideoClick = (videoId) => {
    navigate(`/video/${videoId}`);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Filter Buttons */}
      <div className="flex gap-3 overflow-x-auto pb-2 sticky top-0 bg-white z-10 py-2 no-scrollbar">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setActiveCategory(category)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
              ${
                activeCategory === category
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
        {filteredVideos.map((video) => (
          <div
            key={video._id} // Changed from videoId to _id for MongoDB
            onClick={() => handleVideoClick(video._id)}
            className="flex flex-col gap-2 cursor-pointer group"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-200">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>

            {/* Video Info */}
            <div className="flex gap-3 pr-2 mt-1">
              {/* Channel Avatar */}
              <div className="w-9 h-9 rounded-full bg-purple-600 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                {video.uploader?.username?.[0].toUpperCase() || "U"}
              </div>

              <div className="flex flex-col">
                <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm leading-tight">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {video.uploader?.username || "Unknown Channel"}
                </p>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <span>{video.views} views</span>
                  <span className="text-[10px]">•</span>
                  <span>{format(video.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredVideos.length === 0 && (
        <div className="col-span-full py-20 text-center flex flex-col items-center">
          <p className="text-gray-500 italic">No videos found for "{activeCategory}".</p>
          <button 
            onClick={() => setActiveCategory("All")}
            className="mt-4 text-blue-600 font-bold hover:underline"
          >
            See all videos
          </button>
        </div>
      )}
    </div>
  );
}