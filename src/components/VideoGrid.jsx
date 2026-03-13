// src/components/VideoGrid.jsx
export default function VideoGrid() {
  // Sample categories for the filter buttons
  const categories = ["All", "Music", "React", "JavaScript", "Live", "Gaming", "News", "Podcasts"];

  // Sample data provided in the rubric
  const sampleVideos = [
    {
      videoId: "video01",
      title: "Learn React in 30 Minutes",
      thumbnailUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format&fit=crop&q=60", // Replaced with a real image for visual testing
      channelName: "user01", // Representing the uploader/channel name
      views: 15200,
      uploadDate: "2024-09-20"
    },
    // Adding a dummy second video so you can see the grid effect
    {
      videoId: "video02",
      title: "MERN Stack Full Course",
      thumbnailUrl: "https://images.unsplash.com/photo-1618477247222-ac60c747098a?w=500&auto=format&fit=crop&q=60",
      channelName: "Code Mastery",
      views: 89000,
      uploadDate: "2024-10-01"
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Filter Buttons */}
      <div className="flex gap-3 overflow-x-auto pb-2 sticky top-0 bg-gray-50 z-10 py-2 no-scrollbar">
        {categories.map((category, index) => (
          <button 
            key={index} 
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
              ${index === 0 ? 'bg-black text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sampleVideos.map((video) => (
          <div key={video.videoId} className="flex flex-col gap-2 cursor-pointer group">
            {/* Thumbnail */}
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <img 
                src={video.thumbnailUrl} 
                alt={video.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            
            {/* Video Info */}
            <div className="flex gap-3 pr-6">
              {/* Channel Avatar Placeholder */}
              <div className="w-9 h-9 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                {video.channelName.charAt(0).toUpperCase()}
              </div>
              
              <div className="flex flex-col">
                <h3 className="font-semibold text-gray-900 line-clamp-2">{video.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{video.channelName}</p>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <span>{(video.views / 1000).toFixed(1)}K views</span>
                  <span className="text-[10px]">•</span>
                  <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}