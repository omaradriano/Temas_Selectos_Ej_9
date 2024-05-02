
// Función para obtener y mostrar los datos de la API
async function fetchData() {
    const response = await fetch('http://localhost:3300/api/data');
    const data = await response.json();
    const tableBody = document.getElementById('dataBody');

    tableBody.innerHTML = '';
    data.forEach(item => {
        const row = `<tr>
                                <td>${item.Pais}</td>
                                <td>${item.Capital}</td>
                                <td>${item.Poblacion}</td>
                                <td>${item.Area}</td>
                            </tr>`;
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}


// Función para manejar el envío del formulario de agregar país
async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    let formObj = {};
    for (let [key, value] of formData.entries()) {
        formObj[key] = value;
    }

    try {
        const response = await fetch('http://localhost:3300/api/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObj)
        });
        if (response.ok) {
            fetchData();
            form.reset();
            alert('Se agrego el pais');
        } else {
            console.error('Error al agregar país:', response.statusText);
        }
    } catch (error) {
        console.error('Error de red:', error);
    }
}

//Funcion para buscar una capital
async function handleSearch(event) {
    event.preventDefault();
    const nombre = document.getElementById('searchInput').value;
    try {
        const response = await fetch(`http://localhost:3300/api/search/${nombre}`);
        if (response.ok) {
            const data = await response.json();

            alert('Se encontro el pais ' + nombre);

            //Mostrar los datos en los campos del formulario
            document.getElementById('capitalBuscar').value = data.Capital;
            document.getElementById('poblacionBuscar').value = data.Poblacion;
            document.getElementById('areaBuscar').value = data.Area;
        } else {
            console.error('Error al buscar país:', response.statusText);
            alert('No se encontro el pais: ' + nombre);
        }
    } catch (error) {
        console.error('Error de red:', error);
    }
}


//Funcion para buscar una capital en modficacion
async function handleSearch2(event) {
    event.preventDefault();
    const nombre = document.getElementById('modifyInput').value;
    try {
        const response = await fetch(`http://localhost:3300/api/search/${nombre}`);
        if (response.ok) {
            const data = await response.json();

            alert('Se encontro el pais ' + nombre);

            //Mostrar los datos en los campos del formulario
            document.getElementById('capitalModify').value = data.Capital;
            document.getElementById('poblacionModify').value = data.Poblacion;
            document.getElementById('areaModify').value = data.Area;
        } else {
            console.error('Error al buscar país:', response.statusText);
            alert('No se encontro el pais: ' + nombre);
        }
    } catch (error) {
        console.error('Error de red:', error);
    }
}

//Funcion para modificar una capital
async function handleModify(event) {
    event.preventDefault();
    const nombre = document.getElementById('modifyInput').value;
    const capital = document.getElementById('capitalModify').value;
    const poblacion = document.getElementById('poblacionModify').value;
    const area = document.getElementById('areaModify').value;

    const datos = {
        Pais: nombre,
        Capital: capital,
        Poblacion: poblacion,
        Area: area
    };

    try {
        const modifyResponse = await fetch(`http://localhost:3300/api/modify/${nombre}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });
        if (modifyResponse.ok) {
            alert('Se modifico el pais ' + nombre);
            fetchData();
        } else {
            console.error('Error al modificar país:', modifyResponse.statusText);
        }
    } catch (error) {
        console.error('Error de red:', error);
    }
}


//Funcion para buscar una capital en borrar
async function buscarPaisEliminacion(event) {
    event.preventDefault();
    const nombre = document.getElementById('deleteInput').value;
    try {
        const response = await fetch(`http://localhost:3300/api/search/${nombre}`);
        if (response.ok) {
            const data = await response.json();

            alert('Se encontro el pais ' + nombre);

            //Mostrar los datos en los campos del formulario
            document.getElementById('capitalDelete').value = data.Capital;
            document.getElementById('poblacionDelete').value = data.Poblacion;
            document.getElementById('areaDelete').value = data.Area;
        } else {
            console.error('Error al buscar país:', response.statusText);
            alert('No se encontro el pais: ' + nombre);
        }
    } catch (error) {
        console.error('Error de red:', error);
    }
}


//Funcion para eliminar una capital
async function handleDelete(event) {
    event.preventDefault();
    const nombre = document.getElementById('deleteInput').value;

    // Aqui se muestra un cuadro de diálogo de confirmación
    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar el país ${nombre}?`);

    // Esto se ejecuta si le da clic en Aceptar
    if (confirmacion) {
        try {
            const response = await fetch(`http://localhost:3300/api/delete/${nombre}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                fetchData();
            } else {
                alert('Error al eliminar país:' + nombre);
                console.error('Error al eliminar país:', response.statusText);
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    } else {
        alert('Se cancelo la eliminacion del pais ' + nombre);
        console.log('Cancelado');
    }
}





// Al cargar la página, obtener y mostrar los datos
fetchData();

// Evento de envío 
const addForm = document.getElementById('addForm');
addForm.addEventListener('submit', handleSubmit);

//Evento de busqueda
const searchForm = document.getElementById('searchForm');
searchForm.addEventListener('submit', handleSearch);

//Eventos de modificacion//
// Evento de búsqueda
const searchButton = document.getElementById('buscarButton');
searchButton.addEventListener('click', handleSearch2);

// Evento de modificación
const modifyButton = document.getElementById('modifyButton');
modifyButton.addEventListener('click', handleModify);
//Fin de los eventos de modificacion//


//Eventos de eliminacion//
// Evento de búsqueda
const buttonDelete = document.getElementById('buscarButtonDelete');
buttonDelete.addEventListener('click', buscarPaisEliminacion);

//Evento de eliminacion
const deleteButton = document.getElementById('deleteButton');
deleteButton.addEventListener('click', handleDelete);
//Fin de los eventos de eliminacion//