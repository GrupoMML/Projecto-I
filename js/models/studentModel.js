//------------------ STUDENT CLASS ----------------------
//----------------------------------------------------------
const getStudents = () => JSON.parse(localStorage.getItem("students")) || [];


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
        this.points = points
        this.priority = priority
        this.teachers = []
        this.explanations = []
        this.favourites = []
    }
    addTeachers(teacher){
        this.teachers.push(teacher)
    }
    addExplanations(explanation){
        this.explanations.push(explanation)
    }
    addFavourites(favourite){
        this.favourites.push(favourite)
    }
}

function addStudent(id, name, email, password, grade, EEcontact, incapacity, gender, dateOfBirth, locality, disciplines, aboutMe){
    const points = 0
    const priority = 1
    const student = new Student (id, name, email, password, grade, EEcontact, incapacity, gender, dateOfBirth, locality, disciplines, aboutMe, points, priority)
    students.push(student)
    return student
}

export { getStudents, addStudent }


