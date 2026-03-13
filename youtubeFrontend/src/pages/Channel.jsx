// src/pages/Channel.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CreateChannelModal from "../components/CreateChannelModal";

export default function Channel({ currentUser }) {
  const { channelId } = useParams();
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/channels/${channelId}`,
        );
        setChannel(res.data);
        setNotFound(false);

        const videoRes = await axios.get(
          `http://localhost:5000/api/videos/user/${channelId}`,
        );
        setVideos(videoRes.data);
      } catch (err) {
        if (err.response?.status === 404) {
          setNotFound(true);
        }
      }
    };
    fetchChannelData();
  }, [channelId]);

  if (notFound) {
    return (
      <CreateChannelModal
        currentUser={currentUser}
        setChannel={setChannel}
        setNotFound={setNotFound}
      />
    );
  }

  if (!channel) return <div className="p-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center gap-6 mb-8 border-b pb-8">
        <div className="w-24 h-24 rounded-full bg-purple-600 flex items-center justify-center text-4xl font-bold text-white">
          {channel.channelName?.[0].toUpperCase() || "C"}
        </div>
        <div>
          <h1 className="text-3xl font-bold">{channel.channelName}</h1>
          <p className="text-gray-600">{channel.description}</p>
        </div>
      </div>

      {/* Videos List */}
      <h2 className="text-xl font-bold mb-4">Uploads</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.length > 0 ? (
          videos.map((v) => (
            <div key={v._id} className="cursor-pointer group">
              <img
                src={v.thumbnailUrl}
                className="rounded-xl w-full aspect-video object-cover"
                alt={v.title}
              />
              <h3 className="font-bold mt-2 group-hover:text-blue-600">
                {v.title}
              </h3>
              <p className="text-sm text-gray-500">{v.views || 0} views</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic col-span-full">
            No videos uploaded yet.
          </p>
        )}
      </div>
    </div>
  );
}
