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
    priority = 1
    constructor(name, email, password, grade, EEcontact, incapacity, gender, dateOfBirth, locality, disciplines, aboutMe, priority){
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
        this.priority = priority
    }
}

//------------------ TEACHER CLASS ----------------------
//----------------------------------------------------------
class Teacher{
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
    priority = 2
    constructor(name, email, password, incapacity, gender, dateOfBirth, locality, diplomes, disciplines, aboutMe, priority){
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