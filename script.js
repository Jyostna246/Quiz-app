const startBtn = document.getElementById("startBtn");
const quizEl = document.getElementById("quiz");
const settingsEl = document.getElementById("settings");
const resultEl = document.getElementById("result");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const usernameEl = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const leaderboardList = document.getElementById("leaderboardList");
const timerEl = document.getElementById("time");

let questions = [];
let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
  const category = document.getElementById("category").value;
  const difficulty = document.getElementById("difficulty").value;

  fetch(https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple)
    .then(res => res.json())
    .then(data => {
      questions = data.results;
      currentIndex = 0;
      score = 0;
      settingsEl.classList.add("hidden");
      resultEl.classList.add("hidden");
      quizEl.classList.remove("hidden");
      showQuestion();
    });
}

function showQuestion() {
  clearInterval(timer);
  timeLeft = 15;
  timerEl.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);

  const q = questions[currentIndex];
  questionEl.innerHTML = decodeHTML(q.question);

  const answers = [...q.incorrect_answers, q.correct_answer];
  shuffleArray(answers);

  optionsEl.innerHTML = "";
  answers.forEach(ans => {
    settingsEl.classList.add("hidden");
      resultEl.classList.add("hidden");
      quizEl.classList.remove("hidden");
      showQuestion();
    });
}

function showQuestion() {
  clearInterval(timer);
  timeLeft = 15;
  timerEl.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);

  const q = questions[currentIndex];
  questionEl.innerHTML = decodeHTML(q.question);

  const answers = [...q.incorrect_answers, q.correct_answer];
  shuffleArray(answers);

  optionsEl.innerHTML = "";
  answers.forEach(ans => {
    settingsEl.classList.add("hidden");
      resultEl.classList.add("hidden");
      quizEl.classList.remove("hidden");
      showQuestion();
    });
}

function showQuestion() {
  clearInterval(timer);
  timeLeft = 15;
  timerEl.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);

  const q = questions[currentIndex];
  questionEl.innerHTML = decodeHTML(q.question);

  const answers = [...q.incorrect_answers, q.correct_answer];
  shuffleArray(answers);

  optionsEl.innerHTML = "";
  answers.forEach(ans => {
    settingsEl.classList.add("hidden");
      resultEl.classList.add("hidden");
      quizEl.classList.remove("hidden");
      showQuestion();
    });
}

function showQuestion() {
  clearInterval(timer);
  timeLeft = 15;
  timerEl.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);

  const q = questions[currentIndex];
  questionEl.innerHTML = decodeHTML(q.question);

  const answers = [...q.incorrect_answers, q.correct_answer];
  shuffleArray(answers);

  optionsEl.innerHTML = "";
  answers.forEach(ans => {
    const btn = document.createElement("button");
    btn.innerHTML = decodeHTML(ans);
    btn.addEventListener("click", () => selectAnswer(btn, q.correct_answer));
    optionsEl.appendChild(btn);
  });
}

function selectAnswer(btn, correct) {
  clearInterval(timer);
  Array.from(optionsEl.children).forEach(b => {
    b.disabled = true;
    if (b.innerHTML === decodeHTML(correct)) {
      b.classList.add("correct");
    } else if (b === btn) {
      b.classList.add("wrong");
    }
  });

  if (btn.innerHTML === decodeHTML(correct)) {
    score++;
  }

  setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  quizEl.classList.add("hidden");
  resultEl.classList.remove("hidden");
  scoreEl.textContent = Your Score: ${score} / ${questions.length};
}

saveScoreBtn.addEventListener("click", () => {
  const name = usernameEl.value.trim() || "Anonymous";
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboard.push({ name, score });
  leaderboard.sort((a,b) => b.score - a.score);
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  showLeaderboard();
});

function showLeaderboard() {
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboardList.innerHTML = "";
  leaderboard.slice(0,5).forEach(item => {
    const li = document.createElement("li");
    li.textContent = ${item.name} - ${item.score};
    leaderboardList.appendChild(li);
  });
}

function restartQuiz() {
    settingsEl.classList.remove("hidden");
  resultEl.classList.add("hidden");
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

// Load leaderboard on page load
showLeaderboard();

