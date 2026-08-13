const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    // deactivate all tabs and content panels
    tabs.forEach(function (t) {
      t.classList.remove("active");
    });
    contents.forEach(function (c) {
      c.classList.remove("active");
    });

    // activate the clicked tab and its matching content
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
