const langButtons = document.querySelectorAll(".lang");
const translated = document.querySelectorAll("[data-fr][data-en]");
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

function setLanguage(lang) {
  document.documentElement.lang = lang;
  translated.forEach(el => {
    el.textContent = el.dataset[lang];
  });
  langButtons.forEach(btn => btn.classList.toggle("active", btn.dataset.lang === lang));
  localStorage.setItem("afririsk-lang", lang);
}

langButtons.forEach(btn => btn.addEventListener("click", () => setLanguage(btn.dataset.lang)));
menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => nav.classList.remove("open")));
document.getElementById("year").textContent = new Date().getFullYear();
setLanguage(localStorage.getItem("afririsk-lang") || "fr");