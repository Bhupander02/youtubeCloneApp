// src/pages/VideoPlayer.jsx
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function VideoPlayer() {
  const { videoId } = useParams(); // Gets the video ID from the URL

  // Placeholder video data
  const videoData = {
    title: "Learn React in 30 Minutes",
    description: "A quick tutorial to get started with React.",
    channelName: "Code with John",
    views: 15200,
    uploadDate: "2024-09-20",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" // Sample valid video URL
  };

  // State for Likes/Dislikes
  const [likes, setLikes] = useState(1023);
  const [dislikes, setDislikes] = useState(45);
  const [userAction, setUserAction] = useState(null); // 'like', 'dislike', or null

  // State for Comments
  const [comments, setComments] = useState([
    { id: "comment01", user: "user02", text: "Great video! Very helpful.", timestamp: "1 day ago" }
  ]);
  const [newComment, setNewComment] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  // Handle Like/Dislike logic
  const handleLike = () => {
    if (userAction === 'like') {
      setLikes(likes - 1);
      setUserAction(null);
    } else {
      setLikes(userAction === 'dislike' ? likes + 1 : likes + 1);
      if (userAction === 'dislike') setDislikes(dislikes - 1);
      setUserAction('like');
    }
  };

  const handleDislike = () => {
    if (userAction === 'dislike') {
      setDislikes(dislikes - 1);
      setUserAction(null);
    } else {
      setDislikes(userAction === 'like' ? dislikes + 1 : dislikes + 1);
      if (userAction === 'like') setLikes(likes - 1);
      setUserAction('dislike');
    }
  };

  // Handle Comment CRUD
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const newEntry = {
      id: Date.now().toString(),
      user: "CurrentUser", // Mock logged-in user
      text: newComment,
      timestamp: "Just now"
    };
    setComments([newEntry, ...comments]);
    setNewComment('');
  };

  const handleDeleteComment = (id) => {
    setComments(comments.filter(c => c.id !== id));
  };

  const startEditing = (comment) => {
    setEditingId(comment.id);
    setEditText(comment.text);
  };

  const saveEdit = (id) => {
    setComments(comments.map(c => c.id === id ? { ...c, text: editText } : c));
    setEditingId(null);
  };

  return (
    <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 pb-8">
      
      {/* Left Column: Video & Details */}
      <div className="col-span-1 lg:col-span-2">
        {/* Video Player */}
        <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
          <video controls className="w-full h-full" src={videoData.videoUrl}></video>
        </div>

        {/* Video Info */}
        <div className="mt-4">
          <h1 className="text-xl font-bold">{videoData.title}</h1>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3 gap-4">
            {/* Channel Info */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                {videoData.channelName.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold">{videoData.channelName}</h3>
                <p className="text-xs text-gray-500">5.2K subscribers</p>
              </div>
              <button className="ml-4 bg-black text-white px-4 py-2 rounded-full font-medium text-sm hover:bg-gray-800">
                Subscribe
              </button>
            </div>

            {/* Actions: Like/Dislike */}
            <div className="flex items-center bg-gray-100 rounded-full">
              <button onClick={handleLike} className={`flex items-center gap-2 px-4 py-2 rounded-l-full hover:bg-gray-200 border-r border-gray-300 ${userAction === 'like' ? 'text-blue-600' : ''}`}>
                👍 {likes}
              </button>
              <button onClick={handleDislike} className={`flex items-center gap-2 px-4 py-2 rounded-r-full hover:bg-gray-200 ${userAction === 'dislike' ? 'text-blue-600' : ''}`}>
                👎 {dislikes}
              </button>
            </div>
          </div>

          {/* Description Box */}
          <div className="mt-4 bg-gray-100 p-4 rounded-xl text-sm">
            <p className="font-semibold">{videoData.views.toLocaleString()} views • {videoData.uploadDate}</p>
            <p className="mt-2 whitespace-pre-wrap">{videoData.description}</p>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-4">{comments.length} Comments</h2>
          
          {/* Add Comment */}
          <form onSubmit={handleAddComment} className="flex gap-4 mb-8">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>
            <div className="flex-1">
              <input 
                type="text" 
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..." 
                className="w-full border-b border-gray-300 bg-transparent focus:outline-none focus:border-black pb-1"
              />
              {newComment && (
                <div className="flex justify-end mt-2 gap-2">
                  <button type="button" onClick={() => setNewComment('')} className="px-3 py-1.5 hover:bg-gray-100 rounded-full text-sm font-medium">Cancel</button>
                  <button type="submit" className="px-3 py-1.5 bg-blue-600 text-white rounded-full text-sm font-medium">Comment</button>
                </div>
              )}
            </div>
          </form>

          {/* Comment List */}
          <div className="flex flex-col gap-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-4 group">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 flex-shrink-0">
                  {comment.user.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">@{comment.user}</span>
                    <span className="text-xs text-gray-500">{comment.timestamp}</span>
                  </div>
                  
                  {editingId === comment.id ? (
                    <div className="mt-1">
                      <input 
                        type="text" 
                        value={editText} 
                        onChange={(e) => setEditText(e.target.value)} 
                        className="w-full border-b border-black focus:outline-none text-sm pb-1"
                      />
                      <div className="flex gap-2 mt-2">
                        <button onClick={() => saveEdit(comment.id)} className="text-xs bg-blue-600 text-white px-2 py-1 rounded">Save</button>
                        <button onClick={() => setEditingId(null)} className="text-xs hover:bg-gray-100 px-2 py-1 rounded">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm mt-1">{comment.text}</p>
                  )}

                  {/* Edit/Delete Actions (visible on hover) */}
                  {comment.user === "CurrentUser" && editingId !== comment.id && (
                    <div className="flex gap-3 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => startEditing(comment)} className="text-xs text-gray-500 hover:text-black">Edit</button>
                      <button onClick={() => handleDeleteComment(comment.id)} className="text-xs text-red-500 hover:text-red-700">Delete</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Suggested Videos (Placeholder for layout) */}
      <div className="col-span-1 hidden lg:flex flex-col gap-3">
        <h3 className="font-bold mb-2">Up next</h3>
        {[1, 2, 3, 4].map(item => (
          <div key={item} className="flex gap-2 cursor-pointer">
            <div className="w-40 h-24 bg-gray-200 rounded-lg flex-shrink-0"></div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm line-clamp-2">Another React Video Tutorial</span>
              <span className="text-xs text-gray-500 mt-1">Code with John</span>
              <span className="text-xs text-gray-500">10K views</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}