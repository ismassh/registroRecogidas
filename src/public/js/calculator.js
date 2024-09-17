// Objeto con las tarifas de CTT:
const tarifasCtt = {
    1: 4.07,
    2: 4.43,
    3: 4.63,
    4: 4.84,
    5: 5.01,
    10: 6.23,
    15: 7.52,
    'adicional': 0.42 // Penalización por kg adicional.
};

// Función para calcular el costo de envío:
function calcularPrecioEnvio(pesoReal, alto, ancho, longitud) {
    const pesoVolumetrico = ((alto * ancho * longitud) * 167) / 1000000;

    // Seleccionar el peso mayor, entre el real y el volumétrico:
    const pesoMayor = Math.max(pesoReal, pesoVolumetrico);

    console.log(`Peso volumétrico: ${pesoVolumetrico.toFixed(2)} kg`);

    let costo;
    if (pesoMayor <= 1) costo = tarifasCtt[1];
    else if (pesoMayor <= 2) costo = tarifasCtt[2];
    else if (pesoMayor <= 3) costo = tarifasCtt[3];
    else if (pesoMayor <= 4) costo = tarifasCtt[4];
    else if (pesoMayor <= 5) costo = tarifasCtt[5];
    else if (pesoMayor <= 10) costo = tarifasCtt[10];
    else if (pesoMayor <= 15) costo = tarifasCtt[15];
    else {
        const pesoExtra = pesoMayor - 15;
        costo = tarifasCtt[15] + (pesoExtra * tarifasCtt['adicional']);
    }

    return costo; // Devolver el costo como número.
}

// Función para actualizar los costos de envío en la tabla:
function actualizarCostosEnvio() {
    document.querySelectorAll('tbody tr').forEach(row => {
        const peso = parseFloat(row.querySelector('.peso').innerText) || 0;
        const alto = parseFloat(row.querySelector('.alto').innerText) || 0;
        const ancho = parseFloat(row.querySelector('.ancho').innerText) || 0;
        const longitud = parseFloat(row.querySelector('.longitud').innerText) || 0;

        const tarifaEurowin = parseFloat(row.querySelector('.tarifa-eurowin').innerText) || 0;

        const costeEnvio = calcularPrecioEnvio(peso, alto, ancho, longitud) || 0;
        row.querySelector('.coste-envio').innerText = costeEnvio.toFixed(2) + '€';

        // Coste de venta => Coste Eurowin + Coste envío sin IVA:
        const costeTotal = tarifaEurowin + costeEnvio;

        let celdaCosteTotal = row.querySelector('.coste-total');
        if (celdaCosteTotal) {
            celdaCosteTotal.innerText = costeTotal.toFixed(2) + '€';
        }
    });
}

// Ejecutar la función cuando la página haya cargado:
document.addEventListener('DOMContentLoaded', actualizarCostosEnvio);
