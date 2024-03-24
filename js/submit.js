document.getElementById("dbSubmit").addEventListener("click", function() {
    const question = {
        question: document.getElementById("dbQuestion").value,
        option1: document.getElementById("dbAnswer1").value,
        option2: document.getElementById("dbAnswer2").value,
        option3: document.getElementById("dbAnswer3").value,
        option4: document.getElementById("dbAnswer4").value,
        correct: Number(document.getElementById("dbCorrect").value),
        category: document.getElementById("dbCategory").value,
        postCorrect: document.getElementById("dbPostCorrect").value,
        postIncorrect: document.getElementById("dbPostIncorrect").value
    };

    addQuestion(question);

    document.getElementById("dbQuestion").value = "";
    document.getElementById("dbAnswer1").value = "";
    document.getElementById("dbAnswer2").value = "";
    document.getElementById("dbAnswer3").value = "";
    document.getElementById("dbAnswer4").value = "";
    document.getElementById("dbCorrect").value = "";
    document.getElementById("dbCategory").value = "";
    document.getElementById("dbPostCorrect").value = "";
    document.getElementById("dbPostIncorrect").value = "";
});