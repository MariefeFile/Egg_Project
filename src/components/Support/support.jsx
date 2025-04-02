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
import "./support.css";

const Support = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showInfo, setShowInfo] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleInfo = () => setShowInfo(!showInfo);

  return (
    <div className="support-container">
      {/* Top Bar */}
      <div className="top-bar5">
        <div className="menu-icon5" onClick={toggleSidebar}>
          <FaBars />
        </div>
        <div className="info-icon5" onClick={toggleInfo}>
          <FaInfoCircle />
          <span className="red-dot5"></span>
          {showInfo && (
            <div className="info-popup5">
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
      <div className="content-wrap5">
        {/* Sidebar */}
        <div className={`sidebar5 ${sidebarOpen ? "open5" : "closed5"}`}>
          <div className="sidebar-menu5">
            <div className="sidebar-item5">
              <FaChartLine className="sidebar-icon5" />
              {sidebarOpen && <span>Dashboard</span>}
            </div>
            <div className="sidebar-item5">
              <MdWork className="sidebar-icon5" />
              {sidebarOpen && <span>History</span>}
            </div>
            <div className="sidebar-item5">
              <FaNewspaper className="sidebar-icon5" />
              {sidebarOpen && <span>Troubles</span>}
            </div>
            <div className="sidebar-item5">
              <FaUserCog className="sidebar-icon5" />
              {sidebarOpen && <span>Settings</span>}
            </div>
            <div className="sidebar-item5">
              <FaLifeRing className="sidebar-icon5" />
              {sidebarOpen && <span>Support</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
