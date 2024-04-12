const express = require('express');
const app = express();
const port = 3000;

app.get('/convert', (req, res) => {
    // Aquí va el código que lee y procesa el archivo HTML y escribe el archivo CSV
    // Cuando termina, envía una respuesta al cliente
    res.send('CSV file written successfully');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});