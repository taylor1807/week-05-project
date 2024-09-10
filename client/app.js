console.log("test");

const messageBoardContainer = document.getElementById("messageBoardContainer");
const form = document.getElementById("messageForm");

// get messages from server
async function getMessages() {
  const response = await fetch("http://localhost:8080/messages");
  const data = await response.json();
  console.log(data);
  messageBoardContainer.innerHTML = "";
  data.forEach(function (message) {
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("messageContainer");
    const messageInsert = document.createElement("p");
    messageInsert.textContent = `${message.name} wrote: ${message.message}`;
    const likeCount = document.createElement("span");
    likeCount.textContent = `Likes: ${message.likes || 0}`;
    const likeButton = document.createElement("button");
    likeButton.classList.add("likeBtn");
    likeButton.textContent = "Like";
    likeButton.addEventListener("click", function () {
      handleLike(message.id);
    }); //append elements to the dom
    messageContainer.appendChild(messageInsert);
    messageContainer.appendChild(likeCount);
    messageContainer.appendChild(likeButton);
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
form.addEventListener("submit", handlePostMessage);
getMessages();
