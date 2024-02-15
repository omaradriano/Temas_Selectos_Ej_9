function agregarSeleccionados() {
  var checkboxes = document.querySelectorAll('.item input[type="checkbox"]:checked');
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

  console.log(total)

  document.getElementById('total').textContent = 'Total: $' + total.toFixed(2);
}
