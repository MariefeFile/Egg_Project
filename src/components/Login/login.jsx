import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase-config"; // Make sure the path is correct

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Optional: Store session/token or just navigate
      localStorage.setItem("isAuthenticated", "true");

      console.log("Logged in:", user);
      navigate("/home");
    } catch (err) {
      console.error("Login error:", err.code, err.message);
      setError("Invalid email or password.");
    }
  };

  const handleExit = () => {
    navigate("/");
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <h2 className="welcome-text">PLEASE LOGIN</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="toggle-password"
                onClick={togglePasswordVisibility}
              ></span>
            </div>
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="login-button">
            Login
          </button>

          <div className="forgot-password">
            Forgot Password?
            <button
              type="button"
              className="forgot-password-btn"
              onClick={() => alert("Redirect to password recovery page...")}
            >
              Click Here
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
