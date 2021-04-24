// SHOW MENU

const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show-menu");
    });
  }
};

showMenu("nav-toggle", "nav-menu");

// REMOVE MENU FOR MOBILE

const navLink = document.querySelectorAll(".nav__link");

const linkAction = () => {
  const navMenu = document.getElementById("nav-menu");

  navMenu.classList.remove("show-menu");
};

navLink.forEach((n) => n.addEventListener("click", linkAction));

// SCROLL SECTIONS ACTIVE LINK

const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
};

window.addEventListener("scroll", scrollActive);

// CHANGE BG HEADER

const scrollHeader = () => {
  const nav = document.getElementById("header");

  if (this.scrollY >= 50) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
};

window.addEventListener("scroll", scrollHeader);

// MAIN JS
const searchForm = document.querySelector(".menu__search");
const mealList = document.getElementById("meal");
const container = document.getElementById("menu");
const searchResultDiv = document.getElementById("meal");
const noResultsFound = document.querySelector(".noRecipe");
let searchQuery = "";
const APP_ID = "32004361";
const API_KEY = "25105b8254389381c8d671e8c5a10f68";
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector(".search").value;
  fetchAPI();
});

const generateHTML = (results) => {
  noResultsFound.classList.remove("shown");

  let generatedHTML = ``;
  results.map((result) => {
    generatedHTML += `
    <div class="menu__content">
            <img src="${result.recipe.image}" alt="" class="menu__img" />
            <h3 class="menu__name">${result.recipe.label}</h3>
            <span class="menu__detail">Calories:</span>
            <span class="menu__preci">${result.recipe.calories.toFixed(
      2
    )}</span>
            <a href="${result.recipe.url
      }" target="_blank" class="button menu__button"
              ><i class='bx bxs-chevron-right-circle'></i></a>
          </div>
    `;
  });
  searchResultDiv.innerHTML = generatedHTML;
};

const noResults = () => {
  noResultsFound.classList.add("shown");
  searchResultDiv.innerHTML = ``;
};

const fetchAPI = async () => {
  noResultsFound.classList.remove("shown");
  searchResultDiv.innerHTML = ``;
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${API_KEY}&to=20`;
  const response = await fetch(baseURL);
  const data = await response.json();
  if (data.more === true) {
    generateHTML(data.hits);
  } else {
    noResults();
  }
};
