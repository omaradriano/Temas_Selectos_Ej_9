$(document).ready(function () {
    function generarMatriz(tamaño, valorDiagonal) {
        $("#tblMatriz").empty();
        for (var i = 0; i < tamaño; i++) {
            var fila = $("<tr></tr>");
            for (var j = 0; j < tamaño; j++) {
                var celda = $("<td></td>");
                if (i === j) {
                    celda.text(valorDiagonal);
                } else {
                    celda.text(0);
                }
                fila.append(celda);
            }
            $("#tblMatriz").append(fila);
        }
    }

    //Parte en la que se puede agregar mayor tamaño a la matriz
    $("#btnGenerar").click(function () {
        var tamaño = parseInt($("#txtTamaño").val());
        var valorDiagonal = parseInt($("#txtDiagonal").val());
        generarMatriz(tamaño, valorDiagonal);
    });

    // Generar matriz inicial
    generarMatriz(5, 1);
});