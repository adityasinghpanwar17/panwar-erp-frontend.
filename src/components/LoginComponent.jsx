import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        
        // 🚀 TIP: Convert to lowercase to prevent "Wrong ID" errors
        const loginEmail = email.toLowerCase().trim();

        axios.get(`http://localhost:8080/api/students/search`, {
            params: { email: loginEmail }
        })
        .then(res => {
            const user = res.data;
            console.log("Database User Found:", user);

            if (user && user.password === password) {
                // 1. Save data to localStorage
                localStorage.setItem("userRole", user.role || 'STUDENT'); // Default to student if null
                localStorage.setItem("userName", user.firstName);
                localStorage.setItem("loggedInStudent", JSON.stringify(user));
                
                // 2. Refresh & Redirect
                if (user.role === 'ADMIN') {
                    window.location.href = "/admin"; 
                } else {
                    window.location.href = "/student-dashboard";
                }
            } else {
                alert("Invalid Credentials! Please check your password.");
            }
        })
        .catch(err => {
            console.error("Login Error:", err);
            alert("Connection Failed! Make sure Spring Boot (IntelliJ) is RUNNING on port 8080.");
        });
    };

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6">
            <div className="bg-slate-800 border border-slate-700 col-md-4 p-8 rounded-[2rem] shadow-2xl">
                <h3 className="text-center fw-black text-blue-500 uppercase italic tracking-tighter mb-4">PANWAR LOGIN</h3>
                <p className="text-slate-400 text-center text-sm mb-6">Enter your credentials to access the ERP</p>
                
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-2">Email Address</label>
                        <input 
                            type="email" 
                            className="form-control bg-slate-900 border-slate-700 text-white p-3 rounded-xl mt-1" 
                            onChange={e => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="mb-6">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-2">Password</label>
                        <input 
                            type="password" 
                            className="form-control bg-slate-900 border-slate-700 text-white p-3 rounded-xl mt-1" 
                            onChange={e => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button className="btn btn-primary w-100 fw-bold py-3 rounded-xl shadow-lg shadow-blue-500/20">
                        SIGN IN
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginComponent;