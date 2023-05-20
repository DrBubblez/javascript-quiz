const questions = [
    {
        question: "Question 1?",
        answers: [
            { text: "Answer 1", correct: false},
            { text: "Answer 2", correct: true},
            { text: "Answer 3", correct: false},
            { text: "Answer 4", correct: false},
        ]
    },
    {
        question: "Question 2?",
        answers: [
            { text: "Answer 1", correct: false},
            { text: "Answer 2", correct: false},
            { text: "Answer 3", correct: false},
            { text: "Answer 4", correct: true},
        ]
    },
    {
        question: "Question 3?",
        answers: [
            { text: "Answer 1", correct: true},
            { text: "Answer 2", correct: false},
            { text: "Answer 3", correct: false},
            { text: "Answer 4", correct: false},
        ]
    },
];

const questionEl = document.getElementById("question");
const answerBtn = document.getElementById("answers-button");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;