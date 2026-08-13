import { app } from "./firebase-config.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore(app);

function generateAccountNumber() {
  let accountNumber = "";
  for (let i = 0; i < 10; i++) {
    accountNumber += Math.floor(Math.random() * 10);
  }
  return accountNumber;
}


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
makeToggle("toggleConfirm", "confirmPw", "eyeConfirm");

document.getElementById("password").addEventListener("input", function () {
  const val = this.value;
  const fill = document.getElementById("strengthFill");
  const label = document.getElementById("strengthLabel");
  let score = 0;
  if (val.length >= 8) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;
  const levels = [
    { pct: "0%", color: "#e5e7eb", text: "" },
    { pct: "25%", color: "#ef4444", text: "Weak" },
    { pct: "50%", color: "#f97316", text: "Fair" },
    { pct: "75%", color: "#eab308", text: "Good" },
    { pct: "100%", color: "#22c55e", text: "Strong" },
  ];
  const lvl = val.length === 0 ? levels[0] : levels[score];
  fill.style.width = lvl.pct;
  fill.style.background = lvl.color;
  label.textContent = lvl.text;
  label.style.color = lvl.color;
});

document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = this;
  const pw = document.getElementById("password");
  const confirm = document.getElementById("confirmPw");
  const pwErr = document.getElementById("pwError");
  let valid = true;

  if (pw.value.length < 8) {
    pw.classList.add("is-invalid");
    pwErr.textContent = "Password must be at least 8 characters.";
    pwErr.style.display = "block";
    valid = false;
  } else {
    pw.classList.remove("is-invalid");
    pwErr.style.display = "none";
  }

  if (confirm.value !== pw.value) {
    confirm.classList.add("is-invalid");
    valid = false;
  } else {
    confirm.classList.remove("is-invalid");
  }

  form.classList.add("was-validated");
  if (!form.checkValidity() || !valid) return;

  const email = document.getElementById("email").value;
const password = pw.value;

const fullName = document.getElementById("fullName").value;
const phone = document.getElementById("phone").value;
const dob = document.getElementById("dob").value;
const accountType = document.getElementById("accountType").value;

createUserWithEmailAndPassword(auth, email, password)
  .then(function (userCredential) {
    const user = userCredential.user;
    const accountNumber = generateAccountNumber();

    setDoc(doc(db, "users", user.uid), {
      fullName: fullName,
      email: email,
      phone: phone,
      dob: dob,
      accountType: accountType,
      accountNumber: accountNumber,
      balance: 2456789,
    })
      .then(function () {
        alert("Account created successfully!");
        window.location.href = "login.html";
      })
      .catch(function (error) {
        alert("Account created, but failed to save profile: " + error.message);
      });
  })
  .catch(function (error) {
    alert(error.message);
  });
});
