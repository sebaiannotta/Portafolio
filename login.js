// Referencias a los elementos del DOM
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

// Usuario y contraseña válidos (ejemplo)
const validUsername = "seba";
const validPassword = "1234";

// Manejar el evento de envío del formulario
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evitar el envío por defecto del formulario

    // Obtener los valores de usuario y contraseña
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validar usuario y contraseña
    if (username === validUsername && password === validPassword) {
        alert("¡Inicio de sesión exitoso!");
        window.location.href = "index.html"; 
    } else {
        // Mostrar mensaje de error
        errorMessage.classList.remove('hidden');
        errorMessage.textContent = "Usuario o contraseña incorrectos.";
    }
});
