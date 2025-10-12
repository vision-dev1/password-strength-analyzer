const password = document.getElementById("password");
const strengthBar = document.getElementById("strength-bar");
const strengthText = document.getElementById("strength-text");
const toggleBtn = document.getElementById("toggle");
const suggestBtn = document.getElementById("suggest-btn");
const suggestion = document.getElementById("suggestion");


password.addEventListener("input", () => {
  const val = password.value;
  let strength = 0;

  if (val.match(/[a-z]+/)) strength += 1; // lowercase
  if (val.match(/[A-Z]+/)) strength += 1; // uppercase
  if (val.match(/[0-9]+/)) strength += 1; // numbers
  if (val.match(/[$@#&!%*?^]/)) strength += 1; // special chars
  if (val.length >= 8) strength += 1; // length

  
  strengthBar.style.width = (strength * 20) + "%";

  
  if (strength <= 2) {
    strengthBar.style.background = "red";
    strengthText.textContent = "Weak Password 😟";
  } else if (strength === 3) {
    strengthBar.style.background = "orange";
    strengthText.textContent = "Medium Strength 😐";
  } else if (strength === 4) {
    strengthBar.style.background = "yellow";
    strengthText.textContent = "Strong Password 🙂";
  } else if (strength === 5) {
    strengthBar.style.background = "limegreen";
    strengthText.textContent = "Very Strong 🔥";
  }
});


toggleBtn.addEventListener("click", () => {
  const type = password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  toggleBtn.textContent = type === "password" ? "👁️" : "🙈";
});


suggestBtn.addEventListener("click", () => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$!%*?&";
  let pass = "";
  for (let i = 0; i < 12; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  suggestion.textContent = `Try this: ${pass}`;
});
