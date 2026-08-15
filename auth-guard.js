import { app } from "./firebase-config.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, function (user) {
  if (!user) {
    window.location.href = "login.html";
  } else {
    getDoc(doc(db, "users", user.uid))
      .then(function (docSnap) {
        if (docSnap.exists()) {
          const userData = docSnap.data();

          const nameEl = document.querySelector(".welcome-left h3");
          if (nameEl) {
            nameEl.textContent = userData.fullName + " 👋";
          }

          const dropdownNameEl = document.getElementById("dropdownName");
          if (dropdownNameEl) {
            dropdownNameEl.textContent = userData.fullName;
          }

          if (userData.photoURL) {
            const avatarEl = document.querySelector(".welcome-avatar");
            if (avatarEl) {
              avatarEl.src = userData.photoURL;
            }

            const dropdownAvatarEl = document.getElementById("dropdownAvatar");
            if (dropdownAvatarEl) {
              dropdownAvatarEl.src = userData.photoURL;
            }
          }
        }
        document.body.style.visibility = "visible";
      })
      .catch(function (error) {
        console.log("Error fetching user data:", error);
        document.body.style.visibility = "visible";
      });
  }
});

const logoutLinks = document.querySelectorAll('a[href="login.html"]');

logoutLinks.forEach(function (link) {
  if (
    link.textContent.trim().toLowerCase().includes("logout") ||
    link.textContent.trim().toLowerCase().includes("log out")
  ) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      signOut(auth).then(function () {
        window.location.href = "login.html";
      });
    });
  }
});