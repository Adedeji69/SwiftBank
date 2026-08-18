import { app } from "./firebase-config.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore(app);

let verifiedRecipient = null;

const verifyUserBtn = document.getElementById("verifyUserBtn");
const usernameInput = document.getElementById("usernameSwiftUser");
const recipientNameField = document.getElementById("recipientNameSwiftUser");
const verifiedMsg = document.getElementById("verifiedMsg");
const verifiedMsgText = document.getElementById("verifiedMsgText");

verifyUserBtn.addEventListener("click", function () {
  const enteredAccountNumber = usernameInput.value.trim();

  if (!enteredAccountNumber) {
    alert("Please enter an account number.");
    return;
  }

  const usersRef = collection(db, "users");
  const q = query(usersRef, where("accountNumber", "==", enteredAccountNumber));

  getDocs(q).then(function (querySnapshot) {
    if (querySnapshot.empty) {
      verifiedRecipient = null;
      recipientNameField.value = "";
      verifiedMsgText.textContent = "No SwiftBank user not found.";
      verifiedMsg.style.color = "red";
      verifiedMsg.style.display = "block";
      return;
    }

    const recipientDoc = querySnapshot.docs[0];
    const recipientData = recipientDoc.data();

    verifiedRecipient = {
      uid: recipientDoc.id,
      fullName: recipientData.fullName,
      accountNumber: recipientData.accountNumber,
    };

    recipientNameField.value = recipientData.fullName;
    verifiedMsgText.textContent = "User verified";
    verifiedMsg.style.color = "green";
    verifiedMsg.style.display = "block";
  }).catch(function (error) {
    alert("Error verifying user: " + error.message);
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
