document.addEventListener('DOMContentLoaded', () => {
    const selectOrden = document.getElementById('ordenarPor');
    const contenedor = document.getElementById('resultados');

    // 1. Seleccionamos SOLO los artículos (ignorando h2 y el div de controles)
    // Convertimos a Array real para poder usar sort()
    let anunciosOriginales = Array.from(document.querySelectorAll('.anuncio-item'));

    selectOrden.addEventListener('change', () => {
        const criterio = selectOrden.value;

        // Clonamos el array para ordenar sin perder la referencia original
        let anunciosOrdenados = [...anunciosOriginales];

        // 2. Lógica de ordenación
        if (criterio === 'precioAsc') {
            anunciosOrdenados.sort((a, b) =>
                parseInt(a.dataset.precio) - parseInt(b.dataset.precio)
            );
        } else if (criterio === 'precioDesc') {
            anunciosOrdenados.sort((a, b) =>
                parseInt(b.dataset.precio) - parseInt(a.dataset.precio)
            );
        } else {
            // Si es "defecto", usamos el array original (orden del HTML inicial)
            anunciosOrdenados = anunciosOriginales;
        }

        // 3. Reinsertamos en el DOM (Manipulación del DOM)
        // appendChild mueve el elemento existente al final del contenedor.
        // Como el h2 y los controles son los primeros hijos, los artículos
        // se ordenarán justo después de ellos, manteniendo tu layout.
        anunciosOrdenados.forEach(anuncio => {
            contenedor.appendChild(anuncio);
        });
    });
});