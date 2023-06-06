const signupForm = document.querySelector(".signup-form");

const signupFormHandler = async (event) => {
  event.preventDefault();
  const userInput = document.getElementById("username_input").value.trim();
  const emailInput = document.getElementById("email_input").value.trim();
  const passwordInput = document.getElementById("password_input").value.trim();

  const warningText = document.querySelector("#signup-warning");

  const confirmPasswordInput = document
    .getElementById("confirm-password")
    .value.trim();
  if (passwordInput !== confirmPasswordInput) {
    warningText.innerText = "Passwords must match!";
    return;
  }

  console.log(userInput.value, emailInput.value, passwordInput.value);
  //if(userInput,emailInput,passwordInput){}
  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_name: userInput,
      email: emailInput,
      password: passwordInput,
    }),
  });
  const data = await response.json();
  console.log(data);
  window.location.href = "/";
};

const animalsInfo = [
  {
      id: 1,
      mobile: "beautiful-vertical-closeup-shot-colorful-bee-eater.jpg",
      desktop: "beautiful-kingfisher-catching-fish-image-ai-generated-art.jpg"
  },
  {
      id: 2,
      mobile: "closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head.jpg",
      desktop: "closeup-shot-beautiful-snowy-egret-bird-perched-rocks-near-river.jpg"
  },
  {
      id: 3,
      mobile: "deer-feeding-forest.jpg",
      desktop: "blue-viper-snake-closeup-face-head-viper-snake-blue-insularis.jpg"
  },
  {
      id: 4,
      mobile: "giraffe-wild.jpg",
      desktop: "whitetail-deer-standing-autumn-wood.jpg"
  },
  {
      id: 5,
      mobile: "portrait-macaw-isolated-black-surface.jpg",
      desktop: "closeup-green-sea-turtle-swimming-underwater-lights.jpg"
  },
  {
      id: 6,
      mobile: "vertical-closeup-shot-stripped-exotic-tropical-fish-swimming-deep-underwater.jpg",
      desktop: "closeup-shot-green-lovebird-with-blurred-background.jpg"
  },
  {
      id: 7,
      mobile: "view-lion-wild.jpg",
      desktop: "closeup-shot-wild-cat-laying-ground-with-its-ears-up.jpg"
  },
  {
      id: 8,
      mobile: "selective-focus-shot-brown-elk-during-sunny-day.jpg",
      desktop: "closeup-whinchat-lupine-field-sunlight-with-blurry-background.jpg"
  },
  {
      id: 9,
      mobile: "view-black-panther-nature.jpg",
      desktop: "eurasian-wolf-white-winter-habitat-beautiful-winter-forest.jpg"
  },
  {
      id: 10,
      mobile: "view-wild-lynx-nature.jpg",
      desktop: "animal-lizard-nature-multi-colored-close-up-generative-ai.jpg"
  },
  {
      id: 11,
      mobile: "endangered-bornean-orangutan-rocky-habitat-pongo-pygmaeus-wild-animal-bars-beautiful-cute-creature.jpg",
      desktop: "glowing-insects-night-forest.jpg"
  },
  {
      id: 12,
      mobile: "stunning-colorful-bird-portrait-illustration-made-with-generative-ai.jpg",
      desktop: "mallard-with-colorful-feathers-swimming-lake-with-reflection-surroundings.jpg"
  },
  {
      id: 13,
      mobile: "young-leopard-portrait.jpg",
      desktop: "one-pink-flamingo-bird-closeup.jpg"
  }
]



function backgroundSignup() {
    const signupBackground = document.querySelector("#signup");
    const randomNum = Math.floor(Math.random() * animalsInfo.length)
    if (window.innerWidth < 650 && window.innerWidth > 0) {
        signupBackground.style.backgroundImage =   `url("../images/${animalsInfo[randomNum].mobile}")`;
    }
    if (window.innerWidth >= 650) {
        signupBackground.style.backgroundImage =   `url("../images/${animalsInfo[randomNum].desktop}")`;
    }
}

backgroundSignup();

signupForm.addEventListener("submit", signupFormHandler);
