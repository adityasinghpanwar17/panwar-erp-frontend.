import axios from 'axios';

// This matches your Spring Boot URL
const API_URL = "http://localhost:8080/api/students";

class StudentService {
    // Get all students from TiDB Cloud
    getAllStudents() {
        return axios.get(API_URL);
    }

    // Save a new student to TiDB Cloud
    createStudent(student) {
        return axios.post(`${API_URL}/add`, student);
    }
    deleteStudent(studentId) {
        return axios.delete(API_URL + '/' + studentId);
    }

    updateStudent(student, studentId) {
        return axios.put(API_URL + '/' + studentId, student);
    }
    getStudentById(studentId) {
    return axios.get(API_URL + '/' + studentId);
}
}
const studentServiceInstance = new StudentService();
export default new StudentService();