document.addEventListener("DOMContentLoaded", () => {
    fetch('data/places.json')
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector(".discover-grid");

            data.places.forEach(place => {
                const card = document.createElement("section");
                card.classList.add("card");

                card.innerHTML = `
                    <h2>${place.name}</h2>
                    <figure>
                        <img src="${place.image}" alt="${place.name}" width="300" height="200">
                    </figure>
                    <address>${place.address}</address>
                    <p>${place.description}</p>
                    <a href="${place.link}" target="_blank"><button>Learn More</button></a>
                `;

                container.appendChild(card);
            });
        });
});

document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("visitOverlay");
  const message = document.getElementById("visitMessage");
  const closeBtn = document.getElementById("closeOverlay");

  const lastVisit = localStorage.getItem("lastVisit");
  const now = Date.now();

  let displayMessage = "";

  if (!lastVisit) {
    displayMessage = "Welcome! Let us know if you have any questions.";
  } else {
    const diffTime = now - parseInt(lastVisit, 10);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 1) {
      displayMessage = "Back so soon! Awesome!";
    } else {
      displayMessage = `You last visited ${diffDays} day${diffDays > 1 ? 's' : ''} ago.`;
    }
  }

  message.textContent = displayMessage;
  overlay.classList.remove("hidden");

  setTimeout(() => {
    overlay.classList.add("hidden");
  }, 5000);

  closeBtn.addEventListener("click", () => {
    overlay.classList.add("hidden");
  });

  localStorage.setItem("lastVisit", now);
});