//------------------ STUDENT CLASS ----------------------
//----------------------------------------------------------
const getStudents = () => JSON.parse(localStorage.getItem("students")) || [];
let students = getStudents();


class Student{
    id = ''
    name = ''
    email = ''
    password = ''
    grade = ''
    EEcontact = ''
    incapacity = ''
    gender = ''
    dateOfBirth = ''
    locality = ''
    disciplines = ''
    aboutMe = ''
    points = ''
    priority = 1
    constructor(id, name, email, password, grade, EEcontact, incapacity, gender, dateOfBirth, locality, disciplines, aboutMe, points, priority){
        this.id = id
        this.name = name
        this.email = email
        this.password = password
        this.grade = grade
        this.EEcontact = EEcontact
        this.incapacity = incapacity
        this.gender = gender
        this.dateOfBirth = dateOfBirth
        this.locality = locality
        this.disciplines = disciplines
        this.aboutMe = aboutMe
        this.points = points || 0
        this.priority = priority
        this.favourites = []
    }
}

function addStudent(id, name, email, password, grade, EEcontact, incapacity, gender, dateOfBirth, locality, disciplines, aboutMe){
    const points = 0
    const priority = 1
    let favourites = []
    const student = new Student (id, name, email, password, grade, EEcontact, incapacity, gender, dateOfBirth, locality, disciplines, aboutMe, points, priority, favourites)
    students.push(student)
    localStorage.setItem("students", JSON.stringify(students));
    return student
}

function addFavouriteTeacher(studentId, teacherId) {
    const students = getStudents();
    const student = students.find(s => s.id == studentId);
    if (student && !student.favourites.includes(teacherId)) { // Check if the teacher is already favourited
        student.favourites.push(teacherId);                   // Add the teacher to favourites
        localStorage.setItem("students", JSON.stringify(students)); // Update localStorage
    }
}

function removeFavouriteTeacher(studentId, teacherId) {
    const students = getStudents();
    const student = students.find(s => s.id == studentId); // Find the student by ID
    // If the student exists and the teacher is in their favourites, remove it
    if (student) {
        student.favourites = student.favourites.filter(id => id !== teacherId);
        localStorage.setItem("students", JSON.stringify(students));
    }
}

function isTeacherFavourited(studentId, teacherId) {
    const students = getStudents();
    const student = students.find(s => s.id == studentId);
    return student ? student.favourites.includes(teacherId) : false;
    }

function getFavouriteTeachers(studentId) {
    const students = getStudents();
    const student = students.find(s => s.id == studentId);
    return student ? student.favourites : [];
}

function updateStudent(updatedStudent) {
    const students = getStudents();
    const index = students.findIndex(s => s.id == updatedStudent.id);
    if (index !== -1) {
        students[index] = { ...students[index], ...updatedStudent };
        localStorage.setItem("students", JSON.stringify(students));
        return students[index];
    }
    return null;
}

function deleteStudent(id) {
    let students = getStudents();
    students = students.filter(s => s.id != id);
    localStorage.setItem("students", JSON.stringify(students));
}

export { getStudents, addStudent, updateStudent, deleteStudent, addFavouriteTeacher, removeFavouriteTeacher, isTeacherFavourited, Student, getFavouriteTeachers };


