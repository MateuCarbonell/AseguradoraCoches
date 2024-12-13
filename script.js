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

function validarTipoSeguro(tipoSeguro) {
  // Asegúrate de que el valor que pasa a esta función es válido
  return tipoSeguro === 'terceros' || tipoSeguro === 'terceros_ampliado' || tipoSeguro === 'con_franquicia' || tipoSeguro === 'todo_riesgo';
}

function validarTipoVehiculo(tipoVehiculo){
  return tipoVehiculo === 'diesel' ||tipoVehiculo === 'gasolina' ||tipoVehiculo === 'hibrido' || tipoVehiculo=== 'electrico'
}

function validarSexo(sexo){
  return sexo === 'hombre' ||sexo === 'mujer';
}

function calcularAñosPermiso(fechaCarnet) {
  const fechaEmision = new Date(fechaCarnet);
  const añoActual = new Date().getFullYear();
  const añosPermiso = añoActual - fechaEmision.getFullYear();
  return añosPermiso;
}

// Función para calcular los años del coche
function calcularAñosCoche(fechaMatriculacion) {
  const fechaMatricula = new Date(fechaMatriculacion);
  const añoActual = new Date().getFullYear();
  const añosCoche = añoActual - fechaMatricula.getFullYear();
  return añosCoche;
}
function validarCheckbox(checkboxTerminos){
  return checkboxTerminos;
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

    // Penalizaciones y descuentos
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

// Event listener para validaciones en tiempo real
document.addEventListener('DOMContentLoaded', () => {
    // Validaciones en tiempo real
    const form = document.getElementById('form');
    form.addEventListener('input', (e) => {
        const input = e.target;
        let isValid = false;

        switch (input.id) {
            case 'nombre':
                isValid = validarNombre(input.value);
                break;
            case 'apellidos':
                isValid = validarApellidos(input.value);
                break;
            case 'dni':
                isValid = validarDNI(input.value);
                break;
            case 'correo':
                isValid = validarCorreo(input.value);
                break;
            case 'telefono':
                isValid = validarTelefono(input.value);
                break;
            case 'codigo_postal':
                isValid = validarCodigoPostal(input.value);
                break;
            case 'fecha_nacimiento':
                isValid = validarFechaNacimiento(input.value);
                break;
            case 'fecha_carnet':
            case 'fecha_matriculacion':
                isValid = validarFecha(input.value);
                break;
            case 'matricula':
                isValid = validarMatricula(input.value);
                break;
            case 'foto_carnet':
                isValid = validarArchivoJPG(input.files[0]);
                break;
            case 'tipo_seguro':
              isValid = validarTipoSeguro(input.value);
              break;
            case 'tipo_vehiculo':
              isValid = validarTipoVehiculo(input.value);
              break;
            case 'sexo':
              isValid = validarSexo(input.value);
              break;
            case 'terminos':
              isValid = validarCheckbox(input.value);
              break;
        }

        // Mostrar feedback visual (por ejemplo, border color)
        if (isValid) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        } else {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
        }
    });

    // --- Selector dinámico de comunidades y provincias ---
const comunidadesProvincias = {
  Andalucia: ['Sevilla', 'Granada', 'Málaga', 'Córdoba'],
  Cataluña: ['Barcelona', 'Girona', 'Tarragona', 'Lleida'],
  Madrid: ['Madrid'],
  Galicia: ['A Coruña', 'Lugo', 'Ourense', 'Pontevedra']
};

const marcasModelos = {
  audi: ['A3', 'A4', 'Q5'],
  bmw: ['Serie 1', 'Serie 3', 'X5'],
  ford: ['Fiesta', 'Focus', 'Mondeo'],
};

const comunidadSelect = document.getElementById('comunidad');
const provinciaSelect = document.getElementById('provincia');
const marcaSelect = document.getElementById('marca');
const modeloSelect = document.getElementById('modelo');

// --- Función para manejar el cambio de comunidad ---
comunidadSelect.addEventListener('change', () => {
  const comunidadSeleccionada = comunidadSelect.value;
  provinciaSelect.innerHTML = '';  // Limpiar provincias antes de añadir nuevas opciones

  console.log('Comunidad seleccionada:', comunidadSeleccionada);  // Verifica el valor de la comunidad

  // Validación para comunidad
  if (comunidadSeleccionada && comunidadesProvincias[comunidadSeleccionada]) {
      // Añadir provincias correspondientes
      comunidadesProvincias[comunidadSeleccionada].forEach((provincia) => {
          const option = document.createElement('option');
          option.value = provincia;
          option.textContent = provincia;
          provinciaSelect.appendChild(option);
          provinciaSelect.classList.add('is-valid');

      });

      // Si la comunidad es válida, actualizamos el borde a verde
      comunidadSelect.classList.remove('is-invalid');
      comunidadSelect.classList.add('is-valid');
  }
});

provinciaSelect.addEventListener('change',() =>{
  const provinciaSeleccionada = provinciaSelect.value;
  if(provinciaSeleccionada){
    provinciaSelect.classList.remove('is-invalid');
    provinciaSelect.classList.add('is-valid');
  }
})

// --- Función para manejar el cambio de marca ---
marcaSelect.addEventListener('change', () => {
  const marcaSeleccionada = marcaSelect.value;
  modeloSelect.innerHTML = '';  // Limpiar modelos antes de añadir nuevos

  // Si se selecciona una marca válida, añadir los modelos correspondientes
  if (marcaSeleccionada && marcasModelos[marcaSeleccionada]) {
      marcasModelos[marcaSeleccionada].forEach((modelo) => {
          const option = document.createElement('option');
          option.value = modelo;
          option.textContent = modelo;
          modeloSelect.appendChild(option);
          modeloSelect.classList.add('is-valid');
      });

      // Actualizar el borde de marca a verde si la marca es válida
      marcaSelect.classList.remove('is-invalid');
      marcaSelect.classList.add('is-valid');
  }
  }
);

// --- Función para manejar el cambio de modelo ---
modeloSelect.addEventListener('change', () => {
  const modeloSeleccionado = modeloSelect.value;
  
  if (modeloSeleccionado) {
      // Si se selecciona un modelo válido, actualizamos el borde a verde
      modeloSelect.classList.remove('is-invalid');
      modeloSelect.classList.add('is-valid');
  } 
});

    // Envío del formulario
    form.addEventListener('submit', (e) => {
        
      
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
          edad: validarFechaNacimiento(document.getElementById('fecha_nacimiento').value),
          añosPermiso: calcularAñosPermiso(document.getElementById('fecha_carnet').value),
          añosCoche: calcularAñosCoche(document.getElementById('fecha_matriculacion').value),
          checkboxTerminos : validarCheckbox(document.getElementById('terminos').value)
            
      };

        // Verificación si todos los campos son válidos
        const formIsValid = form.querySelectorAll('.is-invalid').length === 0;

        if (formIsValid) {
            const checkboxTerminos = document.getElementById('terminos');
            
            // Verificar si el checkbox de términos está marcado
            if (!checkboxTerminos.checked) {
                alert('Acepta los términos, por favor.');
            } else {
                // Si el formulario y el checkbox son válidos, calcular el seguro
                const precioSeguro = calcularSeguro(datos);
                document.getElementById('resultado').innerHTML = `El precio del seguro es: ${precioSeguro.toFixed(2)} €`;
            }
        } else {
            alert('Por favor, complete correctamente todos los campos.');
        }

  });
});
