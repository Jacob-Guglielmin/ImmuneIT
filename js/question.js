class Question {
    constructor(question, o1, o2, o3, o4, correct, category, pc, pi) {
        this.question = question;
        this.option1 = o1;
        this.option2 = o2;
        this.option3 = o3;
        this.option4 = o4;
        this.correct = correct; // Uses 1-based indexing
        this.category = category;
        this.postCorrect = pc;
        this.postIncorrect = pi;
    }
}

let isOtherDone = 0;

let employee = null;
let employeeId = 0;
let questions = [];

let categoryCounts = null;

let correct = 0;
let total = 0;

let currentQuestion = null;
let selectedQuestions = [];

getQuestions().then((data) => {
    questions = data;
    if (isOtherDone == 2) {
        loadFirstQuestion();
    } else {
        isOtherDone++;
    }
});

getEmployeeData(employeeId).then((data) => {
    employee = data;
    selectedQuestions = employee.completedQuestionIDs || [];
    if (isOtherDone == 2) {
        loadFirstQuestion();
    } else {
        isOtherDone++;
    }
});

getCategoryCounts().then((data) => {
    categoryCounts = data;
    if (isOtherDone == 2) {
        loadNextQuestion();
    } else {
        isOtherDone++;
    }
});

const loadNextQuestion = () => {
    let nextQuestion = document.getElementById("nextQuestion");
    nextQuestion.setAttribute("style", "display: none");
    let filtered = questions.filter((question) => selectedQuestions.indexOf(questions.indexOf(question)) < 0);
    if (filtered.length > 0) {
        let randomSelect = Math.floor(Math.random() * filtered.length);
        let question = filtered[randomSelect];
        currentQuestion = question;
        loadQuestion(question);
    } else {
        loadEndQuizScreen();
    }
}

const loadQuestion = (q) => {
    document.getElementById("interfaceContainer").innerHTML = "";
    document.getElementById("interfaceContainer").appendChild(makeQuestion(q));
}

// Takes in a Question object pertaining to the question
// Returns a div containing the question
const makeQuestion = (content) => {
    let parent = document.createElement("div");
    parent.classList.add("qParent");
    let qBox = document.createElement("div");
    qBox.innerHTML = content.question;
    qBox.classList.add("qQuestion");
    let o1 = document.createElement("div");
    o1.innerHTML = content.option1;
    let o2 = document.createElement("div");
    o2.innerHTML = content.option2;
    let o3 = document.createElement("div");
    o3.innerHTML = content.option3;
    let o4 = document.createElement("div");
    o4.innerHTML = content.option4;
    let options = [o1, o2, o3, o4];
    options[content.correct - 1].classList.add("correct");
    parent.appendChild(qBox);
    for (let i = 0; i < options.length; i++) {
        options[i].classList.add("qOption", "hoverEffect");
        options[i].setAttribute("onclick", `clickHandler(${i})`);
        if (i % 2 == 0) {
            options[i].style.gridColumnStart = `1`;
            options[i].style.gridColumnEnd = `2`;
        } else {
            options[i].style.gridColumnStart = `2`;
            options[i].style.gridColumnEnd = `3`;
        }
        parent.appendChild(options[i]);
    }
    o1.classList.add("qOptionTop");
    o2.classList.add("qOptionRight", "qOptionTop");
    o4.classList.add("qOptionRight");
    o3.style.borderRadius = "0 0 0 7px";
    o4.style.borderRadius = "0 0 7px 0";
    return parent;
}

const clickHandler = (option) => {
    let clicked = document.getElementsByClassName("qOption")[option];
    for (let option of document.getElementsByClassName("qOption")) {
        option.removeAttribute("onclick");
        option.classList.remove("hoverEffect");
        option.classList.add("nonSelected");
    }
    if (clicked.classList.contains("correct")) {
        clicked.classList.add("correctSelected");
        document.getElementsByClassName("qQuestion")[0].innerHTML = currentQuestion.postCorrect;
        correct++;
        setEmployeeSkill(employeeId, currentQuestion.category, employee.skills[currentQuestion.category] + 1);
    } else {
        clicked.classList.add("incorrectSelected");
        document.getElementsByClassName("qQuestion")[0].innerHTML = currentQuestion.postIncorrect;
    }
    let nextQuestion = document.getElementById("nextQuestion");
    nextQuestion.setAttribute("style", "display: flex");
    if (questions.filter((question) => selectedQuestions.indexOf(questions.indexOf(question)) < 0).length == 0) {
        nextQuestion.innerHTML = "Finish Quiz";
    }
    total++;
    setQuestionCompleted(employeeId, questions.indexOf(currentQuestion), selectedQuestions.length);
    selectedQuestions.push(questions.indexOf(currentQuestion));
}

const loadEndQuizScreen = () => {
    let interfaceContainer = document.getElementById("interfaceContainer");
    interfaceContainer.innerHTML = "";
    let parent = document.createElement("div");
    parent.classList.add("endScreen");
    let text1 = document.createElement("div");
    text1.innerHTML = "Congratulations! You have completed the quiz. Your final score is:";
    text1.classList.add("endHeader");
    let score = document.createElement("div");
    let correctText = document.createElement("span");
    correctText.innerHTML = `${correct}`;
    correctText.classList.add("scoreValue");
    let outOf = document.createElement("span");
    outOf.innerHTML = " out of ";
    outOf.classList.add("endText");
    let totalText = document.createElement("span");
    totalText.innerHTML = `${total}`;
    totalText.classList.add("scoreValue");
    score.appendChild(correctText);
    score.appendChild(outOf);
    score.appendChild(totalText);
    parent.appendChild(text1);
    parent.appendChild(score);
    interfaceContainer.appendChild(parent);
    let menuBtn = document.getElementById("mainMenu");
    menuBtn.setAttribute("style", "display: flex");
}