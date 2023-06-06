
const searchBar = document.getElementById("search-container");
const rightNav = document.getElementById("right-navigation");
const yourMindDiv = document.querySelector(".on-your-mind");
const commentPageCover = document.querySelector(".comment-page-cover");

if (window.location.href.includes("feed") || window.location.href.includes("profile")){
    searchBar.classList.remove("hidden");
    rightNav.classList.remove("hidden");
} else {
    searchBar.classList.add("hidden");
    rightNav.classList.add("hidden");
}

