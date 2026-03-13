// src/pages/Channel.jsx
import { useState } from 'react';

export default function Channel() {
  // Mock Channel Data
  const channelData = {
    channelName: "Internshala",
    handle: "@internshalaOfficial",
    subscribers: "117K",
    videoCount: 802,
    description: "Welcome to official YouTube channel of Internshala...",
    avatar: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=150&h=150&fit=crop", // Placeholder avatar
    banner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=300&fit=crop" // Placeholder banner
  };

  // State for Videos (Mocking the database)
  const [videos, setVideos] = useState([
    {
      videoId: "v1",
      title: "INTERNSHIP EMAIL EXAMPLES FOR DIFFERENT ROLES",
      thumbnailUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60",
      views: 331,
      uploadDate: "2024-02-20",
      description: "4 Internship Email Templates..."
    }
  ]);

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVideoId, setEditingVideoId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    thumbnailUrl: '',
    description: '',
    videoUrl: ''
  });

  // Handle Form Inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Open Modal to Create
  const handleOpenCreate = () => {
    setEditingVideoId(null);
    setFormData({ title: '', thumbnailUrl: '', description: '', videoUrl: '' });
    setIsModalOpen(true);
  };

  // Open Modal to Edit
  const handleOpenEdit = (video) => {
    setEditingVideoId(video.videoId);
    setFormData({
      title: video.title,
      thumbnailUrl: video.thumbnailUrl,
      description: video.description || '',
      videoUrl: video.videoUrl || ''
    });
    setIsModalOpen(true);
  };

  // Create or Update Video
  const handleSaveVideo = (e) => {
    e.preventDefault();
    if (editingVideoId) {
      // Update existing
      setVideos(videos.map(v => v.videoId === editingVideoId ? { ...v, ...formData } : v));
    } else {
      // Create new
      const newVideo = {
        ...formData,
        videoId: Date.now().toString(),
        views: 0,
        uploadDate: new Date().toISOString().split('T')[0]
      };
      setVideos([newVideo, ...videos]);
    }
    setIsModalOpen(false);
  };

  // Delete Video
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      setVideos(videos.filter(v => v.videoId !== id));
    }
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto pb-10">
      
      {/* Channel Banner */}
      <div className="w-full h-32 sm:h-48 md:h-64 rounded-xl overflow-hidden mb-6">
        <img src={channelData.banner} alt="Channel Banner" className="w-full h-full object-cover" />
      </div>

      {/* Channel Info */}
      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center px-4 md:px-8 mb-8">
        <img 
          src={channelData.avatar} 
          alt={channelData.channelName} 
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover shadow-sm"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{channelData.channelName}</h1>
          <div className="text-gray-600 text-sm mt-1 flex flex-wrap gap-2 items-center">
            <span className="font-medium text-gray-800">{channelData.handle}</span>
            <span>•</span>
            <span>{channelData.subscribers} subscribers</span>
            <span>•</span>
            <span>{videos.length} videos</span>
          </div>
          <p className="text-gray-600 text-sm mt-2 max-w-2xl line-clamp-2">{channelData.description}</p>
        </div>
        
        {/* Manage Videos Button */}
        <button 
          onClick={handleOpenCreate}
          className="bg-black text-white px-6 py-2.5 rounded-full font-medium hover:bg-gray-800 transition-colors"
        >
          Manage Videos
        </button>
      </div>

      {/* Navigation Tabs (UI only) */}
      <div className="flex gap-8 border-b border-gray-200 px-4 md:px-8 mb-6 font-medium text-gray-600">
        <button className="text-black border-b-2 border-black pb-3">Videos</button>
        <button className="pb-3 hover:text-black">Shorts</button>
        <button className="pb-3 hover:text-black">Playlists</button>
      </div>

      {/* Video Grid */}
      <div className="px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video) => (
          <div key={video.videoId} className="flex flex-col gap-2 group relative border border-transparent hover:border-gray-200 rounded-xl p-2 transition-all">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
              <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
            </div>
            
            <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm mt-1">{video.title}</h3>
            <p className="text-xs text-gray-500">{video.views} views • {video.uploadDate}</p>

            {/* Edit / Delete overlay on hover */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => handleOpenEdit(video)} className="bg-white text-blue-600 p-1.5 rounded shadow hover:bg-blue-50 text-xs font-bold">Edit</button>
              <button onClick={() => handleDelete(video.videoId)} className="bg-white text-red-600 p-1.5 rounded shadow hover:bg-red-50 text-xs font-bold">Delete</button>
            </div>
          </div>
        ))}
        
        {videos.length === 0 && (
          <div className="col-span-full text-center py-10 text-gray-500">
            No videos uploaded yet. Click "Manage Videos" to add one.
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">{editingVideoId ? 'Edit Video' : 'Upload Video'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-black text-2xl leading-none">&times;</button>
            </div>
            
            <form onSubmit={handleSaveVideo} className="p-4 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea rows="3" name="description" value={formData.description} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail URL</label>
                <input required type="url" name="thumbnailUrl" value={formData.thumbnailUrl} onChange={handleChange} placeholder="https://..." className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
                <input required type="url" name="videoUrl" value={formData.videoUrl} onChange={handleChange} placeholder="https://..." className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500" />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 hover:bg-gray-100 rounded font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}