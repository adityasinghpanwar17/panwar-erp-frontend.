import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // <--- ADD THIS LINE
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
      { title: "Java Basics & Flow Control", topics: ["Variables & Data Types", "Input & Output", "Operators", "Flow Control (If-Else, Switch)", "Loops (For, While)", "Functions"] },
      { title: "OOPs & Data Structures", topics: ["Arrays & Strings", "Classes & Objects", "Inheritance & Polymorphism", "Abstraction & Encapsulation", "Exception Handling", "Multithreading & File I/O"] },
      { title: "Collections Framework", topics: ["ArrayList & LinkedList", "Stack & Queue", "HashSet & TreeSet", "HashMap & TreeMap", "Streams & Lambda Expressions", "Sorting & Algorithms"] }
    ],
    python: [
      { title: "Python Basics", topics: ["Variables & Data Types", "Input & Output", "Operators", "Flow Control", "Loops", "Functions", "Strings & Lists"] },
      { title: "Object Oriented Programming", topics: ["Classes & Objects", "Inheritance", "Polymorphism", "Methods & Members"] },
      { title: "Advanced Python", topics: ["Special Functions (Zip, Filter, Lambda, Map)", "Exception Handling", "File Handling", "Python Contests"] }
    ],
    fullstack: [
      { title: "Frontend Core", topics: ["HTML5 Tags & Forms", "CSS3 Flexbox & Grid", "CSS Animations", "JavaScript DOM & ES6+", "React Components & State", "React Hooks (useEffect, useRef)"] },
      { title: "Backend & Database", topics: ["Node.js & Express", "HTTP Modules & Web Servers", "MongoDB & Mongoose CRUD", "API Auth & Security", "SQL Keys & Joins", "Django Framework & REST APIs"] }
    ],
    csCore: [
      { title: "Computer Science Core", topics: ["Operating Systems (Process, Memory, Deadlocks)", "DBMS & SQL (Normal Forms, ER Models, Joins)", "Computer Networks (Data Link, Transport, Network Layer)", "Most Asked Interview Questions"] }
    ],
    csharp: [
      { title: "C# .NET Track", topics: ["C# Basics & Flow Control", "Arrays & Strings", "OOPs Concepts & Methods", "Exception Handling", "C# Collections Framework", "Hands-On Practical Projects"] }
    ]
  };

  return (
    <div className="bg-[#0f172a] text-white min-h-screen font-sans relative">
      
      {/* --- SYLLABUS POPUP MODAL --- */}
{showSyllabus && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-[#1e293b] border border-slate-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] p-8 shadow-2xl"
    >
      {/* Modal Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-700">
        <h2 className="text-3xl font-black text-blue-500 uppercase italic">Course Details</h2>
        <button 
          onClick={() => setShowSyllabus(false)} 
          className="text-slate-400 hover:text-white text-2xl p-2 transition"
        >
          <FaTimes />
        </button>
      </div>

      {/* SINGLE SCROLLABLE TAB BAR FOR ALL 5 COURSES */}
      <div className="flex gap-2 mb-8 bg-slate-900 p-2 rounded-2xl border border-slate-800 overflow-x-auto no-scrollbar">
        <button 
          onClick={() => setActiveTab('java')} 
          className={`px-5 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${activeTab === 'java' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
        >
          JAVA
        </button>
        <button 
          onClick={() => setActiveTab('python')} 
          className={`px-5 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${activeTab === 'python' ? 'bg-yellow-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
        >
          PYTHON
        </button>
        <button 
          onClick={() => setActiveTab('fullstack')} 
          className={`px-5 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${activeTab === 'fullstack' ? 'bg-green-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
        >
          FULL STACK
        </button>
        <button 
          onClick={() => setActiveTab('csCore')} 
          className={`px-5 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${activeTab === 'csCore' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
        >
          CS CORE
        </button>
        <button 
          onClick={() => setActiveTab('csharp')} 
          className={`px-5 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${activeTab === 'csharp' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
        >
          C# .NET
        </button>
      </div>

      {/* MODULE CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        {syllabusData[activeTab]?.map((module, index) => (
          <div 
            key={index} 
            className="p-6 rounded-2xl bg-slate-900/80 border border-slate-700/60 shadow-xl flex flex-col justify-between hover:border-blue-500/50 transition-all duration-300 group"
          >
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                <h3 className="text-xl font-black text-blue-400 uppercase tracking-wide group-hover:text-blue-300 transition-colors">
                  {module.title}
                </h3>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Module {index + 1}
                </span>
              </div>

              <ul className="space-y-2 mb-6">
                {module.topics.map((topic, tIdx) => (
                  <li key={tIdx} className="flex items-start text-slate-300 text-sm font-medium">
                    <span className="text-blue-500 mr-2 font-bold">•</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white font-bold text-sm transition-all duration-200 border border-slate-700/80 hover:border-blue-500 shadow-md">
              Explore Module
            </button>
          </div>
        ))}
      </div>
    </motion.div>
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
     {/* --- HERO SECTION --- */}
      <header className="pt-24 pb-20 px-6 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-9xl font-black mb-8 tracking-tighter uppercase leading-[0.9]"
        >
          Code Like <br/>A <span className="text-blue-500 italic">Pro.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
        >
          Sanawad's premier academy following the GfG curriculum. We build engineers, not just coders.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10"
        >
          <a 
            href="https://wa.me/7879370732?text=Hi%20Aditya%2C%20I%20am%20interested%20in%20a%20Free%20Demo%20Class%20at%20Panwar%20Coaching." 
            target="_blank" 
            rel="noreferrer"
            className="no-underline w-full sm:w-auto bg-[#25D366] hover:bg-[#128C7E] text-white px-10 py-4 rounded-2xl flex items-center justify-center text-xl font-black transition-all shadow-xl shadow-green-500/20 group hover:scale-105"
          >
            <FaWhatsapp className="mr-3 text-3xl group-hover:scale-110 transition-transform" /> 
            BOOK FREE DEMO
          </a>

          <button 
            onClick={() => setShowSyllabus(true)} 
            className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white px-10 py-4 rounded-2xl flex items-center justify-center text-xl font-bold border border-slate-700 transition-all hover:scale-105"
          >
            VIEW ALL COURSES
          </button>
        </motion.div>
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
      <motion.section 
        id="courses" 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-24 px-6 max-w-7xl mx-auto text-center"
      >
        <h2 className="text-3xl font-black mb-16 uppercase tracking-widest text-slate-500">Learning Tracks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          
          <motion.div 
            whileHover={{ y: -10 }}
            onClick={() => {setActiveTab('java'); setShowSyllabus(true)}} 
            className="cursor-pointer group p-10 rounded-[2.5rem] bg-slate-800/40 border border-slate-800 hover:border-blue-500/50 transition-all"
          >
            <FaJava className="text-7xl text-orange-500 mx-auto mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-3xl font-black mb-2 uppercase">JAVA</h3>
            <p className="text-slate-400 font-bold underline decoration-blue-500 decoration-2 underline-offset-4">Click for Syllabus</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            onClick={() => {setActiveTab('python'); setShowSyllabus(true)}} 
            className="cursor-pointer group p-10 rounded-[2.5rem] bg-slate-800/40 border border-slate-800 hover:border-yellow-500/50 transition-all"
          >
            <FaPython className="text-7xl text-yellow-400 mx-auto mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-3xl font-black mb-2 uppercase">PYTHON</h3>
            <p className="text-slate-400 font-bold underline decoration-yellow-500 decoration-2 underline-offset-4">Click for Syllabus</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            onClick={() => {setActiveTab('fullstack'); setShowSyllabus(true)}} 
            className="cursor-pointer group p-10 rounded-[2.5rem] bg-slate-800/40 border border-slate-800 hover:border-green-500/50 transition-all"
          >
            <div className="flex justify-center gap-4 mb-6">
              <FaHtml5 className="text-5xl text-orange-600" />
              <FaReact className="text-6xl text-cyan-400 group-hover:scale-110 transition-transform" />
              <FaNodeJs className="text-5xl text-green-500" />
            </div>
            <h3 className="text-3xl font-black mb-2 uppercase">FULL STACK</h3>
            <p className="text-slate-400 font-bold underline decoration-green-500 decoration-2 underline-offset-4">Click for Syllabus</p>
          </motion.div>

        </div>
      </motion.section>
     {/* --- BASIC PROJECTS SHOWCASE --- */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-800"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black uppercase tracking-tight">Basic Projects <span className="text-blue-500">You Will Build</span></h2>
          <p className="text-slate-400 font-medium mt-2">Hands-on practical coding from day one.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div 
            whileHover={{ y: -8 }}
            className="p-8 rounded-[2rem] bg-slate-800/40 border border-slate-800 hover:border-blue-500/40 transition-all"
          >
            <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full uppercase border border-blue-500/20">Java / C++</span>
            <h3 className="text-2xl font-bold mt-4 mb-2">Student Calculator & Logic App</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Build console tools to solve math problems, process user input, and master conditional flow and loops.</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -8 }}
            className="p-8 rounded-[2rem] bg-slate-800/40 border border-slate-800 hover:border-yellow-500/40 transition-all"
          >
            <span className="text-xs font-bold text-yellow-400 bg-yellow-500/10 px-3 py-1 rounded-full uppercase border border-yellow-500/20">Python</span>
            <h3 className="text-2xl font-bold mt-4 mb-2">CLI Quiz & Game Application</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Create an interactive command-line quiz application to master functions, arrays, and file handling.</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -8 }}
            className="p-8 rounded-[2rem] bg-slate-800/40 border border-slate-800 hover:border-green-500/40 transition-all"
          >
            <span className="text-xs font-bold text-green-400 bg-green-500/10 px-3 py-1 rounded-full uppercase border border-green-500/20">Web Basics</span>
            <h3 className="text-2xl font-bold mt-4 mb-2">Personal Portfolio Web Page</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Design and deploy your own responsive portfolio website using HTML, CSS, and basic JavaScript.</p>
          </motion.div>
        </div>
      </motion.section>

      {/* --- FEATURES SECTION --- */}
      <motion.section 
        id="features" 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-24 px-6 max-w-7xl mx-auto border-t border-slate-800"
      >
        <h2 className="text-4xl font-black text-center mb-16 tracking-tighter">The Panwar Digital Edge</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <motion.div whileHover={{ y: -6 }} className="p-10 rounded-[2.5rem] bg-slate-800/50 border border-slate-700 text-center">
            <FaChartLine className="text-5xl text-blue-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-3 uppercase">Live Progress ERP</h3>
            <p className="text-slate-400">Track attendance, fees, and test scores on your custom dashboard.</p>
          </motion.div>

          <motion.div whileHover={{ y: -6 }} className="p-10 rounded-[2.5rem] bg-slate-800/50 border border-slate-700 text-center border-blue-500/30">
            <FaUserGraduate className="text-5xl text-purple-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-3 uppercase">Placement Ready</h3>
            <p className="text-slate-400">GfG-based curriculum to help you crack technical interviews.</p>
          </motion.div>

          <motion.div whileHover={{ y: -6 }} className="p-10 rounded-[2.5rem] bg-slate-800/50 border border-slate-700 text-center">
            <FaLaptopCode className="text-5xl text-green-500 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-3 uppercase">Real Projects</h3>
            <p className="text-slate-400">Work on live systems like the ones in my professional portfolio.</p>
          </motion.div>
        </div>
      </motion.section>
      {/* --- TESTIMONIALS --- */}
<section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-800">
  <h2 className="text-4xl font-black text-center mb-12 uppercase">What Our Students Say</h2>
  <div className="grid md:grid-cols-2 gap-8">
    <div className="p-8 rounded-2xl bg-slate-800/40 border border-slate-800">
      <p className="text-slate-300 italic mb-4">"Learning Java and building real projects here helped me clear my technical interviews with confidence."</p>
      <h4 className="font-bold text-blue-400">- Ritick</h4>
      <p className="text-sm text-slate-500">B.Tech Student</p>
    </div>
    <div className="p-8 rounded-2xl bg-slate-800/40 border border-slate-800">
      <p className="text-slate-300 italic mb-4">"The practical web development training gave me hands-on practice with React and Node.js."</p>
      <h4 className="font-bold text-blue-400">- Rohit</h4>
      <p className="text-sm text-slate-500">Full Stack Learner</p>
    </div>
  </div>
</section>

{/* --- BATCH DETAILS & FEES --- */}
<section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-800">
  <div className="grid md:grid-cols-3 gap-8">
    <div className="p-8 rounded-3xl bg-slate-800/40 border border-slate-800 text-center">
      <h3 className="text-2xl font-bold mb-4">Batch Size</h3>
      <p className="text-4xl font-black text-blue-500 mb-2">Max 10</p>
      <p className="text-slate-400 text-sm">Students per batch for personalized attention & code reviews.</p>
    </div>
    <div className="p-8 rounded-3xl bg-slate-800/40 border border-slate-800 text-center">
      <h3 className="text-2xl font-bold mb-4">Course Duration</h3>
      <p className="text-4xl font-black text-green-500 mb-2">8–12 Weeks</p>
      <p className="text-slate-400 text-sm">Includes theory, hands-on labs, and real project work.</p>
    </div>
    <div className="p-8 rounded-3xl bg-slate-800/40 border border-slate-800 text-center">
      <h3 className="text-2xl font-bold mb-4">Certification</h3>
      <p className="text-4xl font-black text-purple-500 mb-2">Included</p>
      <p className="text-slate-400 text-sm">Verifiable Certificate of Completion upon project delivery.</p>
    </div>
  </div>
</section>
{/* --- BASIC PROJECTS SHOWCASE --- */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-800">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-black uppercase tracking-tight">
            Basic Projects <span className="text-blue-500">You Will Build</span>
          </h2>
          <p className="text-slate-400 font-medium mt-2">Hands-on practical coding from day one.</p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
          className="grid md:grid-cols-3 gap-8"
        >
          {/* Project 1 */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
            whileHover={{ y: -8 }}
            className="p-8 rounded-[2rem] bg-slate-800/40 border border-slate-800 hover:border-blue-500/40 transition-all"
          >
            <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full uppercase border border-blue-500/20">
              Java / C++
            </span>
            <h3 className="text-2xl font-bold mt-4 mb-2">Student Calculator & Logic App</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Build console tools to solve math problems, process user input, and master conditional flow and loops.
            </p>
          </motion.div>

          {/* Project 2 */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
            whileHover={{ y: -8 }}
            className="p-8 rounded-[2rem] bg-slate-800/40 border border-slate-800 hover:border-yellow-500/40 transition-all"
          >
            <span className="text-xs font-bold text-yellow-400 bg-yellow-500/10 px-3 py-1 rounded-full uppercase border border-yellow-500/20">
              Python
            </span>
            <h3 className="text-2xl font-bold mt-4 mb-2">CLI Quiz & Game Application</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Create an interactive command-line quiz application to master functions, arrays, and file handling.
            </p>
          </motion.div>

          {/* Project 3 */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
            whileHover={{ y: -8 }}
            className="p-8 rounded-[2rem] bg-slate-800/40 border border-slate-800 hover:border-green-500/40 transition-all"
          >
            <span className="text-xs font-bold text-green-400 bg-green-500/10 px-3 py-1 rounded-full uppercase border border-green-500/20">
              Web Basics
            </span>
            <h3 className="text-2xl font-bold mt-4 mb-2">Personal Portfolio Web Page</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Design and deploy your own responsive portfolio website using HTML, CSS, and basic JavaScript.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* --- LOCATION --- */}
      <section id="location" className="py-24 px-6 bg-slate-800/20 border-y border-slate-800"></section>
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
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2920.0828247856666!2d76.06224717404626!3d22.179204847276246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396299a4a5648819%3A0x29e8a157134de402!2sPanwar%20IT%20Academy%20-%20Java%20%26%20Full-Stack%20Training!5e1!3m2!1sen!2sin!4v1788671939971!5m2!1sen!2sin" width="600" height="450" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
          </div>
        </div>
      </section>
      {/* --- FAQ SECTION --- */}
<section className="py-20 px-6 max-w-5xl mx-auto border-t border-slate-800">
  <h2 className="text-4xl font-black text-center mb-12 uppercase">Frequently Asked Questions</h2>
  <div className="space-y-6">
    <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-800">
      <h4 className="text-lg font-bold text-white mb-2">Do I need prior coding experience?</h4>
      <p className="text-slate-400 text-sm">No. We cover basic programming logic and fundamentals before advancing to complex frameworks.</p>
    </div>
    <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-800">
      <h4 className="text-lg font-bold text-white mb-2">Will I receive a course completion certificate?</h4>
      <p className="text-slate-400 text-sm">Yes, students who successfully complete all hands-on assignments and projects receive an official Certificate of Completion.</p>
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