// Get elements
const popup = document.getElementById("pop-up2");
const postTemplate = document.getElementById("post-template");
const postsContainer = document.getElementById("posts-container");
const activitiesSection = document.querySelector(".activities-section");
const generalSection = document.getElementById("general-section");
const viewAllSection = document.getElementById("view-all-section");
const activitiesLink = document.getElementById("activities-link");
const generalLink = document.getElementById("general-link");
const viewAllLink = document.getElementById("view-all-link");
const askQuestion = document.querySelector(".ask-question");

// Show popup for creating a new question
function showPopUp() {
  popup.style.display = "flex";
  setTimeout(() => {
    popup.classList.add("show");
  }, 10);
}

// Hide popup for creating a new question
function hidePopUp() {
  popup.classList.remove("show");
  setTimeout(() => {
    popup.style.display = "none";
  }, 300);
}

// Add event listeners for showing/hiding the popup
document.getElementById("connect-now").addEventListener("click", showPopUp);
document.getElementById("close-btn").addEventListener("click", hidePopUp);

// Function to handle adding a new question post
function submitQuestion() {
  const questionInput = document.getElementById("question-input");
  const questionText = questionInput.value.trim();

  if (questionText) {
    const newPost = createPost(questionText, "", false);
    postsContainer.insertBefore(newPost, postsContainer.firstChild);

    questionInput.value = ""; // Clear input field
    hidePopUp(); // Hide the question popup
  } else {
    alert("Please enter a question.");
  }
}

// Create post element with question and reply functionality
function createPost(questionText, replyText, isReply = false) {
  const newPost = postTemplate.cloneNode(true);
  newPost.style.display = "block";
  newPost.querySelector(".post-question").textContent = questionText;

  if (replyText) {
    const postAnswerContainer = newPost.querySelector(".post-answer-container");
    const replyItem = createReplyItem(replyText);
    postAnswerContainer.appendChild(replyItem);
  }

  // Add event listeners to buttons in the new post
  newPost.querySelector(".reply-btn").addEventListener("click", function () {
    toggleReplySection(this);
  });
  newPost
    .querySelector(".submit-reply-btn")
    .addEventListener("click", function () {
      submitReply(this);
    });
  newPost.querySelector(".comment").addEventListener("click", function () {
    toggleCommentSection(this);
  });
  newPost
    .querySelector(".submit-comment-btn")
    .addEventListener("click", function () {
      submitComment(this);
    });
  newPost.querySelector(".delete-post").addEventListener("click", function () {
    deletePost(this);
  });

  return newPost;
}

// Function to create a reply element
function createReplyItem(replyText) {
  const replyItem = document.createElement("div");
  replyItem.className = "post-answer-item";
  replyItem.innerHTML = `
    <div class="post-answer-author">
      <img src="images/user-1.png" alt="user image" />
      <div class="reply-info">
        <h2>Ankush Kumar</h2>
        <p>${replyText}</p>
      </div>
    </div>
  `;
  return replyItem;
}

// Toggle visibility of reply sections
function toggleReplySection(button) {
  const postDiv = button.closest(".post");
  const replySection = postDiv.querySelector(".reply-section");
  replySection.style.display =
    replySection.style.display === "none" || replySection.style.display === ""
      ? "block"
      : "none";
}

// Handle submitting replies
function submitReply(button) {
  const postDiv = button.closest(".post");
  const replyTextarea = postDiv.querySelector(".reply-textarea");
  const replyText = replyTextarea.value.trim();

  if (replyText) {
    const existingReplies = postDiv.querySelectorAll(".post-answer-item");

    if (existingReplies.length === 0) {
      const postAnswerContainer = postDiv.querySelector(
        ".post-answer-container"
      );
      const replyItem = createReplyItem(replyText);
      postAnswerContainer.appendChild(replyItem);
    } else {
      const questionText = postDiv.querySelector(".post-question").textContent;
      const newPost = createPost(questionText, replyText, true);
      postsContainer.insertBefore(newPost, postsContainer.firstChild);
    }

    replyTextarea.value = ""; // Clear the textarea
    toggleReplySection(button); // Hide reply section after submission
  } else {
    alert("Please enter a reply.");
  }
}

// Submit a comment
function submitComment(button) {
  const postDiv = button.closest(".post");
  const commentBox = postDiv.querySelector(".comment-box");
  const textarea = commentBox.querySelector("textarea");
  const commentsList = postDiv.querySelector(".comments-list");

  const commentText = textarea.value.trim();
  if (commentText) {
    const newComment = document.createElement("div");
    newComment.className = "comment-item";
    newComment.textContent = commentText;
    commentsList.appendChild(newComment);

    textarea.value = ""; // Clear the textarea after submission
  } else {
    alert("Please enter a comment.");
  }
}

// Toggle visibility of comment sections
function toggleCommentSection(element) {
  const postDiv = element.closest(".post");
  const commentSection = postDiv.querySelector(".comment-section");
  commentSection.style.display =
    commentSection.style.display === "none" ||
    commentSection.style.display === ""
      ? "block"
      : "none";
}

// Function to delete the post when the cross icon is clicked
function deletePost(button) {
  const postDiv = button.closest(".post"); // Find the post div
  postDiv.remove(); // Remove the post from the DOM
}

// Add event listener for submitting question
document
  .getElementById("submit-question")
  .addEventListener("click", submitQuestion);

// Handle section toggling
activitiesLink.addEventListener("click", () => {
  generalSection.style.display = "none";
  viewAllSection.style.display = "none";
  askQuestion.style.display = "none";
  activitiesSection.style.display = "block";
  activitiesLink.classList.add("active");
  generalLink.classList.remove("active");
  viewAllLink.classList.remove("active");
});

generalLink.addEventListener("click", () => {
  activitiesSection.style.display = "none";
  viewAllSection.style.display = "none";
  askQuestion.style.display = "none";
  generalSection.style.display = "block";
  generalLink.classList.add("active");
  activitiesLink.classList.remove("active");
  viewAllLink.classList.remove("active");
});

viewAllLink.addEventListener("click", () => {
  generalSection.style.display = "none";
  activitiesSection.style.display = "none";
  viewAllSection.style.display = "block";
  askQuestion.style.display = "flex";
  viewAllLink.classList.add("active");
  generalLink.classList.remove("active");
  activitiesLink.classList.remove("active");
});

// Load user activities dynamically
function loadUserActivities() {
  // Clear previous activities
  activitiesSection.innerHTML = "";

  // Loop through posts and extract questions and replies
  const posts = document.querySelectorAll(".post");
  posts.forEach((post) => {
    const postQuestion =
      post.querySelector(".post-question")?.textContent || "";
    const replies = post.querySelectorAll(".post-answer-item");

    // Create a new activity block
    const activityDiv = document.createElement("div");
    activityDiv.className = "post";

    // Add question to the activity block
    const questionElement = document.createElement("p");
    questionElement.textContent = `Question: ${postQuestion}`;
    activityDiv.appendChild(questionElement);

    // Add replies to the activity block
    replies.forEach((reply) => {
      const replyElement = document.createElement("div");
      replyElement.className = "activity-reply";
      replyElement.innerHTML = reply.innerHTML;
      activityDiv.appendChild(replyElement);
    });

    // Append activity block to the activities section
    activitiesSection.appendChild(activityDiv);
  });
}

// Initialize activities section loading
document
  .getElementById("activities-link")
  .addEventListener("click", loadUserActivities);
