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
import "./setting.css";

const Setting = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleInfo = () => setShowInfo(!showInfo);

  return (
    <div className="setting-container">
      {/* Top Bar */}
      <div className="top-bar4">
        <div className="menu-icon4" onClick={toggleSidebar}>
          <FaBars />
        </div>
        <div className="info-icon4" onClick={toggleInfo}>
          <FaInfoCircle />
          <span className="red-dot4"></span>
          {showInfo && (
            <div className="info-popup4">
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
      <div className="content-wrap4">
        {/* Sidebar */}
        <div className={`sidebar4 ${sidebarOpen ? "open4" : "closed4"}`}>
          <div className="sidebar-menu4">
            <div className="sidebar-item4" onClick={() => navigate("/home")}>
              <FaChartLine className="sidebar-icon4" />
              {sidebarOpen && <span>Dashboard</span>}
            </div>
            <div className="sidebar-item4" onClick={() => navigate("/history")}>
              <MdWork className="sidebar-icon4" />
              {sidebarOpen && <span>History</span>}
            </div>
            <div className="sidebar-item4" onClick={() => navigate("/trouble")}>
              <FaNewspaper className="sidebar-icon4" />
              {sidebarOpen && <span>Troubles</span>}
            </div>
            <div className="sidebar-item4" onClick={() => navigate("/setting")}>
              <FaUserCog className="sidebar-icon4" />
              {sidebarOpen && <span>Settings</span>}
            </div>
            <div className="sidebar-item4">
              <FaLifeRing className="sidebar-icon4" />
              {sidebarOpen && <span>Support</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
