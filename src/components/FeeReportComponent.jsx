import React, { useState, useEffect } from 'react';
import StudentService from '../services/StudentService';

const FeeReportComponent = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        StudentService.getAllStudents().then((res) => {
            setStudents(res.data);
        });
    }, []);

    return (
        <div className="container mt-4 animate__animated animate__fadeIn">
            <div className="card shadow-sm border-0 p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold text-primary">💰 Fee Collection Report</h2>
                    <button className="btn btn-success fw-bold" onClick={() => window.print()}>🖨️ Export PDF</button>
                </div>

                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>Roll No</th>
                                <th>Student Name</th>
                                <th>Total Fee</th>
                                <th>Paid</th>
                                <th>Balance</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(s => {
                                const balance = (s.totalFees || 0) - (s.paidAmount || 0);
                                return (
                                    <tr key={s.id}>
                                        <td className="fw-bold text-muted">{s.rollNumber}</td>
                                        <td>{s.firstName} {s.lastName}</td>
                                        <td>₹{s.totalFees}</td>
                                        <td className="text-success fw-bold">₹{s.paidAmount}</td>
                                        <td className={`fw-bold ${balance > 0 ? 'text-danger' : 'text-success'}`}>
                                            ₹{balance}
                                        </td>
                                        <td>
                                            {balance > 0 ? 
                                                <span className="badge bg-danger">PENDING</span> : 
                                                <span className="badge bg-success">CLEAR</span>
                                            }
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FeeReportComponent;