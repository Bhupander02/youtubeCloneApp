import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";

export default function SearchResults() {
  const [videos, setVideos] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        // This assumes your backend has an endpoint like /api/videos/search?q=...
        const res = await axios.get(`http://localhost:5000/api/videos/search?q=${query}`);
        setVideos(res.data);
      } catch (err) {
        console.error("Search failed", err);
      }
    };
    if (query) fetchSearchResults();
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto p-4 flex flex-col gap-4">
      <h2 className="text-lg font-semibold mb-2">Search results for: <span className="italic">"{query}"</span></h2>
      
      {videos.map((video) => (
        <Link to={`/video/${video._id}`} key={video._id} className="flex flex-col sm:flex-row gap-4 hover:bg-gray-50 p-2 rounded-xl transition-colors">
          <img src={video.thumbnailUrl} className="w-full sm:w-72 aspect-video object-cover rounded-lg" alt="" />
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-bold line-clamp-2">{video.title}</h3>
            <p className="text-xs text-gray-500">{video.views} views • {format(video.createdAt)}</p>
            <div className="flex items-center gap-2 my-2">
               <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px] text-white font-bold">
                 {video.uploader?.username?.[0].toUpperCase()}
               </div>
               <span className="text-sm text-gray-600">{video.uploader?.username}</span>
            </div>
            <p className="text-sm text-gray-500 line-clamp-2">{video.description}</p>
          </div>
        </Link>
      ))}

      {videos.length === 0 && <div className="text-center py-20 text-gray-500">No videos found for your search.</div>}
    </div>
  );
}