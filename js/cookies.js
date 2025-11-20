/* Funciones de utilidad para Cookies */

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/* Lógica del Aviso de Cookies */
document.addEventListener("DOMContentLoaded", function () {
    // Comprobar si ya existe consentimiento
    const consentimiento = getCookie("cookie_consent");

    if (consentimiento === "") {
        mostrarBannerCookies();
    }
});

function mostrarBannerCookies() {
    // Crear el banner dinámicamente
    const banner = document.createElement("div");
    banner.id = "cookie-banner"; // El CSS se aplica por este ID

    // HTML
    banner.innerHTML = `
        <p>
            Este sitio web utiliza cookies propias para mejorar la experiencia del usuario y recordar su estilo preferido. 
            <a href="politica_cookies.html">Más información</a>.
        </p>
        <button id="btn-aceptar" class="cookie-btn">ACEPTAR</button>
        <button id="btn-rechazar" class="cookie-btn">RECHAZAR</button>
    `;

    document.body.appendChild(banner);

    // Eventos de los botones
    document.getElementById("btn-aceptar").addEventListener("click", function () {
        aceptarCookies(true);
    });

    document.getElementById("btn-rechazar").addEventListener("click", function () {
        aceptarCookies(false);
    });
}

function aceptarCookies(aceptadas) {
    // Ocultar banner
    const banner = document.getElementById("cookie-banner");
    if (banner) banner.remove();

    // Guardar decisión (90 días)
    const valor = aceptadas ? "true" : "false";
    setCookie("cookie_consent", valor, 90);

    // Si rechaza, borramos preferencias de estilo
    if (!aceptadas) {
        setCookie("estilo_seleccionado", "", -1);
    }

    // Mostrar mensaje temporal
    mostrarMensajeTemporal(aceptadas ? "Has aceptado las cookies. Guardaremos tu preferencia de estilo." : "Has rechazado las cookies. No se guardará tu estilo.");
}

function mostrarMensajeTemporal(texto) {
    const msg = document.createElement("div");
    msg.className = "cookie-mensaje-temporal"; // Usamos clase CSS
    msg.textContent = texto;
    document.body.appendChild(msg);

    setTimeout(function () {
        msg.remove();
    }, 5000);
}