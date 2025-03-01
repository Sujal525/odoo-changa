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
  FaVideo,
  FaClipboard // ✅ New Icon for Prescription Scanner
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
    backgroundColor: hovered ? "rgba(255,255,255,0.15)" : "transparent",
    borderRadius: "4px",
    margin: "6px 0",
    boxShadow: hovered ? "0 2px 5px rgba(0,0,0,0.15)" : "none",
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

function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Toggle sidebar collapse
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Navigation helper (update these URLs as needed)
  const navigateTo = (path) => {
    window.location.href = path;
  };

  // Logout handler
  const handleLogout = () => {
    window.location.href = "http://localhost:5000";
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
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

      {/* Main Content */}
      <div style={styles.content}>
        <h1 style={styles.contentTitle}>Premium Healthcare Dashboard</h1>
        <p style={styles.contentText}>
          Welcome to your healthcare portal. Enjoy a seamless experience managing your appointments, records, and more.
        </p>
      </div>
    </div>
  );
}

// Internal styles for Dashboard
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    backgroundColor: "#f4f6f9",
  },
  sidebar: {
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
  },
  contentTitle: {
    fontSize: "2.5rem",
    marginBottom: "20px",
    color: "#333",
  },
  contentText: {
    fontSize: "1.2rem",
    color: "#555",
  },
};

export default Dashboard;
