import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react"; // Added useEffect
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import VideoPlayer from "./pages/VideoPlayer";
import Auth from "./pages/Auth";
import Channel from "./pages/Channel";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Initialize state from localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("currentUser");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Error parsing user from localStorage", error);
      return null;
    }
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="flex flex-col h-screen bg-white">
        {/* Header now gets the 'currentUser' to decide between "Sign In" and "Profile" */}
        <Header
          toggleSidebar={toggleSidebar}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar isOpen={isSidebarOpen} />

          <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/video/:videoId" element={<VideoPlayer currentUser={currentUser} />} />

              {/* Auth page gets the 'setCurrentUser' function to update the app on login */}
              <Route
                path="/auth"
                element={<Auth setCurrentUser={setCurrentUser} />}
              />

              <Route
                path="/channel/:channelId"
                element={<Channel currentUser={currentUser} />}
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
