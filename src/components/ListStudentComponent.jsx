import React, { useState, useEffect } from 'react';
import StudentService from '../services/StudentService';

const ListStudentComponent = () => {
    const [students, setStudents] = useState([]);
    const [editStudent, setEditStudent] = useState(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = () => {
        StudentService.getAllStudents().then((res) => {
            setStudents(res.data);
        });
    };

    const deleteStudent = (id) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            StudentService.deleteStudent(id).then(res => {
                setStudents(students.filter(student => student.id !== id));
            });
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        // Match the updated variables to Java Backend
        StudentService.updateStudent(editStudent, editStudent.id).then(() => {
            setEditStudent(null);
            fetchStudents();
        });
    };

    return (
        <div className="container mt-5 pb-5">
            <h2 className="text-center mb-4 fw-bold text-dark">Panwar Coaching - Student Dashboard</h2>
            
            <div className="card shadow-lg border-0">
                <div className="card-body">

                {/* --- EDIT SECTION --- */}
                {editStudent && (
                    <div className="card mb-4 border-primary shadow-sm bg-light animate__animated animate__fadeIn">
                        <div className="card-body">
                            <h5 className="card-title text-primary fw-bold">Editing: {editStudent.firstName} {editStudent.lastName}</h5>
                            <div className="row g-3">
                                <div className="col-md-3">
                                    <label className="small fw-bold">First Name</label>
                                    <input type="text" className="form-control" 
                                        value={editStudent.firstName} 
                                        onChange={(e) => setEditStudent({...editStudent, firstName: e.target.value})} />
                                </div>
                                <div className="col-md-3">
                                    <label className="small fw-bold">Phone Number</label>
                                    <input type="text" className="form-control" 
                                        value={editStudent.phoneNumber} 
                                        onChange={(e) => setEditStudent({...editStudent, phoneNumber: e.target.value})} />
                                </div>
                                <div className="col-md-2">
                                    <label className="small fw-bold">Total Fee (₹)</label>
                                    <input type="number" className="form-control" 
                                        value={editStudent.totalFees || 0} 
                                        onChange={(e) => setEditStudent({...editStudent, totalFees: parseFloat(e.target.value) || 0})} />
                                </div>
                                <div className="col-md-2">
                                    <label className="small fw-bold">Paid (₹)</label>
                                    <input type="number" className="form-control" 
                                        value={editStudent.paidAmount || 0} 
                                        onChange={(e) => setEditStudent({...editStudent, paidAmount: parseFloat(e.target.value) || 0})} />
                                </div>
                                <div className="col-md-2 d-flex align-items-end">
                                    <button className="btn btn-primary w-100 fw-bold" onClick={handleUpdate}>UPDATE</button>
                                </div>
                            </div>
                            <button className="btn btn-link btn-sm text-danger mt-2" onClick={() => setEditStudent(null)}>Cancel</button>
                        </div>
                    </div>
                )}

                    {/* --- STUDENT TABLE --- */}
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th>Roll No</th>
                                    <th>Full Name</th>
                                    <th>Contact</th>
                                    <th>Course</th>
                                    <th>Total (₹)</th>
                                    <th>Paid (₹)</th>
                                    <th>Balance (₹)</th>
                                    <th>Status</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map(student => (
                                    <tr key={student.id}>
                                        <td className="fw-bold text-muted"> {student.rollNumber || 'N/A'} </td>
                                        {/* 🌟 Use firstName and lastName instead of name */}
                                        <td> {student.firstName} {student.lastName} </td>
                                        <td> {student.phoneNumber} </td>
                                        <td> {student.course} </td>
                                        <td> ₹{student.totalFees || 0} </td>
                                        {/* 🌟 Use paidAmount instead of feesPaid */}
                                        <td> ₹{student.paidAmount || 0} </td>
                                        <td className="text-danger fw-bold"> 
                                            ₹{(student.totalFees || 0) - (student.paidAmount || 0)} 
                                        </td>
                                        <td>
                                            <span className={`badge ${student.paidAmount >= student.totalFees && student.totalFees > 0 ? 'bg-success' : 'bg-warning text-dark'}`}>
                                                {student.paidAmount >= student.totalFees && student.totalFees > 0 ? 'Fully Paid' : 'Pending'}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <button className="btn btn-outline-info btn-sm me-2 fw-bold" 
                                                onClick={() => setEditStudent(student)}>
                                                EDIT
                                            </button>
                                            <button className="btn btn-outline-danger btn-sm fw-bold" 
                                                onClick={() => deleteStudent(student.id)}>
                                                DEL
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListStudentComponent;