// Quiz questions
const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "London", correct: false },
            { text: "Paris", correct: true },
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false }
        ]
    },
    {
        question: "What is the largest mammal in the world?",
        answers: [
            { text: "Elephant", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Giraffe", correct: false },
            { text: "Polar Bear", correct: false }
        ]
    },
    {
        question: "Which language runs in a web browser?",
        answers: [
            { text: "Java", correct: false },
            { text: "C", correct: false },
            { text: "Python", correct: false },
            { text: "JavaScript", correct: true }
        ]
    },
    {
        question: "What year was JavaScript launched?",
        answers: [
            { text: "1996", correct: false },
            { text: "1995", correct: true },
            { text: "1994", correct: false },
            { text: "None of the above", correct: false }
        ]
    }
];

// DOM elements
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const questionCounterElement = document.getElementById('question-counter');
const totalQuestionsElement = document.getElementById('total-questions');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');

// Game variables
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timer;
let quizStarted = false;

// Initialize quiz
function initQuiz() {
    totalQuestionsElement.textContent = questions.length;
    startButton.addEventListener('click', startQuiz);
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        setNextQuestion();
    });
    restartButton.addEventListener('click', restartQuiz);
}

// Start quiz
function startQuiz() {
    quizStarted = true;
    startButton.classList.add('hide');
    questionCounterElement.textContent = 1;
    scoreElement.textContent = 0;
    startTimer();
    setNextQuestion();
}

// Start timer
function startTimer() {
    timeLeft = 60;
    timeElement.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timeElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

// Set next question
function setNextQuestion() {
    resetState();
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        questionCounterElement.textContent = currentQuestionIndex + 1;
    } else {
        endQuiz();
    }
}

// Show question
function showQuestion(question) {
    questionElement.textContent = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

// Reset state
function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// Select answer
function selectAnswer(e) {
    if (!quizStarted) return;
    
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    
    if (correct) {
        selectedButton.classList.add('correct');
        score++;
        scoreElement.textContent = score;
    } else {
        selectedButton.classList.add('wrong');
    }
    
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    
    if (questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        restartButton.classList.remove('hide');
    }
}

// End quiz
function endQuiz() {
    quizStarted = false;
    clearInterval(timer);
    questionElement.textContent = `Quiz completed! Your score: ${score}/${questions.length}`;
    answerButtonsElement.innerHTML = '';
    nextButton.classList.add('hide');
    restartButton.classList.remove('hide');
}

// Restart quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    restartButton.classList.add('hide');
    startQuiz();
}

// Initialize the quiz when page loads
initQuiz();