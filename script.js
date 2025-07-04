// DOM Elements
const introScreen = document.getElementById('intro-screen');
const testScreen = document.getElementById('test-screen');
const resultsScreen = document.getElementById('results-screen');
const reviewScreen = document.getElementById('review-screen');
const startTestBtn = document.getElementById('start-test');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const backToResultsBtn = document.getElementById('back-to-results');
const reviewBtn = document.getElementById('review-btn');
const retakeBtn = document.getElementById('retake-btn');

// Test Variables
let currentQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let timer;
let timeLeft = 120 * 60; // 2 hours in seconds

// Initialize the test
startTestBtn.addEventListener('click', startTest);
prevBtn.addEventListener('click', showPreviousQuestion);
nextBtn.addEventListener('click', showNextQuestion);
submitBtn.addEventListener('click', confirmSubmit);
backToResultsBtn.addEventListener('click', showResultsScreen);
reviewBtn.addEventListener('click', showReviewScreen);
retakeBtn.addEventListener('click', retakeTest);

function startTest() {
    // Get random questions
    currentQuestions = getRandomQuestions();
    
    // Initialize user answers array
    userAnswers = new Array(currentQuestions.length).fill(null);
    
    // Hide intro screen and show test screen
    introScreen.classList.add('hidden');
    testScreen.classList.remove('hidden');
    
    // Start timer
    startTimer();
    
    // Display first question
    showQuestion(currentQuestionIndex);
    
    // Update progress
    updateProgress();
}

function startTimer() {
    // Clear any existing timer
    if (timer) clearInterval(timer);
    
    // Update timer immediately
    updateTimerDisplay();
    
    // Set interval to update timer every second
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        // If time runs out, submit the test
        if (timeLeft <= 0) {
            clearInterval(timer);
            submitTest();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    
    document.getElementById('time-remaining').textContent = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function showQuestion(index) {
    // Update current question display
    document.getElementById('current-question').textContent = index + 1;
    document.getElementById('total-questions').textContent = currentQuestions.length;
    
    // Get current question
    const question = currentQuestions[index];
    
    // Display question text
    document.getElementById('question-text').textContent = question.question;
    
    // Display options
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, i) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option.text;
        
        // Mark selected option if exists
        if (userAnswers[index] === i) {
            optionElement.classList.add('selected');
        }
        
        optionElement.addEventListener('click', () => selectOption(i));
        optionsContainer.appendChild(optionElement);
    });
    
    // Update navigation buttons
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === currentQuestions.length - 1;
}

function selectOption(optionIndex) {
    // Save the selected answer
    userAnswers[currentQuestionIndex] = optionIndex;
    
    // Update UI to show selected option
    const options = document.querySelectorAll('.option');
    options.forEach((option, i) => {
        if (i === optionIndex) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });
}

function showNextQuestion() {
    if (currentQuestionIndex < currentQuestions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
        updateProgress();
    }
}

function showPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
        updateProgress();
    }
}

function updateProgress() {
    const progressPercent = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
    document.getElementById('progress-bar').style.width = `${progressPercent}%`;
}

function confirmSubmit() {
    const unanswered = userAnswers.filter(answer => answer === null).length;
    const confirmed = confirm(`You have ${unanswered} unanswered questions. Are you sure you want to submit your test?`);
    
    if (confirmed) {
        submitTest();
    }
}

function submitTest() {
    // Stop the timer
    clearInterval(timer);
    
    // Calculate results
    const results = calculateResults();
    
    // Display results
    displayResults(results);
    
    // Switch to results screen
    testScreen.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
}

function calculateResults() {
    let correct = 0;
    const sectionCounts = {
        kanji: { correct: 0, total: 0 },
        grammar: { correct: 0, total: 0 },
        verbs: { correct: 0, total: 0 },
        adverbs: { correct: 0, total: 0 },
        reading: { correct: 0, total: 0 }
    };
    
    userAnswers.forEach((answer, index) => {
        const question = currentQuestions[index];
        
        // Count total questions per section
        sectionCounts[question.type].total++;
        
        // Check if answer is correct
        if (answer !== null && question.options[answer].isCorrect) {
            correct++;
            sectionCounts[question.type].correct++;
        }
    });
    
    const percentage = Math.round((correct / currentQuestions.length) * 100);
    const passed = percentage >= 70; // Assuming 70% is passing
    
    return {
        totalQuestions: currentQuestions.length,
        correctAnswers: correct,
        percentage: percentage,
        passed: passed,
        sectionCounts: sectionCounts
    };
}

function displayResults(results) {
    // Display overall score
    document.getElementById('percentage-score').textContent = results.percentage;
    document.getElementById('correct-answers').textContent = results.correctAnswers;
    document.getElementById('total-answered').textContent = results.totalQuestions;
    
    // Display pass/fail
    const passFailElement = document.getElementById('pass-fail');
    passFailElement.textContent = results.passed ? "Passed!" : "Did not pass";
    passFailElement.className = results.passed ? "pass-text" : "fail-text";
    
    // Display section breakdown
    displaySectionResults(results.sectionCounts);
    
    // Display feedback
    displayFeedback(results);
}

function displaySectionResults(sectionCounts) {
    // Kanji
    const kanjiPercent = (sectionCounts.kanji.correct / sectionCounts.kanji.total) * 100;
    document.getElementById('kanji-bar').style.width = `${kanjiPercent}%`;
    document.getElementById('kanji-score').textContent = `${sectionCounts.kanji.correct}/${sectionCounts.kanji.total}`;
    
    // Grammar
    const grammarPercent = (sectionCounts.grammar.correct / sectionCounts.grammar.total) * 100;
    document.getElementById('grammar-bar').style.width = `${grammarPercent}%`;
    document.getElementById('grammar-score').textContent = `${sectionCounts.grammar.correct}/${sectionCounts.grammar.total}`;
    
    // Verbs
    const verbsPercent = (sectionCounts.verbs.correct / sectionCounts.verbs.total) * 100;
    document.getElementById('verbs-bar').style.width = `${verbsPercent}%`;
    document.getElementById('verbs-score').textContent = `${sectionCounts.verbs.correct}/${sectionCounts.verbs.total}`;
    
    // Adverbs
    const adverbsPercent = (sectionCounts.adverbs.correct / sectionCounts.adverbs.total) * 100;
    document.getElementById('adverbs-bar').style.width = `${adverbsPercent}%`;
    document.getElementById('adverbs-score').textContent = `${sectionCounts.adverbs.correct}/${sectionCounts.adverbs.total}`;
    
    // Reading
    const readingPercent = (sectionCounts.reading.correct / sectionCounts.reading.total) * 100;
    document.getElementById('reading-bar').style.width = `${readingPercent}%`;
    document.getElementById('reading-score').textContent = `${sectionCounts.reading.correct}/${sectionCounts.reading.total}`;
}

function displayFeedback(results) {
    const feedbackElement = document.getElementById('feedback-text');
    feedbackElement.innerHTML = '';
    
    // Overall feedback
    const overallFeedback = document.createElement('p');
    if (results.passed) {
        overallFeedback.textContent = `Congratulations! You passed the practice test with a score of ${results.percentage}%. This suggests you have a good foundation for the JLPT N5 exam.`;
    } else {
        overallFeedback.textContent = `You scored ${results.percentage}% on this practice test. To pass the actual JLPT N5, you'll typically need around 70%. Focus on your weaker areas to improve.`;
    }
    feedbackElement.appendChild(overallFeedback);
    
    // Section-specific feedback
    const sectionFeedback = document.createElement('p');
    sectionFeedback.innerHTML = "<strong>Section Analysis:</strong>";
    feedbackElement.appendChild(sectionFeedback);
    
    const sectionList = document.createElement('ul');
    
    // Kanji feedback
    const kanjiPercent = Math.round((results.sectionCounts.kanji.correct / results.sectionCounts.kanji.total) * 100);
    const kanjiItem = document.createElement('li');
    kanjiItem.textContent = `Kanji Reading: ${kanjiPercent}% - ${getPerformanceText(kanjiPercent)}`;
    sectionList.appendChild(kanjiItem);
    
    // Grammar feedback
    const grammarPercent = Math.round((results.sectionCounts.grammar.correct / results.sectionCounts.grammar.total) * 100);
    const grammarItem = document.createElement('li');
    grammarItem.textContent = `Grammar: ${grammarPercent}% - ${getPerformanceText(grammarPercent)}`;
    sectionList.appendChild(grammarItem);
    
    // Verbs feedback
    const verbsPercent = Math.round((results.sectionCounts.verbs.correct / results.sectionCounts.verbs.total) * 100);
    const verbsItem = document.createElement('li');
    verbsItem.textContent = `Verbs: ${verbsPercent}% - ${getPerformanceText(verbsPercent)}`;
    sectionList.appendChild(verbsItem);
    
    // Adverbs feedback
    const adverbsPercent = Math.round((results.sectionCounts.adverbs.correct / results.sectionCounts.adverbs.total) * 100);
    const adverbsItem = document.createElement('li');
    adverbsItem.textContent = `Adverbs: ${adverbsPercent}% - ${getPerformanceText(adverbsPercent)}`;
    sectionList.appendChild(adverbsItem);
    
    // Reading feedback
    const readingPercent = Math.round((results.sectionCounts.reading.correct / results.sectionCounts.reading.total) * 100);
    const readingItem = document.createElement('li');
    readingItem.textContent = `Reading: ${readingPercent}% - ${getPerformanceText(readingPercent)}`;
    sectionList.appendChild(readingItem);
    
    feedbackElement.appendChild(sectionList);
    
    // Study recommendations
    const recommendations = document.createElement('p');
    recommendations.innerHTML = "<strong>Recommendations:</strong> " + getRecommendations(results);
    feedbackElement.appendChild(recommendations);
}

function getPerformanceText(percentage) {
    if (percentage >= 80) return "Excellent performance!";
    if (percentage >= 60) return "Good, but could use some improvement.";
    if (percentage >= 40) return "Needs work. Focus on this area.";
    return "Weak area. Needs significant study.";
}

function getRecommendations(results) {
    const weakAreas = [];
    const strongAreas = [];
    
    // Analyze each section
    Object.entries(results.sectionCounts).forEach(([section, data]) => {
        const percent = (data.correct / data.total) * 100;
        if (percent < 60) {
            weakAreas.push(section);
        } else if (percent >= 80) {
            strongAreas.push(section);
        }
    });
    
    let recommendations = "";
    
    if (weakAreas.length > 0) {
        recommendations += `Focus on improving your ${weakAreas.join(' and ')} skills. `;
    }
    
    if (strongAreas.length > 0) {
        recommendations += `Your ${strongAreas.join(' and ')} skills are strong—keep practicing to maintain them. `;
    }
    
    if (results.percentage < 70) {
        recommendations += "Consider reviewing basic vocabulary and grammar patterns before attempting the actual test.";
    } else {
        recommendations += "You're on track for the N5 exam. Practice with timed tests to improve your speed and accuracy.";
    }
    
    return recommendations;
}

function showReviewScreen() {
    // Populate review questions
    const reviewContainer = document.getElementById('review-questions-container');
    reviewContainer.innerHTML = '';
    
    currentQuestions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('review-question');
        
        // Add correct/incorrect class
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer !== null && question.options[userAnswer].isCorrect;
        questionElement.classList.add(isCorrect ? 'correct' : 'incorrect');
        
        // Add question text
        const questionText = document.createElement('div');
        questionText.classList.add('review-question-text');
        questionText.textContent = `${index + 1}. ${question.question}`;
        questionElement.appendChild(questionText);
        
        // Add options
        const optionsContainer = document.createElement('div');
        optionsContainer.classList.add('review-options');
        
        question.options.forEach((option, i) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('review-option');
            
            // Mark selected option
            if (i === userAnswer) {
                optionElement.classList.add('selected');
            }
            
            // Mark correct answer
            if (option.isCorrect) {
                optionElement.classList.add('correct-answer');
            } else if (i === userAnswer) {
                optionElement.classList.add('incorrect-answer');
            }
            
            optionElement.textContent = option.text;
            optionsContainer.appendChild(optionElement);
        });
        
        questionElement.appendChild(optionsContainer);
        
        // Add explanation
        const explanation = document.createElement('div');
        explanation.classList.add('explanation');
        explanation.textContent = question.explanation;
        questionElement.appendChild(explanation);
        
        reviewContainer.appendChild(questionElement);
    });
    
    // Show review screen
    resultsScreen.classList.add('hidden');
    reviewScreen.classList.remove('hidden');
}

function showResultsScreen() {
    reviewScreen.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
}

function retakeTest() {
    // Reset variables
    currentQuestions = [];
    currentQuestionIndex = 0;
    userAnswers = [];
    timeLeft = 120 * 60;
    
    // Show intro screen
    resultsScreen.classList.add('hidden');
    introScreen.classList.remove('hidden');
    
    // Scroll to top
    window.scrollTo(0, 0);
}
