import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLogin) {
      alert("Registeration succesful! Redirecting to Login.. ");
      setIsLogin(true);
    } else {
      alert("Login Sucessful");
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="bg-white p-8 border border-gray-300 rounded-lg shadow-sm w-full max-w-[450px]">
        {/* Google-style Logo Placeholder */}
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
