import { useState } from "react";
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
  FaLifeRing,
} from "react-icons/fa";
import { MdWork } from "react-icons/md";
import "./once.css";

const data = [
  {
    date: "12/01",
    "Bad Eggs": 40,
    "Small Eggs": 30,
    "Medium Eggs": 20,
    "Large Eggs": 10,
  },
  {
    date: "12/02",
    "Bad Eggs": 35,
    "Small Eggs": 20,
    "Medium Eggs": 15,
    "Large Eggs": 8,
  },
  {
    date: "12/03",
    "Bad Eggs": 38,
    "Small Eggs": 40,
    "Medium Eggs": 10,
    "Large Eggs": 12,
  },
  {
    date: "12/04",
    "Bad Eggs": 20,
    "Small Eggs": 25,
    "Medium Eggs": 18,
    "Large Eggs": 9,
  },
  {
    date: "12/05",
    "Bad Eggs": 37,
    "Small Eggs": 30,
    "Medium Eggs": 15,
    "Large Eggs": 10,
  },
  {
    date: "12/06",
    "Bad Eggs": 32,
    "Small Eggs": 28,
    "Medium Eggs": 22,
    "Large Eggs": 14,
  },
  {
    date: "12/07",
    "Bad Eggs": 45,
    "Small Eggs": 20,
    "Medium Eggs": 18,
    "Large Eggs": 11,
  },
  {
    date: "12/08",
    "Bad Eggs": 28,
    "Small Eggs": 35,
    "Medium Eggs": 20,
    "Large Eggs": 15,
  },
];

const totalEggs = data.reduce(
  (acc, curr) => {
    acc["Bad Eggs"] += curr["Bad Eggs"];
    acc["Small Eggs"] += curr["Small Eggs"];
    acc["Medium Eggs"] += curr["Medium Eggs"];
    acc["Large Eggs"] += curr["Large Eggs"];
    return acc;
  },
  { "Bad Eggs": 0, "Small Eggs": 0, "Medium Eggs": 0, "Large Eggs": 0 }
);

const pieData = Object.keys(totalEggs).map((key) => ({
  name: key,
  value: totalEggs[key],
}));
const COLORS = ["#800000", "#ffcc00", "#d2691e", "#008000"];

const Once = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleInfo = () => setShowInfo(!showInfo);

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
                labor, and minimizing errors. This technology is widely used in
                poultry farms and egg production facilities to streamline
                operations and maintain product consistency.
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
            <div
              className="sidebar-itemsss"
              onClick={() => navigate("/support")}
            >
              <FaLifeRing className="sidebar-iconsss" />
              {sidebarOpen && <span>Support</span>}
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="Dsh-container">
          <div className="stats-grid">
            <div className="card red">
              <h2>{totalEggs["Bad Eggs"]}</h2>
              <p>Bad Eggs</p>
            </div>
            <div className="card orange">
              <h2>{totalEggs["Small Eggs"]}</h2>
              <p>Small Eggs</p>
            </div>
            <div className="card yellow">
              <h2>{totalEggs["Medium Eggs"]}</h2>
              <p>Medium Eggs</p>
            </div>
            <div className="card dark-red">
              <h2>{totalEggs["Large Eggs"]}</h2>
              <p>Large Eggs</p>
            </div>
          </div>

          {/* Chart */}
          <div className="chart-container">
            <h2>Status Trends</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <XAxis dataKey="date" />
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
