//------------------ LESSONS CLASS ----------------------
//----------------------------------------------------------
const lessons = []

class Lesson {
  constructor(id, student, teacher, dateTime, durationMinutes) {
    this.id = id
    this.student = student
    this.teacher = teacher
    this.dateTime = new Date(dateTime)
    this.durationMinutes = durationMinutes
  }
}

function createLesson(studentId, teacherId, dateTime, durationMinutes) {
  const student = students.find(s => s.id === studentId)
  const teacher = teachers.find(t => t.id === teacherId)
  if (!student || !teacher) throw new Error("Estudante ou professor não encontrado")

  const id = lessons.length + 1
  const lesson = new Lesson(id, student, teacher, dateTime, durationMinutes)
  lessons.push(lesson)
  return lesson
}

export { lessons, createLesson }