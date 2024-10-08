// Gallery Locations
const galleryLocations = [
  {
    url: "Assets/AOchildish.webp",
    srcset:
      "Assets/AOchildish-390.webp 390w, Assets/AOchildish-760.webp 760w, Assets/AOchildish-1020.webp 1020w, Assets/AOchildish-1440.webp 1440w",
    alt: "This is an image of the AO arena in Manchester, where Childish Gambino will be playing",
  },
  {
    url: "Assets/cooplivejj.webp",
    srcset:
      "Assets/cooplivejj-390.webp 390w, Assets/cooplivejj-760.webp 760w, Assets/cooplivejj-1020.webp 1020w, Assets/cooplivejj-1440.webp 1440w",
    alt: "This is an image of the coop live arena in Manchester, where Janet Jackson will be playing",
  },
  {
    url: "Assets/wembleydua.webp",
    srcset:
      "Assets/wembleydua-390.webp 390w, Assets/wembleydua-760.webp 760w, Assets/wembleydua-1020.webp 1020w, Assets/wembleydua1440.webp 1440w",
    alt: "This is an image of the Wembley Stadium in London, where Dua Lipa will be playing",
  },
  {
    url: "Assets/o2londonlinkinpark.webp",
    srcset:
      "Assets/o2londonlinkinpark-390.webp 390w, Assets/o2londonlinkinpark-760.webp 760w, Assets/o2londonlinkinpark-1020.webp 1020w, Assets/o2londonlinkinpark-1440.webp 1440w",
    alt: "This is an image of the O2 arena in London, where Linkin Park will be playing",
  },
];

let currentIndex = 0;
const mainImage = document.getElementById("mainImage");
const thumbnailCont = document.getElementById("thumbnailCont");

function addFullSizeImage(image) {
  mainImage.src = image.url;
  mainImage.srcset = image.srcset;
  mainImage.alt = image.alt;
}

function nextImage() {
  currentIndex = (currentIndex + 1) % galleryLocations.length;
  addFullSizeImage(galleryLocations[currentIndex]);
}

function backImage() {
  currentIndex =
    (currentIndex - 1 + galleryLocations.length) % galleryLocations.length;
  addFullSizeImage(galleryLocations[currentIndex]);
}

document.getElementById("back").addEventListener("click", backImage);
document.getElementById("next").addEventListener("click", nextImage);

addFullSizeImage(galleryLocations[currentIndex]);
function addThumbnails() {
  galleryLocations.forEach((image, index) => {
    let imageElement = document.createElement("img");
    imageElement.src = image.url;
    imageElement.alt = image.alt;
    imageElement.addEventListener("click", function () {
      currentIndex = index;
      addFullSizeImage(galleryLocations[currentIndex]);
    });
    thumbnailCont.appendChild(imageElement);
  });
}

addThumbnails();

const messageBoardContainer = document.getElementById("messageBoardContainer");
const form = document.getElementById("messageForm");

async function getMessages() {
  {
    const response = await fetch(
      "https://week-05-project.onrender.com/messages"
    );
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    // sort the data by the id so earlier id is first
    // if you want to swap order sub b from a
    console.log(data.sort((a, b) => a.id - b.id));
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
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("deleteBtn");
      deleteButton.textContent = "x";
      deleteButton.addEventListener("click", function () {
        handleDelete(message.id);
      });

      messageContainer.appendChild(messageInsert);
      messageContainer.appendChild(likeCount);
      messageContainer.appendChild(likeButton);
      messageContainer.appendChild(dislikeCount);
      messageContainer.appendChild(dislikeButton);
      messageContainer.appendChild(deleteButton);
      messageBoardContainer.appendChild(messageContainer);
    });
  }
}

getMessages();

async function handlePostMessage(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  {
    await fetch("https://week-05-project.onrender.com/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    form.reset();
    getMessages();
  }
}

async function handleLike(messageId) {
  {
    await fetch(
      `https://week-05-project.onrender.com/messages/${messageId}/like`,
      {
        method: "POST",
      }
    );
    getMessages();
  }
}

async function handleDislike(messageId) {
  {
    await fetch(
      `https://week-05-project.onrender.com/messages/${messageId}/dislike`,
      {
        method: "POST",
      }
    );
    getMessages();
  }
}
async function handleDelete(messageId) {
  const response = await fetch(
    `https://week-05-project.onrender.com/messages/${messageId}`,
    {
      method: "DELETE",
    }
  );
  if (response.ok) {
    getMessages();
  }
}
form.addEventListener("submit", handlePostMessage);

//

const burger = document.getElementById("burger");
const menu = document.getElementById("nav-links");

// Add event listener to the burger icon
burger.addEventListener("click", function () {
  menu.classList.toggle("active");
});

// Added date formatting functions - COMMIT
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
//adding elements from db2 to the dom
async function fetchBandInfo() {
  const response = await fetch(
    "https://week-05-project.onrender.com/band_info"
  );
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
    const formattedEventDate = formatDate(band.event_date); // Format the event date using the formatDate function for UK format
    const eventDate = document.createElement("p");
    eventDate.textContent = `Date: ${formattedEventDate}`; // Added this
    const eventTime = document.createElement("p");
    eventTime.textContent = `Time: ${band.event_time}`;
    const websiteLink = document.createElement("a");
    websiteLink.href = band.website_url;
    websiteLink.target = "_blank";
    websiteLink.textContent = "Click here for more info and Tickets";

    bandDiv.appendChild(bandName); //Added to display band name
    bandDiv.appendChild(location); //Added to display event location
    bandDiv.appendChild(venueName); //Added to display venue name
    bandDiv.appendChild(eventDate);
    // bandDiv.appendChild(eventTime);
    bandDiv.appendChild(websiteLink);

    bandContainer.appendChild(bandDiv);
  });
}

fetchBandInfo();
