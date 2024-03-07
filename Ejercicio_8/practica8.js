// Función para cargar el archivo CSV
function cargarDatos() {
    return new Promise((resolve, reject) => {
        Papa.parse('datos.csv', {
            download: true,
            header: true,
            complete: function(results) {
                const csvCompleto = results.data.map(row => {
                    const lugar = row['city'] + ',' + row['state'] + ',' + row['country']; // Aqui se unen las columnas ciudad, estado y pais
                    return {'Fecha en que ocurrio': row['datetime'],'Lugar de avistamiento': lugar, 'Duracion(Segundos)': row['duration (seconds)'],'Comentarios': row['comments'] }; 
                });
                // Limitar a los primeros 600 registros
                const csvRecortado = csvCompleto.slice(0, 600);
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

// Cargar los datos, seleccionar columnas, limitar registros y luego mostrarlos en la tabla
cargarDatos().then(function(data) {
    mostrarDatos(data);
}).catch(function(error) {
    alert.error('Error al cargar los datos:', error);
});

