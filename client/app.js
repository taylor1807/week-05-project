console.log("test");

// Array of gallery locations
let galleryLocations = [
  // Your gallery items here
];


function formatDateTime(dateString, timeString) {
  const dateTime = new Date(dateString + 'T' + timeString);
  const formattedDate = dateTime.toLocaleDateString();
  const formattedTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return { formattedDate, formattedTime };
}

function addThumbnails() {
  const thumbnailBar = document.getElementById("thumbnailBar");
  if (!thumbnailBar) {
    console.error("Thumbnail bar element not found");
    return;
  }
  galleryLocations.forEach((image) => {

//!function for gallerylocations images:
let currentIndex = 0;

const thumbnailCont = document.getElementById("thumbnailCont")

function addThumbnails() {
  gallerylocations.forEach((image) => {

    let imageElement = document.createElement("img");
    imageElement.src = image.url;
    imageElement.alt = image.alt;
    imageElement.srcset = image.srcset;
    imageElement.addEventListener("click", function () {
      console.log(`Clicked on ${image.alt}`);
    });

    thumbnailCont.appendChild(imageElement);
  }
)}
addThumbnails()


let currentIndex = 0;
const images = galleryLocations;

function nextImage() {
  if (currentIndex < images.length - 1) {
    currentIndex += 1;
  } else {
    currentIndex = 0;
  }
    currentIndex = 0;
  }
  addFullSizeImage(images[currentIndex]);
}

function backImage() {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = images.length - 1;
    currentIndex = images.length - 1;
  }
  addFullSizeImage(images[currentIndex]);
}

document.getElementById("back")?.addEventListener("click", backImage);
document.getElementById("next")?.addEventListener("click", nextImage);

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    backImage();
  } else if (event.key === "ArrowRight") {
    nextImage();
  }
});

function addFullSizeImage(image) {
  // Implement adding full-size image functionality here
}

const messageBoardContainer = document.getElementById("messageBoardContainer");
const form = document.getElementById("messageForm");

async function getMessages() {
  try {
    const response = await fetch("http://localhost:8080/messages");
    if (!response.ok) throw new Error('Network response was not ok');
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

      const dislikeCount = document.createElement("span");
      dislikeCount.textContent = `Dislikes: ${message.dislikes || 0}`;

      const likeButton = document.createElement("button");
      likeButton.classList.add("likeBtn");
      likeButton.textContent = "Like";
      likeButton.addEventListener("click", function () {
        handleLike(message.id);
      });

      const dislikeButton = document.createElement("button");
      dislikeButton.classList.add("dislikeBtn");
      dislikeButton.textContent = "Dislike";
      dislikeButton.addEventListener("click", function () {
        handleDislike(message.id);
      });

      messageContainer.appendChild(messageInsert);
      messageContainer.appendChild(likeCount);
      messageContainer.appendChild(likeButton);
      messageContainer.appendChild(dislikeCount);
      messageContainer.appendChild(dislikeButton);
      messageBoardContainer.appendChild(messageContainer);
    });
  } catch (error) {
    console.error('Failed to fetch messages:', error);
  }
}

getMessages();

async function handlePostMessage(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  try {
    await fetch("http://localhost:8080/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    form.reset();
    getMessages();
  } catch (error) {
    console.error('Failed to post message:', error);
  }
}

async function handleLike(messageId) {
  try {
    await fetch(`http://localhost:8080/messages/${messageId}/like`, {
      method: "POST",
    });
    getMessages();
  } catch (error) {
    console.error('Failed to like message:', error);
  }
}

async function handleDislike(messageId) {
  try {
    await fetch(`http://localhost:8080/messages/${messageId}/dislike`, {
      method: "POST",
    });
    getMessages();
  } catch (error) {
    console.error('Failed to dislike message:', error);
  }
}

form?.addEventListener("submit", handlePostMessage);

function toggleMenu() {
  const menu = document.getElementById("nav-links");
  if (menu) {
    menu.classList.toggle("active");
  } else {
    console.error("Menu element not found");
  }
}

// Added date and time formatting functions - COMMIT
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}


function formatTime(timeString) {
  const time = new Date(`1970-01-01T${timeString}`);
  return time.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

// Added displayBandInfo function with formatted date/time - COMMIT
async function fetchBandInfo() {
  const response = await fetch("http://localhost:8080/band_info");
  const data = await response.json();
  displayBandInfo(data);
}

function displayBandInfo(bands) {
  const bandContainer = document.getElementById("band-info");
  bandContainer.innerHTML = "";

  bands.forEach((band) => {
    const bandDiv = document.createElement("div");
    bandDiv.classList.add("bandDiv");

    const bandName = document.createElement("h2");
    bandName.textContent = band.band_name;

    const location = document.createElement("p");
    location.textContent = `Location: ${band.location}`;

    const venueName = document.createElement("p");
    venueName.textContent = `Venue: ${band.venue_name}`;

    // Format Date and Time
    const eventDate = formatDate(band.event_date);
    const eventTime = formatTime(band.event_time);

    const eventDateElem = document.createElement("p");
    eventDateElem.textContent = `Date: ${eventDate}`;

    const eventTimeElem = document.createElement("p");
    eventTimeElem.textContent = `Time: ${eventTime}`;

    const websiteLink = document.createElement("a");
    websiteLink.href = band.website_url;
    websiteLink.target = "_blank";
    websiteLink.textContent = "Visit Website";

    bandDiv.appendChild(bandName);
    bandDiv.appendChild(location);
    bandDiv.appendChild(venueName);
    bandDiv.appendChild(eventDateElem);
    bandDiv.appendChild(eventTimeElem);
    bandDiv.appendChild(websiteLink);


    bandContainer.appendChild(bandDiv);
  });
}

window.onload = fetchBandInfo;
