import { app } from "./firebase-config.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore(app);

let realBalance = "0";

const toggleBtn = document.getElementById("toggleBalance");
const balanceAmount = document.getElementById("balanceAmount");
let visible = true;

auth.onAuthStateChanged(function (user) {
  if (!user) return;

  getDoc(doc(db, "users", user.uid)).then(function (docSnap) {
    if (!docSnap.exists()) return;

    const userData = docSnap.data();

    realBalance = userData.balance.toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
    });
    balanceAmount.textContent = realBalance;

    document.getElementById("maskedAccountNumber").innerHTML =
    "Main Account :-&nbsp; " + userData.accountNumber;
  });
});

toggleBtn.addEventListener("click", function () {
  if (visible) {
    balanceAmount.textContent = "**** ****";
    toggleBtn.classList.replace("bi-eye", "bi-eye-slash");
  } else {
    balanceAmount.textContent = realBalance;
    toggleBtn.classList.replace("bi-eye-slash", "bi-eye");
  }
  visible = !visible;
});

const centerText = {
  id: "centerText",
  afterDraw(chart) {
    const { ctx } = chart;
    const meta = chart.getDatasetMeta(0);

    if (!meta.data.length) return;

    const x = meta.data[0].x;
    const y = meta.data[0].y;

    ctx.save();

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#6B7280";
    ctx.font = "600 14px Inter";

    ctx.fillText("Total Spent", x, y - 12);

    ctx.fillStyle = "#111827";
    ctx.font = "700 28px Inter";

    ctx.fillText("₦325,000", x, y + 18);

    ctx.restore();
  },
};

const data = {
  labels: ["Transfers", "Bills", "Shopping", "Others"],
  datasets: [
    {
      data: [30, 25, 20, 10],
      backgroundColor: [
        "#1D4ED8",
        "#16A34A",
        "#F59E0B",
        "#CBD5E1",
      ],
      borderWidth: 0,
      hoverOffset: 0,
    },
  ],
};

const config = {
  type: "doughnut",
  data: data,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  },
  plugins: [centerText],
};

new Chart(document.getElementById("spendingChart"), config);

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