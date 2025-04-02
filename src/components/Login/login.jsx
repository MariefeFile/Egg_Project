import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = () => {
    // Perform login logic (e.g., authentication)
    const isAuthenticated = true; // Replace with real authentication

    if (isAuthenticated) {
      localStorage.setItem("isAuthenticated", "true"); // Set authentication flag
      navigate("/home"); // Redirect to dashboard
    }
  };

  const handleExit = () => {
    // Logic to exit (e.g., navigate back to the home page or previous page)
    navigate("/"); // Redirect to home or previous page
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <h2 className="welcome-text">PLEASE LOGIN</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <span
                className="toggle-password"
                onClick={togglePasswordVisibility}
              ></span>
            </div>
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
          <div className="forgot-password">
            Forgot Password?
            <button className="forgot-password-btn">Click Here</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
