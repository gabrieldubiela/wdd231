const memberships = [
  {
    id: "np",
    title: "Non-Profit Membership",
    monthly: 0,
    benefits: [
      "Access to free events",
      "Discounts for non-profit organizations"
    ]
  },
  {
    id: "bronze",
    title: "Bronze Membership",
    monthly: 10,
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
    monthly: 20,
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
    monthly: 30,
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
  const benefitsList = level.benefits.map(benefit => `<li>${benefit}</li>`).join("");
  modal.innerHTML = `
    <div class="modal-content">
      <h2>${level.title}</h2>
      <p><strong>Monthly Fee:</strong> $${level.monthly}</p>
      <ul>${benefitsList}</ul>
      <button class="close-btn">Close</button>
    </div>
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
