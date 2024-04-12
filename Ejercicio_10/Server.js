const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.get('/convert', (req, res) => {
   

    const fs = require('fs');
    const jsdom = require('jsdom');
    const csvWriter = require('csv-writer').createObjectCsvWriter;
    const html = fs.readFileSync('Main.html', 'utf-8');
    const dom = new jsdom.JSDOM(html);
    const document = dom.window.document;
    const countries = Array.from(document.querySelectorAll('.country'));

    const data = countries.map(country => {
    const name = country.querySelector('.country-name').textContent.trim();
    const capital = country.querySelector('.country-capital').textContent.trim();
    const population = country.querySelector('.country-population').textContent.trim();
    const area = country.querySelector('.country-area').textContent.trim();

    return {name, capital, population, area};
    });

    const writer = csvWriter({
        path: 'Paises.csv',
        header: [
        {id: 'name', title: 'Pais'},
        {id: 'capital', title: 'Capital'},
        {id: 'population', title: 'Poblacion'},
        {id: 'area', title: 'Area que ocupa en km2'}
        ]
    });

    writer.writeRecords(data).then(() => console.log('CSV creado exitosamente'));
    res.send('CSV creado exitosamente');
    });

app.listen(port, () => {
    console.log(`Servidor ejecutandose http://localhost:${port}`);
});