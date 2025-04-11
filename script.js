const questionBox = document.getElementById('questionBox');
const optionsBox = document.getElementById('optionsBox');
const nextBtn = document.getElementById('nextBtn');
const scoreBox = document.getElementById('scoreBox');
const timerBox = document.getElementById('timerBox');
const timerDisplay = document.getElementById('timer');

const quizData = [
    {
        question: "Which company developed JavaScript?",
        options: ["Mozilla", "Netscape", "Microsoft", "Sun Microsystems"],
        answer: "Netscape"
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: ["<!-- comment -->", "// comment", "# comment", "** comment **"],
        answer: "// comment"
    },
    {
        question: "Which method is used to parse a string to Int in JavaScript?",
        options: ["parseInt()", "parseFloat()", "Number()", "toInteger()"],
        answer: "parseInt()"
    },
    {
        question: "What does DOM stand for?",
        options: ["Document Object Model", "Data Object Model", "Display Object Management", "Desktop Oriented Mode"],
        answer: "Document Object Model"
    },
    {
        question: "Who is the developer of Java",
        options: ["James", "Riche", "Java", "Hos"],
        answer: "James"
    },
    {
      question:"What is the version of Java Script Standards version",
      options:["ES6","ES2023","ES2019","None"],
      answer:"ES2023"
    },{
      question:""
    }
];

let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;

function loadQuestion() {
    const current = quizData[currentIndex];
    questionBox.textContent = current.question;
    optionsBox.innerHTML = "";
    timeLeft = 15;
    timerDisplay.textContent = timeLeft;
    nextBtn.disabled = true;

    current.options.forEach(option => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.classList.add('option-btn');
        btn.addEventListener('click', () => {
            clearInterval(timer);
            checkAnswer(option, btn);
        });
        optionsBox.appendChild(btn);
    });

    startTimer();
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            autoRevealAnswer();
        }
    }, 1000);
}

function autoRevealAnswer() {
    const correct = quizData[currentIndex].answer;
    const buttons = optionsBox.querySelectorAll('button');

    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === correct) {
            btn.style.backgroundColor = "#2a9d8f";
        }
    });

    nextBtn.disabled = false;
}

function checkAnswer(selected, btn) {
    const correct = quizData[currentIndex].answer;
    const buttons = optionsBox.querySelectorAll('button');
    buttons.forEach(b => b.disabled = true);

    if (selected === correct) {
        btn.style.backgroundColor = "#2a9d8f";
        score++;
    } else {
        btn.style.backgroundColor = "#e63946";
        buttons.forEach(b => {
            if (b.textContent === correct) {
                b.style.backgroundColor = "#2a9d8f";
            }
        });
    }

    nextBtn.disabled = false;
}

nextBtn.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex < quizData.length) {
        loadQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    questionBox.classList.add("hide");
    optionsBox.classList.add("hide");
    nextBtn.classList.add("hide");
    timerBox.classList.add("hide");

    scoreBox.classList.remove("hide");
    scoreBox.textContent = `🎉 Your Score: ${score} / ${quizData.length}`;

    const restartBtn = document.createElement('button');
    restartBtn.id = "restartBtn";
    restartBtn.textContent = "Restart Quiz";
    restartBtn.addEventListener('click', restartQuiz);
    scoreBox.appendChild(restartBtn);
}

function restartQuiz() {
    currentIndex = 0;
    score = 0;
    questionBox.classList.remove("hide");
    optionsBox.classList.remove("hide");
    nextBtn.classList.remove("hide");
    timerBox.classList.remove("hide");
    scoreBox.classList.add("hide");
    scoreBox.innerHTML = "";
    loadQuestion();
}
loadQuestion();
