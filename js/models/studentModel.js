//------------------ STUDENT CLASS ----------------------
//----------------------------------------------------------
const students = []

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

function addStudent(name, email) {
  const id = students.length + 1
  const student = new Student(id, name, email)
  students.push(student)
  return student
}

// Usuário estudante de exemplo
students.push(new Student(
  1,                // id
  "Estudante",            // nome
  "est@email.com",  // email
  "1234",           // password
  "10º",            // grade (não importante agora)
  "123456789",      // EEcontact (não importante agora)
  "",               // incapacity (não importante)
  "F",              // gender (não importante)
  "2005-05-10",     // dateOfBirth
  "Lisboa",         // locality
  [],               // disciplines
  "",               // aboutMe
  0,                // points
  1                 // priority (1 = estudante)
));
