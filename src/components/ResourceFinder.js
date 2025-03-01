import React, { useState } from "react";
import { 
  FaBars, 
  FaHome, 
  FaUser, 
  FaNotesMedical, 
  FaSignOutAlt, 
  FaSearch,
  FaCommentDots,
  FaFileAlt,
  FaChartBar,
  FaVideo
} from "react-icons/fa";

const SidebarItem = ({ icon: Icon, label, onClick, isCollapsed }) => {
  const [hovered, setHovered] = useState(false);

  const itemStyle = {
    display: "flex",
    alignItems: "center",
    padding: "12px 15px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "all 0.3s ease",
    backgroundColor: hovered ? "rgba(255, 255, 255, 0.15)" : "transparent",
    borderRadius: "4px",
    margin: "6px 0",
    boxShadow: hovered ? "0 2px 5px rgba(0, 0, 0, 0.15)" : "none",
  };

  return (
    <li
      style={itemStyle}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Icon style={{ fontSize: "20px" }} />
      {!isCollapsed && <span style={{ marginLeft: "10px" }}>{label}</span>}
    </li>
  );
};

function ResourceFinder() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Toggle the sidebar collapse state.
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Navigation helper to change routes.
  const navigateTo = (path) => {
    window.location.href = path;
  };

  // Logout handler.
  const handleLogout = () => {
    window.location.href = "http://localhost:5000/logout";
  };

  // Search videos using the backend /youtube route.
  const searchVideos = () => {
    setLoading(true);
    fetch("http://localhost:5000/youtube", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keywords: searchQuery }),
    })
      .then((response) => response.json())
      .then((data) => {
        setVideos(data.recommendations || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
        setLoading(false);
      });
  };

  // Helper to shorten long titles.
  const nameShortener = (title, maxLength) => {
    return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
  };

  return (
    <div style={styles.container}>
      {/* Inject keyframes for spin and fadeIn */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>

      {/* Sidebar (keep styling as is) */}
      <div style={{ ...styles.sidebar, width: isCollapsed ? "70px" : "260px" }}>
        <button onClick={toggleSidebar} style={styles.toggleButton}>
          <FaBars />
        </button>
        <ul style={styles.sidebarList}>
          <SidebarItem icon={FaHome} label="Home" isCollapsed={isCollapsed} onClick={() => navigateTo("http://localhost:3000/dashboard")} />
                    <SidebarItem icon={FaSearch} label="Resource Finder" isCollapsed={isCollapsed} onClick={() => navigateTo("http://localhost:3000/resource-finder")} />
                    <SidebarItem icon={FaCommentDots} label="ChatBot" isCollapsed={isCollapsed} onClick={() => navigateTo("http://localhost:3000/chatbot")} />
                    <SidebarItem icon={FaFileAlt} label="Report Explanation" isCollapsed={isCollapsed} onClick={() => navigateTo("http://localhost:3000/report-explanation")} />
                    <SidebarItem icon={FaChartBar} label="Global Insights" isCollapsed={isCollapsed} onClick={() => navigateTo("http://localhost:3000/global-insights")} />
                    <SidebarItem icon={FaVideo} label="Virtual Meeting" isCollapsed={isCollapsed} onClick={() => navigateTo("http://localhost:3000/virtual-meeting")} />
                    <SidebarItem icon={FaNotesMedical} label="Health Records" isCollapsed={isCollapsed} onClick={() => navigateTo("http://localhost:3000/health_records")} />
                    <SidebarItem icon={FaUser} label="Clinic Appointment" isCollapsed={isCollapsed} onClick={() => navigateTo("http://localhost:3000/clinic-appointment")} />
                    <SidebarItem icon={FaSignOutAlt} label="Logout" isCollapsed={isCollapsed} onClick={handleLogout} />
        </ul>
      </div>

      {/* Main Content (YouTube section styling) */}
      <div style={styles.content}>
        <h1 style={styles.heading}>Resource Finder</h1>
        <div style={styles.searchBar}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for videos..."
            style={styles.searchInput}
          />
          <button onClick={searchVideos} style={styles.searchButton}>
            Search
          </button>
        </div>

        {loading && (
          <div style={styles.loaderOverlay}>
            <div style={styles.loader}></div>
          </div>
        )}

        <div style={styles.videoGrid}>
          {videos.map((video, index) => (
            <div key={index} style={styles.videoItem}>
              <iframe
                src={video.url}
                frameBorder="0"
                allowFullScreen
                style={styles.videoIframe}
              ></iframe>
              <h3 style={styles.videoTitle}>{nameShortener(video.title, 70)}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Internal Styles: Healthcare-themed (light and professional for YouTube section)
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "'Roboto', sans-serif",
    background: "linear-gradient(135deg, #eaf6ff, #d0e7ff)", // Light healthcare-themed gradient
  },
  sidebar: {
    // Sidebar styles remain unchanged.
    background: "linear-gradient(135deg, #1e3c72, #2a5298)",
    color: "#fff",
    height: "100vh",
    transition: "width 0.3s ease-in-out",
    padding: "20px 10px",
    boxSizing: "border-box",
    overflow: "hidden",
  },
  toggleButton: {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "24px",
    cursor: "pointer",
    marginBottom: "30px",
    outline: "none",
  },
  sidebarList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  content: {
    flex: 1,
    padding: "40px",
    backgroundColor: "#f7fbff", // Clean, light background for content
    color: "#333",
    overflowY: "auto",
  },
  heading: {
    fontSize: "36px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "40px",
    color: "#0073e6", // Healthcare blue accent
  },
  searchBar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "30px",
  },
  searchInput: {
    width: "100%",
    maxWidth: "650px",
    padding: "14px 22px",
    borderRadius: "50px",
    border: "1px solid #ccc",
    fontSize: "18px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    color: "#333",
    outline: "none",
  },
  searchButton: {
    marginLeft: "15px",
    padding: "14px 30px",
    backgroundColor: "#00aaff",
    color: "#fff",
    border: "none",
    borderRadius: "50px",
    fontSize: "18px",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.3s",
  },
  loaderOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(255, 255, 255, 0.6)", // Blur effect (previous style)
    backdropFilter: "blur(8px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    animation: "fadeIn 0.5s ease-in-out",
  },
  loader: {
    border: "8px solid rgba(0, 0, 0, 0.1)",
    borderLeftColor: "#00aaff",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    animation: "spin 1s linear infinite", // This will work now that keyframes are injected
  },
  videoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    padding: "10px",
  },
  videoItem: {
    background: "linear-gradient(135deg, #ffffff, #e6f7ff)", // Light background with subtle gradient
    borderRadius: "12px",
    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)",
    padding: "15px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  videoIframe: {
    width: "100%",
    borderRadius: "8px",
    border: 0,
  },
  videoTitle: {
    fontSize: "18px",
    marginTop: "10px",
    textAlign: "left",
    color: "#0073e6", // Accent blue for text
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    lineHeight: 1.4,
    height: "calc(1.4em * 2)",
    fontFamily: "'Roboto', sans-serif",
  },
};

export default ResourceFinder;
