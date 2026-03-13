// src/components/Header.jsx
import Search from "./Search";
import { Link } from "react-router-dom";

export default function Header({ toggleSidebar }) {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white sticky top-0 z-50 h-14">
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
        <div className="flex items-center gap-1 cursor-pointer">
          <div className="bg-red-600 text-white font-bold px-2 py-1 rounded text-xs">
            YT
          </div>
          <span className="text-xl font-bold tracking-tighter">
            YouTube Clone
          </span>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 flex justify-center px-8">
        <Search />
      </div>

      {/* Right: Sign-in Button */}
      <div className="flex items-center">
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
      </div>
    </header>
  );
}
