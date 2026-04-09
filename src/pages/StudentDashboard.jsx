import React, { useEffect } from 'react'; // 1. Added useEffect here
import { useNavigate } from 'react-router-dom';
import { FaTrophy, FaStar, FaSignOutAlt, FaCreditCard, FaRocket, FaChartLine, FaBell } from 'react-icons/fa';

const StudentDashboard = () => {
    const navigate = useNavigate();
    
    // 2. Get the student data first
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInStudent"));

    // 🛑 SECURITY GUARD: If no one is logged in, kick them back to login page
    useEffect(() => {
        if (!loggedInUser) {
            navigate('/'); // Redirect to your login/home path
        }
    }, [loggedInUser, navigate]);

    // 3. If no user, stop here and show nothing (redirecting...)
    if (!loggedInUser) return null;

    // 4. Create the 'student' alias so the rest of your code works
    const student = loggedInUser; 
    const balance = (student.totalFees || 0) - (student.paidAmount || 0);

    return (
        <div className="min-h-screen bg-[#0f172a] text-white p-4 md:p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                
                {/* --- MODERN HEADER --- */}
                <header className="flex flex-col md:flex-row justify-between items-center mb-12 bg-slate-800/30 p-8 rounded-[2.5rem] border border-slate-700 backdrop-blur-md">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-black tracking-tighter italic uppercase">
                            Welcome, <span className="text-blue-500">{student.firstName}!</span> 👋
                        </h1>
                        <p className="text-slate-500 font-bold mt-2 uppercase tracking-widest text-sm">Roll No: {student.rollNumber || 'N/A'}</p>
                    </div>
                    <button 
                        className="mt-6 md:mt-0 flex items-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-6 py-2 rounded-full font-bold border border-red-500/30 transition-all"
                        onClick={() => { localStorage.clear(); navigate('/'); }}
                    >
                        <FaSignOutAlt /> Logout
                    </button>
                </header>

                <div className="grid lg:grid-cols-3 gap-8">
                    
                    {/* --- LEFT: STATS & NOTICES --- */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* 💳 BENTO CARDS: FEE & EXAM */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-blue-600 p-8 rounded-[2.5rem] shadow-xl shadow-blue-500/10 group relative overflow-hidden">
                                <FaCreditCard className="absolute -right-4 -bottom-4 text-8xl text-blue-400/20" />
                                <h6 className="uppercase font-black text-blue-200 text-xs mb-2">Pending Balance</h6>
                                <h2 className="text-5xl font-black mb-6 italic">₹{balance}</h2>
                                <button className="bg-white text-blue-600 w-full py-3 rounded-xl font-black uppercase hover:scale-105 transition transform">Pay Fees</button>
                            </div>

                            <div className="bg-slate-800 border border-slate-700 p-8 rounded-[2.5rem] shadow-xl group relative overflow-hidden">
                                <FaRocket className="absolute -right-4 -bottom-4 text-8xl text-slate-700/50" />
                                <h6 className="uppercase font-black text-slate-500 text-xs mb-2">Active Test</h6>
                                <h2 className="text-3xl font-black mb-6 text-blue-400">Java Full Stack</h2>
                                <button className="bg-blue-600 text-white w-full py-3 rounded-xl font-black uppercase hover:bg-blue-700 transition" onClick={() => navigate('/test')}>Start Exam</button>
                            </div>
                        </div>

                        {/* 📢 NOTICE BOARD */}
                        <div className="bg-slate-800/30 border border-slate-700 p-10 rounded-[2.5rem]">
                            <h3 className="text-2xl font-black mb-8 flex items-center gap-3 uppercase italic text-blue-500">
                                <FaBell /> Coaching Notices
                            </h3>
                            <ul className="space-y-6">
                                <li className="flex gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800 italic">
                                    <span className="text-blue-500 font-black">📅 MON:</span> Java Collections Framework Deep-Dive at 10 AM.
                                </li>
                                <li className="flex gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800 italic">
                                    <span className="text-green-500 font-black">📝 PROJ:</span> Submit Spring Boot CRUD assignment by Friday.
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* --- RIGHT: LEADERBOARD --- */}
                    <aside>
                        <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-[2.5rem] shadow-2xl h-full">
                            <h3 className="text-2xl font-black mb-8 uppercase italic flex items-center gap-3">
                                <FaChartLine className="text-blue-500" /> Champions
                            </h3>
                            <div className="space-y-4">
                                <div className="p-5 rounded-2xl bg-blue-600 shadow-lg mb-6 border-2 border-blue-400">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <FaTrophy className="text-yellow-400 text-2xl" />
                                            <span className="font-black text-lg">Rahul Sharma</span>
                                        </div>
                                        <span className="font-black">98%</span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-sm font-bold">
                                        <span>#2 Priya Verma</span>
                                        <span className="text-blue-400">92%</span>
                                    </div>
                                    <div className="flex justify-between p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-sm font-bold">
                                        <span>#3 Amit Patel</span>
                                        <span className="text-blue-400">89%</span>
                                    </div>
                                    <div className="flex justify-between p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-sm font-bold shadow-glow">
                                        <span className="text-blue-400 font-black italic">#4 YOU ({student.firstName})</span>
                                        <span className="text-blue-400">85%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;