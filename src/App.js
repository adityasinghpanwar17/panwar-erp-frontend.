import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

// Import all your components
import ListStudentComponent from './components/ListStudentComponent';
import CreateStudentComponent from './components/CreateStudentComponent';
import CodingTestComponent from './components/CodingTestComponent';
import AdminQuizComponent from './components/AdminQuizComponent'; 
import AdminDashboard from './components/AdminDashboard';
import LoginComponent from './components/LoginComponent';
import StudentDashboard from './pages/StudentDashboard';
import FeeReportComponent from './components/FeeReportComponent';
import Home from './pages/Home';

// --- Navbar Wrapper Component ---
// This sub-component handles the logic of which Navbar to show
const Navigation = ({ userRole, handleLogout }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Hide the ERP Navbar on the Home Page and Login Page for a clean look
  if (isHomePage || location.pathname === "/login") return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow mb-4 py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3 text-info" to="/">
          PANWAR <span className="text-white">ERP</span>
        </Link>
        
        <div className="navbar-nav ms-auto align-items-center">
          {userRole ? (
            <>
              {userRole === "ADMIN" && (
                <>
                  <Link className="nav-link text-info px-3 fw-bold" to="/admin">ADMIN DASHBOARD</Link>
                  <Link className="nav-link text-white px-3 fw-bold" to="/manage">STUDENTS</Link>
                  <Link className="nav-link text-warning px-3 fw-bold" to="/fees">FEES</Link>
                </>
              )}

              {userRole === "STUDENT" && (
                <Link className="nav-link text-success px-3 fw-bold" to="/student-dashboard">MY PORTAL</Link>
              )}

              <button className="btn btn-outline-danger btn-sm ms-3 fw-bold shadow-sm" onClick={handleLogout}>
                LOGOUT
              </button>
            </>
          ) : (
            <Link className="btn btn-info btn-sm fw-bold px-4" to="/login">SIGN IN</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

function App() {
  const [userRole, setUserRole] = useState(null);

  // Sync state with localStorage on load/reload
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role) {
      setUserRole(role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUserRole(null);
    window.location.href = "/"; // Forces a clean reset
  };

  return (
    <Router>
      <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        
        {/* 🌟 Dynamic Navbar Handling */}
        <Navigation userRole={userRole} handleLogout={handleLogout} />

        {/* 🏢 Main Content Area */}
        <main style={{ flex: '1' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />

            {/* Admin Management Routes */}
            <Route path="/manage" element={
              <div className="container mt-5 animate__animated animate__fadeIn">
                <div className="row justify-content-center mb-5">
                  <div className="col-lg-10">
                    <div className="card shadow-sm border-0 p-4 rounded-4">
                        <h2 className="text-center mb-4 fw-bold text-primary">Register New Student</h2>
                        <CreateStudentComponent />
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-lg-12">
                    <div className="card border-0 shadow-sm p-4 rounded-4">
                        <h3 className="mb-4 text-secondary">Student Records</h3>
                        <ListStudentComponent />
                    </div>
                  </div>
                </div>
              </div>
            } />

            <Route path="/fees" element={<div className="container mt-5"><FeeReportComponent /></div>} />
            <Route path="/test" element={<CodingTestComponent />} />
            <Route path="/admin-quiz" element={<AdminQuizComponent />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>

        {/* 📋 Footer Logic */}
        <Footer />
      </div>
    </Router>
  );
}

// Separate Footer component for clean code
const Footer = () => {
  const location = useLocation();
  if (location.pathname === "/") return null; // Hide footer on landing page

  return (
    <footer className="text-center text-muted py-4 mt-auto border-top bg-white">
      <small>&copy; {new Date().getFullYear()} Panwar Coaching Classes - Sanawad</small>
    </footer>
  );
};

export default App;