// Fetch user name from login
const userName = localStorage.getItem("hamsterUser");
if (!userName) window.location.href = "login.html";

// Display welcome
const welcomeText = document.getElementById("welcomeText");
if (welcomeText) welcomeText.textContent = `Welcome, ${userName}!`;

// Define lessons with videos and quizzes
const lessons = [
  {
    id: 1,
    title: "Introduction to HTML",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    question: "What does HTML stand for?",
    options: [
      { text: "Hyper Trainer Markup Language", correct: false },
      { text: "HyperText Markup Language", correct: true },
      { text: "Hyperlink and Text Marking Language", correct: false },
      { text: "High-level Text Markup Logic", correct: false },
    ]
  },
  {
    id: 2,
    title: "Basics of CSS",
    video: "https://www.w3schools.com/html/movie.mp4",
    question: "What is CSS used for?",
    options: [
      { text: "Data Modeling", correct: false },
      { text: "Content Management", correct: false },
      { text: "Styling and Layout", correct: true },
      { text: "Server Communication", correct: false },
    ]
  },
  {
    id: 3,
    title: "JavaScript Introduction",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    question: "What does JavaScript mainly control?",
    options: [
      { text: "Page Design", correct: false },
      { text: "HTML Content", correct: false },
      { text: "Web Interactivity", correct: true },
      { text: "Database Connections", correct: false },
    ]
  }
];

// Load or initialize scores
let quizScores = JSON.parse(localStorage.getItem("quizScores")) || {
  total: 0,
  attempted: 0,
  completed: {}
};

// Dynamically generate lesson cards
const container = document.getElementById("lessonsContainer");

lessons.forEach(lesson => {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <h3>${lesson.title}</h3>
    <video controls>
      <source src="${lesson.video}" type="video/mp4">
    </video>
    <div class="quiz">
      <h4>🧠 Quiz: ${lesson.question}</h4>
      <ul>
        ${lesson.options.map(opt =>
          `<li onclick="checkAnswer(this, ${lesson.id})" data-correct="${opt.correct}">
            ${opt.text}
          </li>`).join("")}
      </ul>
    </div>
  `;

  container.appendChild(card);
});

// Update quiz score display
function updateScoreDisplay() {
  const scoreText = document.getElementById("scoreText");
  if (scoreText) {
    scoreText.textContent = `You've attempted ${quizScores.attempted} out of ${lessons.length} quizzes. Your total score: ${quizScores.total}/${lessons.length}`;
  }

  if (quizScores.attempted === lessons.length) {
    showCongratsPopup();
  }
}

// Handle quiz answer selection
function checkAnswer(element, quizId) {
  const allOptions = element.parentElement.querySelectorAll("li");
  if (quizScores.completed[quizId]) return;

  const isCorrect = element.dataset.correct === "true";

  allOptions.forEach(opt => {
    opt.style.pointerEvents = "none";
    opt.classList.remove("correct", "wrong");
  });

  if (isCorrect) {
    element.classList.add("correct");
    quizScores.total += 1;
  } else {
    element.classList.add("wrong");
    allOptions.forEach(opt => {
      if (opt.dataset.correct === "true") opt.classList.add("correct");
    });
  }

  quizScores.attempted += 1;
  quizScores.completed[quizId] = true;
  localStorage.setItem("quizScores", JSON.stringify(quizScores));

  updateScoreDisplay();
}

// Show congratulations popup
function showCongratsPopup() {
  const popup = document.getElementById("congratsPopup");
  if (popup) popup.classList.add("show");
}

// Go to certificate page
function goToCertificate() {
  window.location.href = "certificate.html";
}

// Logout clears session
function logout() {
  localStorage.removeItem("hamsterUser");
  localStorage.removeItem("quizScores");
  window.location.href = "login.html";
}

// On load
window.addEventListener("DOMContentLoaded", () => {
  updateScoreDisplay();
});
