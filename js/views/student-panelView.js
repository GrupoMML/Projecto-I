import { getStudentLessons } from '../../js/models/lessonsModel.js';

const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

if (!loggedUser || loggedUser.role !== "student") {
    window.location.href = "../../html/login/login.html";
} else {
    document.getElementById("user-greeting").textContent = loggedUser.name;
    loadStudentLessons();
}

async function loadStudentLessons() {
    const lessons = getStudentLessons(loggedUser.id);
    
    renderLessons(
        lessons.filter(l => l.state === "accepted"),
        document.getElementById("scheduled-lessons-container"),
        true
    );
    
    renderLessons(
        lessons.filter(l => l.state === "pending"),
        document.getElementById("pending-lessons-container"),
        false
    );
}

function renderLessons(lessons, container, isScheduled) {
    container.innerHTML = "";
    
    if (lessons.length === 0) {
        container.innerHTML = `
            <tr>
                <td colspan="${isScheduled ? 8 : 6}" class="text-center py-4">
                    ${isScheduled ? "Nenhuma aula marcada" : "Nenhum pedido pendente"}
                </td>
            </tr>
        `;
        return;
    }
    
    lessons.forEach(lesson => {
        const lessonDate = new Date(lesson.dateTime);
        const formattedDate = lessonDate.toLocaleDateString("pt-PT");
        const formattedTime = lessonDate.toLocaleTimeString("pt-PT", {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const row = document.createElement("tr");
        row.className = "lesson-row";
        
        row.innerHTML = `
            <td>${lesson.teacher.name}</td>
            <td>${lesson.disciplines.join(", ")}</td>
            <td>${lesson.location}</td>
            <td>${formattedDate}</td>
            <td>${formattedTime}</td>
            <td>${lesson.teacher.id}</td>
            <td>${lesson.id}</td>
            ${isScheduled ? `
                <td class="text-center">
                    <button class="btn btn-outline-danger btn-sm cancel-btn" data-id="${lesson.id}">
                        <i class="fas fa-times"></i> Cancelar
                    </button>
                </td>
            ` : `
                <td class="text-center">
                    <span class="badge bg-warning text-dark">Pendente</span>
                </td>
            `}
            
        `;
        
        container.appendChild(row);
    });
    
    // Event listeners para cancelamento
    if (isScheduled) {
        container.querySelectorAll(".cancel-btn").forEach(btn => {
            btn.addEventListener("click", function() {
                const lessonId = parseInt(this.dataset.id);
                cancelLesson(lessonId);
            });
        });
    }
}

function cancelLesson(lessonId) {
    const lessons = JSON.parse(localStorage.getItem("lessons")) || [];
    const index = lessons.findIndex(l => l.id === lessonId);
    
    if (index !== -1) {
        if (confirm("Tem certeza que deseja cancelar esta aula?")) {
            lessons.splice(index, 1);
            localStorage.setItem("lessons", JSON.stringify(lessons));
            showToast("Aula cancelada com sucesso!");
            loadStudentLessons();
        }
    }
}

function showToast(message, isSuccess = true) {
    const toastContainer = document.getElementById("toast-container") || createToastContainer();
    const toast = document.createElement("div");
    
    toast.className = `toast show ${isSuccess ? 'bg-success' : 'bg-danger'}`;
    toast.innerHTML = `
        <div class="toast-body text-white">
            <div class="d-flex justify-content-between">
                <span>${message}</span>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function createToastContainer() {
    const container = document.createElement("div");
    container.id = "toast-container";
    container.style.position = "fixed";
    container.style.bottom = "20px";
    container.style.right = "20px";
    container.style.zIndex = "1100";
    container.style.minWidth = "250px";
    document.body.appendChild(container);
    return container;
}