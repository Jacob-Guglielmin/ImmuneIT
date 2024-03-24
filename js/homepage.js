const employeeNameElement = document.getElementById("employeeName");
const skillsChartElement = document.getElementById("skillsChart");
const progressElement = document.getElementById("amountDone");
const goToQuizButton = document.getElementById("goToQuizButton");

const employeeID = 0;

let pendingQueries = 2;

let categoryCounts = null;
let totalQuestions = 0;
let employee = null;

getCategoryCounts().then((data) => {
    categoryCounts = data;

    for (let category in data) {
        totalQuestions += data[category];
    }

    pendingQueries--;
    if (pendingQueries == 0) init();
});

getEmployeeData(employeeID).then((data) => {
    employee = data;
    employeeNameElement.innerText = data.name;

    pendingQueries--;
    if (pendingQueries == 0) init();
});

function init() {
    let total = 0;
    for (let skill in employee.skills) {
        const skillElement = document.createElement("div");
        const skillBarContainer = document.createElement("div");
        const skillBar = document.createElement("div");
        const skillName = document.createElement("span");
        skillElement.appendChild(skillBarContainer);
        skillBarContainer.appendChild(skillBar);
        skillElement.appendChild(skillName);
        skillName.textContent = skill;

        skillBar.style.height = employee.skills[skill] * (97 / categoryCounts[skill]) + "%";

        skillsChart.appendChild(skillElement);

        total += employee.skills[skill];
    }
    progressElement.innerText = Math.floor(total / totalQuestions * 100) + "%";

    if (total >= totalQuestions) {
        goToQuizButton.innerText = "All questions completed!";
    } else {
        goToQuizButton.innerText = "Continue to quiz →";
        goToQuizButton.classList.add("hoverEffect");
        goToQuizButton.classList.remove("disabledLink");
    }
}
