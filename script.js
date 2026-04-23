/* =========================
   THEME TOGGLE (FIXED + SAFE)
========================= */
document.addEventListener("DOMContentLoaded", () => {

  const themeToggle = document.getElementById("themeToggle");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light");

      // optional: save preference
      if (document.body.classList.contains("light")) {
        localStorage.setItem("theme", "light");
      } else {
        localStorage.setItem("theme", "dark");
      }
    });
  }

  // restore theme on load
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
  }

  /* =========================
     PROJECT CLICK (UNCHANGED)
  ========================= */
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", (e) => {

    // ignore clicking the actual button/link inside card
    if (e.target.closest("a")) return;

    // 1st project → normal navigation
    if (card.dataset.link) {
      window.location.href = card.dataset.link;
      return;
    }

    // 2nd project → coming soon popup
    showComingSoonPopup();
  });
});


/* =========================
   POPUP FUNCTION
========================= */
function showComingSoonPopup() {

  // prevent duplicates
  const existing = document.querySelector(".coming-popup");
  if (existing) return;

  const popup = document.createElement("div");
  popup.className = "coming-popup";
  popup.textContent = "Full case study will be out soon — stay tuned";

  document.body.appendChild(popup);

  // trigger animation
  setTimeout(() => {
    popup.classList.add("show");
  }, 10);

  // remove after 3 seconds
  setTimeout(() => {
    popup.classList.remove("show");

    setTimeout(() => {
      popup.remove();
    }, 300);

  }, 3000);
}

  /* =========================
     CONTACT FORM + POPUP FIXED
  ========================= */

  const form = document.getElementById("contactForm");
  const popup = document.getElementById("popupOverlay");

  if (form && popup) {

    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      // basic validation
      if (!name || !email || !message) {
        alert("Please fill all fields");
        return;
      }

      try {
        const data = new FormData(form);

        await fetch("contact.php", {
          method: "POST",
          body: data
        });

      } catch (err) {
        console.log("Server not reachable, showing popup anyway");
      }

      // ALWAYS SHOW POPUP (frontend success UX)
      popup.classList.add("active");
      form.reset();

      setTimeout(() => {
        popup.classList.remove("active");
      }, 3000);
    });

  }

});