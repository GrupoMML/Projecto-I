// Pegando parâmetros da URL
const urlParams = new URLSearchParams(window.location.search);
const disciplina = urlParams.get("disciplina")?.trim().toLowerCase();
const tipo = urlParams.get("tipo")?.trim().toLowerCase();
const local = urlParams.get("local")?.trim().toLowerCase();
let professores = [];

// Pegando o contêiner onde serão acrescentados os resultados
const gridContainer = document.querySelector('.grid-container2');
gridContainer.innerHTML = "";

// Título opcional mostrando o que estamos mostrando
document.querySelector("#disciplines-title").innerHTML = 
    `Professores de ${disciplina} em ${local}`;

// Fazer o fetch do JSON
fetch("../../json/index.json")
    .then((response) => response.json()) 
    .then((json) => {

    professores = JSON.parse(localStorage.getItem("teachers")) || json.teachers;
    // Filtra os resultados de acordo com os parâmetros
    const resultadosFiltrados = professores.filter(prof => 
        (disciplina ? prof.disciplines.some(d => d.toLowerCase() == disciplina) : true) &&
        (tipo ? prof.classType.toLowerCase() == tipo : true) &&
        (local ? prof.locality.toLowerCase() == local : true)
    );

    // Loop para inserir cada um dos resultados
    resultadosFiltrados.forEach(prof => {
        const div = document.createElement("div");
        div.classList.add("col-md-4", "mb-3"); // Responsivo: 3 colunas por linha em telas médias+

        div.innerHTML = `
            <div class="card text-white bg-primary h-100 shadow" style="cursor: pointer;">
                <div class="card-body text-center d-flex flex-column justify-content-center align-items-center">
                    <img src="${prof.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'}" class="card-img-top rounded-circle mb-3" alt="${prof.name}" style="width: 100px; height: 100px;">
                    <h5 class="card-title ">${prof.name}</h5>
                </div>
            </div>
        `;

        // Clica para ir para a pagina do Professor
        div.onclick = () => {
            window.location.href = `teacherInfo.html?id=${prof.id}`;
        };

        gridContainer.appendChild(div);
    });

    // Se nada for encontrado:
    if (resultadosFiltrados.length === 0) {
        gridContainer.innerHTML = "<p>Nenhum resultado encontrado</p>";
    }
    })
    .catch((error) => {
    console.error("Erro ao carregar os professores.", error);
    gridContainer.innerHTML = "<p>Erro ao carregar os resultados</p>";
    });

