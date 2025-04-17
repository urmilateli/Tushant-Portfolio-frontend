import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";



// Import your admin pages
import Dashboard_admin from "./admin/pages/Dashboard";
import Courses_admin from "./admin/pages/Courses";
import Achievements_admin from "./admin/pages/Achievements";
import Articles_admin from "./admin/pages/Articles";
import Login_admin from "./admin/pages/Login";
import Client from "./Client";
import Register_admin from "./admin/pages/Register";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Client />} />
        <Route path="/login" element={<Login_admin />} />
        <Route path="/register" element={<Register_admin />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard_admin /></PrivateRoute>} />
        <Route path="/courses" element={<PrivateRoute><Courses_admin /></PrivateRoute>} />
        <Route path="/achievements" element={<PrivateRoute><Achievements_admin /></PrivateRoute>} />
        <Route path="/articles" element={<PrivateRoute><Articles_admin /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
