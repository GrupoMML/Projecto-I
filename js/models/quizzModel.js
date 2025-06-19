//------------------ QUIZZ CLASS ----------------------
//-----------------------------------------------------
class Quizz{
    quizzID = '' 
    quizzName = ''
    quizzDiscipline = ''
    question = [
        questionID = '',
        questionDescription = '',
        answer1 = '',
        answer2 = '',
        answer3 = '',
        answer4 = '',
        correctAnswer = '',
        time = ''
    ]
    constructor(quizzID, quizzName, quizzDiscipline, question, questionID, questionDescription, answer1, answer2, answer3, answer4, correctAnswer, time){
        this.quizzID = quizzID
        this.quizzName = quizzName
        this.quizzDiscipline = quizzDiscipline
        this. question = question
        this.questionID = questionID
        this.questionDescription = questionDescription
        this.answer1 = answer1
        this.answer2 = answer2
        this.answer3 = answer3
        this.answer4 = answer4
        this.correctAnswer = correctAnswer
        this.time = time
    }
}