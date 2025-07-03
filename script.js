
let allQuestions = [];
let score = 0;
let timer;
const totalTime = 2 * 60 * 60; // 2 hours in seconds
let timeLeft = totalTime;

async function loadQuestions() {
    const res = await fetch('questions.json');
    const data = await res.json();
    const shuffled = data.sort(() => 0.5 - Math.random());
    allQuestions = shuffled.slice(0, 200);
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timer);
            submitQuiz();
        }
        const hrs = Math.floor(timeLeft / 3600);
        const mins = Math.floor((timeLeft % 3600) / 60);
        const secs = timeLeft % 60;
        document.querySelector(".timer").textContent = `Time Left: ${hrs}h ${mins}m ${secs}s`;
    }, 1000);
}

function startQuiz() {
    document.getElementById("instructions").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    document.getElementById("quiz").innerHTML = `<div class="timer"></div><form id="quiz-form"></form><button onclick="submitQuiz()">Submit</button>`;
    const form = document.getElementById("quiz-form");
    allQuestions.forEach((q, idx) => {
        const qDiv = document.createElement("div");
        qDiv.className = "question";
        qDiv.innerHTML = `<p><strong>Q${idx+1} (${q.type})</strong>: ${q.question}</p>`;
        q.options.forEach(opt => {
            const id = `q${idx}_${opt}`;
            qDiv.innerHTML += `
                <label for="${id}">
                    <input type="radio" name="q${idx}" value="${opt}" id="${id}">
                    ${opt}
                </label><br>`;
        });
        form.appendChild(qDiv);
    });
    startTimer();
}

function submitQuiz() {
    clearInterval(timer);
    const form = document.getElementById("quiz-form");
    let resultHTML = `<h2>Your Results</h2>`;
    let incorrect = [];
    score = 0;

    allQuestions.forEach((q, idx) => {
        const selected = form[`q${idx}`]?.value;
        if (selected === q.answer) {
            score++;
        } else {
            incorrect.push({
                number: idx + 1,
                question: q.question,
                selected: selected || "No answer",
                correct: q.answer,
                explanation: q.explanation
            });
        }
    });

    const percent = (score / allQuestions.length) * 100;
    resultHTML += `
        <p>You answered ${score} out of ${allQuestions.length} questions correctly.</p>
        <p>Accuracy: ${percent.toFixed(2)}%</p>
        <p>Result: ${percent >= 60 ? "<strong style='color:green'>PASS</strong>" : "<strong style='color:red'>FAIL</strong>"}</p>
        <h3>Review of Incorrect Answers:</h3>
    `;

    incorrect.forEach(item => {
        resultHTML += `
            <div style="margin-bottom:15px;">
                <strong>Q${item.number}:</strong> ${item.question}<br>
                <span style="color:red;">Your Answer: ${item.selected}</span><br>
                <span style="color:green;">Correct Answer: ${item.correct}</span><br>
                <em>Explanation: ${item.explanation}</em>
            </div>
        `;
    });

    document.getElementById("quiz").style.display = "none";
    const result = document.getElementById("result");
    result.style.display = "block";
    result.innerHTML = resultHTML;
}

document.getElementById("start-btn").addEventListener("click", async () => {
    await loadQuestions();
    startQuiz();
});
