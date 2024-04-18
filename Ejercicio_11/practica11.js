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

function mostrarGrafica1(datos) {

    var datosFiltrados = datos.filter(row => row['Poblacion'] != 0);
    const Pobla = datosFiltrados.map(row => row['Poblacion']);
    const Capitales = datosFiltrados.map(row => row['Capital']);
    var ctx = document.getElementById('graficaPaises').getContext('2d');

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


function mostrarGrafica2(datos) {

    var datosFiltrados = datos.filter(row => row['Area que ocupa en km2'] <= 500000);
    const Area = datosFiltrados.map(row => row['Area que ocupa en km2']);
    const Capitales = datosFiltrados.map(row => row['Capital']);
    var ctx = document.getElementById('graficaArea').getContext('2d');

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
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true
                }
            }
        }
    });
}


function mostrarGrafica3(datos) {
    var datosFiltrados = datos.filter(row => row['Poblacion'] <= 500000 && row['Poblacion'] != 0);
    const Pobla = datosFiltrados.map(row => row['Poblacion']);
    const Capitales = datosFiltrados.map(row => row['Capital']);
    var ctx = document.getElementById('graficaLineas').getContext('2d');

    var grafica = new Chart(ctx, {
        type: 'line',  
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
                        autoSkip: false,  
                        maxRotation: 90,  
                        minRotation: 90   
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



function mostrarGrafica4(datos) {
    var datosFiltrados = datos.filter(row => row['Poblacion'] <= 500000 &&  row['Poblacion'] > 100000 );

    const Poblacion = datosFiltrados.map(row => row['Poblacion']);
    const Capitales = datosFiltrados.map(row => row['Capital']);
    const Area = datosFiltrados.map(row => row['Area que ocupa en km2']);
    var ctx = document.getElementById('graficaRadar').getContext('2d');

    var graficaRd = new Chart(ctx, {
        type: 'radar',  
        data: {
            labels: Capitales,
            datasets: [{
                label: 'Poblacion de la capital de pais',
                data: Poblacion,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2
            },
            {
                label: 'Area que ocupa la capital en km2',
                data: Area,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                r: {
                    beginAtZero: true
                }
            }
        }
    });
}

function mostrarGrafica5(datos) {
    var datosFiltrados = datos.filter(row => row['Poblacion'] <= 500000 &&  row['Poblacion'] > 100000);

    const Poblacion = datosFiltrados.map(row => row['Poblacion']);
    const Capitales = datosFiltrados.map(row => row['Capital']);
   

    var ctx = document.getElementById('polarArea').getContext('2d');

    var graficaPolarArea = new Chart(ctx, {
        type: 'polarArea', 
        data: {
            labels: Capitales,
            datasets: [{
                label: 'Poblacion de la capital de pais',
                data: Poblacion,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                r: {
                    beginAtZero: true
                }
            }
        }
    });
}

function mostrarGrafica6(datos) {
    var datosFiltrados = datos.filter(row => row['Poblacion'] <= 500000 &&  row['Poblacion'] > 100000 );

    const Poblacion = datosFiltrados.map(row => row['Poblacion']);
    const Capitales = datosFiltrados.map(row => row['Capital']);
    const Area = datosFiltrados.map(row => row['Area que ocupa en km2']);

    var ctx = document.getElementById('comparativa').getContext('2d');

    var graficaComparativa = new Chart(ctx, {
        type: 'bar', 
        data: {
            labels: Capitales,
            datasets: [{
                label: 'Poblacion de la capital de pais',
                data: Poblacion,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2
            },
            {
                label: 'Area que ocupa la capital en km2',
                data: Area,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                x: {
                    ticks: {
                        autoSkip: false,  
                        maxRotation: 90,  
                        minRotation: 90   
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

cargarDatos().then(function(data) {
    mostrarDatos(data); 
    mostrarGrafica1(data); 
    mostrarGrafica2(data); 
    mostrarGrafica3(data); 
    mostrarGrafica4(data); 
    mostrarGrafica5(data); 
    mostrarGrafica6(data); 
}).catch(function(error) {
    console.error('Error al cargar los datos:', error);
});
