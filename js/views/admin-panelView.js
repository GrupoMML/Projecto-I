import { getTeachers, addTeacher as addTeacherModel, updateTeacher as updateTeacherModel, deleteTeacher as deleteTeacherModel } from "../models/teachersModel.js";
import { getStudents, addStudent as addStudentModel, updateStudent as updateStudentModel, deleteStudent as deleteStudentModel } from "../models/studentModel.js";
import { getReviews, deleteReview as deleteReviewModel } from "../models/reviewModel.js";

let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
if (!loggedUser || loggedUser.role !== "admin") {
    window.location.href = "../../html/main/login.html";
}

// Estado global
const state = {
    teachers: getTeachers(),
    students: getStudents(),
    reviews: getReviews(),
    filters: {
        prof: { name: '', email: '', discipline: '' },
        alun: { name: '', email: '', grade: '' },
        rev: { student: '', teacher: '', rating: '' }
    },
    sort: {
        prof: { col: '', asc: true },
        alun: { col: '', asc: true },
        rev: { col: '', asc: true }
    },
    pagination: {
        prof: { page: 1 },
        alun: { page: 1 },
        rev: { page: 1 }
    }
};

console.log(state.reviews);

const pageSize = 6;

// Funções de renderização
function renderTable(tableType) {
    switch (tableType) {
        case 'prof':
            renderTeachersTable();
            break;
        case 'alun':
            renderStudentsTable();
            break;
        case 'rev':
            renderReviewsTable();
            break;
    }
    updateSortIcons(tableType);
}

function renderTeachersTable() {
    const { filters, sort, pagination } = state;
    const filtered = state.teachers.filter(teacher => 
        teacher.name.toLowerCase().includes(filters.prof.name.toLowerCase()) &&
        teacher.email.toLowerCase().includes(filters.prof.email.toLowerCase()) &&
        teacher.disciplines.join(", ").toLowerCase().includes(filters.prof.discipline.toLowerCase())
    );

    const sorted = sortData(filtered, sort.prof.col, sort.prof.asc);
    renderPaginatedData(sorted, pagination.prof.page, '#tbody-professores', renderTeacherRow);
    renderPagination(sorted.length, 'prof');
}

function renderStudentsTable() {
    const { filters, sort, pagination } = state;
    const filtered = state.students.filter(student => 
        student.name.toLowerCase().includes(filters.alun.name.toLowerCase()) &&
        student.email.toLowerCase().includes(filters.alun.email.toLowerCase()) &&
        student.grade.toLowerCase().includes(filters.alun.grade.toLowerCase())
    );

    const sorted = sortData(filtered, sort.alun.col, sort.alun.asc);
    renderPaginatedData(sorted, pagination.alun.page, '#tbody-alunos', renderStudentRow);
    renderPagination(filtered.length, 'alun');
}

function renderReviewsTable() {
    const { filters, sort, pagination } = state;
    const filtered = state.reviews.filter(review => {
        // Para arrays, verificamos se algum elemento corresponde ao filtro
        const studentMatch = review.student?.some(s => 
            s.toLowerCase().includes(filters.rev.student.toLowerCase()));
        
        const teacherMatch = review.teacher?.some(t => 
            t.toLowerCase().includes(filters.rev.teacher.toLowerCase()));
        
        const ratingMatch = filters.rev.rating === '' || 
            review.rating.toString() === filters.rev.rating;
        
        return studentMatch && teacherMatch && ratingMatch;
    });

    const sorted = sortData(filtered, sort.rev.col, sort.rev.asc, true);
    renderPaginatedData(sorted, pagination.rev.page, '#tbody-reviews', renderReviewRow);
    renderPagination(filtered.length, 'rev');
}

// Funções auxiliares de renderização
function sortData(data, column, ascending, isReview = false) {
    if (!column) return data;
    
    return [...data].sort((a, b) => {
        let valA = a[column];
        let valB = b[column];
        
        if (isReview) {
            if (column === 'rating') {
                valA = parseFloat(valA);
                valB = parseFloat(valB);
            } else if (column === 'date') {
                valA = new Date(valA).getTime();
                valB = new Date(valB).getTime();
            }
        }
        
        return ascending ? 
            (valA < valB ? -1 : valA > valB ? 1 : 0) :
            (valA > valB ? -1 : valA < valB ? 1 : 0);
    });
}

function renderPaginatedData(data, page, selector, renderRow) {
    const start = (page - 1) * pageSize;
    const paged = data.slice(start, start + pageSize);
    
    document.querySelector(selector).innerHTML = paged.map(renderRow).join('');
}

function renderTeacherRow(teacher) {
    return `
        <tr>
            <td>${teacher.name}</td>
            <td>${teacher.email}</td>
            <td>${teacher.disciplines.join(", ")}</td>
            <td>
                <button class="btn btn-sm btn-primary me-1 view-item" data-type="teacher" data-id="${teacher.id}">
                    <i class="fa-solid fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-warning me-1 edit-item" data-type="teacher" data-id="${teacher.id}">
                    <i class="fa-solid fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger delete-item" data-type="teacher" data-id="${teacher.id}">
                    <i class="fa-solid fa-trash-alt"></i>
                </button>
            </td>
        </tr>`;
}

function renderStudentRow(student) {
    return `
        <tr>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.grade}</td>
            <td>
                <button class="btn btn-sm btn-primary me-1 view-item" data-type="student" data-id="${student.id}">
                    <i class="fa-solid fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-warning me-1 edit-item" data-type="student" data-id="${student.id}">
                    <i class="fa-solid fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger delete-item" data-type="student" data-id="${student.id}">
                    <i class="fa-solid fa-trash-alt"></i>
                </button>
            </td>
        </tr>`;
}

function renderReviewRow(review) {
    // Para arrays, juntamos os elementos com vírgula
    const students = Array.isArray(review.student) ? 
        review.student.join(", ") : 
        review.student || '';
    
    const teachers = Array.isArray(review.teacher) ? 
        review.teacher.join(", ") : 
        review.teacher || '';
    
    const comments = review.comments || '';
    
    return `
        <tr>
            <td>${students}</td>
            <td>${teachers}</td>
            <td>${review.lesson || ''}</td>
            <td>${review.rating || ''}</td>
            <td>${comments.substring(0, 30)}${comments.length > 30 ? '...' : ''}</td>
            <td>${review.date ? new Date(review.date).toLocaleDateString() : ''}</td>
            <td>
                <button class="btn btn-sm btn-primary me-1 view-item" data-type="review" data-id="${review.id}">
                    <i class="fa-solid fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-warning me-1 edit-item" data-type="review" data-id="${review.id}">
                    <i class="fa-solid fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger delete-item" data-type="review" data-id="${review.id}">
                    <i class="fa-solid fa-trash-alt"></i>
                </button>
            </td>
        </tr>`;
}

function renderPagination(totalItems, tableType) {
    const totalPages = Math.ceil(totalItems / pageSize);
    const container = document.getElementById(`pagination-${tableType}`);
    container.innerHTML = '';
    
    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement("li");
        li.className = `page-item ${i === state.pagination[tableType].page ? "active" : ""}`;
        li.innerHTML = `<button class="page-link">${i}</button>`;
        li.addEventListener("click", () => {
            state.pagination[tableType].page = i;
            renderTable(tableType);
        });
        container.appendChild(li);
    }
}

// Funções de UI
function updateSortIcons(tableType) {
    const sortMap = {
        prof: {
            name: 'sortNameProf',
            email: 'sortEmailProf'
        },
        alun: {
            name: 'sortNameAlun',
            email: 'sortEmailAlun'
        },
        rev: {
            student: 'sortStudentRev',
            teacher: 'sortTeacherRev',
            lesson: 'sortLessonRev',
            rating: 'sortRatingRev',
            date: 'sortDateRev'
        }
    };
    
    Object.entries(sortMap[tableType]).forEach(([col, id]) => {
        const icon = document.querySelector(`#${id} i`);
        if (state.sort[tableType].col === col) {
            icon.className = state.sort[tableType].asc ? 'fas fa-sort-up' : 'fas fa-sort-down';
        } else {
            icon.className = 'fas fa-sort';
        }
    });
}

// Funções de Modal
function showItemModal(type, id) {
    const item = state[`${type}s`].find(item => item.id == id);
    if (!item) return;
    
    let content = '';
    
    switch (type) {
        case 'teacher':
            content = `
                <p>Email: ${item.email}</p>
                <p>Disciplina: ${item.disciplines.join(", ")}</p>
                <p>Data de Nascimento: ${item.dateOfBirth || 'Não disponível'}</p>
                <p>Localidade: ${item.locality || 'Não disponível'}</p>
                <p>Descrição: ${item.aboutMe || 'Não disponível'}</p>
                <p>Preço por Hora: ${item.price || 'Não disponível'}</p>
            `;
            break;
            
        case 'student':
            content = `
                <p>Email: ${item.email}</p>
                <p>Telefone: ${item.EEcontact || 'Não disponível'}</p>
                <p>Disciplinas: ${item.disciplines.join(", ") || 'Nenhuma'}</p>
                <p>Escolaridade: ${item.grade}</p>
                <p>Data de Nascimento: ${item.dateOfBirth || 'Não disponível'}</p>
                <p>Localidade: ${item.locality || 'Não disponível'}</p>
                <p>Descrição: ${item.aboutMe || 'Não disponível'}</p>
            `;
            break;
            
        function renderReviewRow(review) {
    // Para arrays, juntamos os elementos com vírgula
    const students = Array.isArray(review.student) ? 
        review.student.join(", ") : 
        review.student || '';
    
    const teachers = Array.isArray(review.teacher) ? 
        review.teacher.join(", ") : 
        review.teacher || '';
    
    const comments = review.comments || '';
    
    return `
        <tr>
            <td>${students}</td>
            <td>${teachers}</td>
            <td>${review.lesson || ''}</td>
            <td>${review.rating || ''}</td>
            <td>${comments.substring(0, 30)}${comments.length > 30 ? '...' : ''}</td>
            <td>${review.date ? new Date(review.date).toLocaleDateString() : ''}</td>
            <td>
                <button class="btn btn-sm btn-primary me-1 view-item" data-type="review" data-id="${review.id}">
                    <i class="fa-solid fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-warning me-1 edit-item" data-type="review" data-id="${review.id}">
                    <i class="fa-solid fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger delete-item" data-type="review" data-id="${review.id}">
                    <i class="fa-solid fa-trash-alt"></i>
                </button>
            </td>
        </tr>`;
}
    }
    
    document.getElementById('itemModalLabel').innerHTML = item.name || `Review de ${item.student}`;
    document.getElementById('itemModalBody').innerHTML = content;
    new bootstrap.Modal(document.getElementById('itemModal')).show();
}

function showEditModal(type, id) {
    const item = state[`${type}s`].find(item => item.id == id);
    if (!item) return;
    
    let formHTML = '';
    
    switch (type) {
        case 'teacher':
            formHTML = `
                <input type="text" value="${item.name}" class="form-control mb-2" placeholder="Nome">
                <input type="email" value="${item.email}" class="form-control mb-2" placeholder="Email">
                <input type="text" value="${item.disciplines.join(", ")}" class="form-control mb-2" placeholder="Disciplinas">
                <input type="date" value="${item.dateOfBirth}" class="form-control mb-2">
                <input type="text" value="${item.locality}" class="form-control mb-2" placeholder="Localidade">
                <textarea class="form-control mb-2" placeholder="Sobre mim">${item.aboutMe}</textarea>
                <input type="text" value="${item.price}" class="form-control mb-2" placeholder="Preço por Hora">
                <button class="btn btn-primary mt-3" data-action="save" data-type="teacher" data-id="${item.id}">Salvar</button>
            `;
            break;
            
        case 'student':
            formHTML = `
                <input type="text" value="${item.name}" class="form-control mb-2" placeholder="Nome">
                <input type="email" value="${item.email}" class="form-control mb-2" placeholder="Email">
                <select class="form-control mb-2">
                    ${['1º Ano', '2º Ano', '3º Ano', '4º Ano', '5º Ano', '6º Ano', 
                       '7º Ano', '8º Ano', '9º Ano', '10º Ano', '11º Ano', '12º Ano']
                       .map(grade => `<option ${grade === item.grade ? 'selected' : ''}>${grade}</option>`)
                       .join('')}
                </select>
                <input type="text" value="${item.EEcontact}" class="form-control mb-2" placeholder="Telefone">
                <input type="date" value="${item.dateOfBirth}" class="form-control mb-2">
                <input type="text" value="${item.locality}" class="form-control mb-2" placeholder="Localidade">
                <textarea class="form-control mb-2" placeholder="Sobre mim">${item.aboutMe}</textarea>
                <button class="btn btn-primary mt-3" data-action="save" data-type="student" data-id="${item.id}">Salvar</button>
            `;
            break;
    }
    
    document.querySelector("#itemEditModalLabel").innerHTML = `Editar ${type === 'review' ? 'Review' : type}`;
    document.querySelector("#itemEditForm").innerHTML = formHTML;
    new bootstrap.Modal(document.getElementById("itemEditModal")).show();
}

function showAddModal(type) {
    let formHTML = '';
    
    switch (type) {
        case 'teacher':
            formHTML = `
                <input type="text" class="form-control mb-2" placeholder="Nome">
                <input type="email" class="form-control mb-2" placeholder="Email">
                <input type="password" class="form-control mb-2" placeholder="Senha">
                <input type="text" class="form-control mb-2" placeholder="Disciplinas">
                <input type="date" class="form-control mb-2">
                <input type="text" class="form-control mb-2" placeholder="Localidade">
                <textarea class="form-control mb-2" placeholder="Sobre mim"></textarea>
                <input type="text" class="form-control mb-2" placeholder="Preço por Hora">
                <button class="btn btn-primary mt-3" data-action="add" data-type="teacher">Adicionar</button>
            `;
            break;
            
        case 'student':
            formHTML = `
                <input type="text" class="form-control mb-2" placeholder="Nome">
                <input type="email" class="form-control mb-2" placeholder="Email">
                <select class="form-control mb-2">
                    <option value="">Selecione o Ano Escolar</option>
                    ${['1º Ano', '2º Ano', '3º Ano', '4º Ano', '5º Ano', '6º Ano', 
                       '7º Ano', '8º Ano', '9º Ano', '10º Ano', '11º Ano', '12º Ano']
                       .map(grade => `<option>${grade}</option>`).join('')}
                </select>
                <input type="text" class="form-control mb-2" placeholder="Telefone">
                <input type="date" class="form-control mb-2">
                <input type="text" class="form-control mb-2" placeholder="Localidade">
                <textarea class="form-control mb-2" placeholder="Sobre mim"></textarea>
                <button class="btn btn-primary mt-3" data-action="add" data-type="student">Adicionar</button>
            `;
            break;
    }
    
    document.getElementById("itemAddModalLabel").innerHTML = `Adicionar ${type === 'review' ? 'Review' : type}`;
    document.getElementById("itemAddForm").innerHTML = formHTML;
    new bootstrap.Modal(document.getElementById("itemAddModal")).show();
}

// Event Listeners
function setupEventListeners() {
    // Filtros
    document.querySelectorAll('[id^="filter"]').forEach(input => {
        const [_, tableType, filterType] = input.id.match(/filter(\w+)(\w+)/) || [];
        if (tableType && filterType) {
            const type = tableType.toLowerCase();
            input.addEventListener('input', () => {
                state.filters[type][filterType.toLowerCase()] = input.value;
                state.pagination[type].page = 1;
                renderTable(type);
            });
        }
    });
    
    // Ordenação
    document.querySelectorAll('[id^="sort"]').forEach(header => {
        const [_, tableType, col] = header.id.match(/sort(\w+)(\w+)/) || [];
        if (tableType && col) {
            const type = tableType.toLowerCase();
            header.addEventListener('click', () => {
                if (state.sort[type].col === col.toLowerCase()) {
                    state.sort[type].asc = !state.sort[type].asc;
                } else {
                    state.sort[type].col = col.toLowerCase();
                    state.sort[type].asc = true;
                }
                renderTable(type);
            });
        }
    });
    
    // Botões de ação
    document.body.addEventListener('click', async (e) => {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;
        
        const action = btn.dataset.action;
        const type = btn.dataset.type;
        const id = btn.dataset.id;
        
        try {
            if (action === 'view') {
                showItemModal(type, id);
            } 
            else if (action === 'edit') {
                showEditModal(type, id);
            } 
            else if (action === 'delete') {
                if (confirm("Tem certeza que deseja excluir?")) {
                    await deleteItem(type, id);
                    renderTable(type);
                }
            } 
            else if (action === 'save') {
                await updateItem(type, id);
                bootstrap.Modal.getInstance(document.querySelector("#itemEditModal")).hide();
                renderTable(type);
            } 
            else if (action === 'add') {
                await addItem(type);
                bootstrap.Modal.getInstance(document.querySelector("#itemAddModal")).hide();
                renderTable(type);
            }
        } catch (error) {
            console.error(`Erro ao ${action} ${type}:`, error);
            alert(`Erro ao ${action} ${type}`);
        }
    });
    
    // Botões de adicionar
    document.getElementById("addProfBtn").addEventListener("click", () => showAddModal("teacher"));
    document.getElementById("addAlunBtn").addEventListener("click", () => showAddModal("student"));
}

// Funções CRUD
async function deleteItem(type, id) {
    switch (type) {
        case 'teacher':
            deleteTeacherModel(id);
            state.teachers = getTeachers();
            break;
        case 'student':
            deleteStudentModel(id);
            state.students = getStudents();
            break;
        case 'review':
            deleteReviewModel(id);
            state.reviews = getReviews();
            break;
    }
}

async function updateItem(type, id) {
    const form = document.querySelector("#itemEditForm");
    const inputs = form.querySelectorAll('input, select, textarea');
    
    switch (type) {
        case 'teacher':
            const teacherData = {
                id,
                name: inputs[0].value,
                email: inputs[1].value,
                disciplines: inputs[2].value.split(',').map(d => d.trim()),
                dateOfBirth: inputs[3].value,
                locality: inputs[4].value,
                aboutMe: inputs[5].value,
                price: parseFloat(inputs[6].value)
            };
            updateTeacherModel(teacherData);
            state.teachers = getTeachers();
            break;
            
        case 'student':
            const studentData = {
                id,
                name: inputs[0].value,
                email: inputs[1].value,
                grade: inputs[2].value,
                EEcontact: inputs[3].value,
                dateOfBirth: inputs[4].value,
                locality: inputs[5].value,
                aboutMe: inputs[6].value
            };
            updateStudentModel(studentData);
            state.students = getStudents();
            break;
            
    }
}

async function addItem(type) {
    const form = document.querySelector("#itemAddForm");
    const inputs = form.querySelectorAll('input, select, textarea');
    
    switch (type) {
        case 'teacher':
            const teacherData = {
                name: inputs[0].value,
                email: inputs[1].value,
                password: inputs[2].value,
                disciplines: inputs[3].value.split(',').map(d => d.trim()),
                dateOfBirth: inputs[4].value,
                locality: inputs[5].value,
                aboutMe: inputs[6].value,
                price: parseFloat(inputs[7].value),
                points: 0,
                priority: 2
            };
            addTeacherModel(teacherData);
            state.teachers = getTeachers();
            break;
            
        case 'student':
            const studentData = {
                name: inputs[0].value,
                email: inputs[1].value,
                password: 'defaultPassword',
                grade: inputs[2].value,
                EEcontact: inputs[3].value || '000000000',
                incapacity: 'não',
                gender: 'masculino',
                dateOfBirth: inputs[4].value,
                locality: inputs[5].value,
                aboutMe: inputs[6].value,
                points: 0,
                priority: 1
            };
            addStudentModel(studentData);
            state.students = getStudents();
            break;
    }
}

// Inicialização
function init() {
    // Preencher selects de filtro
    populateSelectFromStorage("#filterDisciplineProf", "teachers", "disciplines");
    populateSelectFromStorage("#filterGradeAlun", "students", "grade");
    
    // Renderizar tabelas
    renderTable('prof');
    renderTable('alun');
    renderTable('rev');
    
    // Configurar listeners
    setupEventListeners();
}

// Função auxiliar para preencher selects
function populateSelectFromStorage(selectId, storageKey, property) {
    const items = JSON.parse(localStorage.getItem(storageKey)) || [];
    const values = [...new Set(items.map(item => 
        Array.isArray(item[property]) ? 
        item[property].join(", ") : 
        item[property]
    ))].filter(Boolean).sort();
    
    const select = document.querySelector(selectId);
    select.innerHTML = `<option value="">Todos</option>` + 
        values.map(val => `<option value="${val.toLowerCase()}">${val}</option>`).join('');
}

// Iniciar aplicação
init();