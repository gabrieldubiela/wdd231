const membersData = 'data/members.json';

const container = document.querySelector('.container');
const gridButton = document.querySelector('#grid-button');
const listButton = document.querySelector('#list-button');

gridButton.addEventListener('click', () => {
  gridDisplayMembers(data.members);
});

listButton.addEventListener('click', () => {
  listDisplayMembers(data.members);
});

async function getMembersData() {
    const response = await fetch(membersData);
    const data = await response.json();
    console.table(data.members);
    gridDisplayMembers(data.members);
  }
  
  getMembersData();

  const gridDisplayMembers = (members) => {
    container.innerHTML = "";
    members.forEach((member) => {
      let card = document.createElement('div');
      let logo = document.createElement('img');
      let address = document.createElement('p');
      let phone = document.createElement('p');
      let website = document.createElement('a');
  
      address.textContent = member.address;
      phone.textContent = member.phone;
      website.textContent = member.website;

      website.setAttribute('href', member.website);
      logo.setAttribute('src', `images/${member.image}`);	
      logo.setAttribute('alt', member.name); 
      logo.setAttribute('loading', 'lazy');
      card.classList.add('card');
  
      card.appendChild(logo); 
      card.appendChild(address);
      card.appendChild(phone);
      card.appendChild(website);
  
      container.appendChild(card);
    }); 
  }

  const listDisplayMembers = (members) => {
    container.innerHTML = "";
    members.forEach((member) => {
      
      let name = document.createElement('name');
      let address = document.createElement('p');
      let phone = document.createElement('p');
      let website = document.createElement('a');
  
      name.textContent = member.name;
      address.textContent = member.address;
      phone.textContent = member.phone;
      website.textContent = member.website;

      website.setAttribute('href', member.website);
      name.setAttribute('src', `images/${member.image}`);	
      name.setAttribute('alt', member.name); 
      name.setAttribute('loading', 'lazy');
      card.classList.add('card');
  
      card.appendChild(name); 
      card.appendChild(address);
      card.appendChild(phone);
      card.appendChild(website);
  
      container.appendChild(card);
    }); 
  }