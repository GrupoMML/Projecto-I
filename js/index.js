document.getElementById("searchForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const disciplina = document.getElementById("disciplina").value.trim();
    const tipo = document.getElementById("tipo").value.trim();
    const local = document.getElementById("local").value.trim();

    // Redirecionar para a nova página junto com os parâmetros na URL
    window.location.href = `html/main/teacherResult.html?disciplina=${encodeURIComponent(disciplina)}&tipo=${encodeURIComponent(tipo)}&local=${encodeURIComponent(local)}`;

    
});