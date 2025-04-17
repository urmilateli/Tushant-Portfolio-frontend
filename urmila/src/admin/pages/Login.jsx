import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
// Import eye icons from react-icons
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for visibility
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      nav("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert(error.response?.data?.message || "Invalid Credentials or Server Error");
    }
  };

  const goToRegister = () => {
    nav("/register");
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-form glass-effect">
        <h2>Login</h2>

        <div className="input-group">
          <input
            type="email"
            id="login-email"
            placeholder=" "
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="login-email">Email</label>
        </div>

        {/* Password Input Group */}
        <div className="input-group">
          <input
             // Dynamically set type based on showPassword state
            type={showPassword ? "text" : "password"}
            id="login-password"
            placeholder=" "
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="login-password">Password</label>
          {/* Toggle Icon */}
          <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        </div>

        <button type="submit" className="btn-login">Login</button>

        <div className="navigate">
          <p className="navigate-link">
            Don't have an account?
            <button type="button" onClick={goToRegister} className="btn-register-link">Register</button>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;