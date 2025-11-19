document.addEventListener('DOMContentLoaded', () => {
    const selectOrden = document.getElementById('ordenarPor');
    const contenedor = document.getElementById('resultados');

    // 1. Guardamos una referencia a los anuncios originales para poder restaurar el orden "por defecto"
    // Convertimos la NodeList a un Array real para poder manipularlo
    let anunciosOriginales = Array.from(document.querySelectorAll('.anuncio-item'));

    selectOrden.addEventListener('change', () => {
        const criterio = selectOrden.value;

        // Creamos una copia del array para ordenar
        let anunciosOrdenados = [...anunciosOriginales];

        // 2. Lógica de ordenación
        anunciosOrdenados.sort((a, b) => {
            const precioA = parseInt(a.dataset.precio);
            const precioB = parseInt(b.dataset.precio);
            const fechaA = parseInt(a.dataset.fecha);
            const fechaB = parseInt(b.dataset.fecha);

            switch (criterio) {
                case 'precioAsc':
                    return precioA - precioB; // Menor a Mayor
                case 'precioDesc':
                    return precioB - precioA; // Mayor a Menor
                case 'fechaReciente':
                    return fechaB - fechaA; // Más reciente (mayor número) primero
                case 'fechaAntigua':
                    return fechaA - fechaB; // Más antiguo primero
                case 'defecto':
                default:
                    return 0; // Mantiene el orden original del array copiado
            }
        });

        // Si el criterio es 'defecto', usamos el array original para asegurar el orden inicial exacto
        if (criterio === 'defecto') {
            anunciosOrdenados = anunciosOriginales;
        }

        // 3. Reinsertamos en el DOM (Manipulación del DOM)
        // appendChild mueve el elemento existente al final del contenedor.
        // Como el h2 y los controles ya están ahí, los artículos se irán colocando después de ellos.
        anunciosOrdenados.forEach(anuncio => {
            contenedor.appendChild(anuncio);
        });
    });
});