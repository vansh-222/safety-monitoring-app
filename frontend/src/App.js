// src/App.js
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/navbar"; 
import PublicNavbar from "./components/PublicNavbar";  // ✅ new
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ReportIncident from "./pages/ReportIncident";
import SOS from "./pages/SOS";
import AdminPanel from "./pages/AdminPanel";
import FullMap from "./pages/FullMap";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import Chatbot from "./pages/Chatbot";

function App() {
  const location = useLocation();

  // Show public navbar only on login/signup
  const isAuthPage = ["/login", "/signup"].includes(location.pathname);

  return (
    <>
      {isAuthPage ? <PublicNavbar /> : <Navbar />}

      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/report"
          element={
            <ProtectedRoute>
              <ReportIncident />
            </ProtectedRoute>
          }
        />

        
        {/* other routes */}
        <Route 
          path="/chatbot" 
          element={
            <ProtectedRoute>
              <Chatbot />
            </ProtectedRoute>
          } 
        />
      

        <Route
          path="/sos"
          element={
            <ProtectedRoute>
              <SOS />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        <Route
          path="/full-map"
          element={
            <ProtectedRoute>
              <FullMap />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
