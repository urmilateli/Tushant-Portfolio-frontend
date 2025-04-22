// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// --- Public Pages/Sections ---
// ENSURE THESE FILES EXIST AT THESE PATHS:
import Home from './sections/Home';                   
import PracticeProjectsS from './sections/PracticeProjectsS'; 

import Client from './Client';
import Login from './admin/pages/Login';            
import Dashboard from './admin/pages/Dashboard';       
import MyProjects_admin from './admin/pages/MyProject'; 
import Achievements from './admin/pages/Achievements';
import Articles_admin from './admin/pages/Articles';   
import PracticesProject_Admin from './admin/pages/PracticesProject'; 
import AllProject from './sections/AllProject';
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" />;
  };
  

function App() {
    return (
        <Router>
           
            <Routes>
                <Route path="/" element={<Client/>} />
                <Route path="/allprojects" element={<AllProject/>}/>
                <Route path="/practiceprojects" element={<PracticeProjectsS />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/myprojects" element={<ProtectedRoute><MyProjects_admin /></ProtectedRoute>} />
                <Route path="/achievements" element={<ProtectedRoute><Achievements /></ProtectedRoute>} />
                <Route path="/articles" element={<ProtectedRoute><Articles_admin /></ProtectedRoute>} />
                <Route path="/PracticesProject_Admin" element={<ProtectedRoute><PracticesProject_Admin /></ProtectedRoute>} />

            </Routes>
        </Router>
    );
}

export default App;