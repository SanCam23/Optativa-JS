document.addEventListener("DOMContentLoaded", function () {
    const selectorEstilo = document.getElementById("selector-estilo");
    const linkEstilo = document.getElementById("estilo-alternativo");

    // 1. Cargar estilo guardado al iniciar (si existe cookie)
    const estiloGuardado = getCookie("estilo_seleccionado");
    if (estiloGuardado) {
        aplicarEstilo(estiloGuardado);
        // Actualizar el selector visualmente
        if (selectorEstilo) {
            selectorEstilo.value = estiloGuardado;
        }
    }

    // 2. Escuchar cambios en el selector
    if (selectorEstilo) {
        selectorEstilo.addEventListener("change", function () {
            const nuevoEstilo = this.value;
            aplicarEstilo(nuevoEstilo);

            // Requisito PDF: Persistencia de 45 días SOLO si aceptó cookies
            const consentimiento = getCookie("cookie_consent");
            if (consentimiento === "true") {
                setCookie("estilo_seleccionado", nuevoEstilo, 45);
            }
        });
    }

    function aplicarEstilo(nombreEstilo) {
        // Mapeo de valores a archivos CSS
        let archivoCss = "";

        switch (nombreEstilo) {
            case "alto_contraste":
                archivoCss = "css/contraste_alto.css";
                break;
            case "letra_grande":
                archivoCss = "css/letra_grande.css";
                break;
            case "contraste_letra":
                archivoCss = "css/contraste_letra.css";
                break;
            case "normal":
            default:
                archivoCss = ""; // Sin archivo extra, vuelve al original
                break;
        }

        // Cambiamos el href del link dinámico
        if (linkEstilo) {
            linkEstilo.href = archivoCss;
        }
    }
});