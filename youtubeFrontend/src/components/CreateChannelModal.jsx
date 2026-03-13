import { useState } from "react";
import axios from "axios";

// 1. Added setNotFound to the props to handle the UI switch
export default function CreateChannelModal({
  currentUser,
  setChannel,
  setNotFound,
}) {
  const [formData, setFormData] = useState({
    channelName: "",
    description: "",
    channelBanner: "",
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      // 2. Ensure the URL matches your server.js mount point exactly
      const res = await axios.post(
        "http://localhost:5000/api/channels/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );

      alert("Channel created successfully!");

      // 3. Update parent state with the new channel data
      setChannel(res.data);

      // 4. Redirect: Set notFound to false so Channel.jsx renders the dashboard
      if (setNotFound) {
        setNotFound(false);
      }
    } catch (err) {
      console.error("Create Channel Error:", err.response?.data);
      alert(err.response?.data?.message || "Failed to create channel");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 border rounded-xl bg-gray-50 max-w-2xl mx-auto mt-10 shadow-sm">
      <div className="bg-blue-100 p-4 rounded-full mb-4">
        <svg
          className="w-12 h-12 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      </div>

      <h2 className="text-2xl font-bold mb-2">Create your channel</h2>
      <p className="text-gray-600 mb-6 text-center">
        This is how you'll appear to others. You need a channel to start
        uploading and sharing videos.
      </p>

      <form
        onSubmit={handleCreate}
        className="flex flex-col gap-4 w-full max-w-sm"
      >
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-700 ml-1">
            Channel Name
          </label>
          <input
            placeholder="e.g. My Coding Journey"
            required
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            onChange={(e) =>
              setFormData({ ...formData, channelName: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-700 ml-1">
            Description
          </label>
          <textarea
            placeholder="Tell viewers about your channel..."
            rows="4"
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-3 rounded-full font-bold hover:bg-blue-700 active:scale-95 transition-all mt-2"
        >
          Create Channel
        </button>
      </form>
    </div>
  );
}
