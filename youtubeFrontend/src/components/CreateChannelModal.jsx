import { useState } from "react";
import axios from "axios";

export default function CreateChannelModal({ currentUser, setChannel }) {
  const [formData, setFormData] = useState({
    channelName: "",
    description: "",
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/channels/", formData, {
        headers: { Authorization: `Bearer ${currentUser.token}` }
      });
      alert("Channel created successfully!");
      setChannel(res.data); // Update the page state
    } catch (err) {
      alert("Failed to create channel");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 border rounded-xl bg-gray-50">
      <h2 className="text-2xl font-bold mb-2">Create your channel</h2>
      <p className="text-gray-600 mb-6 text-center">You need a channel to start uploading videos.</p>
      <form onSubmit={handleCreate} className="flex flex-col gap-4 w-full max-w-sm">
        <input 
          placeholder="Channel Name" required
          className="p-3 border rounded focus:outline-blue-500"
          onChange={(e) => setFormData({...formData, channelName: e.target.value})}
        />
        <textarea 
          placeholder="Description"
          className="p-3 border rounded focus:outline-blue-500"
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
        <button className="bg-blue-600 text-white py-2 rounded-full font-bold">Create Channel</button>
      </form>
    </div>
  );
}