const timerElement = document.getElementById('timer');
const questionNumber = document.getElementById('question-number');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options');
const resultContainer = document.getElementById('result');
const correctSpan = document.getElementById('correct');
const incorrectSpan = document.getElementById('incorrect');
const detailsDiv = document.getElementById('details');

let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let timer = 120 * 60;


// Carregar perguntas de arquivo JSON e iniciar o teste
fetch("questions_full_300.json")
  .then(res => res.json())
  .then(data => {
    questions = shuffleArray(data).slice(0, 200);
    startTimer();
    showQuestion();
  });

// Embaralhar perguntas
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
