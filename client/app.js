console.log("test");

const messageBoardContainer = document.getElementById("messageBoardContainer");
const form = document.getElementById("messageForm");

// get messages from server
async function getMessages() {
  const response = await fetch("http://localhost:8080/messages");
  const data = await response.json();
  console.log(data);
  messageBoardContainer.innerHTML = "";
  //create elements in the message container
  data.forEach(function (message) {
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("messageContainer");

    const messageInsert = document.createElement("p");
    messageInsert.textContent = `${message.name} wrote: ${message.message}`;

    const likeCount = document.createElement("span");
    likeCount.textContent = `Likes: ${message.likes || 0}`;

    const dislikeCount = document.createElement("span");
    dislikeCount.textContent = `Dislikes: ${message.dislikes || 0}`;
    //adding a like button
    const likeButton = document.createElement("button");
    likeButton.classList.add("likeBtn");
    likeButton.textContent = "Like";
    likeButton.addEventListener("click", function () {
      handleLike(message.id);
    });
    //adding a dislike button
    const dislikeButton = document.createElement("button");
    dislikeButton.classList.add("dislikeBtn");
    dislikeButton.textContent = "Dislike";
    dislikeButton.addEventListener("click", function () {
      handleDislike(message.id);
    });
    //append elements to the dom
    messageContainer.appendChild(messageInsert);
    messageContainer.appendChild(likeCount);
    messageContainer.appendChild(likeButton);
    messageContainer.appendChild(dislikeCount);
    messageContainer.appendChild(dislikeButton);
    messageBoardContainer.appendChild(messageContainer);
  });
}

getMessages();

async function handlePostMessage(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  await fetch("http://localhost:8080/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  form.reset();
  getMessages();
}
async function handleLike(messageId) {
  const response = await fetch(
    `http://localhost:8080/messages/${messageId}/like`,
    {
      method: "POST",
    }
  );
  getMessages();
}
async function handleDislike(messageId) {
  const response = await fetch(
    `http://localhost:8080/messages/${messageId}/like`,
    {
      method: "POST",
    }
  );
}
form.addEventListener("submit", handlePostMessage);
getMessages();

//add a burger menu
function toggleMenu() {
  var menu = document.getElementById("hamburger-menu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}
