const hamburgerButton = document.getElementById('hamburguer-button');
const navElement = document.querySelector('header nav');
const headerElement = document.querySelector('header')

hamburgerButton.addEventListener('click', () => {
    navElement.classList.toggle('open');
    hamburgerButton.classList.toggle('open');
    headerElement.classList.toggle('open');
});