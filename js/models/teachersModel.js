//------------------ TEACHER CLASS ----------------------
//----------------------------------------------------------
const teachers = []

class Teacher{
    id = ''
    name = ''
    email = ''
    password = ''
    incapacity = ''
    gender = ''
    dateOfBirth = ''
    locality = ''
    diplomes = ''
    disciplines = ''
    aboutMe = ''
    explanationLocal = ''
    classType = ''
    price = ''
    points = ''
    priority = 2
    constructor(id, name, email, password, incapacity, gender, dateOfBirth, locality, diplomes, disciplines, aboutMe, explanationLocal, classType, price, points, priority){
        this.id = id
        this.name = name
        this.email = email
        this.password = password
        this.incapacity = incapacity
        this.gender = gender
        this.dateOfBirth = dateOfBirth
        this.locality = locality
        this.diplomes = diplomes
        this.disciplines = disciplines
        this.aboutMe = aboutMe
        this.explanationLocal = explanationLocal
        this.classType = classType
        this.price = price
        this.points = points
        this.priority = priority
    }
}

function addTeacher(id, name, email, password, incapacity, gender, dateOfBirth, locality, diplomes, disciplines, aboutMe, explanationLocal = 0, classType = 2, price = "", points = 0, priority = 2){
    const teacher = new Teacher(
        id, name, email, password, incapacity, 
        gender, dateOfBirth, locality, 
        diplomes, disciplines, aboutMe, 
        explanationLocal, classType, price, points, priority
    )
    teachers.push(teacher)
    return teacher
}

export { teachers, addTeacher }
