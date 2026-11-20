
// Get Started & Learn More button functionality
const buttons = document.querySelectorAll(".buttons button");

if (buttons.length >= 2) {
    buttons[0].addEventListener("click", function() {
        alert("Welcome to StudentHub!");
    });

    buttons[1].addEventListener("click", function() {
        document.querySelector(".features").scrollIntoView({
            behavior: "smooth"
        });
    });
}

// ================================
// HELP PAGE - FAQ ACCORDION
// ================================

document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
        const currentItem = button.parentElement;

        // Close other FAQ items
        document.querySelectorAll(".faq-item").forEach(item => {
            if (item !== currentItem) {
                item.classList.remove("open");
            }
        });

        // Toggle selected FAQ
        currentItem.classList.toggle("open");
    });
});


// ================================
// FEEDBACK PAGE - FORM VALIDATION
// ================================

const feedbackForm = document.getElementById("feedbackForm");

if (feedbackForm) {
    feedbackForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const category = document.getElementById("category").value;
        const message = document.getElementById("message").value.trim();
        const rating = document.querySelector(
            'input[name="rating"]:checked'
        );

        const feedbackMessage = document.getElementById("feedbackMessage");

        if (!name || !email || !category || !message || !rating) {
            feedbackMessage.style.color = "#dc2626";
            feedbackMessage.textContent = "Please complete all required fields.";
            return;
        }

        feedbackMessage.style.color = "#15803d";
        feedbackMessage.textContent =
            "Thank you, " + name + "! Your feedback has been received successfully.";

        feedbackForm.reset();
    });
}
