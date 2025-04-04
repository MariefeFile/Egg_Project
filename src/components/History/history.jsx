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
import "./history.css";

const getWeeklyDates = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sunday) - 6 (Saturday)
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - dayOfWeek + 1); // Set to Monday

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return days.map((day, index) => {
    let date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + index);

    const formattedDate = `${date.toLocaleString("default", {
      month: "long",
    })}/${String(date.getDate()).padStart(2, "0")}/${date.getFullYear()}`;

    return {
      day,
      date: formattedDate,
      small: 12,
      medium: 8,
      large: 5,
      bad: 20,
    };
  });
};

const getMonthlyData = () => {
  const months = ["February", "March", "April"];
  return months.map((month) => ({
    month,
    small: Math.floor(Math.random() * 500) + 300, // Simulated data
    medium: Math.floor(Math.random() * 300) + 200,
    large: Math.floor(Math.random() * 200) + 100,
    bad: Math.floor(Math.random() * 700) + 500,
  }));
};

const History = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [monthlyData] = useState(getMonthlyData());
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleInfo = () => setShowInfo(!showInfo);
  const [weeklyBreakdown, setWeeklyBreakdown] = useState(getWeeklyDates());

  const tableData = [
    { type: "Daily", small: 12, medium: 8, large: 5, bad: 20, total: 45 },
    { type: "Weekly", small: 84, medium: 56, large: 35, bad: 140, total: 315 },
    {
      type: "Monthly",
      small: 360,
      medium: 240,
      large: 150,
      bad: 600,
      total: 1350,
    },
  ];

  const handleRowClick = (row) => {
    if (row.type === "Weekly") {
      setSelectedRow({ type: "Weekly", data: weeklyBreakdown });
    } else if (row.type === "Monthly") {
      setSelectedRow({ type: "Monthly", data: monthlyData });
    } else {
      setSelectedRow({
        type: "Daily",
        date: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        }),
        ...row,
      });
    }
  };

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
            <div className="sidebar-item2" onClick={() => navigate("/once")}>
              <FaChartLine className="sidebar-icon2" />
              {sidebarOpen && <span>Dashboard</span>}
            </div>
            <div className="sidebar-item2" onClick={() => navigate("/history")}>
              <MdWork className="sidebar-icon2" />
              {sidebarOpen && <span>History</span>}
            </div>
            <div className="sidebar-item2" onClick={() => navigate("/trouble")}>
              <FaNewspaper className="sidebar-icon2" />
              {sidebarOpen && <span>Troubles</span>}
            </div>
            <div className="sidebar-item2" onClick={() => navigate("/setting")}>
              <FaUserCog className="sidebar-icon2" />
              {sidebarOpen && <span>Settings</span>}
            </div>
            <div className="sidebar-item2" onClick={() => navigate("/support")}>
              <FaLifeRing className="sidebar-icon2" />
              {sidebarOpen && <span>Support</span>}
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="table-container">
          <h2>Egg Sorting Data</h2>
          <table className="egg-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Small</th>
                <th>Medium</th>
                <th>Large</th>
                <th>Bad</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr
                  key={index}
                  onClick={() => handleRowClick(row)}
                  className={
                    selectedRow?.type === row.type ? "highlighted" : ""
                  }
                >
                  <td>{row.type}</td>
                  <td>{row.small}</td>
                  <td>{row.medium}</td>
                  <td>{row.large}</td>
                  <td>{row.bad}</td>
                  <td>{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Details Tables */}
      {selectedRow?.type === "Weekly" && (
        <div className="details-table-container">
          <h3>Weekly Breakdown</h3>
          <table className="details-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Date</th>
                <th>Small</th>
                <th>Medium</th>
                <th>Large</th>
                <th>Bad</th>
              </tr>
            </thead>
            <tbody>
              {selectedRow.data.map((dayData, index) => (
                <tr key={index}>
                  <td>{dayData.day}</td>
                  <td>{dayData.date}</td>
                  <td>{dayData.small}</td>
                  <td>{dayData.medium}</td>
                  <td>{dayData.large}</td>
                  <td>{dayData.bad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedRow?.type === "Daily" && (
        <div className="details-table-container">
          <h3>Daily Breakdown</h3>
          <table className="details-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Small</th>
                <th>Medium</th>
                <th>Large</th>
                <th>Bad</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedRow.date}</td>
                <td>{selectedRow.small}</td>
                <td>{selectedRow.medium}</td>
                <td>{selectedRow.large}</td>
                <td>{selectedRow.bad}</td>
                <td>{selectedRow.total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {selectedRow?.type === "Monthly" && (
        <div className="details-table-container">
          <h3>Monthly Breakdown</h3>
          <table className="details-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Small</th>
                <th>Medium</th>
                <th>Large</th>
                <th>Bad</th>
              </tr>
            </thead>
            <tbody>
              {selectedRow.data.map((monthData, index) => (
                <tr key={index}>
                  <td>{monthData.month}</td>
                  <td>{monthData.small}</td>
                  <td>{monthData.medium}</td>
                  <td>{monthData.large}</td>
                  <td>{monthData.bad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default History;
