const memberships = [
  {
    id: "np",
    title: "NP Membership",
    monthly: 0,
    benefits: [
      "Access to free events",
      "Discounts for non-profit organizations"
    ]
  },
  {
    id: "bronze",
    title: "Bronze Membership",
    monthly: 100,
    benefits: [
      "Access to free events",
      "Discounts for non-profit organizations",
      "Basic training",
      "Listing on the member section of the website"
    ]
  },
  {
    id: "silver",
    title: "Silver Membership",
    monthly: 200,
    benefits: [
      "Access to free events",
      "Discounts for non-profit organizations",
      "Basic training",
      "Listing on the member section of the website",
      "Featured advertisement positions",
      "Additional discounts on premium events"
    ]
  },
  {
    id: "gold",
    title: "Gold Membership",
    monthly: 300,
    benefits: [
      "Access to free events",
      "Discounts for non-profit organizations",
      "Basic training",
      "Listing on the member section of the website",
      "Featured advertisement positions",
      "Additional discounts on premium events",
      "Exclusive invitations to VIP events",
      "Personalized consulting"
    ]
  }
];

const cardsContainer = document.getElementById("membership-cards");
const modalsContainer = document.getElementById("membership-modals");

memberships.forEach((level) => {
  const card = document.createElement("div");
  card.className = "membership-card";
  card.innerHTML = `
    <h3>${level.title}</h3>
    <p><strong>$${level.monthly}/month</strong></p>
    <a href="#" data-modal="${level.id}-modal">View Benefits</a>
  `;
  cardsContainer.appendChild(card);

  const modal = document.createElement("dialog");
  modal.id = `${level.id}-modal`;
  modal.innerHTML = `
    <h2>${level.title}</h2>
    <p><strong>Monthly Fee:</strong> $${level.monthly}</p>
    <ul>
      ${level.benefits.map(benefit => `<li>${benefit}</li>`).join("")}
    </ul>
    <button class="close-btn">Close</button>
  `;
  modalsContainer.appendChild(modal);
});

cardsContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "A") {
    e.preventDefault();
    const modalId = e.target.dataset.modal;
    const modal = document.getElementById(modalId);
    if (modal) modal.showModal();
  }
});

modalsContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("close-btn")) {
    const dialog = e.target.closest("dialog");
    if (dialog) dialog.close();
  }
});
