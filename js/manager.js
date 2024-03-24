var employees = null;
var questionCount = null;
var isOtherDone = false;

getQuestionCount().then((data) => {
    questionCount = data;
    if (isOtherDone) {
        getTopEmployees();
    } else {
        isOtherDone = true;
    }
});

getAllEmployees().then((data) => {
    employees = data;
    if (isOtherDone) {
        getTopEmployees();
    } else {
        isOtherDone = true;
    }
});

function getTopEmployees() {
    var scores = {};

    for (let i = 0; i < employees.length; i++) {
        var avg = (employees[i].skills["Phishing"] + 
                   employees[i].skills["Privacy"] + 
                   employees[i].skills["Social Engineering"]) / 
                   questionCount;
            
        scores[employees[i].name] = avg;
    }

    var sortable = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    var top5 = sortable.slice(0, 5);

    var employeesContainer = document.getElementById("employeesContainer");
    
    for (let i = 0; i < top5.length; i++) {
        var employee = document.createElement("p");
        employee.className = "topEmployee";
        employee.innerText = `${i + 1}. ${top5[i][0]} (${Math.round(top5[i][1] * 100)}% done)`;
        employeesContainer.appendChild(employee);
    }
}