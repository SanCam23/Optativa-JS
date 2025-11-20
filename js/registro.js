document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registro-form");
    const errorDialog = document.getElementById("error-dialog");
    const listaErrores = document.getElementById("lista-errores");
    const cerrarError = document.getElementById("cerrar-error");

    // Cerrar modal
    cerrarError.addEventListener("click", function () {
        errorDialog.close();
    });

    // Validación del formulario
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Obtener valores de los campos
        const usuario = document.getElementById("usuario").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirm_password").value.trim();
        const email = document.getElementById("email").value.trim();
        const sexo = document.getElementById("sexo").value;
        const fechaNacimiento = document.getElementById("fecha_nacimiento").value;
        const ciudad = document.getElementById("ciudad").value.trim();
        const pais = document.getElementById("pais").value.trim();

        const errores = []; // Array para almacenar errores

        // Validación de usuario
        const usuarioRegex = /^[A-Za-z][A-Za-z0-9]{2,14}$/;
        if (!usuarioRegex.test(usuario)) {
            errores.push("El nombre de usuario debe tener entre 3 y 15 caracteres, comenzar con una letra y contener solo letras y números.");
        }

        // Validación de contraseña
        const passwordRegex = /^[A-Za-z0-9_-]{6,15}$/;
        if (!passwordRegex.test(password)) {
            errores.push("La contraseña debe tener entre 6 y 15 caracteres y solo puede contener letras, números, guion y guion bajo.");
        } else if (!(/[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password))) {
            errores.push("La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número.");
        }

        // Confirmación de contraseña
        if (password !== confirmPassword) {
            errores.push("Las contraseñas no coinciden.");
        }

        // Validación de email
        if (!validarEmail(email)) {
            errores.push("Correo electrónico no válido.");
        }

        // Validación de sexo
        if (sexo === "") {
            errores.push("Debes seleccionar un sexo.");
        }

        // Validación de fecha de nacimiento
        if (!validarFechaNacimiento(fechaNacimiento)) {
            errores.push("Debes ser mayor de 18 años.");
        }

        // Validación de ciudad y país
        if (ciudad === "") {
            errores.push("Debes ingresar una ciudad.");
        }

        if (pais === "") {
            errores.push("Debes ingresar un país.");
        }

        // Mostrar errores o redirigir
        if (errores.length > 0) {
            mostrarErrores(errores);
        } else {
            window.location.href = "index_identificado.html";
        }
    });

    // Mostrar errores en modal
    function mostrarErrores(errores) {
        listaErrores.innerHTML = "";
        errores.forEach(error => {
            const li = document.createElement("li");
            li.textContent = error;
            listaErrores.appendChild(li);
        });
        errorDialog.showModal();
    }

    // Función para validar email
    function validarEmail(email) {
        if (email.length === 0 || email.length > 254) return false;

        // Dividir en local y dominio
        const partes = email.split("@");
        if (partes.length !== 2) return false;

        const local = partes[0]; // Parte local
        const dominio = partes[1]; // Parte dominio

        if (local.length < 1 || local.length > 64) return false;
        if (dominio.length < 1 || dominio.length > 255) return false;

        // Validar parte local
        const localRegex = /^[A-Za-z0-9!#$%&'*+\-\/=?^_`{|}~]+(\.[A-Za-z0-9!#$%&'*+\-\/=?^_`{|}~]+)*$/;
        if (!localRegex.test(local)) return false;
        if (local.startsWith('.') || local.endsWith('.') || local.includes('..')) return false;

        // Validar parte dominio
        const subdominios = dominio.split(".");
        for (let sub of subdominios) {
            if (sub.length < 1 || sub.length > 63) return false;
            if (!/^[A-Za-z0-9-]+$/.test(sub)) return false;
            if (sub.startsWith("-") || sub.endsWith("-")) return false;
        }

        return true;
    }

    // Función para validar fecha de nacimiento y edad
    function validarFechaNacimiento(fechaStr) {
        const partes = fechaStr.split("/");
        if (partes.length !== 3) return false;

        const dia = parseInt(partes[0], 10);
        const mes = parseInt(partes[1], 10) - 1;
        const anio = parseInt(partes[2], 10);

        const fecha = new Date(anio, mes, dia);
        if (fecha.getFullYear() !== anio || fecha.getMonth() !== mes || fecha.getDate() !== dia) {
            return false;
        }

        const hoy = new Date();
        let edad = hoy.getFullYear() - anio;
        if (hoy.getMonth() < mes || (hoy.getMonth() === mes && hoy.getDate() < dia)) {
            edad--;
        }

        return edad >= 18;
    }
});