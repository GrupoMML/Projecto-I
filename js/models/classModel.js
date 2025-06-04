//------------------ FORM CLASS ----------------------
//----------------------------------------------------------
class Explanation{
    student = ''
    teacher = ''
    roomCode = ''
    constructor(student, teacher, date, roomCode){
        this.student = student
        this.teacher = teacher
        this.date = new Date(date)
        this.roomCode = roomCode
    }
}
