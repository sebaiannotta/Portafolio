document.addEventListener('DOMContentLoaded', async () => {
    const selectOrigen = document.getElementById('origen');
    const selectDestino = document.getElementById('destino');
    const resultadoContainer = document.getElementById('resultado-container');
    const resultadoTexto = document.getElementById('resultado');
    const form = document.getElementById('conversor-form');

    try {
        // Fetch monedas y llenar selects
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();

        data.forEach(country => {
            const currencies = country.currencies;
            if (currencies) {
                Object.entries(currencies).forEach(([code, { name }]) => {
                    const optionOrigen = document.createElement('option');
                    optionOrigen.value = code;
                    optionOrigen.textContent = `${name} (${code})`;
                    selectOrigen.appendChild(optionOrigen);

                    const optionDestino = document.createElement('option');
                    optionDestino.value = code;
                    optionDestino.textContent = `${name} (${code})`;
                    selectDestino.appendChild(optionDestino);
                });
            }
        });
    } catch (error) {
        console.error('Error al obtener las monedas:', error);
        resultadoTexto.textContent = 'Error al cargar las monedas.';
        resultadoContainer.classList.remove('hidden');
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const cantidad = parseFloat(document.getElementById('cantidad').value);
        const monedaOrigen = selectOrigen.value;
        const monedaDestino = selectDestino.value;

        if (monedaOrigen === "") {
            resultadoTexto.textContent = "Por favor, selecciona una moneda de origen.";
            resultadoContainer.classList.remove("hidden");
            return;
        }
        
        if (monedaDestino === "") {
            resultadoTexto.textContent = "Por favor, selecciona una moneda de destino.";
            resultadoContainer.classList.remove("hidden");
            return;
        }
        
        if (cantidad <= 0 || isNaN(cantidad)) {
            resultadoTexto.textContent = "Por favor, ingresa una cantidad válida mayor a 0.";
            resultadoContainer.classList.remove("hidden");
            return;
        }
        
        try {
            const response = await fetch(`https://open.er-api.com/v6/latest/${monedaOrigen}`);
            const data = await response.json();

            if (data.result === 'success') {
                const tasa = data.rates[monedaDestino];
                if (tasa) {
                    const conversion = (cantidad * tasa).toFixed(2);
                    resultadoTexto.textContent = `${cantidad} ${monedaOrigen} equivale a ${conversion} ${monedaDestino}`;
                } else {
                    resultadoTexto.textContent = `No se pudo encontrar la tasa de conversión para ${monedaDestino}`;
                }
            } else {
                resultadoTexto.textContent = 'Error al obtener la tasa de conversión.';
            }
        } catch (error) {
            console.error('Error al convertir:', error);
            resultadoTexto.textContent = 'Error al realizar la conversión.';
        }

        resultadoContainer.classList.remove('hidden');
    });
});
