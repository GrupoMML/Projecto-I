// Seleciona o botão
const toggleBtn = document.querySelector('.description-toggle');

toggleBtn.addEventListener('click', toggleDescription);

function toggleDescription() {
  const descContent = document.getElementById('descContent');
  const arrow = document.getElementById('arrow');

  descContent.classList.toggle('show');

  if (descContent.classList.contains('show')) {
    arrow.textContent = '▲';
  } else {
    arrow.textContent = '▼';
  }
}
