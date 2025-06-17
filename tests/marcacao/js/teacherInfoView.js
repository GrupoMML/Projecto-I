document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    console.log("ID do professor:", id);

    const teachers = JSON.parse(localStorage.getItem("teachers")) || [];

    const prof = teachers.find(t => t.id == id);

    console.log("Professor encontrado:", prof);

    if (!prof) return;

    // Inserir os dados nas respetivas caixas
    document.querySelector(".teachersInfo-card-header").textContent = prof.name;
    document.getElementById("email").textContent = prof.email || "sem email";
    document.getElementById("location").textContent = prof.locality || "sem localização";
    document.getElementById("availability").textContent = prof.availability || "sem disponibilidade";
    document.getElementById("contact").textContent = prof.phone || "sem contacto";

    document.querySelector(".teachers-rightInfo img").src = prof.photo || "https://i.imgur.com/oYiTqum.jpg";

    // Disciplinas
    const disciplinesHTML = prof.disciplines.map(d => `<div><i class="fa-solid fa-check-circle"></i> ${d}</div>`).join("");
    document.querySelector(".disciplines-list").innerHTML = disciplinesHTML;

    // Descrição
    document.querySelector(".description-box").innerHTML = `<strong>DESCRIÇÃO</strong><br>${prof.description || "Sem descrição."}`;
    });