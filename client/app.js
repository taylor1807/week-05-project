console.log("test");

//! array of urls/alts for gallerylocations:

let galleryLocations = [
  {
    url: "Assets/AOchildish.webp",
    srcset: "Assets/AOchildish-390.webp",
    alt: "This is an image of the AO arena in Manchester, where Childish Gambino will be playing",
  },

  {
    url: "Assets/cooplivejj.webp",
    srcset: "Assets/cooplivejj-390.webp",
    alt: "This is an image of the coop live arena in Manchester, where Janet Jackson will be playing",
  },
  {
    url: "Assets/wembleydua.webp",
    srcset: "Assets/wembleydua-390.webp",
    alt: "This is an image of the Wembley Stadium in London, where Dua Lipa will be playing",
  },

  {
    url: "Assets/o2londonlinkinpark.webp",
    srcset: "Assets/o2londonlinkinpark-390.webp",
    alt: "This is an image of the O2 area in London, where Linkin Park will be playing",
  },
];

//!function for gallerylocations images:
let currentIndex = 0;

const thumbnailCont = document.getElementById("thumbnailCont")

function addThumbnails() {
  galleryLocations.forEach((image) => {
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


//!functions for next and back buttons for gallerylocations images:
const back = document.getElementById("back");
const next = document.getElementById("next");

function nextImage() {
  if (currentIndex < images.length - 1) {
    currentIndex += 1;
  } else {
    currentIndex = 0;
  }
  addFullSizeImage(images[currentIndex]);
}

function backImage() {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = images.length - 1;
  }
}

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    previousImage();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") {
    nextImage();
  }
});

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
  const menu = document.getElementById("nav-links");
  menu.classList.toggle("active");
}

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
    const eventDate = document.createElement("p");
    eventDate.textContent = `Date: ${band.event_date}`;
    const eventTime = document.createElement("p");
    eventTime.textContent = `Time: ${band.event_time}`;
    const websiteLink = document.createElement("a");
    websiteLink.href = band.website_url;
    websiteLink.target = "_blank";
    websiteLink.textContent = "Visit Website";

    bandDiv.appendChild(bandName);
    bandDiv.appendChild(location);
    bandDiv.appendChild(venueName);
    bandDiv.appendChild(eventDate);
    bandDiv.appendChild(eventTime);
    bandDiv.appendChild(websiteLink);

    bandContainer.appendChild(bandDiv);
  });
}
window.onload = fetchBandInfo;
