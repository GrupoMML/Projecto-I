//------------- RENDER PAGES -------------
//------------------------------------------------------
document.addEventListener("DOMContentLoaded", function(){
    const loginSection = document.getElementById("login-view")
    const registerStudentSection = document.getElementById("register-student-view")
    const registerTeacherSection = document.getElementById("register-teacher-view")

    const ducklingRegisterButton = document.getElementById("duckling-register-button-view")
    const duckmasterRegisterButton = document.getElementById("duckmaster-register-button-view")
    const goToLoginButtonStudent = document.getElementById("go-to-login-button-student-view")
    const goToLoginButtonTeacher = document.getElementById("go-to-login-button-teacher-view")  

    ducklingRegisterButton.addEventListener("click", event => {
        event.preventDefault()
        loginSection.classList.add("inactive")
        loginSection.classList.remove("active")
        registerStudentSection.classList.add("active")
        registerTeacherSection.classList.add("inactive")
    })

    duckmasterRegisterButton.addEventListener("click", event => {
        event.preventDefault()
        loginSection.classList.add("inactive")
        loginSection.classList.remove("active")
        registerStudentSection.classList.add("inactive")
        registerTeacherSection.classList.add("active")
    })

    goToLoginButtonTeacher.addEventListener("click", event => {
        event.preventDefault()
        loginSection.classList.add("active")
        loginSection.classList.remove("inactive")
        registerStudentSection.classList.add("inactive")
        registerStudentSection.classList.remove("inactive")
        registerTeacherSection.classList.remove("active")
    })

    goToLoginButtonStudent.addEventListener("click", event => {
        event.preventDefault()
        loginSection.classList.add("active")
        loginSection.classList.remove("inactive")
        registerTeacherSection.classList.add("inactive")
        registerTeacherSection.classList.remove("inactive")
        registerStudentSection.classList.remove("active")
    }) 
})


