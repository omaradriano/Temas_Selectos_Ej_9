class EquipoDesarrollo {
  constructor(nombre, lider, tecnologias, fechaFinalizacion) {
    this.nombre = nombre;
    this.lider = lider;
    this.tecnologias = tecnologias;
    this.fechaFinalizacion = new Date(fechaFinalizacion);
  }
}

let equiposDesarrollo = [
  new EquipoDesarrollo(
    "Equipo A",
    "Alex",
    ["JavaScript", "React"],
    "2022-03-15"
  ),
  new EquipoDesarrollo("Equipo B", "Omar", ["Python", "Django"], "2022-04-10"),
  new EquipoDesarrollo("Equipo C", "Axel", ["Java", "Spring"], "2022-03-31"),
  new EquipoDesarrollo("Equipo D", "Vanessa", ["Java", "Spring"], "2022-10-03"),
];

function actualizarListaEquipos() {
  let listaEquipos = document.getElementById("equipos-lista");
  listaEquipos.innerHTML =
    "<h3>Listado de Equipos de Desarrollo de Software:</h3>";

  equiposDesarrollo.forEach((equipo, index) => {
    listaEquipos.innerHTML += `<p>${index + 1}. ${equipo.nombre} - Líder: ${
      equipo.lider
    } - Tecnologías: ${equipo.tecnologias.join(
      ", "
    )} - Fecha de Finalización: ${
      equipo.fechaFinalizacion.toISOString().split("T")[0]
    }</p>`;
  });
}

function mostrarEquipos() {
  let equiposInfo = "Listado de Equipos de Desarrollo de Software:\n";
  equiposDesarrollo.forEach((equipo, index) => {
    equiposInfo += `${index + 1}. ${equipo.nombre} - Líder: ${
      equipo.lider
    } - Tecnologías: ${equipo.tecnologias.join(
      ", "
    )} - Fecha de Finalización: ${
      equipo.fechaFinalizacion.toISOString().split("T")[0]
    }\n`;
  });
  alert(equiposInfo);
}

function mostrarFormulario(tipo) {
  let formContainer = document.getElementById("form-container");
  let formTitle = document.getElementById("form-title");
  let equipoForm = document.getElementById("equipo-form");

  // Limpiar el formulario
  equipoForm.reset();

  switch (tipo) {
    case "agregar":
      formTitle.textContent = "Agregar Equipo";
      break;
    case "modificar":
      formTitle.textContent = "Modificar Equipo";
      break;
    case "eliminar":
      formTitle.textContent = "Eliminar Equipo";
      break;
    case "buscar":
      formTitle.textContent = "Buscar Equipo";
      break;
    default:
      break;
  }

  formContainer.style.display = "block";
}

function procesarFormulario() {
  let equipoForm = document.getElementById("equipo-form");
  let nombre = equipoForm.nombre.value;
  let lider = equipoForm.lider.value;
  let tecnologias = equipoForm.tecnologias.value.split(", ");
  let fechaFinalizacion = equipoForm.fechaFinalizacion.value;

  switch (equipoForm.title) {
    case "Agregar Equipo":
      if (nombre && lider && tecnologias.length > 0 && fechaFinalizacion) {
        let nuevoEquipo = new EquipoDesarrollo(
          nombre,
          lider,
          tecnologias,
          fechaFinalizacion
        );
        equiposDesarrollo.push(nuevoEquipo);
        console.log("Equipo de Desarrollo de Software agregado correctamente.");
        actualizarListaEquipos();
        ocultarFormulario();
      } else {
        alert("Por favor, complete todos los campos del formulario.");
      }
      break;
    case "Modificar Equipo":
      let index =
        parseInt(prompt("Ingrese el número del equipo que desea modificar:")) -
        1;
      if (index >= 0 && index < equiposDesarrollo.length) {
        equiposDesarrollo[index].nombre = nombre;
        equiposDesarrollo[index].lider = lider;
        equiposDesarrollo[index].tecnologias = tecnologias;
        equiposDesarrollo[index].fechaFinalizacion = new Date(
          fechaFinalizacion
        );
        console.log(
          "Equipo de Desarrollo de Software modificado correctamente."
        );
        actualizarListaEquipos();
        ocultarFormulario();
      } else {
        console.log("Número de equipo inválido.");
      }
      break;
    case "Eliminar Equipo":
      let indexEliminar =
        parseInt(prompt("Ingrese el número del equipo que desea eliminar:")) -
        1;
      eliminarEquipo(indexEliminar);
      break;
    case "Buscar Equipo":
      let nombreBuscar = prompt(
        "Ingrese el nombre del equipo que desea buscar:"
      );
      let equipoEncontrado = equiposDesarrollo.find(
        (equipo) => equipo.nombre.toLowerCase() === nombreBuscar.toLowerCase()
      );

      if (equipoEncontrado) {
        alert(
          `Información del Equipo de Desarrollo de Software:\nNombre: ${
            equipoEncontrado.nombre
          }\nLíder: ${
            equipoEncontrado.lider
          }\nTecnologías: ${equipoEncontrado.tecnologias.join(
            ", "
          )}\nFecha de Finalización: ${
            equipoEncontrado.fechaFinalizacion.toISOString().split("T")[0]
          }`
        );
      } else {
        alert(`Equipo de Desarrollo de Software no encontrado.`);
      }
      break;
    default:
      break;
  }
}

function ocultarFormulario() {
  let formContainer = document.getElementById("form-container");
  formContainer.style.display = "none";
}

function eliminarEquipo(index) {
  if (index >= 0 && index < equiposDesarrollo.length) {
    equiposDesarrollo.splice(index, 1);
    console.log("Equipo de Desarrollo de Software eliminado correctamente.");
    actualizarListaEquipos();
  } else {
    console.log("Número de equipo inválido.");
  }
}

function ordenarEquipos() {
  equiposDesarrollo.sort((a, b) => a.fechaFinalizacion - b.fechaFinalizacion);
  console.log(
    "Equipos de Desarrollo de Software ordenados por fecha de finalización correctamente."
  );
  actualizarListaEquipos();
}

// Ejecutar la función al cargar la página
window.onload = function () {
  actualizarListaEquipos();
};
