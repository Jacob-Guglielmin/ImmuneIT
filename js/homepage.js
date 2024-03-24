const employeeNameElement = document.getElementById("employeeName");
const skillsChartElement = document.getElementById("skillsChart");
const progressElement = document.getElementById("amountDone");

const employeeID = 1;

fetch("./employees.json").then((data) => {
    return data.json();
}).then((data) => {
    employeeNameElement.innerText = data.employees[employeeID].name;

    let total = 0;
    for (let skill in data.employees[employeeID].skills) {
        console.log(skill);
        const skillElement = document.createElement("div");
        const skillBarContainer = document.createElement("div");
        const skillBar = document.createElement("div");
        const skillName = document.createElement("span");
        skillElement.appendChild(skillBarContainer);
        skillBarContainer.appendChild(skillBar);
        skillElement.appendChild(skillName);
        skillName.textContent = skill;

        skillBar.style.height = (data.employees[employeeID].skills[skill] * (97/100)) + "%";

        skillsChart.appendChild(skillElement);

        total += data.employees[employeeID].skills[skill];
    }
    progressElement.innerText = Math.floor((total / Object.keys(data.employees[employeeID].skills).length)) + "%";
});