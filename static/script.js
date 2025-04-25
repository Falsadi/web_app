const canvas = document.querySelector(".matrix");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const columns = Math.floor(canvas.width / 20);
const drops = Array(columns).fill(0);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ffff";
    ctx.font = "20px Courier";
    for (let i = 0; i < drops.length; i++) {
        const text = Math.random() > 0.5 ? '0' : '1';
        ctx.fillText(text, i * 20, drops[i] * 20);
        if (drops[i] * 20 > canvas.height && Math.random() > 0.95) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

document.addEventListener("DOMContentLoaded", function () {
    const timerElement = document.getElementById("timer");

    // Ensure the timerElement exists before proceeding
    if (timerElement) {
        // Retrieve or initialize the start time and total time
        let startTime = localStorage.getItem("timerStartTime");
        let totalTime = 60 * 60; // Default to 60 minutes if no total time is saved

        if (!startTime) {
            // If no start time is stored, set it to the current time and store it
            startTime = Date.now();
            localStorage.setItem("timerStartTime", startTime);
        } else {
            // If start time is found in localStorage, parse it
            startTime = parseInt(startTime, 10);
        }

        function updateTimer() {
            const elapsed = Math.floor((Date.now() - startTime) / 1000); // Calculate elapsed time
            let remainingTime = totalTime - elapsed;

            if (remainingTime <= 0) {
                timerElement.innerText = "00:00"; // Display 00:00 when time is up
                alert("Time's up!");
                localStorage.removeItem("timerStartTime"); // Clear the start time when timer ends
                return;
            }

            // Calculate minutes and seconds from remaining time
            let minutes = Math.floor(remainingTime / 60);
            let seconds = remainingTime % 60;
            timerElement.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Format the display
        }

        // Start the timer
        setInterval(updateTimer, 1000);
        updateTimer(); // Update immediately when the page loads
    } else {
        console.error("Timer element not found!");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Get the current URL without the domain part
    const currentURL = window.location.href;
    console.log(currentURL)
    // Select all the nav links
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
        // Get the href attribute (which could be a relative URL)
        const linkURL = link.getAttribute("href");
        // Check if the current page matches the link URL
        if (currentURL.includes(linkURL)) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

});


function checkAnswer() {
    const hackerMessage = document.getElementById("hacker-message-box"); // Ensure correct ID
    const userInputField = document.getElementById("user-input");

    // Elements to hide
    const heading = document.querySelector("h2"); // "You are Almost There!!"
    const highlightedText = document.querySelector(".highlighted-text");
    const flagOutput = document.getElementById("flag-output");
    const inputContainer = document.querySelector(".input-container");

    const correctAnswer = "Go to balcony, and get your prize"; // Ensure this is the expected answer
    const userInput = userInputField.value.trim();

    if (userInput.toLowerCase() === correctAnswer.toLowerCase()) {
        console.log("Correct answer entered. Showing hacker message...");

        // Show the hacker message
        hackerMessage.style.display = "block";

        // Hide the elements
        heading.style.display = "none";
        highlightedText.style.display = "none";
        flagOutput.style.display = "none";
        inputContainer.style.display = "none";

        // Play success sound
        const audio = new Audio("sounds/game_win.mp3"); // Ensure file exists
        audio.play();

        // Create and display the congrats message
        const congratsMessage = document.createElement("div");
        congratsMessage.classList.add("congrats-message"); // Add classes for styling
        congratsMessage.textContent = "🎉 Congratulations! You got it right!";
        document.body.appendChild(congratsMessage);

        // Animate congrats message
        setTimeout(() => {
            congratsMessage.classList.add("show");
            createConfetti();
        }, 100);

    } else {
        console.log("Incorrect answer.");

        // Create and display the error message
        const errorMessage = document.createElement("div");
        errorMessage.classList.add("wrong-message"); // Add classes for styling
        errorMessage.textContent = "❌ Incorrect answer. Try again!";
        document.body.appendChild(errorMessage);
        const audio = new Audio("sounds/wrong_answer.mp3"); // Ensure file exists
        audio.play();
        // Animate error message
        setTimeout(() => {
            errorMessage.classList.add("show");
        }, 100);

        // Hide error message after 3 seconds
        setTimeout(() => {
            errorMessage.classList.remove("show");
            setTimeout(() => errorMessage.remove(), 500); // Remove element after fade-out
        }, 3000);
    }
}

function createConfetti() {
    for (let i = 0; i < 100; i++) { // Number of confetti
        let confetti = document.createElement("div");
        confetti.className = "confetti";
        document.body.appendChild(confetti);

        // Randomize position and animation delay
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`; // Random color
        confetti.style.animationDuration = (Math.random() * 2 + 2) + "s";
    }
}


document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("adminLoginForm");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = new FormData(form);
        const response = await fetch("/admin", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            window.location.href = data.redirect;
        } else {
            console.log("Incorrect answer.");

            const errorMessage = document.createElement("div");
            errorMessage.classList.add("wrong-message");
            errorMessage.textContent = "❌ Incorrect answer. Try again!";
            document.body.appendChild(errorMessage);

            const audio = new Audio("/static/sounds/wrong_answer.mp3");
            audio.play();

            setTimeout(() => {
                errorMessage.classList.add("show");
            }, 100);

            setTimeout(() => {
                errorMessage.classList.remove("show");
                setTimeout(() => errorMessage.remove(), 500);
            }, 3000);
        }
    });
});
