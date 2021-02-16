// Scroll Effect

window.addEventListener("scroll", function () {
  const e = window.scrollY,
    s = document.querySelector("header#header");
  e > 0 ? s.classList.add("scrolled") : s.classList.remove("scrolled");
});

// Hamburger

function myFunction() {
  var x = document.getElementById("myNavbar");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}
