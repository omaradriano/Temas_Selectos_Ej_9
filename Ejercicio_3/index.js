function agregarSeleccionados() {
    var checkboxes = document.querySelectorAll('#listaArticulos input[type="checkbox"]:checked');
    var listaSeleccionados = document.getElementById("listaSeleccionados");
    var total = 0;

    listaSeleccionados.innerHTML = ''; // Limpiar lista anterior

    checkboxes.forEach(function (checkbox) {
        var nuevoElemento = document.createElement("li");
        nuevoElemento.textContent = checkbox.value;
        listaSeleccionados.appendChild(nuevoElemento);

        var precio = parseFloat(checkbox.getAttribute('data-precio'));
        total += precio;
    });

    document.getElementById('total').textContent = 'Total: $' + total.toFixed(2);
}

function agregarFruta() {
    var nombreFruta = document.getElementById("nuevaFruta").value;
    var precioFruta = parseFloat(document.getElementById("precioFruta").value);

    if (nombreFruta.trim() === "" || isNaN(precioFruta) || precioFruta <= 0) {
        alert("Por favor ingresa un nombre y un precio válido para la fruta.");
        return;
    }

    var listaArticulos = document.getElementById("listaArticulos");
    var nuevaFrutaItem = document.createElement("li");
    nuevaFrutaItem.innerHTML = '<input type="checkbox" value="' + nombreFruta + '" data-precio="' + precioFruta + '"> ' + nombreFruta + ' - $' + precioFruta;
    listaArticulos.appendChild(nuevaFrutaItem);

    // Limpiar campos después de agregar la fruta
    document.getElementById("nuevaFruta").value = "";
    document.getElementById("precioFruta").value = "";
}