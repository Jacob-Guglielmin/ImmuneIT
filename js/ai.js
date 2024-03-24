import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {
    getFunctions,
    connectFunctionsEmulator,
    httpsCallable
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-functions.js";

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

const functions = getFunctions(app);

connectFunctionsEmulator(functions, "127.0.0.1", 5001);

const requestAIOutput = httpsCallable(functions, "requestAIOutput");

function promptAI(prompt, callback) {
    requestAIOutput({ prompt })
        .then((result) => {
            callback(result.data);
        })
        .catch((error) => {
            // Getting the Error details.
            const code = error.code;
            const message = error.message;
            const details = error.details;
            console.error(`Code: ${code} Message: ${message} Details: ${details}`);
        });
}
window.promptAI = promptAI;
