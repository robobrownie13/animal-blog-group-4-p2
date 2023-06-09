const newCommentForm = document.querySelector(".comment-form");
const newCommentHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector("#comment-input").value.trim();

  if (content) {
    const response = await fetch(`/api/comment`, {
      method: "POST",
      body: JSON.stringify({
        comment: content,
        post_id: event.target.dataset.postId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to create blogpost");
    }
  }
};

newCommentForm.addEventListener("submit", newCommentHandler);
