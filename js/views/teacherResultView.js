
import { getTeachers } from "../models/teachersModel.js";

// Pegando parâmetros da URL
const urlParams = new URLSearchParams(window.location.search);
const disciplina = urlParams.get("disciplina")?.trim().toLowerCase() || '';
const tipo = urlParams.get("tipo")?.trim().toLowerCase() || '';
const local = urlParams.get("local")?.trim().toLowerCase() || '';
const professores = getTeachers();

// Pegando o contêiner onde serão acrescentados os resultados
const gridContainer = document.querySelector('.grid-container2');
gridContainer.innerHTML = "";

// Título dinâmico baseado nos filtros aplicados
let titleText = "Professores";
if (disciplina && local) {
    titleText = `Professores de ${disciplina} em ${local}`;
} else if (disciplina) {
    titleText = `Professores de ${disciplina}`;
} else if (local) {
    titleText = `Professores em ${local}`;
} else if (tipo) {
    titleText = `Professores de ${tipo}`;
}

document.querySelector("#disciplines-title").innerHTML = titleText;


        
        // Filtra os resultados de acordo com os parâmetros presentes
        const resultadosFiltrados = professores.filter(prof => {
            const disciplinaMatch = !disciplina || 
                prof.disciplines.some(d => d.toLowerCase().includes(disciplina));
            const tipoMatch = !tipo || 
                prof.classType.toLowerCase().includes(tipo);
            const localMatch = !local || 
                prof.locality.toLowerCase().includes(local);
            
            return disciplinaMatch && tipoMatch && localMatch;
        });

        // Loop para inserir cada um dos resultados
        resultadosFiltrados.forEach(prof => {
            const div = document.createElement("div");
            div.classList.add("col-md-4", "mb-3");

            div.innerHTML = `
                <div class="card text-white bg-primary h-100 shadow" style="cursor: pointer;">
                    <div class="card-body text-center d-flex flex-column justify-content-center align-items-center">
                        <img src="${prof.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'}" class="card-img-top rounded-circle mb-3" alt="${prof.name}" style="width: 100px; height: 100px;">
                        <h5 class="card-title">${prof.name}</h5>
                    </div>
                </div>
            `;

            div.onclick = () => {
                window.location.href = `teacherInfo.html?id=${prof.id}`;
            };

            gridContainer.appendChild(div);
        });

        // Mensagem quando nenhum resultado é encontrado
        if (resultadosFiltrados.length === 0) {
            let message = "Nenhum professor encontrado";
            if (disciplina || tipo || local) {
                message += " com os filtros aplicados.";
            } else {
                message = "Nenhum professor cadastrado no sistema.";
            }
            gridContainer.innerHTML = `<p class="text-center">${message}</p>`;
        }
 
    