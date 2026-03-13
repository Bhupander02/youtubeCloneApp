import { useState } from "react"; // Added useState
import Search from "./Search";
import { Link, useNavigate } from "react-router-dom";
import UploadModal from "./UploadModal"; // Import the modal we are creating

export default function Header({ toggleSidebar, currentUser, setCurrentUser }) {
  const [isUploadOpen, setIsUploadOpen] = useState(false); // State to control modal
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white sticky top-0 z-50 h-14 border-b">
      {/* Left: Hamburger & Logo */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <Link to="/" className="flex items-center gap-1 cursor-pointer">
          <div className="bg-red-600 text-white font-bold px-2 py-1 rounded text-xs">
            YT
          </div>
          <span className="text-xl font-bold tracking-tighter">
            YouTube Clone
          </span>
        </Link>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 flex justify-center px-8">
        <Search />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {currentUser ? (
          <div className="flex items-center gap-4">
            {/* 1. Upload Video Button - Now triggers the modal */}
            <button
              onClick={() => setIsUploadOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-full hidden sm:block"
              title="Create"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </button>

            {/* 2. Link to Channel Page using user ID */}
            <Link to={`/channel/${currentUser.id}`} title="View your channel">
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold cursor-pointer hover:ring-2 hover:ring-purple-300 transition-all">
                {currentUser.username?.[0].toUpperCase() || "U"}
              </div>
            </Link>

            {/* 3. Logout Button */}
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-gray-600 hover:text-red-600 border px-3 py-1 rounded-full border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Log out
            </button>
          </div>
        ) : (
          <Link
            to="/auth"
            className="flex items-center gap-2 px-4 py-1.5 text-blue-600 border border-gray-200 rounded-full hover:bg-blue-50 font-medium transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Sign in
          </Link>
        )}
      </div>

      {/* 4. Render the Modal when state is true */}
      {isUploadOpen && (
        <UploadModal setOpen={setIsUploadOpen} currentUser={currentUser} />
      )}
    </header>
  );
}
