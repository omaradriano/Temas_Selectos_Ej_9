const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const cors = require('cors');
const { createObjectCsvWriter } = require('csv-writer');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;


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
  let paisEncontrado = null;

  fs.createReadStream('Paises.csv')
    .pipe(csv())
    .on('data', (data) => {
      if (data.Pais === nombre) {
        paisEncontrado = data;
      }
    })
    .on('end', () => {
      if (paisEncontrado) {
        res.json(paisEncontrado);
      } else {
        res.status(404).send('Pais no encontrada');
      }
    });
});

// Ruta para modificar un país
app.put('/api/modify/:nombre', (req, res) => {
  const nombre = req.params.nombre;
  const datos = req.body;
  let data = [];

  fs.createReadStream('Paises.csv')
    .pipe(csv())
    .on('data', (row) => {
      if (row.Pais === nombre) {
        // Aqui se modifican los datos del país
        row = { ...row, ...datos };
      }
      data.push(row);
    })
    .on('end', () => {
      const csvWriter = createCsvWriter({
        path: 'Paises.csv',
        header: [
          { id: 'Pais', title: 'Pais' },
          { id: 'Capital', title: 'Capital' },
          { id: 'Poblacion', title: 'Poblacion' },
          { id: 'Area', title: 'Area' },
        ],
        // Aqui se sobreescribe el archivo CSV con los datos modificados
        append: false,
      });

      csvWriter
        .writeRecords(data)
        .then(() => res.send('Pais modificado exitosamente'))
        .catch((err) => {
          console.error('Error al modificar el pais:', err);
          res.status(500).send('Error al modificar el pais');
        });
    });
});



// Ruta para eliminar un país
app.delete('/api/delete/:nombre', (req, res) => {
  const nombre = req.params.nombre;
  let data = [];

  fs.createReadStream('Paises.csv')
    .pipe(csv())
    .on('data', (row) => {
      if (row.Pais !== nombre) {
        //Solo se agrega la fila a los nuevos datos si no es el país a eliminar
        data.push(row);
      }
    })
    .on('end', () => {
      const csvWriter = createCsvWriter({
        path: 'Paises.csv',
        header: [
          { id: 'Pais', title: 'Pais' },
          { id: 'Capital', title: 'Capital' },
          { id: 'Poblacion', title: 'Poblacion' },
          { id: 'Area', title: 'Area' },
        ],
        //Se sobreescribe el archivo CSV con los datos restantes
        append: false,
      });

      csvWriter
        .writeRecords(data)
        .then(() => res.send('País eliminado exitosamente'))
        .catch((err) => {
          console.error('Error al eliminar pais:', err);
          res.status(500).send('Error al eliminar pais');
        });
    });
});
// Aqui se inicia el servidor en el puerto 3300
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
