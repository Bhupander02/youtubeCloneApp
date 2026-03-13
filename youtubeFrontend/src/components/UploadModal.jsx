import { useState } from "react";
import axios from "axios";

export default function UploadModal({ setOpen, currentUser }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnailUrl: "",
    videoUrl: "",
    category: "General",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // src/components/UploadModal.jsx

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const token = currentUser?.token;
      const videoData = { ...formData, uploaderId: currentUser.id };

      await axios.post("http://localhost:5000/api/videos", videoData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Video uploaded successfully!");
      setOpen(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Upload failed.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Upload Video</h2>
          <button onClick={() => setOpen(false)} className="text-2xl">
            &times;
          </button>
        </div>

        <form onSubmit={handleUpload} className="flex flex-col gap-4">
          <input
            name="title"
            placeholder="Title"
            required
            className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            rows="3"
            className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={handleChange}
          />
          <input
            name="videoUrl"
            placeholder="Video URL (e.g. YouTube embed link or file path)"
            required
            className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={handleChange}
          />
          <input
            name="thumbnailUrl"
            placeholder="Thumbnail Image URL"
            required
            className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 mt-2"
          >
            Publish Video
          </button>
        </form>
      </div>
    </div>
  );
}
