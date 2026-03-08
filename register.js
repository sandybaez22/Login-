const form = document.querySelector("form");
const message = document.querySelector("#message");

form.addEventListener("submit", function(e) {

    e.preventDefault();

    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#confirm-password").value;

    if (name === "" || email === "" || password === "" || confirmPassword === "") {
        message.style.color = "red";
        message.textContent = "Por favor, completa todos los campos.";
        return;
    }

    if (password !== confirmPassword) {
        message.style.color = "red";
        message.textContent = "Las contraseñas no coinciden.";
        return;
    }

    const user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem("user", JSON.stringify(user));

    message.style.color = "green";
    message.textContent = "Registro exitoso. Redirigiendo al login...";

    setTimeout(() => {
        window.location.href = "index.html";
    }, 2000);

});