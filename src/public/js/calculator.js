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

    // Aplicar las penalizaciones por medidas de CTT:
    let penalizacion = 0;
    // Penalización si alguna dimensión supera los 150 cm
    if (alto > 150 || ancho > 150 || longitud > 150) {
        penalizacion += 2.3;
    }

    // Penalización si exactamente dos dimensiones están entre 80 cm y 120 cm
    let count = 0;
    if (alto > 80 && alto < 120) count++;
    if (ancho > 80 && ancho < 120) count++;
    if (longitud > 80 && longitud < 120) count++;

    if (count === 2) {
        penalizacion += 4;
    }

    // Penalización si la suma de las dimensiones es mayor o igual a 230 cm
    if (alto + ancho + longitud >= 230) {
        penalizacion += 5.65;
    }

    // Seleccionar el peso mayor, entre el real y el volumétrico:
    const pesoMayor = Math.max(pesoReal, pesoVolumetrico);

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

    return costo + penalizacion; // Devolver el costo como número.
}



// Función para actualizar los costos de envío en la tabla:
function actualizarCostosEnvio() {
    document.querySelectorAll('tbody tr').forEach(row => {
        // Obtener la familia de Amazon correspondiente:
        const familia = row.querySelector('.familia-amazon').innerText || 0;
        // Obtener las medidas del formulario
        const peso = parseFloat(row.querySelector('.peso').innerText) || 0;
        const alto = parseFloat(row.querySelector('.alto').innerText) || 0;
        const ancho = parseFloat(row.querySelector('.ancho').innerText) || 0;
        const longitud = parseFloat(row.querySelector('.longitud').innerText) || 0;
        // Obtener el valor del precio de Eurowin:
        let tarifaEurowin = parseFloat(row.querySelector('.tarifa-eurowin').innerText) || 0;
        // Comprobar si el artículo está asegurado:
        const asegurado = row.querySelector('.asegurado').innerText;
        console.log(asegurado)

        let costeEnvio = calcularPrecioEnvio(peso, alto, ancho, longitud) || 0;

        let costeVenta;
        let celdacosteVenta = row.querySelector('.coste-total');

        if (asegurado == 'SÍ') {
            let tarifaConSeguro = tarifaEurowin * 1.5 / 100
            let envioAsegurado = tarifaConSeguro + costeEnvio;
            row.querySelector('.coste-envio').innerText = envioAsegurado.toFixed(2) + '€';
            costeVenta = tarifaConSeguro + costeEnvio;
            celdacosteVenta.innerText = costeVenta.toFixed(2) + '€';

        } else {
            row.querySelector('.coste-envio').innerText = costeEnvio.toFixed(2) + '€';
            costeVenta = tarifaEurowin + costeEnvio;
            celdacosteVenta.innerText = costeVenta.toFixed(2) + '€';

        }




        const comisiones = {
            'DEPORTES-AIRE-LIBRE': 15.45,
            'ACCESORIOS-TECH': (costeVenta > 100 ? 8.24 : 15.45),
            'BELLEZA-SALUD': 15.45,
            'PAE': 15.45,
            'BRICOLAJE': 13.39,
            'ELECTRO': 7.20
        };
        const comisionFamilia = comisiones[familia];

        // Sacar el value de la familia:
        //console.log(`La familia en Amazon es: ${familia} que es un ${comisionFamilia} %`);

        let comisionVariable = comisionFamilia / 100;
        let comisionFija = 0.30;
        let margenMinimo = 2.80;
        let iva = 1.21

        let costeMinimoAmazon = costeVenta + ((comisionVariable * costeVenta + comisionFija) * margenMinimo) * iva;

        const pvpMinAmazon = parseFloat(costeMinimoAmazon) || 0;
        row.querySelector('.pvpMinAmazon').innerText = pvpMinAmazon.toFixed(2) + '€';

    });
}

// Ejecutar la función cuando la página haya cargado:
document.addEventListener('DOMContentLoaded', actualizarCostosEnvio);
