let teachers = [];
let students = [];
let products = [];
const pageSize = 6;
let filterNameProf = '', filterEmailProf = '', filterDisciplineProf = '';
let filterNameAlun = '', filterEmailAlun = '', filterGradeAlun = '';
let filterNameProd = '', filterCategoryProd = '';
let tableStates = {
  prof: { sortCol: '', sortAsc: true, curPage: 1 },
  alun: { sortCol: '', sortAsc: true, curPage: 1 },
  prod: { sortCol: '', sortAsc: true, curPage: 1 }
};
function renderTableProducts(data, tbodyId, filterName, additionalColumnName) {
    const state = tableStates.prod;

    let filtrados = data.filter((item) =>
        item.productName.toLowerCase().includes(filterName.toLowerCase()) &&
        (
            Array.isArray(item[additionalColumnName]) 
                ? item[additionalColumnName].join(", ").toLowerCase().includes(filterCategoryProd.toLowerCase()) 
                : (item[additionalColumnName] ? item[additionalColumnName].toLowerCase().includes(filterCategoryProd.toLowerCase()) : filterCategoryProd === '')
        )
    );

    // Ordenar
    if (state.sortCol) {
        filtrados.sort((a, b) => {
            let valA = a[state.sortCol];
            let valB = b[state.sortCol];
            
            // Check if we're sorting a numeric column (like productPrice)
            if (state.sortCol === 'productPrice') {
                valA = parseFloat(valA) || 0;
                valB = parseFloat(valB) || 0;
            }
            
            if (valA < valB) return state.sortAsc ? -1 : 1;
            if (valA > valB) return state.sortAsc ? 1 : -1;
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
          <td>${item.productName}</td>
          <td>${item.productPrice}</td>
          <td>${Array.isArray(item[additionalColumnName]) ? item[additionalColumnName].join(", ") : item[additionalColumnName]}</td>
          <td>
            <button class="btn btn-sm btn-primary me-1 view-item" data-item='${JSON.stringify(item)}'>
              <i class="fa-solid fa-eye"></i>
            </button>
            <button class="btn btn-sm btn-warning me-1 edit-item" data-item='${JSON.stringify(item)}'>
              <i class="fa-solid fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-danger delete-item" data-item='${JSON.stringify(item)}'>
              <i class="fa-solid fa-trash-alt"></i>
            </button>
          </td>
        </tr>`;
    }

    document.querySelector(tbodyId).innerHTML = output;

    renderPagination(filtrados.length, 'prod');
}
function renderTable(data, tbodyId, filterName, filterEmail, filterAdditional, additionalColumnName, tableType) {
    const state = tableStates[tableType];

    let filtrados = data.filter((item) =>
        item.name.toLowerCase().includes(filterName.toLowerCase()) &&
        (item.email ? item.email.toLowerCase().includes(filterEmail.toLowerCase()) : filterEmail === '') &&
        (
            Array.isArray(item[additionalColumnName]) 
                ? item[additionalColumnName].join(", ").toLowerCase().includes(filterAdditional.toLowerCase()) 
                : (item[additionalColumnName] ? item[additionalColumnName].toLowerCase().includes(filterAdditional.toLowerCase()) : filterAdditional === '') 
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
              <button 
                class="btn btn-sm btn-primary me-1 view-item" 
                data-item='${JSON.stringify(item)}'
              >
                <i class="fa-solid fa-eye"></i>
              </button>
                <button class="btn btn-sm btn-warning me-1 edit-item"
                data-item='${JSON.stringify(item)}'
              >
                <i class="fa-solid fa-edit"></i>
              </button>
              <button class="btn btn-sm btn-danger" data-item='${JSON.stringify(item)}'><i class="fa-solid fa-trash"></i></button>
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
    renderTable(teachers, '#tbody-professores', filterNameProf, filterEmailProf, filterDisciplineProf, 'disciplines', 'prof');
  } else if (tableType === 'alun') {
    renderTable(students, '#tbody-alunos', filterNameAlun, filterEmailAlun, filterGradeAlun, 'grade', 'alun');
  } else {
    renderTableProducts(products, '#tbody-produtos', filterNameProd, 'productType', 'prod');
  }
}
function populateSelectFromStorage(selectId, storageKey, additionalColumnName) {
  const stored = localStorage.getItem(storageKey);
  if (!stored) return;

  const data = JSON.parse(stored);
  const set = new Set(
    data.map((item) =>
      Array.isArray(item[additionalColumnName])
        ? item[additionalColumnName].join(", ")
        : item[additionalColumnName]
    )
  );

  const arr = Array.from(set).sort((a, b) => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    if (!isNaN(numA) && !isNaN(numB)) {
      return numA - numB;
    }
    return a.localeCompare(b);
  });

  const select = document.querySelector(selectId);
  select.innerHTML = "<option value=''>Todos</option>";
  arr.forEach((item) => {
    if (item)
      select.innerHTML += `<option value="${item.toLowerCase()}">${item}</option>`;
  });
}
function loadData() {
  fetch("../../json/index.json")
    .then((res) => res.json())
    .then((json) => {
        teachers = JSON.parse(localStorage.getItem("teachers")) || json.teachers;
        students = JSON.parse(localStorage.getItem("students")) || json.students;
        products = JSON.parse(localStorage.getItem("products")) || json.products;

        console.log("products", products);

        populateSelectFromStorage("#filterDisciplineProf", "teachers", "disciplines");
        populateSelectFromStorage("#filterGradeAlun", "students", "grade");
        populateSelectFromStorage("#filterCategoryProd", "products", "productType");

        renderTableFromType('prof');
        renderTableFromType('alun');
        renderTableFromType('prod');
    })
    .catch(console.error);
}
loadData();
// Filtros professores
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
document.querySelector("#filterCategoryProd").addEventListener("change", (e) => {
  filterCategoryProd = e.target.value;
  tableStates.prod.curPage = 1;
  renderTableFromType('prod');
});
// Visualização de item
document.querySelector('#tbody-produtos').addEventListener('click', (e) => {
  const btn = e.target.closest('.view-item');
  if (btn) {
    const item = JSON.parse(btn.dataset.item);
    showItemModalProduct(item);
  }
});
document.querySelector('#tbody-professores').addEventListener('click', (e) => {
  const btn = e.target.closest('.view-item');
  if (btn) {
    const item = JSON.parse(btn.dataset.item);
    showItemModalTeacher(item);
  }
});
document.querySelector('#tbody-alunos').addEventListener('click', (e) => {
  const btn = e.target.closest('.view-item');
  if (btn) {
    const item = JSON.parse(btn.dataset.item);
    showItemModalAlun(item);
  }
});
// Editar item
document.querySelector("#tbody-produtos").addEventListener("click", (e) => {
  if (e.target.closest(".edit-item")) {
    const item = JSON.parse(e.target.closest(".edit-item").dataset.item);
    showEditProductModal(item);
  }
});
document.querySelector("#tbody-professores").addEventListener("click", (e) => {
  if (e.target.closest(".edit-item")) {
    const item = JSON.parse(e.target.closest(".edit-item").dataset.item);
    showEditTeacherModal(item);
  }
});
document.querySelector("#tbody-alunos").addEventListener("click", (e) => {
  if (e.target.closest(".edit-item")) {
    const item = JSON.parse(e.target.closest(".edit-item").dataset.item);
    showEditAlunModal(item);
  }
});
// Ordenação
[
  { id: 'sortNameProf', col: 'name', type: 'prof' },
  { id: 'sortEmailProf', col: 'email', type: 'prof' },
  { id: 'sortNameAlun', col: 'name', type: 'alun' },
  { id: 'sortEmailAlun', col: 'email', type: 'alun' },
  { id: 'sortNameProd', col: 'productName', type: 'prod' },
  { id: 'sortPriceProd', col: 'productPrice', type: 'prod' }
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
    sortEmailAlun: ['alun', 'email'],
    sortNameProd: ['prod', 'productName'],
    sortPriceProd: ['prod', 'productPrice'],
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
// Modal de criação de item
function showAddModal(type) {
  let title = "";
  let formHTML = "";

  if (type === "prod") {
    title = "Adicionar Produto";
    formHTML = `
      <input type="text" id="addProductType" class="form-control mb-2" placeholder="Categoria">
      <input type="text" id="addProductName" class="form-control mb-2" placeholder="Nome">
      <input type="number" id="addProductQuantity" class="form-control mb-2" placeholder="Quantidade">
      <input type="text" id="addProductQuality" class="form-control mb-2" placeholder="Qualidade">
      <input type="text" id="addProductSize" class="form-control mb-2" placeholder="Tamanho">
      <input type="text" id="addProductColor" class="form-control mb-2" placeholder="Cor">
      <input type="number" id="addProductPrice" class="form-control mb-2" placeholder="Valor">
      <input type="text" id="addProductCoupon" class="form-control mb-2" placeholder="Cupom de Desconto">
      <button class="btn btn-primary mt-3" id="itemAddBtnProd">Adicionar</button>
    `;
  }
  else if (type === "prof") {
    title = "Adicionar Professor";
    formHTML = `
      <input type="text" id="addTeacherName" class="form-control mb-2" placeholder="Nome">
      <input type="email" id="addTeacherEmail" class="form-control mb-2" placeholder="Email">
      <input type="password" id="addTeacherPassword" class="form-control mb-2" placeholder="Senha">
      <input type="text" id="addTeacherDisciplines" class="form-control mb-2" placeholder="Disciplinas (separadas por vírgula)">
      <input type="date" id="addTeacherDOB" class="form-control mb-2">
      <input type="text" id="addTeacherLocality" class="form-control mb-2" placeholder="Localidade">
      <textarea id="addTeacherAboutMe" class="form-control mb-2" placeholder="Sobre mim"></textarea>
      <input type="text" id="addTeacherPrice" class="form-control mb-2" placeholder="Preço por Hora">
      <button class="btn btn-primary mt-3" id="itemAddBtnProf">Adicionar</button>
    `;
  }
  else if (type === "alun") {
    title = "Adicionar Aluno";
    formHTML = `
      <input type="text" id="addAlunName" class="form-control mb-2" placeholder="Nome">
      <input type="email" id="addAlunEmail" class="form-control mb-2" placeholder="Email">
      <select id="addAlunGrade" class="form-control mb-2">
        <option value="">Selecione o Ano Escolar</option>
        <option value="1º Ano">1º Ano</option>
        <option value="2º Ano">2º Ano</option>
        <option value="3º Ano">3º Ano</option>
        <option value="4º Ano">4º Ano</option>
        <option value="5º Ano">5º Ano</option>
        <option value="6º Ano">6º Ano</option>
        <option value="7º Ano">7º Ano</option>
        <option value="8º Ano">8º Ano</option>
        <option value="9º Ano">9º Ano</option>
        <option value="10º Ano">10º Ano</option>
        <option value="11º Ano">11º Ano</option>
        <option value="12º Ano">12º Ano</option>  
      </select>
      <select id="addAlunGender" class="form-control mb-2">
        <option value="masculino">Masculino</option>
        <option value="feminino">Feminino</option>
      </select>
      <input type="date" id="addAlunDOB" class="form-control mb-2">
      <input type="text" id="addAlunLocality" class="form-control mb-2" placeholder="Localidade">
      <textarea id="addAlunAboutMe" class="form-control mb-2" placeholder="Sobre mim"></textarea>
      <button class="btn btn-primary mt-3" id="itemAddBtnAlun">Adicionar</button>
    `;
  }

  
  
  document.getElementById("itemAddModalLabel").innerHTML = title;
  document.getElementById("itemAddForm").innerHTML = formHTML;

  new bootstrap.Modal(document.getElementById("itemAddModal")).show();
}
// Modal de visualização de item
function showItemModalProduct(item) {
  // Preencha o modal com os dados do item
  document.getElementById('itemModalLabel').innerHTML = item.productName;
  
  document.getElementById('itemModalBody').innerHTML = `
    <p>Valor: ${item.productPrice}</p>
    <p>Categoria: ${item.productType ? item.productType : ''}</p>
    <p>Quantidade: ${item.productQuantity ? item.productQuantity : 'Indisponível'}</p>
    <p>Cor: ${item.productColor ? item.productColor : 'Indisponível'}</p>

  `;
  
  // Mostre o modal
  new bootstrap.Modal(document.getElementById('itemModal')).show();
}
function showItemModalTeacher(item) {
  // Preencha o modal com os dados do item
  document.getElementById('itemModalLabel').innerHTML = item.name;
  
  document.getElementById('itemModalBody').innerHTML = `
    <p>Email: ${item.email}</p>
    <p>Disciplina: ${item.disciplines ? item.disciplines.join(", ") : 'Nenhuma disciplina atribuída.'}</p>
    <p>Data de Nascimento: ${item.dateOfBirth ? item.dateOfBirth : 'Nenhuma data de nascimento disponível.'}</p>
    <p>Localidade: ${item.locality ? item.locality : 'Nenhuma localidade disponível.'}</p>
    <p>Descrição: ${item.aboutMe ? item.aboutMe : 'Nenhuma descrição disponível.'}</p>
    <p>Preço por Hora: ${item.price ? item.price : 'Nenhum preço por hora disponível.'}</p>
  `;
  
  // Mostre o modal
  new bootstrap.Modal(document.getElementById('itemModal')).show();
}
function showItemModalAlun(item) {
  // Preencha o modal com os dados do item
  document.getElementById('itemModalLabel').innerHTML = item.name;
  
  document.getElementById('itemModalBody').innerHTML = `
    <p>Email: ${item.email}</p>
    <p>Número de Telefone (EE): ${item.EEcontact ? item.EEcontact : 'Nenhum telefone disponível.'}</p>
    <p>Disciplinas: ${item.disciplines ? item.disciplines.join(", ") : 'Nenhuma disciplina atribuída.'}</p>
    <p>Escolaridade: ${item.grade}</p>
    <p>Data de Nascimento: ${item.dateOfBirth ? item.dateOfBirth : 'Nenhuma data de nascimento disponível.'}</p>
    <p>Localidade: ${item.locality ? item.locality : 'Nenhuma localidade disponível.'}</p>
    <p>Descrição: ${item.aboutMe ? item.aboutMe : 'Nenhuma descrição disponível.'}</p>

  `;
  
  // Mostre o modal
  new bootstrap.Modal(document.getElementById('itemModal')).show();
}
// Modal de edição de item
function showEditProductModal(item) {
  // Preencha o modal com os dados do item
  document.querySelector("#itemEditModalLabel").innerHTML = "Editar " + item.productName;

  document.querySelector("#itemEditForm").innerHTML = `
    <input type="text" id="editProductType" value="${item.productType}" class="form-control mb-2" placeholder="Categoria">
    <input type="text" id="editProductName" value="${item.productName}" class="form-control mb-2" placeholder="Nome">
    <input type="hidden" id="editProductId" value="${item.productID}">
    <input type="number" id="editProductQuantity" value="${item.productQuantity}" class="form-control mb-2" placeholder="Quantidade">
    <input type="text" id="editProductQuality" value="${item.productQuality}" class="form-control mb-2" placeholder="Qualidade">
    <input type="text" id="editProductSize" value="${item.productSize}" class="form-control mb-2" placeholder="Tamanho">
    <input type="text" id="editProductColor" value="${item.productColor}" class="form-control mb-2" placeholder="Cor">
    <input type="number" id="editProductPrice" value="${item.productPrice}" class="form-control mb-2" placeholder="Valor">
    <input type="hidden" id="editProductCoupon" value="${item.productCoupon}" class="form-control mb-2" placeholder="Cupom de Desconto">

    <button class="btn btn-primary mt-3" id="itemSaveBtnProd">Salvar</button>
  `;

  new bootstrap.Modal(document.getElementById("itemEditModal")).show();
}
function showEditTeacherModal(item) {
  // Preencha o modal com os dados do item
  document.querySelector("#itemEditModalLabel").innerHTML = "Editar " + item.name;

  document.querySelector("#itemEditForm").innerHTML = `
    <input type="text" id="editteacherName" value="${item.name}" class="form-control mb-2" placeholder="Nome">
    <input type="email" id="editteacherEmail" value="${item.email}" class="form-control mb-2" placeholder="Email">
    <input type="text" id="editteacherDisciplines" value="${item.disciplines.join(", ")}" class="form-control mb-2" placeholder="Disciplinas (separadas por vírgula)">
    <input type="date" id="editteacherDOB" value="${item.dateOfBirth}" class="form-control mb-2">
    <input type="text" id="editteacherLocality" value="${item.locality}" class="form-control mb-2" placeholder="Localidade">
    <textarea id="editteacherAboutMe" class="form-control mb-2" placeholder="Sobre mim">${item.aboutMe}</textarea>
    <input type="text" id="editteacherPrice" value="${item.price}" class="form-control mb-2" placeholder="Preço por Hora">
    <input type="hidden" id="editteacherId" value="${item.id}">

    <button class="btn btn-primary mt-3" id="itemSaveBtnProf">Salvar</button>
  `;

  new bootstrap.Modal(document.getElementById("itemEditModal")).show();
}
function showEditAlunModal(item) {
  // Preencha o modal com os dados do item
  document.querySelector("#itemEditModalLabel").innerHTML = "Editar " + item.name;

  document.querySelector("#itemEditForm").innerHTML = `
    <input type="text" id="editAlunName" value="${item.name}" class="form-control mb-2" placeholder="Nome">
    <input type="email" id="editAlunEmail" value="${item.email}" class="form-control mb-2" placeholder="Email">
    <select id="editAlunGrade" class="form-control mb-2">
    <option value="">Selecione o Ano Escolar</option>
      <option value="1º Ano" ${item.grade === "1º Ano" ? "selected" : ""}>1º Ano</option>
      <option value="2º Ano" ${item.grade === "2º Ano" ? "selected" : ""}>2º Ano</option>
      <option value="3º Ano" ${item.grade === "3º Ano" ? "selected" : ""}>3º Ano</option>
      <option value="4º Ano" ${item.grade === "4º Ano" ? "selected" : ""}>4º Ano</option>
      <option value="5º Ano" ${item.grade === "5º Ano" ? "selected" : ""}>5º Ano</option>
      <option value="6º Ano" ${item.grade === "6º Ano" ? "selected" : ""}>6º Ano</option>
      <option value="7º Ano" ${item.grade === "7º Ano" ? "selected" : ""}>7º Ano</option>
      <option value="8º Ano" ${item.grade === "8º Ano" ? "selected" : ""}>8º Ano</option>
      <option value="9º Ano" ${item.grade === "9º Ano" ? "selected" : ""}>9º Ano</option>
      <option value="10º Ano" ${item.grade === "10º Ano" ? "selected" : ""}>10º Ano</option>
      <option value="11º Ano" ${item.grade === "11º Ano" ? "selected" : ""}>11º Ano</option>
      <option value="12º Ano" ${item.grade === "12º Ano" ? "selected" : ""}>12º Ano</option>
    </select>
    <input id="editEEcontact" type="text" value="${item.EEcontact}" class="form-control mb-2" placeholder="Número de Telefone (EE)">
    <select id="editAlunIncapacity" class="form-control mb-2">
      <option value="não" ${item.incapacity === "não" ? "selected" : ""}>Não</option>
      <option value="sim" ${item.incapacity === "sim" ? "selected" : ""}>Sim</option>
    </select>
    <select id="editAlunGender" class="form-control mb-2">
      <option value="masculino" ${item.gender === "masculino" ? "selected" : ""}>Masculino</option>
      <option value="feminino" ${item.gender === "feminino" ? "selected" : ""}>Feminino</option>
    </select>
    <input type="date" id="editAlunDOB" value="${item.dateOfBirth}" class="form-control mb-2">
    <input type="text" id="editAlunLocality" value="${item.locality}" class="form-control mb-2" placeholder="Localidade">
    <textarea id="editAlunAboutMe" class="form-control mb-2" placeholder="Sobre mim">${item.aboutMe}</textarea>
    <input type="hidden" id="editAlunId" value="${item.id}">

    <button class="btn btn-primary mt-3" id="itemSaveBtnAlun">Salvar</button>
  `;
  new bootstrap.Modal(document.getElementById("itemEditModal")).show();
}
// Apagar item
document.querySelector("#tbody-produtos").addEventListener("click", (e) => {
  if (e.target.closest(".btn-danger")) {
    const item = JSON.parse(e.target.closest(".btn-danger").dataset.item);

    // opcional: confirmação
    if (confirm("Deseja excluir o item?")) {
      products = products.filter((p) => p.id !== item.id);
      localStorage.setItem("products", JSON.stringify(products));
      renderTableFromType("prod");
      // removido
    }
  }
});
document.querySelector("#tbody-professores").addEventListener("click", (e) => {
  if (e.target.closest(".btn-danger")) {
    const item = JSON.parse(e.target.closest(".btn-danger").dataset.item);
    

    // opcional: confirmação
    if (confirm("Deseja excluir o item?")) {
      teachers = teachers.filter((p) => p.id !== item.id);
      localStorage.setItem("teachers", JSON.stringify(teachers));
      renderTableFromType("prof");
      // removido
    }
  }
});
document.querySelector("#tbody-alunos").addEventListener("click", (e) => {
  if (e.target.closest(".btn-danger")) {
    const item = JSON.parse(e.target.closest(".btn-danger").dataset.item);
    
    // opcional: confirmação
    if (confirm("Deseja excluir o item?")) {
      students = students.filter((s) => s.id !== item.id);
      localStorage.setItem("students", JSON.stringify(students));
      renderTableFromType("alun");
      // removido
    }
  }
});
// Guardar item editado
document.addEventListener("click", (e) => {
  if (e.target.id === "itemSaveBtnProd") {
    const id = document.querySelector("#editProductId").value;

    const index = products.findIndex((item) => item.productID == id);
    
    if (index !== -1) {
      products[index].productType = document.querySelector("#editProductType").value;
      products[index].productName = document.querySelector("#editProductName").value;
      products[index].productQuantity = parseInt(document.querySelector("#editProductQuantity").value);
      products[index].productQuality = document.querySelector("#editProductQuality").value;
      products[index].productSize = document.querySelector("#editProductSize").value;
      products[index].productColor = document.querySelector("#editProductColor").value;
      products[index].productPrice = parseFloat(document.querySelector("#editProductPrice").value);
      products[index].productCoupon = document.querySelector("#editProductCoupon").value;

      console.log("Produto atualizado.", products[index]);

      localStorage.setItem("products", JSON.stringify(products));
      populateSelectFromStorage("#filterCategoryProd", "products", "productType");

      renderTableFromType("prod");
      bootstrap.Modal.getInstance(document.querySelector("#itemEditModal")).hide();
    } else {
      console.error("Produto não encontrado!");
    }
  }
  if (e.target.id === "itemSaveBtnProf") {
    const id = document.querySelector("#editTeacherId").value;

    // Busca o item pelo id
    const index = teachers.findIndex((item) => item.id == id);
    
    if (index !== -1) {
      teachers[index].name = document.querySelector("#editteacherName").value;
      teachers[index].email = document.querySelector("#editteacherEmail").value;
      teachers[index].disciplines = document.querySelector("#editteacherDisciplines").value.split(",").map(d => d.trim()); 
      teachers[index].dateOfBirth = document.querySelector("#editteacherDOB").value;
      teachers[index].locality = document.querySelector("#editteacherLocality").value;
      teachers[index].aboutMe = document.querySelector("#editteacherAboutMe").value;
      teachers[index].price = parseFloat(document.querySelector("#editteacherPrice").value);

      console.log("teacher atualizado.", teachers[index]);

      localStorage.setItem("teachers", JSON.stringify(teachers));

      // Atualiza o select de disciplinas
      populateSelectFromStorage("#filterDisciplineProf", "teachers", "disciplines");
      // Re-renderize a tabela
      renderTableFromType("prof");

      // Feche o modal
      bootstrap.Modal.getInstance(document.querySelector("#itemEditModal")).hide();

    } else {
      console.error("professor não encontrado!");
    }
  } 
  if (e.target.id === "itemSaveBtnAlun") {
    const id = document.querySelector("#editAlunId").value;

  // Busca o item pelo id
  const index = students.findIndex((item) => item.id == id);
  
  if (index !== -1) {
    students[index].name = document.querySelector("#editAlunName").value;
    students[index].email = document.querySelector("#editAlunEmail").value;
    students[index].grade = document.querySelector("#editAlunGrade").value;
    students[index].dateOfBirth = document.querySelector("#editAlunDOB").value;
    students[index].locality = document.querySelector("#editAlunLocality").value;
    students[index].aboutMe = document.querySelector("#editAlunAboutMe").value;

    console.log("Aluno atualizado.", students[index]);

    localStorage.setItem("students", JSON.stringify(students));

    // Atualiza o select de grau escolar
    populateSelectFromStorage("#filterGradeAlun", "students", "grade");
    // Re-renderize a tabela
    renderTableFromType("alun");

    // Feche o modal
    bootstrap.Modal.getInstance(document.querySelector("#itemEditModal")).hide();

  } else {
    console.error("Aluno não encontrado!");
  }
  }
});
// Adicionar novo item
document.addEventListener("click", (e) => {
  // Produto
  if (e.target.id === "itemAddBtnProd") {
    e.preventDefault();
    const newItem = {
      productID: Date.now(),
      productType: document.getElementById("addProductType").value,
      productName: document.getElementById("addProductName").value,
      productQuantity: parseInt(document.getElementById("addProductQuantity").value),
      productQuality: document.getElementById("addProductQuality").value,
      productSize: document.getElementById("addProductSize").value,
      productColor: document.getElementById("addProductColor").value,
      productPrice: parseFloat(document.getElementById("addProductPrice").value),
      productCoupon: document.getElementById("addProductCoupon").value
    };
    products.push(newItem);
    localStorage.setItem("products", JSON.stringify(products));
    populateSelectFromStorage("#filterCategoryProd", "products", "productType");
    renderTableFromType("prod");
    bootstrap.Modal.getInstance(document.getElementById("itemAddModal")).hide();
  }
  // Professor
  if (e.target.id === "itemAddBtnProf") {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      name: document.getElementById("addTeacherName").value,
      email: document.getElementById("addTeacherEmail").value,
      disciplines: document.getElementById("addTeacherDisciplines").value.split(",").map(d => d.trim()),
      dateOfBirth: document.getElementById("addTeacherDOB").value,
      locality: document.getElementById("addTeacherLocality").value,
      aboutMe: document.getElementById("addTeacherAboutMe").value,
      password: document.getElementById("addTeacherPassword").value,
      price: parseFloat(document.getElementById("addTeacherPrice").value),
      points: 0, // Pontos iniciais
      priority: 2 // Prioridade inicial
    };
    teachers.push(newItem);
    localStorage.setItem("teachers", JSON.stringify(teachers));
    populateSelectFromStorage("#filterDisciplineProf", "teachers", "disciplines");
    renderTableFromType("prof");
    bootstrap.Modal.getInstance(document.getElementById("itemAddModal")).hide();
  }
  // Aluno
  if (e.target.id === "itemAddBtnAlun") {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      name: document.getElementById("addAlunName").value,
      email: document.getElementById("addAlunEmail").value,
      password: "defaultPassword", // Senha padrão, pode ser alterada depois
      grade: document.getElementById("addAlunGrade").value,
      EEcontact: "000000000", // Número de telefone do responsável, pode ser alterado depois
      incapacity: "não", // Informação sobre incapacidade, pode ser alterada depois
      gender: document.getElementById("addAlunGender").value,
      dateOfBirth: document.getElementById("addAlunDOB").value,
      locality: document.getElementById("addAlunLocality").value,
      disciplines: [], // Inicialmente vazio, pode ser preenchido depois
      aboutMe: document.getElementById("addAlunAboutMe").value,
      points: 0, // Pontos iniciais
      priority: 1 
    };
    students.push(newItem);
    localStorage.setItem("students", JSON.stringify(students));
    populateSelectFromStorage("#filterGradeAlun", "students", "grade");
    renderTableFromType("alun");
    bootstrap.Modal.getInstance(document.getElementById("itemAddModal")).hide();
  }
});

document.getElementById("addProductBtn").addEventListener("click", () => showAddModal("prod"));
document.getElementById("addProfBtn").addEventListener("click", () => showAddModal("prof"));
document.getElementById("addAlunBtn").addEventListener("click", () => showAddModal("alun"));