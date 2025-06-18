let currentProfessor = null; // Variável global para armazenar o professor atual

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get("id"));  //
    
    fetch("../../json/index.json")
        .then((res) => res.json())
        .then((json) => {
            const teachers = JSON.parse(localStorage.getItem("teachers")) || json.teachers;

            const prof = teachers.find((teacher) => teacher.id === id);
            currentProfessor = prof; // Armazena o professor atual

            if (!prof) {
                console.error("Professor não encontrado para o ID:", id);
                return;
            }

            // Dados do professor
            
            // Preencher os dados do professor
            document.querySelector(".teachersInfo-card-header").textContent = currentProfessor.name;
            document.querySelectorAll(".teachersInfo-box")[0].textContent = currentProfessor.email;
            document.querySelectorAll(".teachersInfo-box")[1].textContent = currentProfessor.locality;
            document.querySelectorAll(".teachersInfo-box")[2].textContent = currentProfessor.classType;
            document.querySelector(".teachers-rightInfo img").src = currentProfessor.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80";

            // Preencher disciplinas
            const disciplinesList = document.querySelector('.disciplines-list');
            disciplinesList.innerHTML = currentProfessor.disciplines.map(d => 
                `<div><i class="fa-solid fa-check-circle"></i>${d}</div>`
            ).join('');

            // Preencher descrição
            document.querySelector('.description-box p').textContent = prof.aboutMe;
        })
        .catch(error => console.error("Erro ao carregar dados:", error));

        // Toggle da sidebar em dispositivos móveis
        const sidebarToggle = document.querySelector('.sidebar-toggle');
        const sidebar = document.querySelector('.sidebar');
        
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', function() {
                sidebar.classList.toggle('active');
            });
        }
});

        // Função para preencher as disciplinas no modal
        function populateDisciplinesModal() {
            const container = document.getElementById('disciplines-container');
            container.innerHTML = ''; // Limpa o container
            
            if (currentProfessor && currentProfessor.disciplines && currentProfessor.disciplines.length > 0) {
                // Preencher o nome do professor no modal
                document.getElementById('modalTeacherName').textContent = currentProfessor.name;
                
                currentProfessor.disciplines.forEach(discipline => {
                    const div = document.createElement('div');
                    div.className = 'modal-discipline-item d-flex align-items-center';
                    
                    const input = document.createElement('input');
                    input.type = 'checkbox';
                    input.className = 'form-check-input me-2';
                    input.name = 'disciplines';
                    input.value = discipline;
                    input.id = `discipline-${discipline.toLowerCase().replace(/\s+/g, '-')}`;
                    
                    const label = document.createElement('label');
                    label.className = 'form-check-label';
                    label.htmlFor = input.id;
                    label.textContent = discipline;
                    
                    div.appendChild(input);
                    div.appendChild(label);
                    container.appendChild(div);
                });
            } else {
                container.innerHTML = '<p class="text-center text-muted">Nenhuma disciplina disponível</p>';
            }
        }

        // Evento para quando o modal é aberto
        const scheduleModal = document.getElementById('scheduleModal');
        if (scheduleModal) {
            scheduleModal.addEventListener('show.bs.modal', function() {
                populateDisciplinesModal();
            });
        }

        // Evento para envio do formulário
        const scheduleForm = document.getElementById('scheduleForm');
        if (scheduleForm) {
            scheduleForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Obter disciplinas selecionadas
                const selectedDisciplines = Array.from(
                    document.querySelectorAll('input[name="disciplines"]:checked')).map(input => input.value);
                
                if (selectedDisciplines.length === 0) {
                    alert('Por favor, selecione pelo menos uma disciplina.');
                    return;
                }
                
                // Simulação de envio do formulário
                alert(`Aula marcada com sucesso para: ${document.getElementById('date').value} às ${document.getElementById('time').value} Disciplinas: ${selectedDisciplines.join(', ')}`);
                
                // Fechar o modal
                const modal = bootstrap.Modal.getInstance(scheduleModal);
                modal.hide();
            });
        }

        // Funções para avaliação
        function setupRatingModal() {
            const ratingModal = document.getElementById('ratingModal');
            if (ratingModal) {
                ratingModal.addEventListener('show.bs.modal', function () {
                    if (currentProfessor) {
                        document.getElementById('ratingTeacherName').textContent = currentProfessor.name;
                    }

                    // Resetar estrelas
                    document.querySelectorAll('#ratingStars i').forEach(star => {
                        star.classList.remove('active');
                    });
                    document.getElementById('selectedRating').value = 0;
                });
            }

            // Configurar clique nas estrelas
            document.querySelectorAll('#ratingStars i').forEach(star => {
                star.addEventListener('click', function () {
                    const rating = parseInt(this.getAttribute('data-rating'));
                    document.getElementById('selectedRating').value = rating;

                    // Atualizar visualização das estrelas
                    document.querySelectorAll('#ratingStars i').forEach((s, index) => {
                        if (index < rating) {
                            s.classList.add('active');
                        } else {
                            s.classList.remove('active');
                        }
                    });
                });
            });

            const ratingForm = document.getElementById('ratingForm');
            if (ratingForm) {
                ratingForm.addEventListener('submit', function (e) {
                    e.preventDefault();

                    const rating = document.getElementById('selectedRating').value;
                    if (rating === "0") {
                        alert('Por favor, selecione uma avaliação.');
                        return;
                    }

                    const ratingData = {
                        teacherId: currentProfessor.id,
                        rating: rating,
                        comment: document.getElementById('ratingComment').value,
                        date: new Date().toISOString()
                    };

                    // Simular envio de avaliação
                    console.log("Avaliação enviada:", ratingData);
                    alert(`Avaliação de ${rating} estrelas enviada para ${currentProfessor.name} com sucesso!`);

                    // Fechar o modal
                    const modal = bootstrap.Modal.getInstance(ratingModal);
                    modal.hide();

                    // Resetar o formulário
                    ratingForm.reset();
                });
            }
        }
