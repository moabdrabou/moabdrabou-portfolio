// Function to set the current year in the footer
function setCurrentYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.textContent = currentYear;
    }
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', setCurrentYear);
var loader = document.getElementById("preloader"); window.addEventListener("load", function () { loader.style.display = "none"; })
function settingtoggle() { document.getElementById("setting-container").classList.toggle('settingactivate'); document.getElementById("visualmodetogglebuttoncontainer").classList.toggle('visualmodeshow'); }
function visualmode() { document.body.classList.toggle('light-mode'); var elements = document.querySelectorAll('.needtobeinvert'); elements.forEach(function (element) { element.classList.toggle('invertapplied') }) }
let mobileTogglemenu = document.getElementById("mobiletogglemenu"); function hamburgerMenu() { document.body.classList.toggle("stopscrolling"); document.getElementById("mobiletogglemenu").classList.toggle("show-toggle-menu"); document.getElementById("burger-bar1").classList.toggle("hamburger-animation1"); document.getElementById("burger-bar2").classList.toggle("hamburger-animation2"); document.getElementById("burger-bar3").classList.toggle("hamburger-animation3") }
function hidemenubyli() { document.body.classList.toggle("stopscrolling"); document.getElementById("mobiletogglemenu").classList.remove("show-toggle-menu"); document.getElementById("burger-bar1").classList.remove("hamburger-animation1"); document.getElementById("burger-bar2").classList.remove("hamburger-animation2"); document.getElementById("burger-bar3").classList.remove("hamburger-animation3") }
const sections = document.querySelectorAll('section'); const navLi = document.querySelectorAll('.navbar .navbar-tabs .navbar-tabs-ul li'); const mobilenavLi = document.querySelectorAll('.mobiletogglemenu .mobile-navbar-tabs-ul li'); window.addEventListener('scroll', () => {
    let current = ""; sections.forEach(section => { const sectionTop = section.offsetTop; const sectionHeight = section.clientHeight; if (pageYOffset >= (sectionTop - 200)) { current = section.getAttribute('id') } })
    mobilenavLi.forEach(li => { li.classList.remove('activeThismobiletab'); if (li.classList.contains(current)) { li.classList.add('activeThismobiletab') } })
    navLi.forEach(li => { li.classList.remove('activeThistab'); if (li.classList.contains(current)) { li.classList.add('activeThistab') } })
})
console.log('%c Developed by Mohammed Abdrabou', 'background-image: linear-gradient(90deg,#8000ff,#6bc5f8); color: white;font-weight:900;font-size:1rem; padding:20px;'); let mybutton = document.getElementById("backtotopbutton"); window.onscroll = function () { scrollFunction() }; function scrollFunction() { if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) { mybutton.style.display = "block" } else { mybutton.style.display = "none" } }
function scrolltoTopfunction() { document.body.scrollTop = 0; document.documentElement.scrollTop = 0 }
document.addEventListener("contextmenu", function (e) { if (e.target.nodeName === "IMG") { e.preventDefault() } }, !1);