const newCommentHandler = async (event) => {
    event.preventDefault();
  
    const content = document.querySelector("#comment-input").value.trim();
  
    if (content) {
      const response = await fetch(`/api/comment`, {
        method: "POST",
        body: JSON.stringify({ comment: content,  post_id: event.target.dataset.post-id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        return;
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
        document.location.replace("/feed/:id");
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
        document.location.replace("/feed");
      } else {
        alert("Failed to delete blogpost");
      }
    }
  };
  
  document.querySelector("#comment-post").addEventListener("submit", newCommentHandler);
  
  document.querySelectorAll("").forEach((deleteButton) => {
    deleteButton.addEventListener("click", delButtonHandler);
  });
  