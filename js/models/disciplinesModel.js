//------------------ DISCIPLINES CLASS ----------------------
//----------------------------------------------------------
class Discipline {
    constructor(disciplineName, disciplineTeacher) {
        this.disciplineName = disciplineName;
        this.disciplineTeacher = {
            name: disciplineTeacher.name,
            image: disciplineTeacher.image
        };
    }
}
