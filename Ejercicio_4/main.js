function capitalizarPrimeraLetra() {
    // Obtiene el texto del textarea
    var texto = document.getElementById("inputText").value;

    // Divide el texto en una lista de palabras separadas por comas
    var palabras = texto.split(" ");

    // Poner en mayuscula la primera letra de cada palabra
    var resultado = palabras.map(function (palabra) {
        return palabra.trim().charAt(0).toUpperCase() + palabra.trim().slice(1);
    });

    // Generar una lista con las palabras en mayuscula
    var listaHTML = "<ul>";
    resultado.forEach(function (palabra) {
        listaHTML += "<li>" + palabra + "</li>";
    });
    listaHTML += "</ul>";

    // Muestra la lista en el elemento con id "output"
    document.getElementById("output").innerHTML = listaHTML;
}