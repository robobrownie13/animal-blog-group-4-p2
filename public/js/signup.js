const form = document.querySelector(".sign-form");

const signupFormHandler = async (event) => {
  event.preventDefault();
  const userInput = document.getElementById("username_input").value.trim();
  const emailInput = document.getElementById("email_input").value.trim();
  const passwordInput = document.getElementById("password_input").value.trim();
  const confirmPasswordInput = document
    .getElementById("confirm-password")
    .value.trim();
  if (passwordInput !== confirmPasswordInput) {
    alert("Passwords must match!");
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

form.addEventListener("submit", signupFormHandler);
