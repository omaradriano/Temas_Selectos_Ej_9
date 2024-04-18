// Función para cargar el archivo CSV
function cargarDatos() {
    return new Promise((resolve, reject) => {
        Papa.parse('Paises.csv', { 
            download: true,
            header: true,
            complete: function(results) {
                const csvCompleto = results.data;
                resolve(csvCompleto);
            },
            error: function(error) {
                reject(error);
            }
        });
    });
}

// Funcion que muestra los datos
function mostrarDatos(datos) {
    var tabla = document.getElementById('tblPaises');
    tabla.innerHTML = '';
    var encabezado = tabla.createTHead();
    var filaEncabezado = encabezado.insertRow();
    for (var columna in datos[0]) {
        if (datos[0].hasOwnProperty(columna)) {
            var th = document.createElement('th');
            th.textContent = columna;
            filaEncabezado.appendChild(th);
        }
    }
    
    // Aqui se agregan las filas de los datos
    datos.forEach(function(row) {
        var fila = tabla.insertRow();
        for (var columna in row) {
            if (row.hasOwnProperty(columna)) {
                var celda = fila.insertCell();
                celda.textContent = row[columna];
            }
        }
    });
}

// Función para mostrar una gráfica de barras
function mostrarGrafica(datos) {
    // Obtener los valores de duración y fechas
    const duraciones = datos.map(row => row['Duracion(Segundos)']);
    const fechas = datos.map(row => row['Fecha en que ocurrio']);

    // Crear el contexto del gráfico
    var ctx = document.getElementById('graficaDuraciones').getContext('2d');

    // Crear la gráfica de barras
    var grafica = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: fechas,
            datasets: [{
                label: 'Duración de avistamientos (segundos)',
                data: duraciones,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 3
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}



// Llamar a la función para cargar los datos y luego mostrar la tabla
cargarDatos().then(function(data) {
    mostrarDatos(data); // Mostrar la tabla
}).catch(function(error) {
    console.error('Error al cargar los datos:', error);
});
