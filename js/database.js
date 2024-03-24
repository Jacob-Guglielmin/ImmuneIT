import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCjHL4mOo6DrC7W25T9sRW0wtMrYdazf6Y",
    authDomain: "immuneit-105ca.firebaseapp.com",
    databaseURL: "https://immuneit-105ca-default-rtdb.firebaseio.com",
    projectId: "immuneit-105ca",
    storageBucket: "immuneit-105ca.appspot.com",
    messagingSenderId: "515607392468",
    appId: "1:515607392468:web:4faf8dd7f86e7daf018b41"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase();

async function getEmployeeData(employeeID) {
    return await get(ref(db, "employees/" + employeeID)).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            return null;
        }
    });
}
window.getEmployeeData = getEmployeeData;

async function addQuestion(question) {
    const currentNumQuestions = getQuestionCount();
    const newQuestionRef = ref(db, "questions/" + currentNumQuestions);
    set(newQuestionRef, question);
    set(ref(db, "questionCount"), currentNumQuestions + 1);

    let currentTypeCount = await get(ref(db, "questionTypeCounts/" + question.category)).then((snapshot) => {
        return snapshot.val();
    });
    set(ref(db, "questionTypeCounts/" + question.category), currentTypeCount + 1);
}
window.addQuestion = addQuestion;

async function getQuestions() {
    return await get(ref(db, "questions")).then((snapshot) => {
        return snapshot.val();
    });
}
window.getQuestions = getQuestions;

function setEmployeeSkill(id, skillName, value) {
    set(ref(db, `employees/${id}/skills/${skillName}`), value);
}
window.setEmployeeSkill = setEmployeeSkill;

async function getQuestionCount() {
    return await get(ref(db, "questionCount")).then((snapshot) => {
        return snapshot.val();
    });
}
window.getQuestionCount = getQuestionCount;

async function getCategoryCounts() {
    return await get(ref(db, "questionTypeCounts")).then((snapshot) => {
        return snapshot.val();
    });
}
window.getCategoryCounts = getCategoryCounts;

function setQuestionCompleted(id, question, index) {
    set(ref(db, `employees/${id}/completedQuestionIDs/${index}`), question);
}
window.setQuestionCompleted = setQuestionCompleted;

async function getAllEmployees() {
    return await get(ref(db, "employees")).then((snapshot) => {
        return snapshot.val();
    });
}
window.getAllEmployees = getAllEmployees;