
const searchBar = document.querySelector("#search-container");
const rightNav = document.querySelector("#right-navigation");
const yourMindDiv = document.querySelector(".on-your-mind");
const pageCover = document.querySelector(".page-cover");

if (window.location.href.includes("landing.html") || window.location.href.includes("login.html")
|| window.location.href.includes("signup.html")) {
    searchBar.classList.add("hidden");
    rightNav.classList.add("hidden");
} else {
    searchBar.classList.remove("hidden");
    rightNav.classList.remove("hidden");
}

if (window.location.href.includes("comment.html")) {
    pageCover.addEventListener("click", function() {
        window.location.replace(this.dataset.location);
    })
}
if (window.location.href.includes("feedpage.html")) {
    yourMindDiv.addEventListener("click", function() {
        window.location.replace(this.dataset.location);
    })
}

