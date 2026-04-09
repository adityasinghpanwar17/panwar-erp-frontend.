import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Editor from "@monaco-editor/react";

const CodingTestComponent = () => {
    const [testMode, setTestMode] = useState(null);
    const [quizQuestions, setQuizQuestions] = useState([]); // 👈 Separate Quiz list
    const [codeChallenges, setCodeChallenges] = useState([]); // 👈 Separate Code list
    const [currentIdx, setCurrentIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [userCode, setUserCode] = useState("");
    const [isFinished, setIsFinished] = useState(false);

    // 🌟 FETCH ALL DATA AND FILTER
    useEffect(() => {
        axios.get("http://localhost:8080/api/questions")
            .then(res => {
                // Separate questions by their 'type' column in TiDB
                setQuizQuestions(res.data.filter(q => q.type === 'QUIZ'));
                setCodeChallenges(res.data.filter(q => q.type === 'CODE'));
            })
            .catch(err => console.error("Database connection failed:", err));
    }, []);

    // Set starter code when a coding challenge loads
    useEffect(() => {
        if (testMode === 'CODE' && codeChallenges[currentIdx]) {
            setUserCode(codeChallenges[currentIdx].starterCode);
        }
    }, [testMode, currentIdx, codeChallenges]);

    const handleQuizAnswer = (ans) => {
        if (ans === quizQuestions[currentIdx].correctAnswer) setScore(score + 1);
        if (currentIdx + 1 < quizQuestions.length) setCurrentIdx(currentIdx + 1);
        else setIsFinished(true);
    };

    // --- 1. SELECTION SCREEN ---
    if (!testMode) {
        return (
            <div className="container mt-5 text-center">
                <h2 className="mb-4 fw-bold text-dark">Panwar Exam Portal</h2>
                <div className="row justify-content-center g-4">
                    <div className="col-md-5">
                        <div className="card shadow-lg border-0 p-4 h-100 btn btn-outline-primary" onClick={() => {setTestMode('QUIZ'); setCurrentIdx(0);}}>
                            <h3>Theory Quiz</h3>
                            <p>Available: {quizQuestions.length} Questions</p>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="card shadow-lg border-0 p-4 h-100 btn btn-outline-success" onClick={() => {setTestMode('CODE'); setCurrentIdx(0);}}>
                            <h3>Coding Lab</h3>
                            <p>Available: {codeChallenges.length} Challenges</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --- 2. CODING CHALLENGE MODE ---
    if (testMode === 'CODE') {
        const currentChallenge = codeChallenges[currentIdx];
        if (!currentChallenge) return <div className="text-center mt-5">No Coding Challenges Found.</div>;

        return (
            <div className="container-fluid mt-4">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card shadow-sm p-3 h-100 bg-light border-0">
                            <h4 className="text-success fw-bold border-bottom pb-2">{currentChallenge.title}</h4>
                            <div className="mt-3 p-2 bg-white rounded border" style={{whiteSpace: 'pre-wrap'}}>
                                {currentChallenge.content}
                            </div>
                            <div className="mt-auto d-flex justify-content-between">
                                <button className="btn btn-secondary btn-sm" onClick={() => setTestMode(null)}>Exit</button>
                                <div>
                                    <button className="btn btn-dark btn-sm me-2" disabled={currentIdx === 0} onClick={() => setCurrentIdx(currentIdx - 1)}>Prev</button>
                                    <button className="btn btn-dark btn-sm" disabled={currentIdx === codeChallenges.length - 1} onClick={() => setCurrentIdx(currentIdx + 1)}>Next</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card shadow-lg border-0 overflow-hidden">
                            <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                                <span>Java IDE</span>
                                <button className="btn btn-success btn-sm px-4 fw-bold" onClick={() => alert("Solution Submitted!")}>SUBMIT CODE</button>
                            </div>
                            <Editor
                                height="600px"
                                defaultLanguage="java"
                                theme="vs-dark"
                                value={userCode}
                                onChange={(value) => setUserCode(value)}
                                options={{ fontSize: 16, minimap: { enabled: false }, automaticLayout: true }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --- 3. THEORY QUIZ MODE ---
    const currentQ = quizQuestions[currentIdx];
    return (
        <div className="container mt-4">
            {isFinished ? (
                <div className="text-center p-5 card shadow border-0 animate__animated animate__fadeIn">
                    <h2 className="text-primary">Quiz Completed!</h2>
                    <h3 className="my-4 text-success">Final Score: {score} / {quizQuestions.length}</h3>
                    <button className="btn btn-primary px-5" onClick={() => window.location.reload()}>Finish</button>
                </div>
            ) : (
                <div className="card shadow-lg p-4 border-0">
                    <h5 className="text-muted mb-3 text-uppercase">Theory Question {currentIdx + 1}</h5>
                    <h4 className="mb-4 fw-bold">{currentQ?.content}</h4>
                    <div className="d-grid gap-3">
                        {['A', 'B', 'C', 'D'].map(opt => (
                            <button key={opt} className="btn btn-outline-dark text-start p-3 shadow-sm" onClick={() => handleQuizAnswer(opt)}>
                                <strong className="text-primary">{opt}:</strong> {currentQ?.['option' + opt]}
                            </button>
                        ))}
                    </div>
                    <button className="btn btn-link text-danger mt-4" onClick={() => setTestMode(null)}>Cancel Test</button>
                </div>
            )}
        </div>
    );
};

export default CodingTestComponent;