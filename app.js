const screens = [...document.querySelectorAll(".screen")];

const lessonIds = [
  "goals",
  "skin",
  "lesions",
  "tools",
  "procedure",
  "hygiene",
  "contra",
  "summary",
  "game",
  "reflection"
];

const studentForm = document.getElementById("student-form");
const formError = document.getElementById("form-error");
const studentSummary = document.getElementById("student-summary");
const personalGreeting = document.getElementById("personal-greeting");

function showScreen(destination) {
  if (!screens.some(screen => screen.id === destination)) {
    return;
  }

  screens.forEach(screen => {
    screen.hidden = screen.id !== destination;
  });

  document.querySelectorAll("nav button[data-go]").forEach(nav => {
    nav.classList.toggle(
      "nav-active",
      nav.dataset.go === destination ||
      (nav.dataset.go === "goals" && lessonIds.includes(destination))
    );
  });

  window.scrollTo({
    top: 0,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "instant"
      : "smooth"
  });
}

studentForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("student-name").value.trim();
  const studentClass = document.getElementById("student-class").value.trim();
  const attendance = document.getElementById("student-attendance").value.trim();

  if (!name || !studentClass || !/^[1-9]\d*$/.test(attendance)) {
    formError.hidden = false;
    studentSummary.hidden = true;
    return;
  }

  formError.hidden = true;

  studentSummary.textContent =
    `Data tersimpan: ${name} · ${studentClass} · Nomor absen ${attendance}`;

  studentSummary.hidden = false;

  personalGreeting.textContent = `Selamat belajar, ${name}!`;
  personalGreeting.hidden = false;

  showScreen("goals");
});

studentForm.addEventListener("reset", () => {
  formError.hidden = true;
  studentSummary.hidden = true;
  personalGreeting.hidden = true;
});

document.addEventListener("click", event => {
  const button = event.target.closest("button[data-go]");

  if (button) {
    showScreen(button.dataset.go);
  }
});

const gameBtn = document.getElementById("gameBtn");

if (gameBtn) {
  gameBtn.addEventListener("click", function () {
    window.open(
      "https://tianarqidwin-hash.github.io/ale-s-glow-salon/",
      "_blank",
      "noopener,noreferrer"
    );
  });
}