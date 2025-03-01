import React, { useState, useRef } from "react";
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

// SidebarItem component (unchanged)
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

function ChatBot() {
  // Sidebar state and ChatBot state
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const chatContentRef = useRef(null);

  // Sidebar toggle helper
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Navigation helper (for sidebar)
  const navigateTo = (path) => {
    window.location.href = path;
  };

  // Logout handler (calls backend)
  const handleLogout = () => {
    window.location.href = "http://localhost:5000/logout";
  };

  // ChatBot: Scroll chat content to bottom
  const scrollToBottom = () => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  };

  // ChatBot: Send user message and fetch AI response
  const sendMessage = () => {
    const userInput = messageInput.trim();
    if (!userInput) {
      alert("Please enter a message");
      return;
    }
    // Add user message to the list
    setMessages((prev) => [...prev, { text: userInput, type: "user" }]);
    setMessageInput("");
    scrollToBottom();

    // Fetch AI response from backend /output route
    fetch("http://localhost:5000/output", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userInput }),
    })
      .then((response) => response.json())
      .then((data) => {
        const aiResponse = data.output;
        displayTypingEffect(aiResponse);
      })
      .catch((error) => console.error("Error:", error));
  };

  // ChatBot: Typing effect for AI response
  const displayTypingEffect = (text) => {
    text = text.replace(/\*(.*?)\*/g, "<strong>$1</strong>");
    let i = 0;
    let aiMessage = "";
    // Append a placeholder for AI message
    setMessages((prev) => [...prev, { text: "", type: "ai" }]);

    const typeWriter = () => {
      if (i < text.length) {
        aiMessage += text.charAt(i);
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].text = aiMessage;
          return updated;
        });
        i++;
        scrollToBottom();
        setTimeout(typeWriter, 20);
      } else {
        scrollToBottom();
      }
    };

    typeWriter();
  };

  return (
    <div style={styles.container}>
      {/* Inject keyframes for animations */}
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

      {/* Sidebar (same as before) */}
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

      {/* ChatBot Section (new styling without an extra container) */}
      <div style={styles.chatSection}>
        <div style={styles.chatHeader}>
          <h2 style={styles.chatTitle}>ChatBot AI</h2>
        </div>
        <div style={styles.chatMessages} ref={chatContentRef}>
          {messages.map((message, index) => (
            <div
              key={index}
              style={message.type === "user" ? styles.userMessage : styles.aiMessage}
            >
              <span dangerouslySetInnerHTML={{ __html: message.text }}></span>
            </div>
          ))}
        </div>
        <div style={styles.chatInputArea}>
          <input
            type="text"
            placeholder="Type your message..."
            style={styles.messageInput}
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button style={styles.sendBtn} onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

// Updated Styles for ChatBot section (separate from sidebar, no extra container)
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "'Roboto', sans-serif",
    background: "linear-gradient(135deg, #eaf6ff, #d0e7ff)", // Light healthcare-themed background
  },
  // Sidebar styles (unchanged)
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
  // New ChatBot section styling
  chatSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    margin: "40px",
    borderRadius: "10px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
    overflow: "hidden",
  },
  chatHeader: {
    backgroundColor: "#00aaff",
    padding: "16px",
    textAlign: "center",
    color: "#fff",
    borderBottom: "2px solid #0077cc",
  },
  chatTitle: {
    margin: 0,
    fontSize: "1.8rem",
  },
  chatMessages: {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
    backgroundColor: "#f7fbff",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#4caf50",
    color: "#fff",
    padding: "12px 18px",
    borderRadius: "15px",
    maxWidth: "75%",
    marginBottom: "10px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
  },
  aiMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#3f51b5",
    color: "#fff",
    padding: "12px 18px",
    borderRadius: "15px",
    maxWidth: "75%",
    marginBottom: "10px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
  },
  chatInputArea: {
    display: "flex",
    padding: "14px",
    borderTop: "2px solid #00aaff",
    backgroundColor: "#f7fbff",
  },
  messageInput: {
    flex: 1,
    padding: "12px",
    border: "1px solid #00aaff",
    borderRadius: "20px",
    fontSize: "1rem",
    outline: "none",
    marginRight: "10px",
    fontFamily: "'Roboto', sans-serif",
  },
  sendBtn: {
    padding: "12px 20px",
    backgroundColor: "#00aaff",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s ease",
    fontFamily: "'Roboto', sans-serif",
  },
  // Loader styles remain the same
  loaderOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(255, 255, 255, 0.6)",
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
    animation: "spin 1s linear infinite",
  },
};

export default ChatBot;
