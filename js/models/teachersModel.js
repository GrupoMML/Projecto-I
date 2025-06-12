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

function addTeacher(name, subject) {
  const id = teachers.length + 1
  const teacher = new Teacher(id, name, subject)
  teachers.push(teacher)
  return teacher
}

teachers.push(new Teacher (
    1, 
    "Explicador", 
    "exp@email.com", 
    "abcd", 
    "",
    "M",
    "1978-05-10",
    "Porto", 
    "",
    [],
    "",
    "", 
    "",
    "12€",
    0,
    2
  )
);