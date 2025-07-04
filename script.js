// Elementos do DOM
const startButton = document.getElementById(‘start-button’);
const timerElement = document.getElementById(‘timer’);
const quizElement = document.getElementById(‘quiz’);
const questionNumber = document.getElementById(‘question-number’);
const questionText = document.getElementById(‘question-text’);
const optionsContainer = document.getElementById(‘options’);
const resultContainer = document.getElementById(‘result’);
const correctSpan = document.getElementById(‘correct’);
const incorrectSpan = document.getElementById(‘incorrect’);
const detailsDiv = document.getElementById(‘details’);

// Variáveis globais
let questions = [];
let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let timer = 120 * 60; // 120 minutos em segundos
let timerInterval;
let userAnswers = [];

// Banco de questões N5 (exemplo - substitua pelo seu arquivo JSON)
const sampleQuestions = [
{
question: “「こんにちは」の意味は何ですか？”,
options: [“Good morning”, “Good afternoon”, “Good evening”, “Good night”],
correct: 1
},
{
question: “「ありがとう」の意味は何ですか？”,
options: [“Sorry”, “Thank you”, “Excuse me”, “You’re welcome”],
correct: 1
},
{
question: “「すみません」の意味は何ですか？”,
options: [“Thank you”, “Good bye”, “Excuse me”, “Hello”],
correct: 2
},
{
question: “「学校」の読み方は何ですか？”,
options: [“がっこう”, “がくこう”, “かっこう”, “かくこう”],
correct: 0
},
{
question: “「食べる」の意味は何ですか？”,
options: [“to drink”, “to eat”, “to sleep”, “to walk”],
correct: 1
},
{
question: “「今日」の読み方は何ですか？”,
options: [“きょう”, “こんにち”, “いまひ”, “きょうじつ”],
correct: 0
},
{
question: “「私は学生です」の英語の意味は何ですか？”,
options: [“I am a teacher”, “I am a student”, “I am a doctor”, “I am a worker”],
correct: 1
},
{
question: “「本」の読み方は何ですか？”,
options: [“ほん”, “もと”, “べん”, “ぽん”],
correct: 0
},
{
question: “「水」の読み方は何ですか？”,
options: [“すい”, “みず”, “しお”, “ゆき”],
correct: 1
},
{
question: “「行く」の意味は何ですか？”,
options: [“to come”, “to go”, “to return”, “to stay”],
correct: 1
}
];

// Event listener para o botão de início
startButton.addEventListener(‘click’, initializeTest);

// Função para inicializar o teste
function initializeTest() {
// Tentar carregar perguntas do arquivo JSON
fetch(“questions_full_300.json”)
.then(res => res.json())
.then(data => {
questions = shuffleArray(data).slice(0, 200);
startTest();
})
.catch(error => {
console.log(“Arquivo JSON não encontrado, usando perguntas de exemplo”);
// Se não conseguir carregar o arquivo, usar perguntas de exemplo
questions = shuffleArray(sampleQuestions);
startTest();
});
}

// Função para iniciar o teste
function startTest() {
// Esconder botão de início
startButton.style.display = ‘none’;

// Mostrar elementos do quiz
timerElement.style.display = ‘block’;
quizElement.style.display = ‘block’;

// Resetar variáveis
currentQuestionIndex = 0;
correctAnswers = 0;
incorrectAnswers = 0;
userAnswers = [];

// Iniciar timer e mostrar primeira pergunta
startTimer();
showQuestion();
}

// Embaralhar perguntas
function shuffleArray(array) {
for (let i = array.length - 1; i > 0; i–) {
const j = Math.floor(Math.random() * (i + 1));
[array[i], array[j]] = [array[j], array[i]];
}
return array;
}

// Função para iniciar o timer
function startTimer() {
timerInterval = setInterval(() => {
timer–;
const minutes = Math.floor(timer / 60);
const seconds = timer % 60;
timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

```
if (timer <= 0) {
  clearInterval(timerInterval);
  endTest();
}
```

}, 1000);
}

// Função para mostrar a pergunta atual
function showQuestion() {
if (currentQuestionIndex >= questions.length) {
endTest();
return;
}

const question = questions[currentQuestionIndex];
questionNumber.textContent = `問題 ${currentQuestionIndex + 1} / ${questions.length}`;
questionText.textContent = question.question;

// Limpar opções anteriores
optionsContainer.innerHTML = ‘’;

// Criar opções
question.options.forEach((option, index) => {
const optionElement = document.createElement(‘div’);
optionElement.className = ‘option’;
optionElement.textContent = `${index + 1}. ${option}`;
optionElement.addEventListener(‘click’, () => selectOption(index));
optionsContainer.appendChild(optionElement);
});
}

// Função para selecionar uma opção
function selectOption(selectedIndex) {
const question = questions[currentQuestionIndex];
const isCorrect = selectedIndex === question.correct;

// Armazenar resposta do usuário
userAnswers[currentQuestionIndex] = selectedIndex;

// Contar respostas corretas/incorretas
if (isCorrect) {
correctAnswers++;
} else {
incorrectAnswers++;
}

// Destacar opção selecionada
const options = optionsContainer.querySelectorAll(’.option’);
options.forEach(option => option.classList.remove(‘selected’));
options[selectedIndex].classList.add(‘selected’);

// Mostrar próxima pergunta após um breve delay
setTimeout(() => {
currentQuestionIndex++;
showQuestion();
}, 1000);
}

// Função para finalizar o teste
function endTest() {
clearInterval(timerInterval);

// Esconder quiz
timerElement.style.display = ‘none’;
quizElement.style.display = ‘none’;

// Mostrar resultados
resultContainer.style.display = ‘block’;
correctSpan.textContent = correctAnswers;
incorrectSpan.textContent = incorrectAnswers;

// Mostrar detalhes
showDetails();
}

// Função para mostrar detalhes das respostas
function showDetails() {
let detailsHTML = ‘<h3>詳細結果 (Detailed Results)</h3>’;

questions.forEach((question, index) => {
const userAnswer = userAnswers[index];
const isCorrect = userAnswer === question.correct;

```
detailsHTML += `
  <div style="margin: 10px 0; padding: 10px; border-left: 4px solid ${isCorrect ? '#4CAF50' : '#f44336'};">
    <strong>問題 ${index + 1}:</strong> ${question.question}<br>
    <strong>あなたの答え:</strong> ${userAnswer !== undefined ? question.options[userAnswer] : '未回答'}<br>
    <strong>正解:</strong> ${question.options[question.correct]}<br>
    <strong>結果:</strong> <span style="color: ${isCorrect ? '#4CAF50' : '#f44336'}; font-weight: bold;">${isCorrect ? '正解' : '不正解'}</span>
  </div>
`;
```

});

detailsDiv.innerHTML = detailsHTML;
}

// Adicionar estilos CSS para as opções (se não estiverem no CSS externo)
const style = document.createElement(‘style’);
style.textContent = `
.option {
display: block;
margin: 10px 0;
padding: 15px;
background-color: #f9f9f9;
border: 2px solid #ddd;
border-radius: 5px;
cursor: pointer;
transition: all 0.3s;
}

.option:hover {
background-color: #e9e9e9;
border-color: #4CAF50;
}

.option.selected {
background-color: #4CAF50;
color: white;
border-color: #4CAF50;
}
`;
document.head.appendChild(style);
