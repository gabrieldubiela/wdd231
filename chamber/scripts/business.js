const membersData = 'data/members.json';

const container = document.querySelector('.container');
const gridButton = document.querySelector('#grid-button');
const listButton = document.querySelector('#list-button');
let switchButton = "grid"

gridButton.addEventListener('click', () => {
  switchButton = "grid"
  container.style.display = "grid";
  getMembersData();
});

listButton.addEventListener('click', () => {
  switchButton = "list"
  container.style.display = "flex";
  getMembersData();
});

async function getMembersData() {
    const response = await fetch(membersData);
    const data = await response.json();
    console.table(data.members);
    if(switchButton === "grid") gridDisplayMembers(data.members);
    else listDisplayMembers(data.members);
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
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tr = document.createElement('tr');
    let th1 = document.createElement('th');
    let th2 = document.createElement('th');
    let th3 = document.createElement('th');
    let th4 = document.createElement('th');
    let tbody = document.createElement('tbody');

    th1.textContent = 'Name';
    th2.textContent = 'Address';
    th3.textContent = 'Phone';
    th4.textContent = 'Website';

    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);
    thead.appendChild(tr);
    table.appendChild(thead);

    members.forEach((member) => {
      
      let tr = document.createElement('tr');
      let name = document.createElement('td');
      let address = document.createElement('td');
      let phone = document.createElement('td');
      let website = document.createElement('td');
      let websiteLink = document.createElement('a');
  
      name.textContent = member.name;
      address.textContent = member.address;
      phone.textContent = member.phone;
      websiteLink.textContent = member.website;
      websiteLink.setAttribute('href', member.website);

      website.appendChild(websiteLink);
      tr.appendChild(name); 
      tr.appendChild(address);
      tr.appendChild(phone);
      tr.appendChild(website);
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    container.appendChild(table);
  }