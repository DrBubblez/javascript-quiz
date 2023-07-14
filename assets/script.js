// Object Array for each question and answer.
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

// Linking variables to html elements.
const questionEl = document.getElementById("question");
const answerBtns = document.getElementById("answer-btns");
const nextBtn = document.getElementById("next-btn");

// Setting default values to question number and score.
let questionIndex = 0;
let score = 0;

// Starts the quiz and sets everything to their defalut value.
function startQuiz() {
    questionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

// Calls for the resetState() and displays the current question and answers.
function showQuestion() {
    resetState();
    let currentQuestion = questions[questionIndex];
    let questionNum = questionIndex + 1;
    questionEl.innerHTML = questionNum + ". " + currentQuestion.question;

    // Allows user to select an answer and checks if selected answer is correct.
    currentQuestion.answers.forEach(function disQuetion(answer){
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.setAttribute("id", "btn")
        answerBtns.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

// Resets the state of the question by hiding the next button and removing all child elements of answer buttons.
function resetState() {
    nextBtn.style.display = "none";
    while(answerBtns.firstChild) {
        answerBtns.removeChild(answerBtns.firstChild);
    }
}

// 
function selectAnswer(e) {
    // Assigns the event target to a selected answer.
    const selectedAns = e.target;
    // Compares the seleceted answer to the stored boolean value to see if its the correct answer.
    const isCorrect = selectedAns.dataset.correct === "true";
    // Logic of adding CSS classes and adding points or subtracting time based on whether its correct or not.
    if(isCorrect) {
        selectedAns.classList.add("correct");
        score++;
    } else {
        selectedAns.classList.add("incorrect");
        // subtracts time from the timer
    }
    // Preforms a check on all the child elements to see if you answered correctly or not.
    Array.from(answerBtns.children).forEach(function compare(button) {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    // Shows the next button.
    nextBtn.style.display = "block";
}

// Uses resetState() and displays the score of the user and gives the option to play again.
function showScore() {
    resetState();
    questionEl.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again?";
    nextBtn.style.display = "block";
}

// Handels the logic of next button for either next question or to show the score.
function handleNextBtn() {
    questionIndex++;
    if(questionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextBtn.addEventListener("click", ()=> {
if(questionIndex < questions.length) {
    handleNextBtn();
} else {
    startQuiz();
}
});

startQuiz();