import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBars,
  FaInfoCircle,
  FaChartLine,
  FaNewspaper,
  FaUserCog,
} from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { auth } from "../config/firebase-config";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import "./history.css";

const History = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dailyData, setDailyData] = useState({});
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      // Fetch daily data
      const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
      const dailyDoc = await getDoc(doc(db, "eggCounts", today));
      if (dailyDoc.exists()) {
        const daily = dailyDoc.data();
        setDailyData({
          date: today,
          ...daily,
          total: daily.small + daily.medium + daily.large + daily.bad,
        });
      }

      // Fetch weekly data
      const weeklySnap = await getDocs(
        query(collection(db, "eggHistory/weekly/data"), orderBy("day"))
      );
      const weekly = weeklySnap.docs.map((doc) => ({
        day: doc.id,
        ...doc.data(),
      }));
      setWeeklyData(weekly);

      // Fetch monthly data
      const monthlySnap = await getDocs(
        query(collection(db, "eggHistory/monthly/data"), orderBy("month"))
      );
      const monthly = monthlySnap.docs.map((doc) => ({
        month: doc.id,
        ...doc.data(),
      }));
      setMonthlyData(monthly);
    };

    fetchData();
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleInfo = () => setShowInfo(!showInfo);

  const tableData = [
    {
      type: "Daily",
      small: dailyData.small || 0,
      medium: dailyData.medium || 0,
      large: dailyData.large || 0,
      bad: dailyData.bad || 0,
      total: dailyData.total || 0,
    },
    {
      type: "Weekly",
      small: weeklyData.reduce((sum, item) => sum + item.small, 0),
      medium: weeklyData.reduce((sum, item) => sum + item.medium, 0),
      large: weeklyData.reduce((sum, item) => sum + item.large, 0),
      bad: weeklyData.reduce((sum, item) => sum + item.bad, 0),
      total: weeklyData.reduce(
        (sum, item) => sum + item.small + item.medium + item.large + item.bad,
        0
      ),
    },
    {
      type: "Monthly",
      small: monthlyData.reduce((sum, item) => sum + item.small, 0),
      medium: monthlyData.reduce((sum, item) => sum + item.medium, 0),
      large: monthlyData.reduce((sum, item) => sum + item.large, 0),
      bad: monthlyData.reduce((sum, item) => sum + item.bad, 0),
      total: monthlyData.reduce(
        (sum, item) => sum + item.small + item.medium + item.large + item.bad,
        0
      ),
    },
  ];

  const handleRowClick = (row) => {
    if (row.type === "Weekly") {
      setSelectedRow({ type: "Weekly", data: weeklyData });
    } else if (row.type === "Monthly") {
      setSelectedRow({ type: "Monthly", data: monthlyData });
    } else {
      setSelectedRow({
        type: "Daily",
        date: dailyData.date,
        ...dailyData,
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
                mechanisms...
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar + Table */}
      <div className="content-wrap2">
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
          </div>
        </div>

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

      {/* Detail Views */}
      {selectedRow?.type === "Weekly" && (
        <div className="details-table-container">
          <h3>Weekly Breakdown</h3>
          <table className="details-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Small</th>
                <th>Medium</th>
                <th>Large</th>
                <th>Bad</th>
              </tr>
            </thead>
            <tbody>
              {selectedRow.data.map((item, index) => (
                <tr key={index}>
                  <td>{item.day}</td>
                  <td>{item.small}</td>
                  <td>{item.medium}</td>
                  <td>{item.large}</td>
                  <td>{item.bad}</td>
                </tr>
              ))}
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
              {selectedRow.data.map((item, index) => (
                <tr key={index}>
                  <td>{item.month}</td>
                  <td>{item.small}</td>
                  <td>{item.medium}</td>
                  <td>{item.large}</td>
                  <td>{item.bad}</td>
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
    </div>
  );
};

export default History;
