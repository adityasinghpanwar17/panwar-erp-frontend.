import React, { useState } from 'react';
import StudentService from '../services/StudentService';

const CreateStudentComponent = () => {
    // 🌟 1. Match the state names to your new Java Entity
    const [student, setStudent] = useState({ 
        firstName: '', 
        lastName: '', 
        course: '', 
        emailId: '',
        phoneNumber: '',
        totalFees: 0, 
        paidAmount: 0, // Changed from feesPaid to match Java paidAmount
        password: 'password123' // Default password for new students
    });

    const saveStudent = (e) => {
        e.preventDefault();
        console.log("Saving Student: ", student); // Helpful for debugging
        StudentService.createStudent(student).then(() => {
            alert("Student added to Panwar Coaching Classes!");
            window.location.reload(); 
        }).catch(err => {
            console.error("Save failed:", err);
            alert("Error saving student. Check IntelliJ console.");
        });
    };

    return (
        <div className="container mt-3">
            <div className="card col-md-6 offset-md-3 shadow border-0">
                <h3 className="text-center mt-3 fw-bold text-primary">Register New Student</h3>
                <div className="card-body">
                    <form>
                        {/* --- FIRST NAME --- */}
                        <div className="form-group mb-2">
                            <label className="fw-bold"> First Name: </label>
                            <input placeholder="Enter First Name" className="form-control" 
                                value={student.firstName} onChange={(e) => setStudent({...student, firstName: e.target.value})}/>
                        </div>

                        {/* --- LAST NAME (New) --- */}
                        <div className="form-group mb-2">
                            <label className="fw-bold"> Last Name: </label>
                            <input placeholder="Enter Last Name" className="form-control" 
                                value={student.lastName} onChange={(e) => setStudent({...student, lastName: e.target.value})}/>
                        </div>

                        {/* --- EMAIL (Required for Login) --- */}
                        <div className="form-group mb-2">
                            <label className="fw-bold"> Email ID: </label>
                            <input type="email" placeholder="Email (will be used for login)" className="form-control" 
                                value={student.emailId} onChange={(e) => setStudent({...student, emailId: e.target.value})}/>
                        </div>

                        {/* --- PHONE NUMBER (New) --- */}
                        <div className="form-group mb-2">
                            <label className="fw-bold"> Mobile Number: </label>
                            <input placeholder="91XXXXXXXX" className="form-control" 
                                value={student.phoneNumber} onChange={(e) => setStudent({...student, phoneNumber: e.target.value})}/>
                        </div>

                        {/* --- COURSE --- */}
                        <div className="form-group mb-2">
                            <label className="fw-bold"> Course: </label>
                            <input placeholder="e.g. Java Full Stack" className="form-control" 
                                value={student.course} onChange={(e) => setStudent({...student, course: e.target.value})}/>
                        </div>

                        {/* --- FEES --- */}
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group mb-2">
                                    <label className="fw-bold">Total Fee (₹):</label>
                                    <input type="number" className="form-control" 
                                        value={student.totalFees} onChange={(e) => setStudent({...student, totalFees: e.target.value})}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-2">
                                    <label className="fw-bold">Initial Deposit (₹):</label>
                                    <input type="number" className="form-control" 
                                        value={student.paidAmount} onChange={(e) => setStudent({...student, paidAmount: e.target.value})}/>
                                </div>
                            </div>
                        </div>

                        <button className="btn btn-primary w-100 mt-3 fw-bold shadow-sm" onClick={saveStudent}>REGISTER STUDENT</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateStudentComponent;