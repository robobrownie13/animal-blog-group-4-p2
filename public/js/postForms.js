const newPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#new-title").value.trim();
  const content = document.querySelector("#new-post").value.trim();

  if (title && content) {
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({ title, body }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile/");
    } else {
      alert("Failed to create blogpost");
    }
  }
};

const editPostHandler = async (event) => {
  event.preventDefault();
  
  const title = document.querySelector("").value.trim();
  const content = document.querySelector("").value.trim();

  if (title && content) {
    const response = await fetch(`/api/posts`, {
      method: "PUT",
      body: JSON.stringify({ title, body }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile/");
    } else {
      alert("Failed to create blogpost");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete blogpost");
    }
  }
};

document.querySelector("").addEventListener("submit", newFormHandler);

document.querySelectorAll("").forEach((deleteButton) => {
  deleteButton.addEventListener("click", delButtonHandler);
});
