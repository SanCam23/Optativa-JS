document.addEventListener("DOMContentLoaded", function() {

    const loginPopup = document.getElementById("login-popup");
    loginPopup.style.display = "none";

    const loginBtns = document.querySelectorAll('a[href="index_identificado.html"]');

    // Abrir popup de login
    loginBtns.forEach(function(btn) {
        btn.addEventListener("click", function(event) {
            event.preventDefault();
            loginPopup.style.display = "block";
        });
    });

    // Manejo del formulario de login
    const errorDialog = document.getElementById("error-dialog");
    const errorMensaje = document.getElementById("error-mensaje");
    const cerrarError = document.getElementById("cerrar-error");

    cerrarError.addEventListener("click", function() {
        errorDialog.close();
    });

    const loginForm = document.getElementById("login");

    // Validación del formulario de login
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Evitar envío por defecto

        const usuario = document.getElementById("usuario").value.trim(); // Obtener valor del usuario
        const password = document.getElementById("password").value.trim(); // Obtener valor de la contraseña

        if (usuario === "" || password === "") {
            errorMensaje.textContent = "Por favor, completa ambos campos correctamente.";
            errorDialog.showModal();
            return;
        }

        window.location.href = "index_identificado.html";
    });

    window.addEventListener("click", function(event) {
        if (event.target === loginPopup) {
            loginPopup.style.display = "none";
        }
    });

});
