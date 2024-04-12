const express = require('express');
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
    path: 'countries.csv',
    header: [
        {id: 'name', title: 'Country'},
        {id: 'capital', title: 'Capital'},
        {id: 'population', title: 'Population'},
        {id: 'area', title: 'Area'}
    ]
});

writer.writeRecords(data).then(() => console.log('CSV file written successfully'));



    res.send('CSV file written successfully');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});