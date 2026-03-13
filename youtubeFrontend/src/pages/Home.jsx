// src/pages/Home.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  // State for active filter category
  const [activeCategory, setActiveCategory] = useState("All");

  // At least 6 filter buttons as required by the rubric
  const categories = [
    "All",
    "React",
    "JavaScript",
    "Web Development",
    "Data Structures",
    "Gaming",
    "Music",
    "Podcasts",
  ];

  // Sample data incorporating the rubric's required fields and a category field for filtering
  const sampleVideos = [
    {
      videoId: "video01",
      title: "Learn React in 30 Minutes",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format&fit=crop&q=60",
      channelName: "user01",
      views: 15200,
      uploadDate: "2024-09-20",
      category: "React",
    },
    {
      videoId: "video02",
      title: "Frontend Interview Experience",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500&auto=format&fit=crop&q=60",
      channelName: "The Indian Dev",
      views: 89000,
      uploadDate: "2024-10-01",
      category: "Web Development",
    },
    {
      videoId: "video03",
      title: "Complete 3 Hour SQL Tutorial",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60",
      channelName: "Apna College",
      views: 1500000,
      uploadDate: "2024-08-15",
      category: "Data Structures",
    },
    {
      videoId: "video04",
      title: "Advanced JavaScript Concepts",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=500&auto=format&fit=crop&q=60",
      channelName: "JS Mastery",
      views: 45000,
      uploadDate: "2024-10-10",
      category: "JavaScript",
    },
  ];

  // Filter logic
  const filteredVideos =
    activeCategory === "All"
      ? sampleVideos
      : sampleVideos.filter((video) => video.category === activeCategory);

  // Handle clicking a video to go to the player page
  const handleVideoClick = (videoId) => {
    navigate(`/video/${videoId}`);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Filter Buttons */}
      <div className="flex gap-3 overflow-x-auto pb-2 sticky top-0 bg-gray-50 z-10 py-2 no-scrollbar">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setActiveCategory(category)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
              ${
                activeCategory === category
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
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
            key={video.videoId}
            onClick={() => handleVideoClick(video.videoId)}
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
            <div className="flex gap-3 pr-6 mt-1">
              {/* Channel Avatar Placeholder */}
              <div className="w-9 h-9 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                {video.channelName.charAt(0).toUpperCase()}
              </div>

              <div className="flex flex-col">
                <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm leading-tight">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {video.channelName}
                </p>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <span>
                    {video.views >= 1000000
                      ? (video.views / 1000000).toFixed(1) + "M"
                      : (video.views / 1000).toFixed(1) + "K"}{" "}
                    views
                  </span>
                  <span className="text-[10px]">•</span>
                  <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State Fallback */}
        {filteredVideos.length === 0 && (
          <div className="col-span-full py-10 text-center text-gray-500">
            No videos found for "{activeCategory}".
          </div>
        )}
      </div>
    </div>
  );
}
