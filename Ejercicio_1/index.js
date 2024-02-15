function suma() {

    var Calificacion1 = Number(document.getElementById('Calificacion1').value);
    var Calificacion2 = Number(document.getElementById('Calificacion2').value);
    var Calificacion3 = Number(document.getElementById('Calificacion3').value);

    var Resultado = (Calificacion1 + Calificacion2 + Calificacion3) / 3

    document.getElementById('Resultado').value = Resultado.toFixed(2)
}

function borrarDatos() {

    document.getElementById('Calificacion1').value = '';
    document.getElementById('Calificacion2').value = '';
    document.getElementById('Calificacion3').value = '';
    document.getElementById('Resultado').value = '';
}