// Constantes de validación
const LONGITUD_NOMBRE = 30;
const EDAD_MINIMA = 18;
const FECHA_ACTUAL = new Date();
const LONGITUD_CP = 5;

// Expresiones regulares
const REGEX_DNI = /^[0-9]{8}[A-Z]$/;
const REGEX_MATRICULA = /^[0-9]{4}-[A-Z]{3}$/;
const REGEX_JPG = /\.jpg$/;

// Funciones de validación
function validarNombre(nombre) {
  return nombre.trim() !== '' && /^[a-zA-Z\s]+$/.test(nombre) && nombre.length <= LONGITUD_NOMBRE;
}

function validarApellidos(apellidos) {
  return apellidos.trim() !== '' && /^[a-zA-Z\s]+$/.test(apellidos) && apellidos.length <= LONGITUD_NOMBRE;
}

function validarDNI(dni) {
  return dni.trim() !== '' && REGEX_DNI.test(dni);
}

function validarCorreo(correo) {
  return correo.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}

function validarTelefono(telefono) {
  return telefono.trim() !== '' && /^\d{9}$/.test(telefono);
}

function validarCodigoPostal(codigoPostal) {
  return codigoPostal.trim() !== '' && /^\d{5}$/.test(codigoPostal);
}

function validarFecha(fecha) {
  return fecha.trim() !== '' && new Date(fecha) <= FECHA_ACTUAL;
}

function validarFechaNacimiento(fechaNacimiento) {
  const fecha = new Date(fechaNacimiento);
  const edad = FECHA_ACTUAL.getFullYear() - fecha.getFullYear();
  return fechaNacimiento.trim() !== '' && edad >= EDAD_MINIMA;
}

function validarMatricula(matricula) {
  return matricula.trim() !== '' && REGEX_MATRICULA.test(matricula);
}

function validarArchivoJPG(archivo) {
  return archivo && REGEX_JPG.test(archivo.name);
}

// Función de cálculo del seguro
function calcularSeguro(datos) {
  let precioBase;

  switch (datos.tipoSeguro) {
    case 'terceros':
      precioBase = 500;
      break;
    case 'terceros_ampliado':
      precioBase = 650;
      break;
    case 'con_franquicia':
      precioBase = 750;
      break;
    case 'todo_riesgo':
      precioBase = 1000;
      break;
    default:
      precioBase = 500; // Valor por defecto
  }

 // penalizaciones y descuentos
  let penalizacionEdad = 0;
  let descuentoPermiso = 0;
  let penalizacionVehiculo = 0;
  let penalizacionAntiguedad = 0;

  if (datos.edad < 25) {
    penalizacionEdad = precioBase * 0.10;
  }

  if (datos.añosPermiso > 5) {
    descuentoPermiso = precioBase * 0.10;
  }

  switch (datos.tipoVehiculo) {
    case 'diesel':
      penalizacionVehiculo = precioBase * 0.20;
      break;
    case 'gasolina':
      penalizacionVehiculo = precioBase * 0.15;
      break;
    case 'hibrido':
      penalizacionVehiculo = precioBase * 0.05;
      break;
    case 'electrico':
      penalizacionVehiculo = 0;
      break;
    default:
      penalizacionVehiculo = 0; 
  }

  if (datos.añosCoche > 10) {
    penalizacionAntiguedad = precioBase * ((datos.añosCoche - 10) * 0.01);
  }

  let precioFinal = precioBase + penalizacionEdad - descuentoPermiso + penalizacionVehiculo + penalizacionAntiguedad;
  return precioFinal;
}

// Event listener para validaciones en tiempo real y cálculo de seguro
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();

    // Recolección de datos en el momento del envío
    const datos = {
      nombre: document.getElementById('nombre').value,
      apellidos: document.getElementById('apellidos').value,
      dni: document.getElementById('dni').value,
      correo: document.getElementById('correo').value,
      telefono: document.getElementById('telefono').value,
      codigoPostal: document.getElementById('codigo_postal').value,
      fechaCarnet: document.getElementById('fecha_carnet').value,
      fechaMatriculacion: document.getElementById('fecha_matriculacion').value,
      fechaNacimiento: document.getElementById('fecha_nacimiento').value,
      sexo: document.getElementById('sexo').value,
      comunidad: document.getElementById('comunidad').value,
      provincia: document.getElementById('provincia').value,
      marca: document.getElementById('marca').value,
      modelo: document.getElementById('modelo').value,
      tipoVehiculo: document.getElementById('tipo_vehiculo').value,
      tipoSeguro: document.getElementById('tipo_seguro').value,
      archivoCarnet: document.getElementById('foto_carnet').files[0],
      edad: calcularEdad(document.getElementById('fecha_nacimiento').value),
      añosPermiso: calcularañosPermiso(document.getElementById('fecha_carnet').value),
      añosCoche: calcularañosCoche(document.getElementById('fecha_matriculacion').value)
    };

    const precioSeguro = calcularSeguro(datos);
    document.getElementById('resultado').innerHTML = `El precio del seguro es: ${precioSeguro} €`;
  });
});

function calcularEdad(fechaNacimiento) {
  const fecha = new Date(fechaNacimiento);
  let edad = FECHA_ACTUAL.getFullYear() - fecha.getFullYear();
  const mes = FECHA_ACTUAL.getMonth() - fecha.getMonth();
  if (mes < 0 || (mes === 0 && FECHA_ACTUAL.getDate() < fecha.getDate())) {
    edad--;
  }
  return edad;
}

function calcularañosPermiso(fechaCarnet) {
  const fecha = new Date(fechaCarnet);
  let años = FECHA_ACTUAL.getFullYear() - fecha.getFullYear();
  const mes = FECHA_ACTUAL.getMonth() - fecha.getMonth();
  if (mes < 0 || (mes === 0 && FECHA_ACTUAL.getDate() < fecha.getDate())) {
    años--;
  }
  return años;
}

function calcularañosCoche(fechaMatriculacion) {
  const fecha = new Date(fechaMatriculacion);
  let años = FECHA_ACTUAL.getFullYear() - fecha.getFullYear();
  const mes = FECHA_ACTUAL.getMonth() - fecha.getMonth();
  if (mes < 0 || (mes === 0 && FECHA_ACTUAL.getDate() < fecha.getDate())) {
    años--;
  }
  return años;
}
