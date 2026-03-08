const form = document.querySelector("form");
const message = document.querySelector("#login-message");

form.addEventListener("submit", function(e) {

    e.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    if (email === "" || password === "") {
        message.style.color = "red";
        message.textContent = "Completa todos los campos.";
        return;
    }

    message.innerHTML = "Iniciando sesión...";

    setTimeout(() => {

        const user = JSON.parse(localStorage.getItem("user"));

        if (user && user.email === email && user.password === password) {
            message.style.color = "green";
            message.textContent = "Inicio de sesión exitoso";
            window.location.href = "cero.html";
        } else {
            message.style.color = "red";
            message.textContent = "Email o contraseña incorrectos";
        }

    }, 1500);

});