/*------------ LEADERBOARD -------------*/
/*------------------------------------------------*/
const leaderboards = [
  {
    title: "Leaderboard - Duckling",
    podiumIcons: ["fa-duck", "fa-duck", "fa-duck"],
    list: ["Eu", "Nome do utilizador", "Nome do utilizador", "Nome do utilizador", "Nome do utilizador", "Nome do utilizador", "Nome do utilizador"]
  },
  {
    title: "Leaderboard - Duckmaster",
    podiumIcons: ["fa-duck", "fa-duck", "fa-duck"],
    list: ["Nome do utilizador", "Nome do utilizador", "Eu", "Nome do utilizador", "Nome do utilizador", "Nome do utilizador", "Nome do utilizador"]
  }
];

let current = 0;

function renderLeaderboard(index) {
  const container = document.getElementById("leaderboard-container");
  const lb = leaderboards[index];

  const podium = `
    <div class="leaderboard-title text-center">${lb.title}</div>
    <div class="row justify-content-center text-center mb-4">
      <div class="col-md-4">
        <div class="leaderboard-circle gold position-relative">
          <i class="fa-solid fa-crown fa-lg text-warning position-absolute top-0 start-50 translate-middle-x"></i>
          <i class="fa-solid ${lb.podiumIcons[0]} fa-3x mt-3"></i>
          <p>1º<br>Nome do utilizador<br>x pts</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="leaderboard-circle silver">
          <i class="fa-solid ${lb.podiumIcons[1]} fa-3x"></i>
          <p>2º<br>Nome do utilizador<br>x pts</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="leaderboard-circle bronze">
          <i class="fa-solid ${lb.podiumIcons[2]} fa-3x"></i>
          <p>3º<br>Nome do utilizador<br>x pts</p>
        </div>
      </div>
    </div>
  `;

  const list = lb.list.map((name, i) => `
    <li class="list-group-item">
      <span><strong>${i + 4}</strong> <i class="fa fa-user user-icon"></i> ${name}</span>
      <span>x pts</span>
    </li>
  `).join("");

  container.innerHTML = `
    ${podium}
    <div class="leaderboard-box mt-4">
      <ul class="list-group">
        ${list}
      </ul>
    </div>
  `;
}

function nextLeaderboard() {
  current = (current + 1) % leaderboards.length;
  renderLeaderboard(current);
}

function prevLeaderboard() {
  current = (current - 1 + leaderboards.length) % leaderboards.length;
  renderLeaderboard(current);
}

document.addEventListener("DOMContentLoaded", () => renderLeaderboard(current));