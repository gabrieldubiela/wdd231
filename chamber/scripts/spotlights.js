const membersData = 'data/members.json';
const container = document.querySelector('.container');

async function getMembersData() {
    const response = await fetch(membersData);
    const data = await response.json();
    console.table(data.members);
    DisplayMembers(data.members);
  }

  function getRandomElements(array, numElements) {
    if (!array || array.length === 0 || numElements <= 0) {
      return [];
    }
  
    const count = Math.min(numElements, array.length);
    const shuffled = array.slice();
  
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
  
    return shuffled.slice(0, count);
  }

  getMembersData();

  const DisplayMembers = (members) => {
    const filterMembers = members.filter(member => member.membership === 'gold' || member.membership === 'silver');
    const randomMembers = getRandomElements(filterMembers, 3);
    randomMembers.forEach((member) => {
      let card = document.createElement('div');
      let name = document.createElement('h4');
      let logo = document.createElement('img');
      let address = document.createElement('p');
      let phone = document.createElement('p');
      let website = document.createElement('a');
      let membership = document.createElement('p');
  
      name.textContent = member.name;
      address.textContent = member.address;
      phone.textContent = member.phone;
      website.textContent = member.website;
      membership.textContent = member.membership;

      website.setAttribute('href', member.website);
      logo.setAttribute('src', `images/${member.image}`);	
      logo.setAttribute('alt', member.name); 
      logo.setAttribute('loading', 'lazy');
      card.classList.add('card');
  
      card.appendChild(name);
      card.appendChild(logo); 
      card.appendChild(address);
      card.appendChild(phone);
      card.appendChild(website);
      card.appendChild(membership);
  
      container.appendChild(card);
    }); 
  }
