const employeeNameElement = document.getElementById("employeeName");

const employeeID = 0;

fetch("./employees.json").then((data) => {
    return data.json();
}).then((data) => {
    employeeNameElement.innerText = data.employees[employeeID].name;

    
});