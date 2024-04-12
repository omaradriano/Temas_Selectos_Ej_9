import requests
from bs4 import BeautifulSoup
import pandas as pd

# URL de la página a scrapear
url = 'https://www.scrapethissite.com/pages/simple/'

# Realizamos la solicitud GET a la URL
response = requests.get(url)

# Parseamos el contenido HTML
soup = BeautifulSoup(response.text, 'html.parser')

# Inicializamos listas para almacenar los datos
NombrePais = []
Area = []
Capital = []
Poblacion = []

# Encontramos todos los elementos con la clase 'col-md-4'
Paises = soup.find_all(class_='col-md-4 country')

# Iteramos sobre los productos y extraemos la información
nombres = []  # Define the "nombres" list
precios = []  # Define the "precios" list
descripciones = []  # Define the "descripciones" list
area = []  # Define the "area" list
for Pais in Paises:
    NombrePais = Pais.find('h3').text.strip()
    Capital = Pais.find(class_='country-capital').text.strip()
    Poblacion = Pais.find(class_='country-population').text.strip()
    Area = Pais.find(class_='country-area').text.strip()
    nombres.append(NombrePais)
    precios.append(Capital)
    descripciones.append(Poblacion)
    area.append(Area)

# Creamos un DataFrame con los datos
df = pd.DataFrame({
    'Nombre Pais': nombres,
    'Capital': precios,
    'Poblacion': descripciones,
    'Area': area
})

# Guardamos el DataFrame en un archivo CSV
df.to_csv('datos_scrapethissite.csv', index=False)

print("Datos extraídos y guardados en datos_scrapethissite.csv")
