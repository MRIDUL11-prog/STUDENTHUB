const GRADE_POINTS = {
    "O": 10,
    "A+": 9,
    "A": 8,
    "B+": 7,
    "B": 6,
    "C": 5,
    "F": 0
};

const subjectForm = document.getElementById("subjectForm");
const subjectName = document.getElementById("subjectName");
const subjectCredits = document.getElementById("subjectCredits");
const subjectGrade = document.getElementById("subjectGrade");
const subjectTableBody = document.getElementById("subjectTableBody");
const emptySubjects = document.getElementById("emptySubjects");
const cgpaError = document.getElementById("cgpaError");
const cgpaResult = document.getElementById("cgpaResult");
const calculateCgpaBtn = document.getElementById("calculateCgpaBtn");
const clearAllBtn = document.getElementById("clearAllBtn");

let subjects = [];

function clearValidation() {
    cgpaError.textContent = "";
    subjectName.classList.remove("invalid");
    subjectCredits.classList.remove("invalid");
    subjectGrade.classList.remove("invalid");
}

function calculateCgpa() {
    if (subjects.length === 0) {
        cgpaResult.textContent = "0.00";
        return null;
    }

    let totalCredits = 0;
    let weightedPoints = 0;

    subjects.forEach(subject => {
        totalCredits += subject.credits;
        weightedPoints += GRADE_POINTS[subject.grade] * subject.credits;
    });

    const cgpa = totalCredits > 0 ? weightedPoints / totalCredits : 0;
    cgpaResult.textContent = cgpa.toFixed(2);
    return cgpa;
}

function renderSubjects() {
    subjectTableBody.innerHTML = "";

    subjects.forEach((subject, index) => {
        const row = document.createElement("tr");
        const nameCell = document.createElement("td");
        const creditsCell = document.createElement("td");
        const gradeCell = document.createElement("td");
        const pointsCell = document.createElement("td");
        const actionCell = document.createElement("td");
        const removeButton = document.createElement("button");

        nameCell.textContent = subject.name;
        creditsCell.textContent = subject.credits;
        gradeCell.textContent = subject.grade;
        pointsCell.textContent = GRADE_POINTS[subject.grade];
        removeButton.type = "button";
        removeButton.className = "remove-subject-btn";
        removeButton.dataset.index = index;
        removeButton.setAttribute("aria-label", "Remove " + subject.name);
        removeButton.textContent = "Remove";
        actionCell.appendChild(removeButton);

        row.append(nameCell, creditsCell, gradeCell, pointsCell, actionCell);
        subjectTableBody.appendChild(row);
    });

    emptySubjects.hidden = subjects.length > 0;
    calculateCgpa();
}

subjectForm.addEventListener("submit", event => {
    event.preventDefault();
    clearValidation();

    const name = subjectName.value.trim();
    const credits = Number(subjectCredits.value);
    const grade = subjectGrade.value;
    let hasError = false;

    if (!name) {
        subjectName.classList.add("invalid");
        hasError = true;
    }

    if (!Number.isFinite(credits) || credits <= 0) {
        subjectCredits.classList.add("invalid");
        hasError = true;
    }

    if (!Object.prototype.hasOwnProperty.call(GRADE_POINTS, grade)) {
        subjectGrade.classList.add("invalid");
        hasError = true;
    }

    if (hasError) {
        cgpaError.textContent = "Enter a subject name, valid credits greater than zero, and a grade.";
        return;
    }

    subjects.push({
        name: name,
        credits: credits,
        grade: grade
    });

    subjectForm.reset();
    renderSubjects();
});

subjectTableBody.addEventListener("click", event => {
    const removeButton = event.target.closest(".remove-subject-btn");
    if (!removeButton) return;

    const index = Number(removeButton.dataset.index);
    subjects.splice(index, 1);
    renderSubjects();
});

calculateCgpaBtn.addEventListener("click", () => {
    clearValidation();

    if (subjects.length === 0) {
        cgpaError.textContent = "Add at least one subject before calculating CGPA.";
        cgpaResult.textContent = "0.00";
        return;
    }

    calculateCgpa();
});

clearAllBtn.addEventListener("click", () => {
    subjects = [];
    subjectForm.reset();
    clearValidation();
    renderSubjects();
});

renderSubjects();
