import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
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

// SidebarItem component (same as in Dashboard.js)
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

function GlobalInsights() {
  // Global Insights states
  const [currentTab, setCurrentTab] = useState("articles"); // "articles" or "chart"
  const [chartTitle, setChartTitle] = useState("");
  const [articles, setArticles] = useState([]);
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  // Sidebar state (to match Dashboard)
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Sidebar toggle
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Navigation helper (for sidebar items)
  const navigateTo = (path) => {
    window.location.href = path;
  };

  // Logout handler (from backend)
  const handleLogout = () => {
    window.location.href = "http://localhost:5000/logout";
  };

  // Fetch health data for chart display
  const fetchHealthData = async (keyword) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/global_health_data?keyword=${keyword}`);
      const data = await response.json();

      // Destroy previous chart instance if exists
      if (chartInstance) {
        chartInstance.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      const newChartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: data.countries,
          datasets: [
            {
              label: keyword === "life_expectancy" ? "Life Expectancy (Years)" : "Disease Prevalence (%)",
              data: keyword === "life_expectancy" ? data.life_expectancies : data.disease_prevalence,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: { beginAtZero: true },
          },
        },
      });
      setChartInstance(newChartInstance);
    } catch (error) {
      console.error("Error fetching health data:", error);
    }
  };

  // Fetch trending articles
  const fetchTrendingArticles = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/trending-articles");
      const data = await response.json();
      setArticles(data.articles || []);
    } catch (error) {
      console.error("Error fetching trending articles:", error);
    }
  };

  // Tab actions
  const showTrendingArticles = () => {
    setCurrentTab("articles");
    fetchTrendingArticles();
  };

  const showLifeExpectancy = async () => {
    setCurrentTab("chart");
    setChartTitle("Global Health Statistics - Life Expectancy");
    await fetchHealthData("life_expectancy");
  };

  const showDiseasePrevalence = async () => {
    setCurrentTab("chart");
    setChartTitle("Global Health Statistics - Disease Prevalence");
    await fetchHealthData("disease_prevalence");
  };

  // On mount, load trending articles by default
  useEffect(() => {
    showTrendingArticles();
    // Cleanup chart on unmount
    return () => {
      if (chartInstance) chartInstance.destroy();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div style={styles.outerContainer}>
      {/* Inject keyframes for fadeIn */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>

      {/* Sidebar (exact same styling as Dashboard) */}
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

      {/* Main Global Insights Content */}
      <div style={styles.content}>
        <div style={styles.navTabs}>
          <button
            style={{
              ...styles.navTabButton,
              ...(currentTab === "articles" ? styles.activeTab : {}),
            }}
            onClick={showTrendingArticles}
          >
            Trending Articles
          </button>
          <button
            style={{
              ...styles.navTabButton,
              ...(currentTab === "chart" && chartTitle.includes("Life Expectancy")
                ? styles.activeTab
                : {}),
            }}
            onClick={showLifeExpectancy}
          >
            Life Expectancy
          </button>
          <button
            style={{
              ...styles.navTabButton,
              ...(currentTab === "chart" && chartTitle.includes("Disease Prevalence")
                ? styles.activeTab
                : {}),
            }}
            onClick={showDiseasePrevalence}
          >
            Disease Prevalence
          </button>
        </div>

        {currentTab === "chart" ? (
          <div style={styles.chartContainer}>
            <h2 style={styles.chartTitle}>{chartTitle}</h2>
            <canvas ref={chartRef} style={styles.chartCanvas}></canvas>
          </div>
        ) : (
          <div style={styles.articlesContainer}>
            <h2 style={styles.articlesTitle}>Top Trending Medical Articles</h2>
            {articles.map((article, index) => (
              <div key={index} style={styles.article}>
                <h3 style={styles.articleTitle}>{article.title}</h3>
                <p style={styles.articleDescription}>{article.description}</p>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.articleLink}
                >
                  Read full article
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  outerContainer: {
    display: "flex",
    height: "100vh",
    fontFamily: "'Roboto', sans-serif",
    background: "linear-gradient(135deg, #f0f8ff, #e6f2ff)",
  },
  // Sidebar (exact same styling as Dashboard)
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
  // Global Insights main content styling
  content: {
    flex: 1,
    padding: "40px",
    backgroundColor: "#ffffff",
    color: "#333",
    overflowY: "auto",
  },
  navTabs: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  navTabButton: {
    backgroundColor: "#d1eaff",
    color: "#0073e6",
    padding: "12px 24px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "background-color 0.3s ease",
  },
  activeTab: {
    backgroundColor: "#a7d8ff",
  },
  chartContainer: {
    maxWidth: "900px",
    width: "100%",
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    marginBottom: "30px",
  },
  chartTitle: {
    textAlign: "center",
    fontSize: "1.8rem",
    marginBottom: "20px",
    color: "#0073e6",
  },
  chartCanvas: {
    width: "100%",
    height: "300px",
  },
  articlesContainer: {
    maxWidth: "900px",
    width: "100%",
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
  articlesTitle: {
    textAlign: "center",
    fontSize: "1.8rem",
    marginBottom: "20px",
    color: "#0073e6",
  },
  article: {
    backgroundColor: "#f9f9f9",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "15px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
  },
  articleTitle: {
    fontSize: "1.4rem",
    marginBottom: "10px",
    color: "#0073e6",
  },
  articleDescription: {
    fontSize: "1rem",
    marginBottom: "10px",
    color: "#555",
  },
  articleLink: {
    color: "#00aaff",
    textDecoration: "none",
    fontWeight: "600",
  },
};

export default GlobalInsights;
