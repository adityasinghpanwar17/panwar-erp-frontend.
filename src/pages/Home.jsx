import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaJava, FaReact, FaCode, FaWhatsapp, FaPython, FaNodeJs,
  FaLaptopCode, FaChartLine, FaTimes, FaCheckCircle, 
  FaMapMarkerAlt, FaUserGraduate, FaExternalLinkAlt, FaHtml5,FaBars
} from 'react-icons/fa';

const Home = () => {
  const [showSyllabus, setShowSyllabus] = useState(false);
  const [activeTab, setActiveTab] = useState('java');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const syllabusData = {
    java: [
      { title: "Basics & Flow Control", topics: "Variables, Data Types, Scanner, If-Else, Switch, Loops" },
      { title: "OOP Mastery", topics: "Classes, Objects, Inheritance, Polymorphism, Abstraction, Encapsulation" },
      { title: "Collections Framework", topics: "ArrayList, LinkedList, HashSet, HashMap, TreeMap" },
      { title: "Spring Boot Backend", topics: "REST APIs, Dependency Injection, JPA/Hibernate, MySQL" }
    ],
    python: [
      { title: "Fundamentals", topics: "Variables, Operators, Flow Control, Loops, Lists, Tuples" },
      { title: "Functional Python", topics: "Zip, Filter, Lambda, Map, Comprehensions" },
      { title: "OOPs with Python", topics: "Methods, Members, Inheritance, Polymorphism" },
      { title: "Pro Concepts", topics: "Exceptions, File Handling, Advance Python Logic" }
    ],
    fullstack: [
      { title: "Frontend Mastery", topics: "HTML5, CSS3 (Flex/Grid), JavaScript (DOM, ES6+, Async)" },
      { title: "React JS", topics: "Hooks (State, Effect, Context, Ref), Component Lifecycle" },
      { title: "Backend & DB", topics: "Node.js, Express, MongoDB, Mongoose, SQL Joins, Auth" },
      { title: "Django Framework", topics: "Models, Templates, Auth, Migrations, Full Blog Project" }
    ]
  };

  return (
    <div className="bg-[#0f172a] text-white min-h-screen font-sans relative">
      
      {/* --- SYLLABUS POPUP --- */}
      {showSyllabus && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-[#1e293b] border border-slate-700 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[2rem] p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-8 sticky top-0 bg-[#1e293b] pb-4 z-10 border-b border-slate-700">
              <h2 className="text-3xl font-black text-blue-500 uppercase italic">Course Details</h2>
              <button onClick={() => setShowSyllabus(false)} className="text-slate-400 hover:text-white text-3xl transition">
                <FaTimes />
              </button>
            </div>
            <div className="flex gap-2 mb-10 bg-slate-900 p-2 rounded-2xl border border-slate-800">
              <button onClick={() => setActiveTab('java')} className={`flex-1 py-3 rounded-xl font-bold transition-all ${activeTab === 'java' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>JAVA</button>
              <button onClick={() => setActiveTab('python')} className={`flex-1 py-3 rounded-xl font-bold transition-all ${activeTab === 'python' ? 'bg-yellow-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>PYTHON</button>
              <button onClick={() => setActiveTab('fullstack')} className={`flex-1 py-3 rounded-xl font-bold transition-all ${activeTab === 'fullstack' ? 'bg-green-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>FULL STACK</button>
            </div>
            <div className="grid gap-4">
              {syllabusData[activeTab].map((item, index) => (
                <div key={index} className="flex gap-6 p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                  <FaCheckCircle className={`${activeTab === 'java' ? 'text-blue-500' : activeTab === 'python' ? 'text-yellow-500' : 'text-green-500'}`} />
                  <div>
                    <h4 className="font-bold text-xl mb-1">{item.title}</h4>
                    <p className="text-slate-400 leading-relaxed italic">{item.topics}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}


     <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#0f172a]/80 border-b border-slate-800 p-4">
  <div className="max-w-7xl mx-auto flex justify-between items-center">
    <h2 className="text-xl md:text-2xl font-black tracking-tighter text-blue-500">PANWAR<span className="text-white">COACHING</span></h2>
    
    {/* Desktop Menu (Visible on Desktop) */}
    <div className="space-x-8 hidden md:flex items-center">
      <a href="#features" className="hover:text-blue-400 no-underline text-white font-bold text-sm">Features</a>
      <a href="#courses" className="hover:text-blue-400 no-underline text-white font-bold text-sm">Courses</a>
      <a href="https://aditya-portfolio-six-green.vercel.app/" target="_blank" className="text-slate-300 no-underline font-bold text-sm">About Founder</a>
      <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold no-underline text-sm">ERP Login</Link>
    </div>

    {/* 🍔 Mobile Toggle (Visible on Mobile) */}
    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-2xl text-blue-500">
      {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
    </button>
  </div>

  {/* 📱 Mobile Dropdown Menu */}
  {isMobileMenuOpen && (
    <div className="md:hidden bg-[#1e293b] absolute top-full left-0 w-full p-6 border-b border-slate-700 flex flex-col gap-4">
      <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-white no-underline">Features</a>
      <a href="#courses" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-white no-underline">Courses</a>
      <a href="https://aditya-portfolio-six-green.vercel.app/" target="_blank" className="text-lg font-bold text-blue-400 no-underline">About Founder</a>
      <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="bg-blue-600 text-center py-3 rounded-xl font-bold no-underline text-white">ERP Login</Link>
    </div>
  )}
</nav>

      {/* --- HERO --- */}
      <header className="pt-24 pb-20 px-6 text-center">
        <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter uppercase leading-[0.9]">Code Like <br/>A <span className="text-blue-500 italic">Pro.</span></h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            Sanawad's premier academy following the GfG curriculum. We build engineers, not just coders.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
            {/* WhatsApp Demo Button */}
            <a 
                href="https://wa.me/7879370732?text=Hi%20Aditya%2C%20I%20am%20interested%20in%20a%20Free%20Demo%20Class%20at%20Panwar%20Coaching." 
                target="_blank" 
                rel="noreferrer"
                className="no-underline w-full sm:w-auto bg-[#25D366] hover:bg-[#128C7E] text-white px-10 py-4 rounded-2xl flex items-center justify-center text-xl font-black transition-all shadow-xl shadow-green-500/20 group"
            >
                <FaWhatsapp className="mr-3 text-3xl group-hover:scale-110 transition-transform" /> 
                BOOK FREE DEMO
            </a>

            {/* View Syllabus Button */}
            <button 
                onClick={() => setShowSyllabus(true)} 
                className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white px-10 py-4 rounded-2xl flex items-center justify-center text-xl font-bold border border-slate-700 transition-all"
            >
                VIEW ALL COURSES
            </button>
        </div>
      </header>

      {/* --- FOUNDER BADGE --- */}
      <section className="py-12 bg-slate-800/30 border-y border-slate-800">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
             <div className="h-14 w-14 rounded-full bg-blue-500 flex items-center justify-center text-3xl shadow-lg shadow-blue-500/30 font-bold text-white">AP</div>
             <div>
               <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Founder & Lead Mentor</p>
               <h4 className="font-extrabold text-2xl">Aditya Panwar, B.Tech CSE</h4>
             </div>
          </div>
          <a 
            href="https://aditya-portfolio-six-green.vercel.app/" 
            target="_blank" 
            rel="noreferrer"
            className="text-blue-400 font-bold flex items-center gap-2 hover:underline no-underline border border-blue-400/30 px-6 py-2 rounded-full bg-blue-400/5 transition"
          >
            <FaLaptopCode /> View My Portfolio
          </a>
        </div>
      </section>

      {/* --- COURSE LOGO GRID --- */}
      <section id="courses" className="py-24 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-black mb-16 uppercase tracking-widest text-slate-500">Learning Tracks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div onClick={() => {setActiveTab('java'); setShowSyllabus(true)}} className="cursor-pointer group p-10 rounded-[2.5rem] bg-slate-800/40 border border-slate-800 hover:border-blue-500/50 transition-all">
            <FaJava className="text-7xl text-orange-500 mx-auto mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-3xl font-black mb-2 uppercase">JAVA</h3>
            <p className="text-slate-400 font-bold underline decoration-blue-500 decoration-2 underline-offset-4">Click for Syllabus</p>
          </div>
          <div onClick={() => {setActiveTab('python'); setShowSyllabus(true)}} className="cursor-pointer group p-10 rounded-[2.5rem] bg-slate-800/40 border border-slate-800 hover:border-yellow-500/50 transition-all">
            <FaPython className="text-7xl text-yellow-400 mx-auto mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-3xl font-black mb-2 uppercase">PYTHON</h3>
            <p className="text-slate-400 font-bold underline decoration-yellow-500 decoration-2 underline-offset-4">Click for Syllabus</p>
          </div>
          <div onClick={() => {setActiveTab('fullstack'); setShowSyllabus(true)}} className="cursor-pointer group p-10 rounded-[2.5rem] bg-slate-800/40 border border-slate-800 hover:border-green-500/50 transition-all">
            <div className="flex justify-center gap-4 mb-6">
              <FaHtml5 className="text-5xl text-orange-600" />
              <FaReact className="text-6xl text-cyan-400 group-hover:scale-110 transition-transform" />
              <FaNodeJs className="text-5xl text-green-500" />
            </div>
            <h3 className="text-3xl font-black mb-2 uppercase">FULL STACK</h3>
            <p className="text-slate-400 font-bold underline decoration-green-500 decoration-2 underline-offset-4">Click for Syllabus</p>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto border-t border-slate-800">
        <h2 className="text-4xl font-black text-center mb-16 tracking-tighter">The Panwar Digital Edge</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="p-10 rounded-[2.5rem] bg-slate-800/50 border border-slate-700 text-center">
            <FaChartLine className="text-5xl text-blue-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-3 uppercase">Live Progress ERP</h3>
            <p className="text-slate-400">Track attendance, fees, and test scores on your custom dashboard.</p>
          </div>
          <div className="p-10 rounded-[2.5rem] bg-slate-800/50 border border-slate-700 text-center border-blue-500/30">
            <FaUserGraduate className="text-5xl text-purple-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-3 uppercase">Placement Ready</h3>
            <p className="text-slate-400">GfG-based curriculum to help you crack technical interviews.</p>
          </div>
          <div className="p-10 rounded-[2.5rem] bg-slate-800/50 border border-slate-700 text-center">
            <FaLaptopCode className="text-5xl text-green-500 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-3 uppercase">Real Projects</h3>
            <p className="text-slate-400">Work on live systems like the ones in my professional portfolio.</p>
          </div>
        </div>
      </section>

      {/* --- LOCATION --- */}
      <section id="location" className="py-24 px-6 bg-slate-800/20 border-y border-slate-800">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl font-black mb-8 uppercase leading-tight">Visit Our <br/><span className="text-blue-500">Academy</span></h2>
            <div className="flex gap-4 items-start mb-10 text-white">
                <FaMapMarkerAlt className="text-blue-500 text-3xl mt-1 shrink-0" />
                <p className="text-slate-300 text-xl font-bold leading-relaxed">
                  House Number 25, First Right,<br />
                  Shreenath Residency, Sanawad,<br />
                  Madhya Pradesh 451111
                </p>
            </div>
            <a 
              href="https://maps.google.com/?q=Shreenath+Residency+Sanawad" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-black text-lg transition-all shadow-xl shadow-blue-500/20 no-underline"
            >
               Get Directions
            </a>
          </div>
          <div className="rounded-[3rem] overflow-hidden border-4 border-slate-800 shadow-2xl h-[450px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3695.7324838380295!2d76.0645059!3d22.1733678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39626350f47f6d2f%3A0xf9f7be57353c251f!2sShreenath%20Residency!5e0!3m2!1sen!2sin!4v1712648000000!5m2!1sen!2sin" 
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-16 text-center">
         <p className="text-slate-600 font-black uppercase tracking-widest mb-6">Panwar Coaching Classes © 2026</p>
         <div className="flex justify-center gap-10 text-3xl">
            <a href="https://wa.me/7879370732" className="text-slate-500 hover:text-green-500 transition-colors"><FaWhatsapp /></a>
            <a href="https://aditya-portfolio-six-green.vercel.app/" className="text-slate-500 hover:text-blue-400 transition-colors"><FaLaptopCode /></a>
         </div>
      </footer>
    </div>
  );
};

export default Home;