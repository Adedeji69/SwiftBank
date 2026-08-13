import { app } from "./firebase-config.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore(app);

const today = new Date();
const formattedToday = today.toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});
document.getElementById("balanceDate").textContent = "As of " + formattedToday;

auth.onAuthStateChanged(function (user) {
  if (!user) return;

  getDoc(doc(db, "users", user.uid)).then(function (docSnap) {
    if (!docSnap.exists()) return;

    const userData = docSnap.data();
    const formattedBalance = userData.balance.toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
    });

    balanceText.textContent = formattedBalance;
    balanceText.dataset.full = formattedBalance;

    ledgerText.textContent = formattedBalance;
    ledgerText.dataset.full = formattedBalance;
  });
});

const hamburgerBtn = document.getElementById("hamburgerBtn");
const sidebar = document.querySelector(".sidebar");
const overlay = document.getElementById("sidebarOverlay");

hamburgerBtn.addEventListener("click", function () {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", function () {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
});


const toggleBalance = document.getElementById("toggleBalance");
const balanceText = document.getElementById("balanceText");
const ledgerText = document.getElementById("ledgerText");

let balanceVisible = true;

toggleBalance.addEventListener("click", function () {
  balanceVisible = !balanceVisible;

  if (balanceVisible) {
    balanceText.textContent = balanceText.dataset.full;
    ledgerText.textContent = ledgerText.dataset.full;
    toggleBalance.className = "bi bi-eye eye";
  } else {
    balanceText.textContent = balanceText.dataset.masked;
    ledgerText.textContent = ledgerText.dataset.masked;
    toggleBalance.className = "bi bi-eye-slash eye";
  }
});