import { useNavigate } from "react-router-dom";
import "./landingpage.css";

const Admin = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login"); // Adjust route as needed
  };

  return (
    <>
      <div className="admin">
        <img src="/eggicon.png" alt="Icon" className="icon-image" />
      </div>
      <h1 className="welcome-text">WELCOME TO TEAMBANGAN!</h1>
      <div className="rectangle" onClick={goToLogin}>
        Go to Login
      </div>
    </>
  );
};

export default Admin;
