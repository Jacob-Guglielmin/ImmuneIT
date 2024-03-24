const employeeNameElement = document.getElementById("employeeName");
const skillsChartElement = document.getElementById("skillsChart");
const progressElement = document.getElementById("amountDone");

const employeeID = 1;

getEmployeeData(employeeID).then((data) => {
    console.log(data);
    employeeNameElement.innerText = data.name;

    let total = 0;
    for (let skill in data.skills) {
        const skillElement = document.createElement("div");
        const skillBarContainer = document.createElement("div");
        const skillBar = document.createElement("div");
        const skillName = document.createElement("span");
        skillElement.appendChild(skillBarContainer);
        skillBarContainer.appendChild(skillBar);
        skillElement.appendChild(skillName);
        skillName.textContent = skill;

        skillBar.style.height = (data.skills[skill] * (97/100)) + "%";

        skillsChart.appendChild(skillElement);

        total += data.skills[skill];
    }
    progressElement.innerText = Math.floor((total / Object.keys(data.skills).length)) + "%";
});