const memberships = [
  {
    id: "np",
    title: "Non-Profit Membership",
    monthly: "Free",
    benefits: [
      "Access to free events",
      "Discounts for non-profit organizations"
    ]
  },
  {
    id: "bronze",
    title: "Bronze Membership",
    monthly: "$ 100",
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
    monthly: "$ 200",
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
    monthly: "$ 300",
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

const membershipBenefits = document.getElementById("membershipBenefits");

function displayMembershipBenefits(membership) {
  membershipBenefits.innerHTML = '';
  membershipBenefits.innerHTML = `
    <button id="closeModal">❌</button>
    <h3>${membership.title}</h3>
    <p><strong>Monthly Contribution</strong>: ${membership.monthly}</p>
    <p>${membership.benefits}</p>
  `;
  membershipBenefits.showModal();

  closeModal.addEventListener("click", () => {
    membershipBenefits.close();
  });
}

const goldMembership = document.getElementById("gold");
const silverMembership = document.getElementById("silver");
const bronzeMembership = document.getElementById("bronze");
const npMembership = document.getElementById("np");

goldMembership.addEventListener("click", () => {
  displayMembershipBenefits(memberships[3]);
});
silverMembership.addEventListener("click", () => {
  displayMembershipBenefits(memberships[2]);
});
bronzeMembership.addEventListener("click", () => {
  displayMembershipBenefits(memberships[1]);
});
npMembership.addEventListener("click", () => {
  displayMembershipBenefits(memberships[0]);
});

const timestampInput = document.getElementById("timestamp");

if (timestampInput) {
    const now = new Date().toISOString();
    timestampInput.value = now;
}

const form = document.querySelector("form");
form.addEventListener("submit", function () {
    if (timestampInput) {
        timestampInput.value = new Date().toISOString();
    }
});
