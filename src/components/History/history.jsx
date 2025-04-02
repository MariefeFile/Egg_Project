import { useState } from "react";
import {
  FaBars,
  FaInfoCircle,
  FaChartLine,
  FaNewspaper,
  FaUserCog,
  FaLifeRing,
} from "react-icons/fa";
import { MdWork } from "react-icons/md";
import "./history.css";

const History = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showInfo, setShowInfo] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleInfo = () => setShowInfo(!showInfo);

  return (
    <div className="history-container">
      {/* Top Bar */}
      <div className="top-bar2">
        <div className="menu-icon2" onClick={toggleSidebar}>
          <FaBars />
        </div>
        <div className="info-icon2" onClick={toggleInfo}>
          <FaInfoCircle />
          <span className="red-dot2"></span>
          {showInfo && (
            <div className="info-popup2">
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
      <div className="content-wrap2">
        {/* Sidebar */}
        <div className={`sidebar2 ${sidebarOpen ? "open2" : "closed2"}`}>
          <div className="sidebar-menu2">
            <div className="sidebar-item2">
              <FaChartLine className="sidebar-icon2" />
              {sidebarOpen && <span>Dashboard</span>}
            </div>
            <div className="sidebar-item2">
              <MdWork className="sidebar-icon2" />
              {sidebarOpen && <span>History</span>}
            </div>
            <div className="sidebar-item2">
              <FaNewspaper className="sidebar-icon2" />
              {sidebarOpen && <span>Troubles</span>}
            </div>
            <div className="sidebar-item2">
              <FaUserCog className="sidebar-icon2" />
              {sidebarOpen && <span>Settings</span>}
            </div>
            <div className="sidebar-item2">
              <FaLifeRing className="sidebar-icon2" />
              {sidebarOpen && <span>Support</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
