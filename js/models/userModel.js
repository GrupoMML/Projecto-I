//------------------ STUDENT CLASS ----------------------
//----------------------------------------------------------
class Student{
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
    constructor(name, email, password, grade, EEcontact, incapacity, gender, dateOfBirth, locality, disciplines, aboutMe, points, priority){
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

//------------------ TEACHER CLASS ----------------------
//----------------------------------------------------------
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

//------------------ ADMIN CLASS ----------------------
//----------------------------------------------------------
class Admin{
    name = ''
    email = ''
    password = ''
    priority = 3
    constructor(name, email, password, priority){
        this.name = name
        this.email = email
        this.password = password
        this.priority = priority
    }
}