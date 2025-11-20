document.addEventListener('DOMContentLoaded', () => {
    const selectOrden = document.getElementById('ordenarPor');
    const contenedor = document.getElementById('resultados');

    // Guardamos la lista original
    let anunciosOriginales = Array.from(document.querySelectorAll('.anuncio-item'));

    selectOrden.addEventListener('change', () => {
        const criterio = selectOrden.value;

        // Copia para ordenar
        let anunciosOrdenados = [...anunciosOriginales];

        // Función auxiliar para obtener datos de forma limpia
        const getDato = (el, dato) => el.dataset[dato];
        const getNum = (el, dato) => parseInt(el.dataset[dato]);

        anunciosOrdenados.sort((a, b) => {
            switch (criterio) {
                // --- NUMÉRICOS ---
                case 'precioAsc':
                    return getNum(a, 'precio') - getNum(b, 'precio');
                case 'precioDesc':
                    return getNum(b, 'precio') - getNum(a, 'precio');
                case 'fechaReciente':
                    return getNum(b, 'fecha') - getNum(a, 'fecha');
                case 'fechaAntigua':
                    return getNum(a, 'fecha') - getNum(b, 'fecha');

                // --- TEXTO (Título) ---
                case 'tituloAsc':
                    return getDato(a, 'titulo').localeCompare(getDato(b, 'titulo'));
                case 'tituloDesc':
                    return getDato(b, 'titulo').localeCompare(getDato(a, 'titulo'));

                // --- TEXTO (Ciudad) ---
                case 'ciudadAsc':
                    return getDato(a, 'ciudad').localeCompare(getDato(b, 'ciudad'));
                case 'ciudadDesc':
                    return getDato(b, 'ciudad').localeCompare(getDato(a, 'ciudad'));

                // --- TEXTO (País) ---
                case 'paisAsc':
                    return getDato(a, 'pais').localeCompare(getDato(b, 'pais'));
                case 'paisDesc':
                    return getDato(b, 'pais').localeCompare(getDato(a, 'pais'));

                case 'defecto':
                default:
                    return 0;
            }
        });

        // Restaurar orden original si es "defecto"
        if (criterio === 'defecto') {
            anunciosOrdenados = anunciosOriginales;
        }

        // Reinsertar en el DOM
        anunciosOrdenados.forEach(anuncio => {
            contenedor.appendChild(anuncio);
        });
    });
});