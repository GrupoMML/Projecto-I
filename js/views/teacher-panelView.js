const loggedUser = JSON.parse(localStorage.getItem("loggedUser"))

if (!loggedUser) {
    window.location.href = "../../html/main/login.html"
} else if (loggedUser.role !== "teacher") {
    if (loggedUser.role === "student") {
        window.location.href = "../../html/student/students.html"
    } else {
        window.location.href = "../../html/main/login.html"
    }
} else {
    document.getElementById("user-greeting").textContent = loggedUser.name
}
