import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
// Import eye icons from react-icons
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function Register_admin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for visibility
  const nav = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", { email, password, secretKey });
      alert("Admin created successfully");
      nav("/login");
    } catch (err) {
      console.error("Registration failed:", err);
      alert(err.response?.data?.message || "Registration failed. Check input/key.");
    }
  };

  const goToLogin = () => {
    nav("/login");
  };

   // Function to toggle password visibility
   const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleRegister} className="auth-form glass-effect">
        <h2>Admin Register</h2>

        <div className="input-group">
          <input
            type="email"
            id="register-email"
            placeholder=" "
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="register-email">Email</label>
        </div>

        {/* Password Input Group */}
        <div className="input-group">
          <input
            // Dynamically set type based on showPassword state
            type={showPassword ? "text" : "password"}
            id="register-password"
            placeholder=" "
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="register-password">Password</label>
           {/* Toggle Icon */}
           <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        </div>

        {/* Secret Key Input Group - No toggle needed here */}
        <div className="input-group">
          <input
            type="text" // Or password if it should be masked, but less common for secret keys
            id="register-secretKey"
            placeholder=" "
            required
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
          />
          <label htmlFor="register-secretKey">Secret Key</label>
        </div>

        <button type="submit" className="btn-login">Register</button>

        <div className="navigate">
          <p className="navigate-link">
            Already have an account?
            <button type="button" onClick={goToLogin} className="btn-register-link">Login</button>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register_admin;