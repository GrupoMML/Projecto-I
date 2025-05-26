//------------------ FAVOURITES CLASS ----------------------
//----------------------------------------------------------
class Favourites {
    constructor(disciplineName, disciplineTeacher) {
        this.disciplineName = disciplineName;
        this.disciplineTeacher = {
            name: disciplineTeacher.name,
            image: disciplineTeacher.image
        };
    }
}
