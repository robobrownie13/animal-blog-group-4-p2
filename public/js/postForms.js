const newPostForm = document.querySelector(".new-form-post");
const editPostForm = document.querySelector(".edit-form")
const deleteButtons= document.querySelectorAll(".delete-post")

const newPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#new-title").value.trim();
  const post_text = document.querySelector("#new-post").value.trim();

  if (title && post_text) {
    const response = await fetch(`/api/post`, {
      method: "POST",
      body: JSON.stringify({ title, post_text}),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile/user");
    } else {
      alert("Failed to create blogpost");
    }
  }
};

const editPostHandler = async (event) => {
  event.preventDefault();
  
  const title = document.querySelector("#edit-title").value.trim();
  const post_text = document.querySelector("#edit-post").value.trim();
const postId = event.target.dataset.postId
  if (title && post_text) {
    const response = await fetch(`/api/post/${postId}`, {
      method: "PUT",
      body: JSON.stringify({ title, post_text }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile/user");
    } else {
      alert("Failed to create blogpost");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.dataset.postId) {
    const id = event.target.dataset.postId;

    
    if (!confirm("Do you want to delete this post?")) return;
    

    const response = await fetch(`/api/post/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile/user");
    } else {
      alert("Failed to delete blogpost");
    }
  }
};

newPostForm?.addEventListener("submit", newPostHandler);
editPostForm?.addEventListener("submit", editPostHandler)

if(deleteButtons?.length){
deleteButtons.forEach((deleteButton) => {
  deleteButton.addEventListener("click", delButtonHandler);
})};

