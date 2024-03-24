document.getElementById("dbSubmit").addEventListener("click", function() {
    var question = {
        question: document.getElementById("dbQuestion").value,
        answer1: document.getElementById("dbAnswer1").value,
        answer2: document.getElementById("dbAnswer2").value,
        answer3: document.getElementById("dbAnswer3").value,
        answer4: document.getElementById("dbAnswer4").value,
        correct: Number(document.getElementById("dbCorrect").value),
        category: document.getElementById("dbCategory").value,
        postCorrect: document.getElementById("dbPostCorrect").value,
        postIncorrect: document.getElementById("dbPostIncorrect").value
    };

    // put question object into firebase

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