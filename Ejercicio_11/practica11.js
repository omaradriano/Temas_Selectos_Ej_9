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

// Función para mostrar una gráfica de barras de poblacion
function mostrarGrafica1(datos) {
    // Filtrar los datos para descartar los que tienen valor 0 en 'Poblacion'
    var datosFiltrados = datos.filter(row => row['Poblacion'] != 0);

    // Obtener los valores de Capital y Poblacion
    const Pobla = datosFiltrados.map(row => row['Poblacion']);
    const Capitales = datosFiltrados.map(row => row['Capital']);

    // Crear el contexto del gráfico
    var ctx = document.getElementById('graficaPaises').getContext('2d');

    // Crear la gráfica de barras
    var grafica = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Capitales,
            datasets: [{
                label: 'Cantidad de poblacon por capital de pais',
                data: Pobla,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2
            }]
        },
        options: {scales: {yAxes: [{ticks: {beginAtZero: true}}]}}
    });
}

// Función para mostrar una gráfica de barras de area
function mostrarGrafica2(datos) {
    // Filtrar los datos para descartar los que tienen valor 0 en 'Area'
    var datosFiltrados = datos.filter(row => row['Area que ocupa en km2'] <= 500000);

    // Obtener los valores de Capital y Poblacion
    const Area = datosFiltrados.map(row => row['Area que ocupa en km2']);
    const Capitales = datosFiltrados.map(row => row['Capital']);

    // Crear el contexto del gráfico
    var ctx = document.getElementById('graficaArea').getContext('2d');

    // Crear la gráfica de barras
    var graficaAr = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Capitales,
            datasets: [{
                label: 'Area que ocupa la capital en km2',
                data: Area,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2
            }]
        },
        options: {
            indexAxis: 'y',  // Cambiar el eje de índice a 'y' para hacer la gráfica horizontal
            scales: {
                x: {
                    beginAtZero: true
                }
            }
        }
    });
}


// Función para mostrar una gráfica de líneas
function mostrarGrafica3(datos) {
    // Filtrar los datos para descartar los que tienen valor 0 en 'Poblacion'
    var datosFiltrados = datos.filter(row => row['Poblacion'] <= 500000 && row['Poblacion'] != 0);

    // Obtener los valores de Capital y Poblacion
    const Pobla = datosFiltrados.map(row => row['Poblacion']);
    const Capitales = datosFiltrados.map(row => row['Capital']);

    // Crear el contexto del gráfico
    var ctx = document.getElementById('graficaLineas').getContext('2d');

    // Crear la gráfica de líneas
    var grafica = new Chart(ctx, {
        type: 'line',  // Cambiar 'bar' a 'line'
        data: {
            labels: Capitales,
            datasets: [{
                label: 'Cantidad de poblacion por capital de pais',
                data: Pobla,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 3
            }]
        },
        options: {
            scales: {
                x: {
                    ticks: {
                        autoSkip: false,  // Desactivar el salto automático de etiquetas
                        maxRotation: 90,  // Permitir una rotación máxima de 90 grados
                        minRotation: 90   // Establecer una rotación mínima de 90 grados
                    }
                },
                y: {
                    ticks: {
                        beginAtZero: true
                    }
                }
            }
        }
    });
}


// Llamar a la función para cargar los datos y luego mostrar la tabla
cargarDatos().then(function(data) {
    mostrarDatos(data); // Mostrar la tabla
    mostrarGrafica1(data); // Mostrar la gráfica
    mostrarGrafica2(data); // Mostrar la gráfica
    mostrarGrafica3(data); // Mostrar la gráfica
}).catch(function(error) {
    console.error('Error al cargar los datos:', error);
});
