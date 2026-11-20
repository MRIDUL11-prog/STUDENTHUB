
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
        const willOpen = !currentItem.classList.contains("open");

        // Close other FAQ items
        document.querySelectorAll(".faq-item").forEach(item => {
            if (item !== currentItem) {
                item.classList.remove("open");
                const otherButton = item.querySelector(".faq-question");
                if (otherButton) {
                    otherButton.setAttribute("aria-expanded", "false");
                }
            }
        });

        // Toggle selected FAQ
        currentItem.classList.toggle("open");
        button.setAttribute("aria-expanded", String(willOpen));
    });
});

// FAQ search and category filters
const faqSearch = document.getElementById("faqSearch");
const faqFilterButtons = document.querySelectorAll(".faq-filter-btn");
const faqItems = document.querySelectorAll(".faq-list .faq-item");
const faqNoResults = document.getElementById("faqNoResults");
let activeFaqFilter = "all";

function filterFaqItems() {
    if (!faqSearch) {
        return;
    }

    const query = faqSearch.value.trim().toLowerCase();
    let visibleCount = 0;

    faqItems.forEach(item => {
        const categoryMatches =
            activeFaqFilter === "all" ||
            item.dataset.category === activeFaqFilter;
        const textMatches =
            !query ||
            item.textContent.toLowerCase().includes(query);
        const isVisible = categoryMatches && textMatches;

        item.hidden = !isVisible;
        if (isVisible) {
            visibleCount++;
        }
    });

    if (faqNoResults) {
        faqNoResults.hidden = visibleCount !== 0;
    }
}

if (faqSearch) {
    faqSearch.addEventListener("input", filterFaqItems);

    faqFilterButtons.forEach(button => {
        button.addEventListener("click", () => {
            activeFaqFilter = button.dataset.filter;
            faqFilterButtons.forEach(filterButton => {
                filterButton.classList.remove("active");
            });
            button.classList.add("active");
            filterFaqItems();
        });
    });
}


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
