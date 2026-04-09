import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminQuizComponent = () => {
    const [questions, setQuestions] = useState([]);
    const [mode, setMode] = useState("QUIZ"); // Toggle: QUIZ or CODE
    const [formData, setFormData] = useState({
        type: 'QUIZ', title: '', content: '', 
        optionA: '', optionB: '', optionC: '', optionD: '', 
        correctAnswer: 'A', starterCode: 'public class Solution {\n    public static void main(String[] args) {\n        \n    }\n}'
    });

    useEffect(() => { fetchQuestions(); }, []);

    const fetchQuestions = () => {
        axios.get("http://localhost:8080/api/questions").then(res => setQuestions(res.data));
    };

    const handleSave = () => {
        axios.post("http://localhost:8080/api/questions", {...formData, type: mode})
            .then(() => {
                alert("Question added to Panwar Database!");
                fetchQuestions();
                // Reset form
                setFormData({...formData, title: '', content: ''});
            });
    };

    return (
        <div className="container mt-4 pb-5">
            <div className="card shadow-sm p-4 border-0 mb-5 bg-white">
                <h2 className="mb-4 fw-bold">Add New Exam Question</h2>
                
                {/* 🧭 Type Selector */}
                <div className="btn-group mb-4 w-100 shadow-sm" style={{borderRadius: '10px', overflow: 'hidden'}}>
                    <button className={`btn py-2 fw-bold ${mode === 'QUIZ' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setMode('QUIZ')}>Theory Quiz (MCQ)</button>
                    <button className={`btn py-2 fw-bold ${mode === 'CODE' ? 'btn-success' : 'btn-outline-success'}`} onClick={() => setMode('CODE')}>Coding Challenge</button>
                </div>

                {mode === 'QUIZ' ? (
                    /* --- THEORY QUIZ FORM --- */
                    <div className="row g-3 animate__animated animate__fadeIn">
                        <div className="col-12">
                            <label className="fw-bold">Question Text</label>
                            <input type="text" className="form-control" placeholder="Enter Question" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
                        </div>
                        <div className="col-md-6"><input type="text" className="form-control" placeholder="Option A" onChange={e => setFormData({...formData, optionA: e.target.value})} /></div>
                        <div className="col-md-6"><input type="text" className="form-control" placeholder="Option B" onChange={e => setFormData({...formData, optionB: e.target.value})} /></div>
                        <div className="col-md-6"><input type="text" className="form-control" placeholder="Option C" onChange={e => setFormData({...formData, optionC: e.target.value})} /></div>
                        <div className="col-md-6"><input type="text" className="form-control" placeholder="Option D" onChange={e => setFormData({...formData, optionD: e.target.value})} /></div>
                        <div className="col-12">
                            <select className="form-select border-primary" onChange={e => setFormData({...formData, correctAnswer: e.target.value})}>
                                <option value="A">Correct Answer: A</option>
                                <option value="B">Correct Answer: B</option>
                                <option value="C">Correct Answer: C</option>
                                <option value="D">Correct Answer: D</option>
                            </select>
                        </div>
                    </div>
                ) : (
                    /* --- CODING CHALLENGE FORM --- */
                    <div className="row g-3 animate__animated animate__fadeIn">
                        <div className="col-12">
                            <label className="fw-bold">Problem Title</label>
                            <input type="text" className="form-control" placeholder="e.g. Reverse a Number" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                        </div>
                        <div className="col-12">
                            <label className="fw-bold">Problem Description</label>
                            <textarea className="form-control" placeholder="Explain the logic required..." rows="3" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})}></textarea>
                        </div>
                        <div className="col-12">
                            <label className="fw-bold text-success">Starter Code (Template)</label>
                            <textarea className="form-control font-monospace bg-dark text-info" rows="6" value={formData.starterCode} onChange={e => setFormData({...formData, starterCode: e.target.value})}></textarea>
                        </div>
                    </div>
                )}
                
                <button className="btn btn-dark mt-4 py-3 fw-bold shadow-sm" onClick={handleSave}>
                    UPLOAD TO SERVER
                </button>
            </div>

            {/* --- LIST OF CURRENT QUESTIONS --- */}
            <div className="card shadow-sm border-0 p-4 bg-white">
                <h4 className="fw-bold mb-3 text-secondary">Manage Exam Questions ({questions.length})</h4>
                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>Type</th>
                                <th>Question / Title</th>
                                <th className="text-end">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map(q => (
                                <tr key={q.id}>
                                    <td><span className={`badge ${q.type === 'CODE' ? 'bg-success' : 'bg-primary'}`}>{q.type}</span></td>
                                    <td><span className="text-truncate d-inline-block" style={{maxWidth: '300px'}}>{q.type === 'CODE' ? q.title : q.content}</span></td>
                                    <td className="text-end">
                                        <button className="btn btn-outline-danger btn-sm" onClick={() => axios.delete(`http://localhost:8080/api/questions/${q.id}`).then(fetchQuestions)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminQuizComponent;