import React, { useState, useEffect } from 'react';
import StudentService from '../services/StudentService';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ totalStudents: 0, totalRevenue: 0, pending: 0 });
    const navigate = useNavigate();

    useEffect(() => {
        StudentService.getAllStudents().then((res) => {
            const students = res.data;
            const totalRevenue = students.reduce((sum, s) => sum + (s.paidAmount || 0), 0);
            const totalFees = students.reduce((sum, s) => sum + (s.totalFees || 0), 0);
            
            setStats({
                totalStudents: students.length,
                totalRevenue: totalRevenue,
                pending: totalFees - totalRevenue
            });
        }).catch(err => console.error("Error fetching stats:", err));
    }, []);

    return (
        <div className="container-fluid mt-0">
            <div className="row">
                {/* --- Sidebar --- */}
                <div className="col-md-2 bg-dark vh-100 shadow pt-3 text-white">
                    <h5 className="fw-bold text-info mb-4 px-3">PANWAR ADMIN</h5>
                    
                    {/* ✅ CHANGE 1: Navigate to '/manage' (matches your App.js route) */}
                    <button className="btn btn-outline-info w-100 mb-2 text-start border-0 text-white" onClick={() => navigate('/manage')}>
                        👥 Manage Students
                    </button>
                    
                    {/* ✅ CHANGE 2: Path matches App.js */}
                    <button className="btn btn-outline-info w-100 mb-2 text-start border-0 text-white" onClick={() => navigate('/admin-quiz')}>
                        📝 Manage Quizzes
                    </button>
                    
                    <button className="btn btn-outline-info w-100 mb-2 text-start border-0 text-white">
                        💰 Fee Reports
                    </button>
                    
                    <hr className="bg-secondary" />
                    
                    {/* ✅ CHANGE 3: Path matches App.js for Login */}
                    <button className="btn btn-danger w-100 mt-5" onClick={() => {
                        localStorage.clear();
                        navigate('/');
                    }}>
                        Logout
                    </button>
                </div>

                {/* --- Main Content --- */}
                <div className="col-md-10 p-5 bg-light">
                    <h2 className="fw-bold mb-4">Business Overview</h2>
                    
                    <div className="row g-4">
                        {/* Stat Cards */}
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm bg-primary text-white p-4 animate__animated animate__fadeInUp">
                                <h6 className="opacity-75">TOTAL STUDENTS</h6>
                                <h1 className="fw-bold">{stats.totalStudents}</h1>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm bg-success text-white p-4 animate__animated animate__fadeInUp" style={{ animationDelay: '0.1s' }}>
                                <h6 className="opacity-75">TOTAL REVENUE</h6>
                                <h1 className="fw-bold">₹{stats.totalRevenue}</h1>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm bg-warning text-dark p-4 animate__animated animate__fadeInUp" style={{ animationDelay: '0.2s' }}>
                                <h6 className="opacity-75">PENDING FEES</h6>
                                <h1 className="fw-bold">₹{stats.pending}</h1>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 card border-0 shadow-sm p-4">
                        <h4 className="fw-bold mb-3">Quick Actions</h4>
                        <div className="d-flex gap-3">
                            {/* ✅ CHANGE 4: Corrected these buttons to match your Routes */}
                            <button className="btn btn-dark p-3 fw-bold" onClick={() => navigate('/manage')}>
                                + Add New Student
                            </button>
                            <button className="btn btn-info text-white p-3 fw-bold" onClick={() => navigate('/admin-quiz')}>
                                + Add New Question
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;