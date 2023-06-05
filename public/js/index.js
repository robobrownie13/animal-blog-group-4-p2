
const searchBar = document.querySelector("#search-container");
const rightNav = document.querySelector("#right-navigation");

if (window.location.href.includes("landing.html") || window.location.href.includes("login.html")
|| window.location.href.includes("signup.html")) {
    searchBar.classList.add("hidden");
    rightNav.classList.add("hidden");
} else {
    searchBar.classList.remove("hidden");
    rightNav.classList.remove("hidden");
}

console.log(window.innerWidth);