// Función para cargar el archivo CSV
function cargarDatos() {
    return new Promise((resolve, reject) => {
        Papa.parse('datos9.csv', {
            download: true,
            header: true,
            complete: function(results) {
                const csvCompleto = results.data.map(row => {
                    const lugar = row['state']; // Aqui se unen las columnas ciudad, estado y pais
                    return {'Fecha en que ocurrio': row['datetime'],'Lugar de avistamiento': lugar, 'Duracion(Segundos)': row['duration (seconds)'],'Comentarios': row['comments'] }; 
                });
                // Aqui se limita el tamaño completo del CSV
                const csvRecortado = csvCompleto.slice(5000, 5050);
                resolve(csvRecortado);
            },
            error: function(error) {
                reject(error);
            }
        });
    });
}

// Funcion que muestra los datos
function mostrarDatos(datos) {
    var tabla = document.getElementById('tblAvistamientos');
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



//////////////////Funcion para mostrar grafica de barras

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
/////////////////Funcion para mostrar grafica de pastel


// Función para mostrar una gráfica de pastel
function mostrarGraficaPastel(datos) {
    // Contar el número de avistamientos por país
    const avistamientosPorPais = {};
    datos.forEach(row => {
        const lugar = row['Lugar de avistamiento'];
        avistamientosPorPais[lugar] = avistamientosPorPais[lugar] ? avistamientosPorPais[lugar] + 1 : 1;
    });

    // Obtener etiquetas y datos para la gráfica de pastel
    const paises = Object.keys(avistamientosPorPais);
    const cantidadAvistamientos = Object.values(avistamientosPorPais);

    // Crear el contexto del gráfico
    var ctx = document.getElementById('graficaDistribucionPais').getContext('2d');

    // Crear la gráfica de pastel
    var graficaPastel = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: paises,
            datasets: [{
                label: 'Distribución de avistamientos por país',
                data: cantidadAvistamientos,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 89, 132, 0.6)',
                    'rgba(54, 100, 235, 0.6)',
                    'rgba(255, 26, 86, 0.6)',
                    'rgba(75, 19, 192, 0.6)',
                    'rgba(153, 20, 255, 0.6)',
                    'rgba(255, 30, 64, 0.6)',
                    'rgba(255, 147, 132, 0.6)',
                    'rgba(54, 189, 235, 0.6)',
                    'rgba(255, 190, 86, 0.6)',
                    'rgba(75, 193, 192, 0.6)',
                    'rgba(153, 174, 255, 0.6)',
                    'rgba(255, 124, 64, 0.6)'
                    // Puedes añadir más colores si tienes más países
                ]
            }]
        }
    });
}

// Llamar a la función para cargar los datos y luego mostrar la tabla y las gráficas
cargarDatos().then(function(data) {
    mostrarDatos(data); // Mostrar la tabla
    mostrarGrafica(data); // Mostrar la gráfica de barras
    mostrarGraficaPastel(data); // Mostrar la gráfica de pastel
}).catch(function(error) {
    console.error('Error al cargar los datos:', error);
});




