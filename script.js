const textContainer = document.getElementById('text-container');
const userInput = document.getElementById('user-input');
const wordCountElement = document.getElementById('word-count');
const wpmElement = document.getElementById('wpm');
const accuracyElement = document.getElementById('accuracy');
const mistakesElement = document.getElementById('mistakes');
const timerElement = document.getElementById('timer');

let text = 'The graph chart represents the number of content';
let startTime, endTime;
let mistakes = 0;
let characterCount = 0;
let timer = 60; // Timer in seconds
let timerInterval;
let timerStarted = false; // Flag to check if timer has started

function generateText() {
    textContainer.textContent = text; // Reset text display
    userInput.value = ''; // Clear user input
    startTime = new Date().getTime();
    mistakes = 0;
    characterCount = 0;
    timer = 60; // Reset the timer
    timerStarted = false; // Reset the flag
    timerElement.textContent = `Time Left: ${timer}`;
    userInput.disabled = false; // Enable input
    updateStats();
}

function updateStats() {
    const words = text.split(' ').length;
    wordCountElement.textContent = `Word Count: ${words}`;

    const elapsedTime = (new Date().getTime() - startTime) / 1000;
    const wpm = Math.round((characterCount / 5) / elapsedTime * 60) || 0; // Avoid NaN
    wpmElement.textContent = `WPM: ${wpm}`;

    const accuracy = characterCount > 0 
        ? Math.round((characterCount - mistakes) / characterCount * 100) 
        : 100; // Default accuracy to 100% initially
    accuracyElement.textContent = `Accuracy: ${accuracy}%`;
}

function highlightMistakes(input, reference) {
    let result = '';
    for (let i = 0; i < reference.length; i++) {
        if (input[i] === undefined) {
            // Remaining characters in the reference text
            result += reference[i];
        } else if (input[i] === reference[i]) {
            // Correct characters
            result += `<span class="correct">${reference[i]}</span>`;
        } else {
            // Mistakes
            result += `<span class="mistake">${reference[i]}</span>`;
        }
    }
    return result;
}

userInput.addEventListener('input', () => {
    const userText = userInput.value;
    const highlightedText = highlightMistakes(userText, text);
    textContainer.innerHTML = highlightedText; // Update displayed text with highlights

    const correctChars = userText.split('').filter((char, i) => char === text[i]).length;
    characterCount = correctChars;
    mistakes = userText.length - correctChars;
    mistakesElement.textContent = `Mistakes: ${mistakes}`;
    updateStats();
    startTimer(); // Start the timer when the user begins typing
});

function startTimer() {
    if (timerStarted) return; // Prevent multiple timers from starting
    timerStarted = true; // Set the flag to true

    timerInterval = setInterval(() => {
        if (timer > 0) {
            timer--;
            timerElement.textContent = `Time Left: ${timer}`;
        } else {
            clearInterval(timerInterval); // Stop the timer
            timerElement.textContent = "Time's up!";
            alert("Time's up!");
            userInput.disabled = true; // Disable further input
        }
    }, 1000);
}

// Initialize the typing test
generateText();
