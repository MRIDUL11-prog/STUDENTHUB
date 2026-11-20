
// Get Started button functionality
const buttons = document.querySelectorAll(".buttons button");

buttons[0].addEventListener("click", function() {
    alert("Welcome to StudentHub!");
});

// Learn More button functionality
buttons[1].addEventListener("click", function() {
    document.querySelector(".features").scrollIntoView({
        behavior: "smooth"
    });
});