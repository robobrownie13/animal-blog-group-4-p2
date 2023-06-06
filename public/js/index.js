
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


gsap.registerPlugin(ScrollTrigger);

gsap.to(".landing-text1 h2", {
    duration: 2,
    opacity: 1,
    ease: Power4.easeOut,
    scrollTrigger: {
        trigger: ".landing-content1",
        start: "top 60%",
    }
});

gsap.to(".landing-text2 h2", {
    duration: 2,
    opacity: 1,
    ease: Power4.easeOut,
    scrollTrigger: {
        trigger: ".landing-content2",
        start: "top 60%",
    }
});

gsap.to(".landing-text3 h2", {
    duration: 2,
    opacity: 1,
    ease: Power4.easeOut,
    scrollTrigger: {
        trigger: ".landing-content3",
        start: "top 60%",
    }
});

gsap.to(".landing-text1 p", {
    duration: 2,
    "transform": "translateY(0px)",
    ease: Power4.easeOut,
    scrollTrigger: {
        trigger: ".landing-content1",
        start: "top 60%",
    }
});

gsap.to(".landing-text2 p", {
    duration: 2,
    "transform": "translateY(0px)",
    ease: Power4.easeOut,
    scrollTrigger: {
        trigger: ".landing-content2",
        start: "top 60%",
    }
});

gsap.to(".landing-text3 p", {
    duration: 2,
    "transform": "translateY(0px)",
    ease: Power4.easeOut,
    scrollTrigger: {
        trigger: ".landing-content3",
        start: "top 60%",
    }
});

var images = document.querySelectorAll('img');
new simpleParallax(images);