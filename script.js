/*
    
    Validaciones
    ------------
    Nombre y Apellidos: Solo letras, no vacíos. Máximo 30 caracteres por campo.
    DNI: Formato válido. Ocho dígitos y letra mayúscula.
    Fecha de nacimiento: Mayor de 18.
    Fecha del carnet: No posterior a la fecha actual.
    Fecha de matriculación: No posterior a la fecha actual.
    Matrícula: Formato español válido (e.g., 1234-ABC).
    Código postal: 5 dígitos numéricos.
    Fichero tipo jpg
*/

const LONGITUD_NOMBRE = 30;
const EDAD_MINIMA = 18;
const FECHA_ACTUAL = new Date(); // Con esto hay q hacer la condicion de fecha del carne y fecha de matriculacion
const LONGITUD_CP = 5;

// Expresiones regulares
const REGEX_DNI = /^[0-9]{8}[A-Z]$/;
const REGEX_MATRICULA = /^[0-9]{4}-[A-Z]{3}$/;
const REGEX_JPG = /\.jpg$/;

function validarNombre(nombre){
    return /^[a-zA-Z\s]+$/.test(nombre) && nombre.length <= LONGITUD_NOMBRE;
}

function validarDNI(dni){
    return REGEX_DNI.test(dni);
}

function validarFechaNacimiento(fechaNacimiento){
    const fecha = new Date(fechaNacimiento);
    const edad = FECHA_ACTUAL.getFullYear() - fecha.getFullYear();
    return edad >= EDAD_MINIMA;
}

// Se puede reciclar la misma funcion tanto para el carné como con la matriculacion
function validarFecha(fecha){
    return new Date(fecha) <= FECHA_ACTUAL;
}

function validarMatricula(matricula){
    return REGEX_MATRICULA.test(matricula);
}

function validarCodigoPostal(codigoPostal){
    return /^\d{5}$/.test(codigoPostal); 
}

function validarArchivoJPG(archivo) { 
    return REGEX_JPG.test(archivo.name);
}

function calculoSeguro(datos){
    let precioBase;
    switch (datos.tipoSeguro) {
        case value:
            
            break;
    
        default:
            break;
    }
}


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




}
