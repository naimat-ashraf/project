const form = document.getElementById("multiStepForm");
const formSteps = document.querySelectorAll(".form-step");
const nextBtns = document.querySelectorAll(".next");
const prevBtns = document.querySelectorAll(".prev");
const progress = document.getElementById("progress");
const progressSteps = document.querySelectorAll(".progress-step");
const summary = document.getElementById("summary");

let formStepIndex = 0;

// Load saved data from localStorage
const savedData = JSON.parse(localStorage.getItem("formData")) || {};
Object.keys(savedData).forEach(id => {
  const input = document.getElementById(id);
  if (input) input.value = savedData[id];
});

// Save data function
function saveData() {
  const inputs = form.querySelectorAll("input");
  let formData = {};
  inputs.forEach(input => formData[input.id] = input.value);
  localStorage.setItem("formData", JSON.stringify(formData));
}

// Update steps
function updateFormSteps() {
  formSteps.forEach((step, i) => {
    step.classList.toggle("active", i === formStepIndex);
  });

  // Update progress bar
  progressSteps.forEach((step, i) => {
    step.classList.toggle("active", i <= formStepIndex);
  });

  progress.style.width = ((formStepIndex) / (formSteps.length - 1)) * 100 + "%";

  // Show summary at last step
  if (formStepIndex === formSteps.length - 1) {
    const data = JSON.parse(localStorage.getItem("formData"));
    summary.innerHTML = `
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Address:</strong> ${data.address}</p>
      <p><strong>City:</strong> ${data.city}</p>
      <p><strong>Username:</strong> ${data.username}</p>
    `;
  }
}

// Validation
function validateStep() {
  const inputs = formSteps[formStepIndex].querySelectorAll("input");
  for (let input of inputs) {
    if (!input.value.trim()) {
      alert("Please fill all fields before continuing.");
      return false;
    }
  }
  return true;
}

// Next button
nextBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    if (!validateStep()) return;
    saveData();
    formStepIndex++;
    updateFormSteps();
  });
});

// Previous button
prevBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    formStepIndex--;
    updateFormSteps();
  });
});

// Submit
form.addEventListener("submit", e => {
  e.preventDefault();
  alert("Form submitted successfully!");
  localStorage.removeItem("formData");
});

// Initial render
updateFormSteps();
