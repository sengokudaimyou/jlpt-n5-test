
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let incorrectAnswers = [];
let timer;
let timeLeft = 7200; // 2 horas em segundos

// Embaralhamento moderno (Fisher-Yates)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function loadQuestions() {
  fetch("questions.json")
    .then(response => response.json())
    .then(data => {
      const shuffled = shuffle(data);
      questions = shuffled.slice(0, 200); // Pega as 200 primeiras sem repetição
      startTimer();
      showQuestion();
    });
}

function showQuestion() {
  if (currentQuestionIndex >= questions.length) {
    clearInterval(timer);
    showResult();
    return;
  }

  const q = questions[currentQuestionIndex];
  document.getElementById("question-number").textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  document.getElementById("question-text").textContent = q.question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => selectAnswer(option);
    optionsDiv.appendChild(btn);
  });
}

function selectAnswer(selected) {
  const currentQ = questions[currentQuestionIndex];
  if (selected === currentQ.answer) {
    score++;
  } else {
    incorrectAnswers.push({
      question: currentQ.question,
      selected: selected,
      correct: currentQ.answer,
      explanation: currentQ.explanation
    });
  }

  currentQuestionIndex++;
  showQuestion();
}

function showResult() {
  const quiz = document.getElementById("quiz");
  const result = document.getElementById("result");
  const correct = document.getElementById("correct");
  const incorrect = document.getElementById("incorrect");
  const detail = document.getElementById("details");

  quiz.style.display = "none";
  result.style.display = "block";

  correct.textContent = score;
  incorrect.textContent = questions.length - score;

  incorrectAnswers.forEach(item => {
    const div = document.createElement("div");
    div.className = "explanation";
    div.innerHTML = `<p><strong>Q:</strong> ${item.question}<br>
                     <strong>Your Answer:</strong> ${item.selected}<br>
                     <strong>Correct Answer:</strong> ${item.correct}<br>
                     <strong>Explanation:</strong> ${item.explanation}</p>`;
    detail.appendChild(div);
  });
}

function startTimer() {
  const timerElement = document.getElementById("timer");
  timer = setInterval(() => {
    timeLeft--;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent = \`\${minutes.toString().padStart(2, '0')}:\${seconds.toString().padStart(2, '0')}\`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      showResult();
    }
  }, 1000);
}

window.onload = loadQuestions;
