const questions = [
    {
        question: "Question 1?",
        answers: [
            { text: "Option 1", correct: false},
            { text: "Option 2", correct: true},
            { text: "Option 3", correct: false},
            { text: "Option 4", correct: false},
        ]
    },
    {
        question: "Question 2?",
        answers: [
            { text: "Option 1", correct: false},
            { text: "Option 2", correct: false},
            { text: "Option 3", correct: false},
            { text: "Option 4", correct: true},
        ]
    },
    {
        question: "Question 3?",
        answers: [
            { text: "Option 1", correct: true},
            { text: "Option 2", correct: false},
            { text: "Option 3", correct: false},
            { text: "Option 4", correct: false},
        ]
    },
];

const questionEl = document.getElementById("question");
const answerBtn = document.getElementById("answer-btns");
const nextBtn = document.getElementById("next-btn");

let questionIndex = 0;
let score = 0;

function startQuiz() {
    questionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    let currentQuestion = questions[questionIndex];
    let questionNum = questionIndex + 1;
    questionEl.innerHTML = questionNum + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.setAttribute("id", "btn")
        answerBtn.appendChild(button);
    });
}

startQuiz();