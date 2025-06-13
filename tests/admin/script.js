let professors = [];
let students = [];
let products = [];
const pageSize = 5;

let filterNameProf = '', filterEmailProf = '', filterDisciplineProf = '';
let filterNameAlun = '', filterEmailAlun = '', filterGradeAlun = '';

let tableStates = {
  prof: { sortCol: '', sortAsc: true, curPage: 1 },
  alun: { sortCol: '', sortAsc: true, curPage: 1 },
  prod: { sortCol: '', sortAsc: true, curPage: 1 }
};

function renderTable(data, tbodyId, filterName, filterEmail, filterAdditional, additionalColumnName, tableType) {
    const state = tableStates[tableType];

    let filtrados = data.filter((item) =>
        item.name.toLowerCase().includes(filterName.toLowerCase()) &&
        item.email.toLowerCase().includes(filterEmail.toLowerCase()) &&
        (
        Array.isArray(item[additionalColumnName])
            ? item[additionalColumnName].join(", ").toLowerCase().includes(filterAdditional.toLowerCase())
            : (item[additionalColumnName] ? item[additionalColumnName].toLowerCase().includes(filterAdditional.toLowerCase()) : true)
        )
    );

    // Ordenar
    if (state.sortCol) {
        filtrados.sort((a, b) => {
        if (a[state.sortCol] < b[state.sortCol]) return state.sortAsc ? -1 : 1;
        if (a[state.sortCol] > b[state.sortCol]) return state.sortAsc ? 1 : -1;
        return 0;
        });
    }

    const totalPages = Math.ceil(filtrados.length / pageSize);
    if (state.curPage > totalPages) state.curPage = totalPages || 1;

    const start = (state.curPage - 1) * pageSize;
    const paged = filtrados.slice(start, start + pageSize);

    let output = '';
    for (let item of paged) {
        output += `
        <tr>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${Array.isArray(item[additionalColumnName]) ? item[additionalColumnName].join(", ") : item[additionalColumnName]}</td>
            <td>
            <button class="btn btn-sm btn-primary me-1"><i class="fa-solid fa-eye"></i></button>
            <button class="btn btn-sm btn-warning me-1"><i class="fa-solid fa-edit"></i></button>
            <button class="btn btn-sm btn-danger"><i class="fa-solid fa-trash"></i></button>
            </td>
        </tr>`;
    }

  document.querySelector(tbodyId).innerHTML = output;

  renderPagination(filtrados.length, tableType);
}

function renderPagination(totalItems, tableType) {
    const state = tableStates[tableType];
    const totalPages = Math.ceil(totalItems / pageSize);
    const container = document.getElementById(`pagination-${tableType}`);
    container.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement("li");
        li.className = `page-item ${i === state.curPage ? "active" : ""}`;
        li.innerHTML = `<button class="page-link">${i}</button>`;
        li.addEventListener("click", () => {
        state.curPage = i;
        renderTableFromType(tableType);
        });
        container.appendChild(li);
    }
}

function renderTableFromType(tableType) {
  if (tableType === 'prof') {
    renderTable(professors, '#tabela-professores', filterNameProf, filterEmailProf, filterDisciplineProf, 'disciplines', 'prof');
  } else if (tableType === 'alun') {
    renderTable(students, '#tabela-alunos', filterNameAlun, filterEmailAlun, filterGradeAlun, 'grade', 'alun');
  } else {
    renderTable(products, '#tabela-produtos', filterNameProd, filterPriceProd, filterCategoryProd, 'productType', 'prod');
  }
}

function populateSelect(selectId, data, additionalColumnName) {
  const set = new Set(
    data.map((item) =>
      Array.isArray(item[additionalColumnName])
        ? item[additionalColumnName].join(", ")
        : item[additionalColumnName]
    )
  );
  const arr = Array.from(set).sort((a, b) => a.localeCompare(b));
  const select = document.querySelector(selectId);
  select.innerHTML = "<option value=''>Todos</option>";

  arr.forEach((item) => {
    if (item) select.innerHTML += `<option value="${item.toLowerCase()}">${item}</option>`;
  });
}

function loadData() {
  fetch("db.json")
    .then((res) => res.json())
    .then((json) => {
        professors = json.teachers;
        students = json.students;
        products = json.products;

        populateSelect("#filterDisciplineProf", professors, "disciplines");
        populateSelect("#filterGradeAlun", students, "grade");
        populateSelect("#filterCategoryProd", products, "productType");

        renderTableFromType('prof');
        renderTableFromType('alun');
        renderTableFromType('prod');
    })
    .catch(console.error);
}

loadData();

// Filtros Professores
document.querySelector("#filterNameProf").addEventListener("input", (e) => {
  filterNameProf = e.target.value;
  tableStates.prof.curPage = 1;
  renderTableFromType('prof');
});
document.querySelector("#filterEmailProf").addEventListener("input", (e) => {
  filterEmailProf = e.target.value;
  tableStates.prof.curPage = 1;
  renderTableFromType('prof');
});
document.querySelector("#filterDisciplineProf").addEventListener("change", (e) => {
  filterDisciplineProf = e.target.value;
  tableStates.prof.curPage = 1;
  renderTableFromType('prof');
});

// Filtros Alunos
document.querySelector("#filterNameAlun").addEventListener("input", (e) => {
  filterNameAlun = e.target.value;
  tableStates.alun.curPage = 1;
  renderTableFromType('alun');
});
document.querySelector("#filterEmailAlun").addEventListener("input", (e) => {
  filterEmailAlun = e.target.value;
  tableStates.alun.curPage = 1;
  renderTableFromType('alun');
});
document.querySelector("#filterGradeAlun").addEventListener("change", (e) => {
  filterGradeAlun = e.target.value;
  tableStates.alun.curPage = 1;
  renderTableFromType('alun');
});

// Filtros Produtos
document.querySelector("#filterNameProd").addEventListener("input", (e) => {
  filterNameProd = e.target.value;
  tableStates.prod.curPage = 1;
  renderTableFromType('prod');
});
document.querySelector("#filterPriceProd").addEventListener("input", (e) => {
  filterPriceProd = e.target.value;
  tableStates.prod.curPage = 1;
  renderTableFromType('prod');
});
document.querySelector("#filterCategoryProd").addEventListener("change", (e) => {
  filterCategoryProd = e.target.value;
  tableStates.prod.curPage = 1;
  renderTableFromType('prod');
});

// Ordenação
[
  { id: 'sortNameProf', col: 'name', type: 'prof' },
  { id: 'sortEmailProf', col: 'email', type: 'prof' },
  { id: 'sortNameAlun', col: 'name', type: 'alun' },
  { id: 'sortEmailAlun', col: 'email', type: 'alun' }
].forEach(({ id, col, type }) => {
  document.getElementById(id).addEventListener("click", () => {
    const state = tableStates[type];
    if (state.sortCol === col) {
      state.sortAsc = !state.sortAsc;
    } else {
      state.sortCol = col;
      state.sortAsc = true;
    }
    updateSortIcons();
    renderTableFromType(type);
  });
});

function updateSortIcons() {
  const map = {
    sortNameProf: ['prof', 'name'],
    sortEmailProf: ['prof', 'email'],
    sortNameAlun: ['alun', 'name'],
    sortEmailAlun: ['alun', 'email']
  };

  for (let id in map) {
    const icon = document.querySelector(`#${id} i`);
    const [type, col] = map[id];
    const state = tableStates[type];
    if (state.sortCol === col) {
      icon.className = state.sortAsc ? 'fas fa-sort-up' : 'fas fa-sort-down';
    } else {
      icon.className = 'fas fa-sort';
    }
  }
}
