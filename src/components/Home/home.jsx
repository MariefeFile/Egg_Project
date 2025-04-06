import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBars,
  FaInfoCircle,
  FaChartLine,
  FaNewspaper,
  FaUserCog,
  FaLifeRing,
} from "react-icons/fa";
import { MdWork } from "react-icons/md";
import "./home.css";

const Setting = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div className="dashboard-container">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="menu-icon" onClick={toggleSidebar}>
          <FaBars />
        </div>

        <div
          className="info-icon"
          onClick={toggleInfo}
          style={{ cursor: "pointer", position: "relative" }}
        >
          <FaInfoCircle />
          <span className="red-dot"></span>

          {/* Info Popup */}
          {showInfo && (
            <div
              className="info-popup"
              style={{
                position: "absolute",
                top: "35px",
                right: "0",
                backgroundColor: "white",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                maxWidth: "300px",
                zIndex: 1000,
              }}
            >
              <p>
                An Egg Sorting Machine is an automated system designed to sort
                eggs based on size, weight, or quality using sensors and
                mechanisms. It enhances efficiency in egg processing and
                packaging by ensuring accurate classification, reducing manual
                labor, and minimizing errors. This technology is widely used in
                poultry farms and egg production facilities to streamline
                operations and maintain product consistency.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Content Wrapper */}
      <div className="content-wrapper">
        {/* Sidebar */}
        <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
          <div className="sidebar-menu">
            <div
              className="sidebar-item"
              onClick={() => navigate("/once")} // Navigate to dash.jsx
              style={{ cursor: "pointer" }} // Make it clickable
            >
              <FaChartLine className="sidebar-icon" />
              {sidebarOpen && <span>Dashboard</span>}
            </div>

            <div
              className="sidebar-item"
              onClick={() => navigate("/history")} // Navigate to dash.jsx
              style={{ cursor: "pointer" }} // Make it clickable
            >
              <MdWork className="sidebar-icon" />
              {sidebarOpen && <span>History</span>}
            </div>

            <div
              className="sidebar-item"
              onClick={() => navigate("/trouble")} // Navigate to dash.jsx
              style={{ cursor: "pointer" }} // Make it clickable
            >
              <FaNewspaper className="sidebar-icon" />
              {sidebarOpen && <span>Troubles</span>}
            </div>

            <div
              className="sidebar-item"
              onClick={() => navigate("/setting")} // Navigate to dash.jsx
              style={{ cursor: "pointer" }} // Make it clickable
            >
              <FaUserCog className="sidebar-icon" />
              {sidebarOpen && <span>Settings</span>}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={`main-container ${sidebarOpen ? "small" : "large"}`}>
          <div className="main-container-content">
            <img src="/eggicon.png" alt="EggIcon" className="eggicon-image" />
            <h1 className="welcometext">WELCOME TO TEAMBANGAN!</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
