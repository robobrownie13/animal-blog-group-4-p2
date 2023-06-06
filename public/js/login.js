const loginForm = document.querySelector(".login-form");
console.log("HI!!!!!!!!!");
const loginFormHandler = async (event) => {
  console.log("HI!!!!!!!!!");
  event.preventDefault();

  // Collect values from the login form
  const email = document.getElementById("email-login").value.trim();
  const password = document.getElementById("password-login").value.trim();

  const warningText = document.querySelector("#login-warning");

  if (email && password) {
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("HI!!!!!!!!!");
      document.location.replace("/feed");
    } else {
      console.log("Hiiiii");
    }
  }
};

const animalsData = [
  {
    id: 1,
    mobile: "beautiful-vertical-closeup-shot-colorful-bee-eater.jpg",
    desktop: "beautiful-kingfisher-catching-fish-image-ai-generated-art.jpg",
  },
  {
    id: 2,
    mobile:
      "closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head.jpg",
    desktop:
      "closeup-shot-beautiful-snowy-egret-bird-perched-rocks-near-river.jpg",
  },
  {
    id: 3,
    mobile: "deer-feeding-forest.jpg",
    desktop:
      "blue-viper-snake-closeup-face-head-viper-snake-blue-insularis.jpg",
  },
  {
    id: 4,
    mobile: "giraffe-wild.jpg",
    desktop: "whitetail-deer-standing-autumn-wood.jpg",
  },
  {
    id: 5,
    mobile: "portrait-macaw-isolated-black-surface.jpg",
    desktop: "closeup-green-sea-turtle-swimming-underwater-lights.jpg",
  },
  {
    id: 6,
    mobile:
      "vertical-closeup-shot-stripped-exotic-tropical-fish-swimming-deep-underwater.jpg",
    desktop: "closeup-shot-green-lovebird-with-blurred-background.jpg",
  },
  {
    id: 7,
    mobile: "view-lion-wild.jpg",
    desktop: "closeup-shot-wild-cat-laying-ground-with-its-ears-up.jpg",
  },
  {
    id: 8,
    mobile: "selective-focus-shot-brown-elk-during-sunny-day.jpg",
    desktop:
      "closeup-whinchat-lupine-field-sunlight-with-blurry-background.jpg",
  },
  {
    id: 9,
    mobile: "view-black-panther-nature.jpg",
    desktop: "eurasian-wolf-white-winter-habitat-beautiful-winter-forest.jpg",
  },
  {
    id: 10,
    mobile: "view-wild-lynx-nature.jpg",
    desktop: "animal-lizard-nature-multi-colored-close-up-generative-ai.jpg",
  },
  {
    id: 11,
    mobile:
      "endangered-bornean-orangutan-rocky-habitat-pongo-pygmaeus-wild-animal-bars-beautiful-cute-creature.jpg",
    desktop: "glowing-insects-night-forest.jpg",
  },
  {
    id: 12,
    mobile:
      "stunning-colorful-bird-portrait-illustration-made-with-generative-ai.jpg",
    desktop:
      "mallard-with-colorful-feathers-swimming-lake-with-reflection-surroundings.jpg",
  },
  {
    id: 13,
    mobile: "young-leopard-portrait.jpg",
    desktop: "one-pink-flamingo-bird-closeup.jpg",
  },
];

function backgroundLogin() {
  const loginBackground = document.getElementById("login");
  const randomNum = Math.floor(Math.random() * animalsData.length);
  if (window.innerWidth < 790 && window.innerWidth > 0) {
    loginBackground.style.backgroundImage = `url(../images/${animalsData[randomNum].mobile})`;
  }
  if (window.innerWidth >= 790) {
    loginBackground.style.backgroundImage = `url(../images/${animalsData[randomNum].desktop})`;
  }
}

backgroundLogin();

loginForm?.addEventListener("submit", loginFormHandler);
