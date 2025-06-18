//------------------ IMPORTS ----------------------
import { addAdmin } from "../models/adminModel.js"

//------------------ INICIALIZAR ADMINS ----------------------
if (!localStorage.getItem("admins")) {
  const defaultAdmins = [
    {
      id: 1,
      name: "Admin Miguel",
      email: "adminmiguel@teachme.com",
      password: "M1guyy!!",
      priority: 3
    },
    {
      id: 2,
      name: "Admin Secundário",
      email: "admin2@teachme.com",
      password: "X2!mN4#z",
      priority: 3
    }
  ]
  localStorage.setItem("admins", JSON.stringify(defaultAdmins));
}

const adminsData = JSON.parse(localStorage.getItem("admins")) || []

document.querySelector("#btn-login").addEventListener('click', event => {
  event.preventDefault()

  const email = document.getElementById("login-email").value.trim()
  const password = document.getElementById("login-password").value

  if (!email || !password) {
    alert("Por favor, preencha todos os campos obrigatórios.")
    return
  }

  const admin = adminsData.find(a => a.email === email && a.password === password);

  if (admin) {
    localStorage.setItem("loggedUser", JSON.stringify({ ...admin, role: "admin" }))
    alert(`Bem-vindo, ${admin.name}!`)
    window.location.href = "../../html/admin/admin.html"; 
  } else {
    alert("Email ou palavra-passe inválidos.")
  }
})

const loggedUser = JSON.parse(localStorage.getItem("loggedUser"))
if (loggedUser) {
  const loginBtn = document.getElementById("login-btnView")
  if (loginBtn) loginBtn.style.display = "none"
}
