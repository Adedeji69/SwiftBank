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

const viewCardBtn = document.getElementById("viewCardBtn");
const viewCardIcon = document.getElementById("viewCardIcon");
const viewCardText = document.getElementById("viewCardText");
const cardNo = document.querySelector(".card-no");
const cvvValue = document.querySelector(".cvv h5");

let cardDetailsVisible = false;

viewCardBtn.addEventListener("click", function () {
  cardDetailsVisible = !cardDetailsVisible;

  if (cardDetailsVisible) {
    cardNo.textContent = cardNo.dataset.full;
    cvvValue.textContent = cvvValue.dataset.full;
    viewCardIcon.className = "bi bi-eye-slash";
    viewCardText.textContent = "Hide Card Details";
  } else {
    cardNo.textContent = cardNo.dataset.masked;
    cvvValue.textContent = cvvValue.dataset.masked;
    viewCardIcon.className = "bi bi-eye";
    viewCardText.textContent = "View Card Details";
  }
});
