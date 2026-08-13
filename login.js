import { app } from "./firebase-config.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const auth = getAuth(app);

function makeToggle(btnId, inputId, iconId) {
  document.getElementById(btnId).addEventListener("click", function () {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    input.type = input.type === "password" ? "text" : "password";
    icon.classList.toggle("bi-eye");
    icon.classList.toggle("bi-eye-slash");
  });
}
makeToggle("togglePw", "password", "eyePw");

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(function (userCredential) {
      alert("Login successful!");
      window.location.href = "dashboard.html";
    })
    .catch(function (error) {
      alert(error.message);
    });
});