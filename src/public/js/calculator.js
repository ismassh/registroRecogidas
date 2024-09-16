const tarifasCtt = {
    1: 4.07,
    2: 4.43,
    3: 4.63,
    4: 4.84,
    5: 5.01,
    10: 6.23,
    15: 7.52,
    'adicional': 0.42
};

// Función para calcular el costo de envío
function calcularPrecioEnvio(pesoReal, alto, ancho, longitud) {

    const pesoVolumetrico = ((alto * ancho * longitud) * 167) / 1000000;
    const pesoMayor = Math.max(pesoReal, pesoVolumetrico);

    console.log(pesoVolumetrico)

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

    // Aplicar IVA
    return costo.toFixed(2) + '€';
}

// Función para actualizar los costos de envío en la tabla
function actualizarCostosEnvio() {
    document.querySelectorAll('tbody tr').forEach(row => {
        const peso = parseFloat(row.querySelector('.peso').innerText);
        const alto = parseFloat(row.querySelector('.alto').innerText);
        const ancho = parseFloat(row.querySelector('.ancho').innerText);
        const longitud = parseFloat(row.querySelector('.longitud').innerText);

        const costeEnvio = calcularPrecioEnvio(peso, alto, ancho, longitud);
        row.querySelector('.coste-envio').innerText = costeEnvio;
    });
}

// Ejecutar la función cuando la página haya cargado
document.addEventListener('DOMContentLoaded', actualizarCostosEnvio);

