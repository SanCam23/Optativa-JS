/**
 * Funciones de utilidad para Cookies
 */

// Crear una cookie
// Requisito: Duración configurable (45 días para estilo, 90 para aviso)
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Leer una cookie
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

/**
 * Lógica del Aviso de Cookies
 * Requisito PDF: Aparecer la primera vez o cada 90 días.
 */
document.addEventListener("DOMContentLoaded", function () {
    const consentimiento = getCookie("cookie_consent");

    if (consentimiento === "") {
        mostrarBannerCookies();
    }
});

function mostrarBannerCookies() {
    // Creamos el banner dinámicamente usando el DOM
    const banner = document.createElement("div");
    banner.id = "cookie-banner";
    banner.style.cssText = "position: fixed; bottom: 0; left: 0; width: 100%; background-color: #333; color: white; padding: 20px; text-align: center; z-index: 10000; box-shadow: 0 -2px 10px rgba(0,0,0,0.2);";

    banner.innerHTML = `
        <p style="display: inline-block; margin-right: 20px;">
            Este sitio web utiliza cookies propias para mejorar la experiencia del usuario y recordar su estilo preferido. 
            <a href="politica_cookies.html" style="color: #4CAF50; text-decoration: underline;">Más información</a>.
        </p>
        <button id="btn-aceptar" style="padding: 8px 15px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; margin-right: 10px;">ACEPTAR</button>
        <button id="btn-rechazar" style="padding: 8px 15px; background-color: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">RECHAZAR</button>
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

    // Requisito PDF: Guardar decisión por 90 días
    const valor = aceptadas ? "true" : "false";
    setCookie("cookie_consent", valor, 90);

    // Si rechaza, borramos la preferencia de estilo si existía
    if (!aceptadas) {
        setCookie("estilo_seleccionado", "", -1); // Borrar cookie
    }

    // Requisito PDF: Mostrar mensaje temporal durante 5 segundos
    mostrarMensajeTemporal(aceptadas ? "Has aceptado las cookies. Guardaremos tu preferencia de estilo." : "Has rechazado las cookies. No se guardará tu estilo.");
}

function mostrarMensajeTemporal(texto) {
    const msg = document.createElement("div");
    msg.style.cssText = "position: fixed; top: 20px; right: 20px; background-color: #fff; color: #333; padding: 15px; border-left: 5px solid #1b9986; box-shadow: 0 2px 10px rgba(0,0,0,0.2); z-index: 10001; border-radius: 4px;";
    msg.textContent = texto;
    document.body.appendChild(msg);

    // Desaparece a los 5 segundos
    setTimeout(function () {
        msg.remove();
    }, 5000);
}