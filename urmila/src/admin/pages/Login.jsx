import { useState } from "react";
import axios from "../api/axios"; // <<<--- सुनिश्चित करें कि यह axios इंस्टेंस सही बेस URL के साथ कॉन्फ़िगर है, या पूरा URL इस्तेमाल करें
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
      // --- यहाँ बदलाव करें ---
      const res = await axios.post("/auth/login", { email, password }); // <<<--- /api जोड़ा गया
      // -----------------------

      // स्थानीय स्टोरेज में टोकन का नाम 'token' रखा है, सुनिश्चित करें कि आप इसे बाकी जगह भी 'token' से ही एक्सेस करें
      // आमतौर पर इसे 'adminToken' या कुछ और विशिष्ट नाम देना बेहतर होता है
      localStorage.setItem("token", res.data.token);

      // डैशबोर्ड का पाथ चेक करें, एडमिन के लिए शायद '/admin/dashboard' या सिर्फ '/dashboard' हो
      nav("/dashboard"); // <<<--- इसे अपने एडमिन डैशबोर्ड के सही पाथ से बदलें

    } catch (error) {
      console.error("Login failed:", error);
      // एरर मैसेज दिखाना ठीक है
      alert(error.response?.data?.message || "Invalid Credentials or Server Error");
    }
  };

  const goToRegister = () => {
    nav("/register"); // सुनिश्चित करें कि '/register' आपका सही रजिस्ट्रेशन पाथ है
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