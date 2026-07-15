const modal=document.getElementById("appointmentModal");
const menu=document.querySelector(".menu");
const nav=document.querySelector(".nav");
let currentLang=localStorage.getItem("afririsk-lang")||"fr";

function applyLanguage(lang){
  currentLang=lang;
  document.documentElement.lang=lang;
  document.querySelectorAll("[data-fr][data-en]").forEach(el=>{
    el.textContent=el.dataset[lang];
  });
  document.querySelectorAll(".lang").forEach(btn=>btn.classList.toggle("active",btn.dataset.lang===lang));
  document.title=lang==="fr"?"AfriRisk Solutions | Intermédiation et conseil stratégique":"AfriRisk Solutions | Business intermediation and strategic advisory";
  localStorage.setItem("afririsk-lang",lang);
}
document.querySelectorAll(".lang").forEach(btn=>btn.addEventListener("click",()=>applyLanguage(btn.dataset.lang)));
applyLanguage(currentLang);

const openModal=()=>{modal.classList.add("is-open");modal.setAttribute("aria-hidden","false");document.body.classList.add("modal-open");setTimeout(()=>modal.querySelector('input[name="name"]').focus(),50)};
const closeModal=()=>{modal.classList.remove("is-open");modal.setAttribute("aria-hidden","true");document.body.classList.remove("modal-open")};
document.querySelectorAll(".js-open-appointment").forEach(el=>el.addEventListener("click",openModal));
document.querySelectorAll(".js-close-appointment").forEach(el=>el.addEventListener("click",closeModal));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
menu?.addEventListener("click",()=>{const opened=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(opened))});
document.querySelectorAll("[data-year]").forEach(el=>el.textContent=new Date().getFullYear());

document.getElementById("appointmentForm")?.addEventListener("submit",function(e){
  e.preventDefault();
  const d=new FormData(this);
  const subject=encodeURIComponent(currentLang==="fr"?"Demande de rendez-vous – AfriRisk Solutions":"Meeting request – AfriRisk Solutions");
  const body=encodeURIComponent(
`Nom / Name : ${d.get("name")}
Entreprise / Company : ${d.get("company") || "—"}
Courriel / Email : ${d.get("email")}
Téléphone / Phone : ${d.get("phone") || "—"}

Message :
${d.get("message")}`
  );
  document.getElementById("formStatus").textContent=currentLang==="fr"?"Ouverture de votre messagerie…":"Opening your email application…";
  window.location.href=`mailto:contact@afririsk.ca?subject=${subject}&body=${body}`;
});