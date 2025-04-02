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
import "./trouble.css";

const Trouble = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showInfo, setShowInfo] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleInfo = () => setShowInfo(!showInfo);

  return (
    <div className="trouble-container">
      {/* Top Bar */}
      <div className="top-bar3">
        <div className="menu-icon3" onClick={toggleSidebar}>
          <FaBars />
        </div>
        <div className="info-icon3" onClick={toggleInfo}>
          <FaInfoCircle />
          <span className="red-dot3"></span>
          {showInfo && (
            <div className="info-popup3">
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
      <div className="content-wrap3">
        {/* Sidebar */}
        <div className={`sidebar3 ${sidebarOpen ? "open3" : "closed3"}`}>
          <div className="sidebar-menu3">
            <div className="sidebar-item3">
              <FaChartLine className="sidebar-icon3" />
              {sidebarOpen && <span>Dashboard</span>}
            </div>
            <div className="sidebar-item3">
              <MdWork className="sidebar-icon3" />
              {sidebarOpen && <span>History</span>}
            </div>
            <div className="sidebar-item3">
              <FaNewspaper className="sidebar-icon3" />
              {sidebarOpen && <span>Troubles</span>}
            </div>
            <div className="sidebar-item3">
              <FaUserCog className="sidebar-icon3" />
              {sidebarOpen && <span>Settings</span>}
            </div>
            <div className="sidebar-item3">
              <FaLifeRing className="sidebar-icon3" />
              {sidebarOpen && <span>Support</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trouble;
