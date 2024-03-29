// Object Array for each question and answer.
const questions = [
    {
        question: "What syntax is used to create a variable?",
        answers: [
            { text: "var", correct: false},
            { text: "let", correct: false},
            { text: "const", correct: false},
            { text: "all the above", correct: true},
        ]
    },
    {
        question: "What syntax is used to create a function?",
        answers: [
            { text: "const", correct: false},
            { text: "function", correct: true},
            { text: "this", correct: false},
            { text: "$", correct: false},
        ]
    },
    {
        question: "What syntax is used to create a for loop?",
        answers: [
            { text: "for", correct: true},
            { text: "while", correct: false},
            { text: "loop", correct: false},
            { text: "repeat", correct: false},
        ]
    },
    {
        question: "What syntax is used to create an if statement?",
        answers: [
            {text: "pop", correct: false},
            {text: "if", correct: true},
            {text: "else", correct: false},
            {text: "if else", correct: false},
        ]
    },
    {
        question: "What syntax is used to create an array?",
        answers: [
            {text: "<>", correct: false},
            {text: "()", correct: false},
            {text: "{}", correct: false},
            {text: "[]", correct: true},
        ]
    },
    {
        question: "What is a boolean?",
        answers: [
            {text: "true or false", correct: true},
            {text: "a number", correct: false},
            {text: "text", correct: false},
            {text: "a function", correct: false},
        ]
    },
    {
        question: "What is a string?",
        answers: [
            {text: "true or false", correct: false},
            {text: "a number", correct: false},
            {text: "text", correct: true},
            {text: "a function", correct: false},
        ]
    },
    {
        question: "What is an array?",
        answers: [
            {text: "a string of numbers", correct: false},
            {text: "a string of text", correct: false},
            {text: "a list of variables", correct: false},
            {text: "a list of values", correct: true},
        ]
    },
    {
        question: "What is local storage?",
        answers: [
            {text: "a place to store data", correct: true},
            {text: "a place to store code", correct: false},
            {text: "a place to store functions", correct: false},
            {text: "a place to store variables", correct: false},
        ]
    },
    {
        question: "What does JSON stand for?",
        answers: [
            {text: "JavaScript Object Notation", correct: true},
            {text: "JavaScript Object Number", correct: false},
            {text: "JavaScript Object Null", correct: false},
            {text: "JavaScript Object Name", correct: false},
        ]
    },
];

// Declare the highScores array.
let highScores = [];

// Linking variables to html elements.
const quizEl = document.querySelector(".quiz");
const questionEl = document.getElementById("question");
const answerBtns = document.getElementById("answer-btns");
const nextBtn = document.getElementById("next-btn");
const saveBtn = document.getElementById("save-btn");

// Setting default values to question number and score.
let questionIndex = 0;
let score = 0;

// Setting timer variables.
const timeTotal = 70;
let timeRemaining = timeTotal;
let timeInt;

// Starts the quiz and sets everything to their defalut value.
function startQuiz() {
    // Loads the high scores from local storage.
    let storedHighScores = JSON.parse(localStorage.getItem("highScores"));
    highScores = storedHighScores;

    // Sets the score and question number to their default values.
    questionIndex = 0;
    score = 0;

    // Displays the next button.
    nextBtn.innerHTML = "Next";

    // resets the timer.
    resetTimer();

    // shows the question and starts the timer.
    showQuestion();
    startTimer();
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
    saveBtn.style.display = "none";
    while(answerBtns.firstChild) {
        answerBtns.removeChild(answerBtns.firstChild);
    }
}

// Starts the timer.
function startTimer() {
    updateTimer();

    timeInt = setInterval(function() {
        timeRemaining--;
        updateTimer();

        if (timeRemaining <= 0) {
            clearInterval(timeInt);
            showScore();
        }
    }, 1000);
}

// Resets the timer.
function resetTimer() {
    clearInterval(timeInt);
    timeRemaining = timeTotal;
    updateTimer();
}

// Updates and dynmically displays the timer.
function updateTimer() {
    const timerEl = document.getElementById("timer");
    timerEl.textContent = `Time Remaining: ${timeRemaining} seconds`;
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
        timeRemaining -= 5;
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

// Uses resetState() and displays the score of the user and allows them to save their score or play again.
function showScore() {
    clearInterval(timeInt);
    resetState();
    questionEl.innerHTML = "Your Score: " + score + "!";
    nextBtn.innerHTML = "Play Again";
    saveBtn.innerHTML = "Save Score";
    saveBtn.style.display = "block";
    nextBtn.style.display = "block";
}


// Saves the score to local storage and shows the high scores.
function saveScore() {
    let initials = prompt("Enter your initials: ");
    
    // Initialize the array if it's null
    if (highScores === null) {
        highScores = [];
    }
    
    let scoreObj = {
        initials: initials,
        score: score
    };
    highScores.push(scoreObj);

    localStorage.setItem("highScores", JSON.stringify(highScores));
}


saveBtn.addEventListener("click", saveScore);

// Handels the logic of next button for either next question or to show the score.
function handleNextBtn() {
    questionIndex++;
    if(questionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}
// Adds an event listener to the next button.
nextBtn.addEventListener("click", ()=> {
if(questionIndex < questions.length) {
    handleNextBtn();
} else {
    resetTimer();
    startQuiz();
}
});

// Displays the high scores.
function viewHighScores() {
    // Hides the quiz elements.
    quizEl.style.display = "none";
    // displays the high scores list
    const highScoresList = document.getElementById("high-scores");
    highScoresList.style.display = "block";

    // Clears the high scores list
    highScoresList.innerHTML = "";

    // Loop through the high scores and display them.
    if (highScores !== null) {
        highScores.forEach(function displayScores(score) {
            const listItem = document.createElement("li");
            listItem.innerHTML = score.initials + " - " + score.score;
            highScoresList.appendChild(listItem);
        });
    }
}

// Adds an event listener to the save button.
saveBtn.addEventListener("click", viewHighScores);

startQuiz();