document.addEventListener('DOMContentLoaded', () => {
  const greetingEl = document.getElementById('user-greeting');
  if (!greetingEl) return;

  const user = JSON.parse(localStorage.getItem('loggedUser'));

  if (!user || !user.name || !user.priority) {
    greetingEl.textContent = 'Olá, visitante!';
    return;
  }

  const now = new Date();
  const hour = now.getHours();

  let greeting;

  if (user.priority === 1) {
    // Estudante
    if (hour < 12) {
      greeting = `Bom dia ${user.name}!`;
    } else if (hour < 18) {
      greeting = `Boa tarde ${user.name}!`;
    } else {
      greeting = `Boa noite ${user.name}!`;
    }
  } else if (user.priority === 2) {
    // Professor
    if (hour < 12) {
      greeting = `Bom dia mestre ${user.name}!`;
    } else if (hour < 18) {
      greeting = `Boa tarde mestre ${user.name}!`;
    } else {
      greeting = `Boa noite mestre ${user.name}!`;
    }
  }

  greetingEl.textContent = greeting;
});
