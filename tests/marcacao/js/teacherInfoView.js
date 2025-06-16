document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    const teachers = JSON.parse(localStorage.getItem("teachers")) || [];

    const prof = teachers.find(t => t.id == id);

    if (!prof) return;

    // Inserir os dados nas respetivas caixas
    document.querySelector(".teachersInfo-card-header").textContent = prof.name;
    document.querySelectorAll(".teachersInfo-box")[0].textContent = prof.email;
    document.querySelectorAll(".teachersInfo-box")[1].textContent = prof.locality;
    document.querySelectorAll(".teachersInfo-box")[2].textContent = prof.availability || "N/A";
    document.querySelectorAll(".teachersInfo-box")[3].textContent = prof.phone || "N/A";

    document.querySelector(".teachers-rightInfo img").src = prof.photo || "https://i.imgur.com/oYiTqum.jpg";

    // Disciplinas
    const disciplinesHTML = prof.disciplines.map(d => `<div><i class="fa-solid fa-check-circle"></i> ${d}</div>`).join("");
    document.querySelector(".disciplines-list").innerHTML = disciplinesHTML;

    // Descrição
    document.querySelector(".description-box").innerHTML = `<strong>DESCRIÇÃO</strong><br>${prof.description || "Sem descrição."}`;
    });