const colors = ["red", "green", "blue", "yellow"];
let gameSequence = [];
let userSequence = [];
let level = 0;
let acceptingInput = false;

function startGame() {
  gameSequence = [];
  level = 0;
  nextRound();
}

function nextRound() {
  acceptingInput = false;
  userSequence = [];
  level++;
  document.getElementById("level-title").innerText = "Level: " + level;

  const nextColor = colors[Math.floor(Math.random() * 4)];
  gameSequence.push(nextColor);
  playSequence();
}

function playSequence() {
  let i = 0;
  const interval = setInterval(() => {
    flashButton(gameSequence[i]);
    i++;
    if (i >= gameSequence.length) {
      clearInterval(interval);
      setTimeout(() => {
        acceptingInput = true;
      }, 300);
    }
  }, 600); // time between flashes
}

function flashButton(color) {
  const btn = document.getElementById(color);
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 300);
}

function handleUserClick(color) {
  if (!acceptingInput) return;

  userSequence.push(color);
  flashButton(color);
  checkAnswer(userSequence.length - 1);
}

function checkAnswer(currentStep) {
  if (userSequence[currentStep] !== gameSequence[currentStep]) {
    alert("Game Over! You reached level " + level + ". Click Start to try again.");
    document.getElementById("level-title").innerText = "Level: 0";
    gameSequence = [];
    acceptingInput = false;
    return;
  }

  if (userSequence.length === gameSequence.length) {
    acceptingInput = false;
    setTimeout(nextRound, 1000);
  }
}

colors.forEach(color => {
  document.getElementById(color).addEventListener("click", () => handleUserClick(color));
});
