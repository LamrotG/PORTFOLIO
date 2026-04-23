document.addEventListener("DOMContentLoaded", () => {

  // APPLY SAVED THEME ON PAGE LOAD
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
  }

  // OPTIONAL: if you also want toggle button inside case study page later
  const themeToggle = document.getElementById("themeToggle");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {

      document.body.classList.toggle("light");

      if (document.body.classList.contains("light")) {
        localStorage.setItem("theme", "light");
      } else {
        localStorage.setItem("theme", "dark");
      }

    });
  }

});

console.log(localStorage.getItem("theme"));
