import { app } from "./firebase-config.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore(app);

const CLOUD_NAME = "dtmn0dcto";
const UPLOAD_PRESET = "SwiftBank";

const profilePicInput = document.getElementById("profilePicInput");
const profileImg = document.getElementById("profileImg");
const profileImgSecondary = document.getElementById("profileImgSecondary");

onAuthStateChanged(auth, function (user) {
  if (!user) return;

  getDoc(doc(db, "users", user.uid)).then(function (docSnap) {
    if (!docSnap.exists()) return;

    const userData = docSnap.data();

    if (userData.photoURL) {
      profileImg.src = userData.photoURL;
      profileImgSecondary.src = userData.photoURL;
    }

    document.getElementById("profileFullName").textContent = userData.fullName;
    document.getElementById("detailFullName").textContent = userData.fullName;
    document.getElementById("detailEmail").textContent = userData.email;
    document.getElementById("detailPhone").textContent = userData.phone;
    document.getElementById("detailDob").textContent = userData.dob;

    const accountType = userData.accountType;
    const formattedAccountType = accountType.charAt(0).toUpperCase() + accountType.slice(1);
    document.getElementById("accountTypeDisplay").textContent = formattedAccountType;

    const createdDate = new Date(user.metadata.creationTime);
    document.getElementById("customerSince").textContent =
      "Customer since " + createdDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

    const lastLoginDate = new Date(user.metadata.lastSignInTime);
    document.getElementById("lastLoginDisplay").textContent =
      lastLoginDate.toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "2-digit" });
  });
});

profilePicInput.addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: formData,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const imageUrl = data.secure_url;
      profileImg.src = imageUrl;
      profileImgSecondary.src = imageUrl;

      const user = auth.currentUser;
      return setDoc(doc(db, "users", user.uid), { photoURL: imageUrl }, { merge: true });
    })
    .then(function () {
      alert("Profile picture updated!");
    })
    .catch(function (error) {
      alert("Upload failed: " + error.message);
    });
});

const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    tabs.forEach(function (t) {
      t.classList.remove("active");
    });
    contents.forEach(function (c) {
      c.classList.remove("active");
    });

    tab.classList.add("active");
    const targetId = tab.getAttribute("data-target");
    document.getElementById(targetId).classList.add("active");
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