
const app = (function () {
  // ======= UTILITÁRIOS E LOGIN =======
  function mostrarSecao(id) {
    esconderTudo();
    document.getElementById(id).classList.remove("d-none");
  }

  function esconderTudo() {
    const secoes = ["loginSection", "professorSection", "alunoSection"];
    secoes.forEach((id) => document.getElementById(id)?.classList.add("d-none"));
  }

  function guardarQuizzes(quizzes) {
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
  }

  function carregarQuizzes() {
    return JSON.parse(localStorage.getItem("quizzes") || "[]");
  }

  function logout() {
    localStorage.removeItem("user");
    mostrarSecao("loginSection");
  }

  function login(nome, tipo) {
    const user = { name: nome.trim(), role: tipo };
    localStorage.setItem("user", JSON.stringify(user));
    inicializarInterface();
  }

  function obterUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  function inicializarInterface() {
    const user = obterUser();
    if (!user) return mostrarSecao("loginSection");

    if (user.role === "professor") {
      renderProfessor();
      mostrarSecao("professorSection");
    } else if (user.role === "aluno") {
      renderAluno();
      mostrarSecao("alunoSection");
    }
  }

  // ======= PROFESSOR =======
  function renderProfessor() {
    const quizzes = carregarQuizzes();
    const container = document.getElementById("quizzesContainer");
    container.innerHTML = "";

    if (quizzes.length === 0) {
      container.innerHTML = "<p class='text-muted'>Nenhum quiz criado.</p>";
      return;
    }

    quizzes.forEach((quiz, index) => {
      const col = document.createElement("div");
      col.className = "col-md-6";

      col.innerHTML = `
        <div class="card shadow-sm mb-3">
          <div class="card-body">
            <h5 class="card-title">${quiz.title}</h5>
            <p class="card-text">${quiz.description || "Sem descrição"}</p>
            <button class="btn btn-warning me-2" onclick="app.editarQuiz(${index})">
              <i class="fa fa-pen"></i> Editar
            </button>
            <button class="btn btn-danger" onclick="app.apagarQuiz(${index})">
              <i class="fa fa-trash"></i> Apagar
            </button>
          </div>
        </div>
      `;
      container.appendChild(col);
    });
  }

  function criarNovoQuiz() {
    const quizzes = carregarQuizzes();
    const novoQuiz = {
      id: Date.now(),
      title: "",
      description: "",
      questions: [
        {
          question: "",
          options: ["", "", "", ""],
          answer: 0
        }
      ]
    };
    quizzes.push(novoQuiz);
    guardarQuizzes(quizzes);
    app.editarQuiz(quizzes.length - 1);
  }

  function editarQuiz(index) {
    const quizzes = carregarQuizzes();
    let quiz = quizzes[index];

    document.getElementById("quizTitulo").value = quiz.title;
    document.getElementById("quizDescricao").value = quiz.description || "";
    const perguntasContainer = document.getElementById("perguntasContainer");

    function renderPerguntas() {
      perguntasContainer.innerHTML = "";
      quiz.questions.forEach((q, i) => {
        const div = document.createElement("div");
        div.className = "border rounded p-3 mb-3 shadow-sm position-relative";
        div.innerHTML = `
          <button type="button" class="btn btn-danger btn-sm position-absolute top-0 end-0 m-2 remover-pergunta" data-index="${i}">
            <i class="fas fa-trash"></i>
          </button>
          <h6>Pergunta ${i + 1}</h6>
          <div class="mb-2">
            <label class="form-label">Texto da pergunta:</label>
            <input type="text" class="form-control perguntaInput" value="${q.question}" data-index="${i}">
          </div>
          <div class="mb-2">
            <label class="form-label">Opções:</label>
            ${q.options.map((opt, j) => `
              <input type="text" class="form-control mb-1 opcaoInput" value="${opt}" data-pergunta="${i}" data-opcao="${j}">
            `).join("")}
          </div>
          <div class="mb-2">
            <label class="form-label">Resposta correta:</label>
            <select class="form-select respostaSelect" data-index="${i}">
              ${q.options.map((opt, j) => `
                <option value="${j}" ${q.answer === j ? "selected" : ""}>Opção ${j + 1}</option>
              `).join("")}
            </select>
          </div>
        `;
        perguntasContainer.appendChild(div);
      });

      document.querySelectorAll(".remover-pergunta").forEach(btn => {
        btn.onclick = () => {
          const i = parseInt(btn.getAttribute("data-index"));
          quiz.questions.splice(i, 1);
          renderPerguntas();
        };
      });
    }

    renderPerguntas();

    document.getElementById("adicionarPerguntaBtn").onclick = () => {
      quiz.questions.push({
        question: "",
        options: ["", "", "", ""],
        answer: 0
      });
      renderPerguntas();
    };

    document.getElementById("guardarAlteracoesBtn").onclick = function () {
      const novoTitulo = document.getElementById("quizTitulo").value;
      const novaDescricao = document.getElementById("quizDescricao").value;

      const novasPerguntas = quiz.questions.map((_, i) => {
        const pergunta = document.querySelector(`.perguntaInput[data-index="${i}"]`).value;
        const opcoes = Array.from(document.querySelectorAll(`.opcaoInput[data-pergunta="${i}"]`)).map(inp => inp.value);
        const resposta = parseInt(document.querySelector(`.respostaSelect[data-index="${i}"]`).value);
        return { question: pergunta, options: opcoes, answer: resposta };
      });

      quizzes[index] = { ...quiz, title: novoTitulo, description: novaDescricao, questions: novasPerguntas };
      guardarQuizzes(quizzes);
      renderProfessor();
      const modal = bootstrap.Modal.getInstance(document.getElementById("editarQuizModal"));
      modal.hide();
    };

    const modal = new bootstrap.Modal(document.getElementById("editarQuizModal"));
    modal.show();
  }

  function apagarQuiz(index) {
    const quizzes = carregarQuizzes();
    quizzes.splice(index, 1);
    guardarQuizzes(quizzes);
    renderProfessor();
  }

  // ======= ALUNO =======
  function renderAluno() {
    const quizzes = carregarQuizzes();
    const listContainer = document.getElementById("quizListContainer");
    const form = document.getElementById("quizForm");
    const result = document.getElementById("resultContainer");

    listContainer.innerHTML = "";
    form.innerHTML = "";
    result.classList.add("d-none");

    if (quizzes.length === 0) {
      listContainer.innerHTML = "<p class='text-muted'>Nenhum quiz disponível.</p>";
      return;
    }

    quizzes.forEach((quiz, index) => {
      const col = document.createElement("div");
      col.className = "col-md-6";
      col.innerHTML = `
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="card-title">${quiz.title}</h5>
            <p class="card-text">${quiz.description || "Sem descrição"}</p>
            <button class="btn btn-success" onclick="app.iniciarQuiz(${index})">
              <i class="fa fa-play"></i> Iniciar
            </button>
          </div>
        </div>
      `;
      listContainer.appendChild(col);
    });
  }

  function iniciarQuiz(index) {
    const quizzes = carregarQuizzes();
    const quiz = quizzes[index];
    if (!quiz) return;

    document.getElementById("quizListContainer").innerHTML = "";
    const form = document.getElementById("quizForm");
    const result = document.getElementById("resultContainer");
    result.classList.add("d-none");
    form.innerHTML = "";

    quiz.questions.forEach((q, i) => {
      const questionDiv = document.createElement("div");
      questionDiv.className = "mb-3";
      questionDiv.innerHTML = `<h5>${i + 1}. ${q.question}</h5>`;
      q.options.forEach((opt, j) => {
        questionDiv.innerHTML += `
          <div class="form-check">
            <input type="radio" class="form-check-input" name="question${i}" id="q${i}opt${j}" value="${j}">
            <label class="form-check-label" for="q${i}opt${j}">${opt}</label>
          </div>
        `;
      });
      form.appendChild(questionDiv);
    });

    const btn = document.createElement("button");
    btn.type = "button";
    btn.id = "submitBtn";
    btn.className = "btn btn-primary mt-3";
    btn.textContent = "Submeter";
    btn.onclick = () => submitQuiz(quiz);
    form.appendChild(btn);
  }

  function submitQuiz(quiz) {
    const user = obterUser();
    const studentName = user?.name || "Aluno";

    let score = 0;
    quiz.questions.forEach((q, index) => {
      const selected = document.querySelector(`input[name="question${index}"]:checked`);
      if (selected && parseInt(selected.value) === q.answer) score++;
    });

    const result = {
      studentName,
      quizTitle: quiz.title,
      score,
      total: quiz.questions.length,
      timestamp: new Date().toLocaleString(),
    };

    const results = JSON.parse(localStorage.getItem("results") || "[]");
    results.push(result);
    localStorage.setItem("results", JSON.stringify(results));

    const container = document.getElementById("resultContainer");
    container.classList.remove("d-none");
    container.innerHTML = `<strong>${studentName}</strong>, obtiveste <strong>${score}</strong> de ${quiz.questions.length}.`;
    document.getElementById("submitBtn").disabled = true;
  }

  // ======= EVENTOS INIT =======
  window.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      const nome = document.getElementById("loginName").value;
      const role = document.getElementById("loginRole").value;
      login(nome, role);
    });
    inicializarInterface();
  });

  // ======= EXPORTAÇÃO =======
  return {
    logout,
    criarNovoQuiz,
    editarQuiz,
    apagarQuiz,
    iniciarQuiz
  };
})();
