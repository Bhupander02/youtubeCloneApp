import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";

export default function VideoPlayer({ currentUser }) {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Fetch Video and Comments on Load
  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const videoRes = await axios.get(`http://localhost:5000/api/videos/${videoId}`);
        setVideo(videoRes.data);

        const commentRes = await axios.get(
          `http://localhost:5000/api/comments/${videoId}`,
        );
        setComments(commentRes.data);
      } catch (err) {
        console.error("Error loading video data:", err);
      }
    };
    fetchVideoData();
  }, [videoId]);

  // Handle Adding a Comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    if (!currentUser) return alert("Please sign in to comment");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/comments",
        { videoId, text: newComment },
        { headers: { Authorization: `Bearer ${currentUser.token}` } },
      );
      setComments([res.data, ...comments]);
      setNewComment("");
    } catch (err) {
      alert("Failed to post comment");
      console.log("VideoPlayer error: ", err);
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/comments/${id}`, {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      });
      setComments(comments.filter((c) => c._id !== id));
    } catch (err) {
      alert("You can only delete your own comments");
      console.log("VideoPlayer error: ", err);
    }
  };

  if (!video) return <div className="p-10 text-center">Loading video...</div>;

  return (
    <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 pb-12">
      {/* Left Column: Video & Details */}
      <div className="col-span-1 lg:col-span-2">
        <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
          <video
            controls
            autoPlay
            className="w-full h-full"
            src={video.videoUrl}
          ></video>
        </div>

        <div className="mt-4">
          <h1 className="text-xl font-bold line-clamp-2">{video.title}</h1>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-4">
            <div className="flex items-center gap-3">
              <Link to={`/channel/${video.uploader?._id}`}>
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-lg">
                  {video.uploader?.username?.[0].toUpperCase() || "U"}
                </div>
              </Link>
              <div>
                <h3 className="font-bold text-base">
                  {video.uploader?.username || "Unknown Creator"}
                </h3>
                <p className="text-xs text-gray-500">Subscribers hidden</p>
              </div>
              <button className="ml-4 bg-black text-white px-5 py-2 rounded-full font-medium text-sm hover:bg-gray-800 transition-colors">
                Subscribe
              </button>
            </div>

            <div className="flex items-center bg-gray-100 rounded-full p-1">
              <button className="flex items-center gap-2 px-4 py-1.5 hover:bg-gray-200 rounded-l-full border-r border-gray-300 transition-colors">
                👍 <span className="text-sm font-medium">Like</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-1.5 hover:bg-gray-200 rounded-r-full transition-colors">
                👎
              </button>
            </div>
          </div>

          <div className="mt-4 bg-gray-100 p-4 rounded-xl text-sm leading-relaxed">
            <p className="font-bold">
              {video.views} views • {format(video.createdAt)}
            </p>
            <p className="mt-2 whitespace-pre-wrap text-gray-800">
              {video.description}
            </p>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-6">{comments.length} Comments</h2>

          {currentUser ? (
            <form onSubmit={handleAddComment} className="flex gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                {currentUser.username[0].toUpperCase()}
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full border-b border-gray-300 bg-transparent focus:outline-none focus:border-black pb-2 transition-all"
                />
                {newComment && (
                  <div className="flex justify-end mt-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setNewComment("")}
                      className="px-4 py-2 hover:bg-gray-100 rounded-full text-sm font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-bold"
                    >
                      Comment
                    </button>
                  </div>
                )}
              </div>
            </form>
          ) : (
            <div className="mb-8 p-4 bg-blue-50 rounded-lg text-blue-700 text-sm font-medium italic">
              Please{" "}
              <Link to="/auth" className="underline font-bold">
                Sign In
              </Link>{" "}
              to join the conversation.
            </div>
          )}

          <div className="flex flex-col gap-6">
            {comments.map((comment) => (
              <div key={comment._id} className="flex gap-4 group">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 flex-shrink-0">
                  {comment.userId?.username?.[0].toUpperCase() || "U"}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm">
                      @{comment.userId?.username || "user"}
                    </span>
                    <span className="text-xs text-gray-500">
                      {format(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-800">{comment.text}</p>

                  {currentUser?.id === comment.userId?._id && (
                    <div className="flex gap-4 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-xs font-bold text-gray-500 hover:text-black">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className="text-xs font-bold text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Sidebar (Mock) */}
      <div className="hidden lg:block space-y-4">
        <h3 className="font-bold text-lg">Recommendations</h3>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex gap-2 group cursor-pointer">
            <div className="w-40 h-24 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-bold line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                Recommended Video {i}: Build a Full Stack App
              </p>
              <p className="text-xs text-gray-500 mt-1">Tech Channel</p>
              <p className="text-xs text-gray-500">1.2M views</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
