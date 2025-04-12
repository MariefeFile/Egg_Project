import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  FaBars,
  FaInfoCircle,
  FaChartLine,
  FaNewspaper,
  FaUserCog,
} from "react-icons/fa";
import { MdWork } from "react-icons/md";
import "./once.css";

import { db } from "../config/firebase-config"; // ✅ Ensure this path is correct
import { doc, getDoc } from "firebase/firestore";

const Once = () => {
  const [eggData, setEggData] = useState({
    bad: 0,
    small: 0,
    medium: 0,
    large: 0,
  });

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleInfo = () => setShowInfo(!showInfo);

  useEffect(() => {
    const fetchEggData = async () => {
      try {
        // Reference to the Firestore document in the "eggs" collection
        const docRef = doc(db, "eggs", "analytics1"); // Replace "analytics" with the document ID in the "eggs" collection
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // Extract data from Firestore and update state
          const data = docSnap.data();
          setEggData({
            bad: data.bad || 0, // Default to 0 if field is missing
            small: data.small || 0,
            medium: data.medium || 0,
            large: data.large || 0,
          });
        } else {
          console.error("No such document in the 'eggs' collection!");
        }
      } catch (error) {
        console.error("Error fetching egg data from Firestore:", error);
      }
    };

    fetchEggData(); // Fetch data on component mount
  }, []); // Empty dependency array ensures this runs only once

  const data = [
    {
      name: "Today",
      "Bad Eggs": eggData.bad,
      "Small Eggs": eggData.small,
      "Medium Eggs": eggData.medium,
      "Large Eggs": eggData.large,
    },
  ];

  return (
    <div className="dash-containersss">
      {/* Top Bar */}
      <div className="top-barsss">
        <div className="menu-iconsss" onClick={toggleSidebar}>
          <FaBars />
        </div>
        <div className="info-iconsss" onClick={toggleInfo}>
          <FaInfoCircle />
          <span className="red-dotsss"></span>
          {showInfo && (
            <div className="info-popupsss">
              <p>
                An Egg Sorting Machine is an automated system designed to sort
                eggs based on size, weight, or quality using sensors and
                mechanisms. It enhances efficiency in egg processing and
                packaging by ensuring accurate classification, reducing manual
                labor, and minimizing errors.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="content-wrapsss">
        <div className={`sidebarsss ${sidebarOpen ? "opensss" : "closedsss"}`}>
          <div className="sidebar-menusss">
            <div className="sidebar-itemsss" onClick={() => navigate("/once")}>
              <FaChartLine className="sidebar-iconsss" />
              {sidebarOpen && <span>Dashboard</span>}
            </div>
            <div
              className="sidebar-itemsss"
              onClick={() => navigate("/history")}
            >
              <MdWork className="sidebar-iconsss" />
              {sidebarOpen && <span>History</span>}
            </div>
            <div
              className="sidebar-itemsss"
              onClick={() => navigate("/trouble")}
            >
              <FaNewspaper className="sidebar-iconsss" />
              {sidebarOpen && <span>Trouble</span>}
            </div>
            <div
              className="sidebar-itemsss"
              onClick={() => navigate("/setting")}
            >
              <FaUserCog className="sidebar-iconsss" />
              {sidebarOpen && <span>Settings</span>}
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="Dsh-container">
          <div className="stats-grid">
            <div className="card red">
              <h2>{eggData.bad}</h2>
              <p>Bad Eggs</p>
            </div>
            <div className="card orange">
              <h2>{eggData.small}</h2>
              <p>Small Eggs</p>
            </div>
            <div className="card yellow">
              <h2>{eggData.medium}</h2>
              <p>Medium Eggs</p>
            </div>
            <div className="card dark-red">
              <h2>{eggData.large}</h2>
              <p>Large Eggs</p>
            </div>
          </div>

          <div className="chart-container">
            <h2>Status Trends</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Bad Eggs" fill="#800000" />
                <Bar dataKey="Small Eggs" fill="#ffcc00" />
                <Bar dataKey="Medium Eggs" fill="#d2691e" />
                <Bar dataKey="Large Eggs" fill="#008000" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Once;
