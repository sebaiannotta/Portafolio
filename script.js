const menuButton = document.getElementById("menu-button");
const menu = document.getElementById("menu");

// Alternar el estado del menú al hacer clic
menuButton.addEventListener("click", () => {
    menuButton.classList.toggle("open");
    menu.classList.toggle("open");
});