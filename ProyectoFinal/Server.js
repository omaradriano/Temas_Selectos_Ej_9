const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const cors = require('cors');
const { createObjectCsvWriter } = require('csv-writer');


// Crear una instancia de Express
const app = express();
const PORT = 3300;

// Middleware
app.use(express.json());
app.use(cors());

// Ruta para obtener todos los datos del archivo CSV
app.get('/api/data', (req, res) => {
  const results = [];

  fs.createReadStream('Paises.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.json(results);
    });
});

// Ruta para agregar un nuevo país
app.post('/api/add', (req, res) => {
  const { nombre, capital, poblacion, area } = req.body;
  const csvWriter = createObjectCsvWriter({
    path: 'Paises.csv',
    header: [
      { id: 'Pais', title: 'Pais' },
      { id: 'Capital', title: 'Capital' },
      { id: 'Poblacion', title: 'Poblacion' },
      { id: 'Area que ocupa en km2', title: 'Area que ocupa en km2' }
    ],
    append: true // Para agregar el nuevo país al final del archivo
  });
  const nuevoPais = {
    Pais: nombre,
    Capital: capital,
    Poblacion: poblacion,
    'Area que ocupa en km2': area
  };
  // Desde aqui se escribe en el archivo CSV con el nuevo país 
  csvWriter.writeRecords([nuevoPais])
    .then(() => {
      console.log('Nuevo país agregado:', nuevoPais);
      res.status(201).send('País agregado exitosamente');
    })
    .catch(error => {
      console.error('Error al escribir en el archivo CSV:', error);
      res.status(500).send('Error al agregar el país');
    });
});


// Ruta para buscar un país por nombre
app.get('/api/search/:nombre', (req, res) => {
  const nombre = req.params.nombre;
  // Leer el archivo CSV y buscar el país

  // Aquí necesitarás una función para leer el archivo CSV y buscar el país
});

// Ruta para modificar un país
app.put('/api/modify/:nombre', (req, res) => {
  const nombre = req.params.nombre;
  const datos = req.body;
  // Leer el archivo CSV, buscar el país y modificarlo
  // Aquí necesitarás una función para leer el archivo CSV, buscar el país y modificarlo
});

// Ruta para eliminar un país
app.delete('/api/delete/:nombre', (req, res) => {
  const nombre = req.params.nombre;
  // Leer el archivo CSV, buscar el país y eliminarlo
  // Aquí necesitarás una función para leer el archivo CSV, buscar el país y eliminarlo
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
