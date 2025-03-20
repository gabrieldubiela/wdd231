document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById("menu-button");
    const navMenu = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');

    button.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        button.textContent = button.textContent === 'Close' ? 'Menu' : 'Close';
    });
});