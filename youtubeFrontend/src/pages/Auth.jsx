import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Auth({ setCurrentUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const res = await axios.post(`http://localhost:5000${endpoint}`, formData);
      
      if (res.data && res.data.user) {
        // Flatten the data: Put the token inside the user object for easy storage
        const userData = {
          ...res.data.user,
          token: res.data.token
        };

        // 1. Save to LocalStorage
        localStorage.setItem('currentUser', JSON.stringify(userData));
        
        // 2. Update Global State
        setCurrentUser(userData);
        
        alert(res.data.message);
        navigate('/');
      }
    } catch (err) {
      console.error("Auth Error:", err);
      alert(err.response?.data?.message || "Authentication failed!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="bg-white p-8 border border-gray-300 rounded-lg shadow-sm w-full max-w-[450px]">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            {isLogin ? "Sign in" : "Create account"}
          </h1>
          <p className="text-gray-600 mt-2">to continue to YouTube</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="px-4 py-3 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              onChange={handleChange}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="px-4 py-3 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="px-4 py-3 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
            onChange={handleChange}
            required
          />

          <div className="flex items-center justify-between mt-6">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 font-medium hover:text-blue-700 text-sm"
            >
              {isLogin ? "Create account" : "Sign in instead"}
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 transition-colors"
            >
              {isLogin ? "Next" : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}