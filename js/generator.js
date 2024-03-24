const promptContainer = document.getElementById("promptContainer");
const outputContainer = document.getElementById("outputContainer");
const output = document.getElementById("output");

function generate() {
    promptContainer.classList.add("hidden");
    outputContainer.classList.remove("hidden");

    output.value = "";

    let prompt = "";

    prompt += "ORGNAME: ";
    prompt += document.getElementById("orgName").value;
    prompt += "\n";

    prompt += "SENDER: ";
    prompt += document.getElementById("personName").value;
    prompt += "\n";

    prompt += "CONTACT: ";
    prompt += document.getElementById("contact").value;
    prompt += "\n";

    prompt += "DEPARTMENT: ";
    prompt += document.getElementById("department").value;
    prompt += "\n";

    prompt += "EXTRA: ";
    prompt += document.getElementById("extraInformation").value;

    promptAI(prompt, (outputText) => {
        output.value = outputText.content[0].text;
    });
}

function back() {
    promptContainer.classList.remove("hidden");
    outputContainer.classList.add("hidden");
    output.value = "";
}