class Question {
    constructor(question, o1, o2, o3, o4, correct, category) {
        this.question = question;
        this.option1 = o1;
        this.option2 = o2;
        this.option3 = o3;
        this.option4 = o4;
        this.correct = correct;
        this.category = category;
    }
}

let testQ = new Question("what is love? what is love? what is love? what is love? what is love? what is love? what is love? what is love? what is love? what is love? what is love? what is love? ", "option 1", "option 2", "option 3", "option 4", 2)


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
        options[i].classList.add("qOption");
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

}

document.getElementById("interfaceContainer").appendChild(makeQuestion(testQ));
