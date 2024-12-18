/*
Bootstrap scopes the :invalid and :valid styles to parent .was-validated class, usually applied to the <form>. Otherwise, any required field without a value shows up as invalid on 
page load. This way, you may choose when to activate them (typically after form submission is attempted).

Esto lo he sacado de la documentación de Bootstrap (https://getbootstrap.com/docs/5.3/forms/validation/#how-it-works), predeterminado, bootstrap pone la etiqueta a invalid si no tiene clase,
por eso en mi código constantemente al validar las cosas, les doy la clase is-valid y hago un remove de la clase is-invalid (LINEA 214) , para que dinámicamente se vea en verde o en rojo dependiendo de si cumple la validación

*/
// Constantes de validación
const LONGITUD_NOMBRE = 30;
const EDAD_MINIMA = 18;
const FECHA_ACTUAL = new Date();
const LONGITUD_CP = 5;

// Expresiones regulares
const REGEX_NOMBRE = /^[a-zA-Z\s]+$/;
const REGEX_DNI = /^[0-9]{8}[A-Z]$/;
const REGEX_MATRICULA = /^[0-9]{4}-[A-Z]{3}$/;
const REGEX_JPG = /\.jpg$/;
const REGEX_APELLIDO = /^[a-zA-Z\s]+$/
const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGEX_CODIGOPOSTAL = /^\d{5}$/;
const REGEX_TELEFONO = /^\d{9}$/;

// Funciones de validación

function validarNombre(nombre) {
    return nombre.trim() !== '' && REGEX_NOMBRE.test(nombre) && nombre.length <= LONGITUD_NOMBRE;
}

function validarApellidos(apellidos) {
    return apellidos.trim() !== '' && REGEX_APELLIDO.test(apellidos) && apellidos.length <= LONGITUD_NOMBRE;
}

function validarDNI(dni) {
    return dni.trim() !== '' && REGEX_DNI.test(dni);
}

function validarCorreo(correo) {
    return correo.trim() !== '' && REGEX_CORREO.test(correo);
}

function validarTelefono(telefono) {
    return telefono.trim() !== '' && REGEX_TELEFONO.test(telefono);
}

function validarCodigoPostal(codigoPostal) {
    return codigoPostal.trim() !== '' && REGEX_CODIGOPOSTAL.test(codigoPostal);
}
// Función para validar fechas en el formato correcto (solo comparación con la fecha actual)
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
  return tipoSeguro === 'terceros' || tipoSeguro === 'terceros_ampliado' || tipoSeguro === 'con_franquicia' || tipoSeguro === 'todo_riesgo';
}

function validarTipoVehiculo(tipoVehiculo){
  return tipoVehiculo === 'diesel' ||tipoVehiculo === 'gasolina' ||tipoVehiculo === 'hibrido' || tipoVehiculo=== 'electrico'
}

function validarSexo(sexo){
  return sexo === 'hombre' ||sexo === 'mujer';
}
// Función para calcular los años de antigüedad del permiso de conducir
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
            precioBase = 500; 
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

        // Mostrar feedback visual, en este caso hago uso de estas dos clases de Bootstrap, para así ahorrarme crear una clase nueva y darle estilo
        // la is-invalid pone borde rojo y una pequeña marca (x) y el is-valid borde verde y un tick (V)
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
        Andalucia: ['Sevilla', 'Granada', 'Málaga', 'Córdoba', 'Almería', 'Jaén', 'Huelva', 'Cádiz'],
        Aragon: ['Zaragoza', 'Huesca', 'Teruel'],
        Asturias: ['Oviedo', 'Gijón', 'Avilés'],
        Baleares: ['Palma de Mallorca', 'Ibiza', 'Menorca'],
        Canarias: ['Tenerife', 'Gran Canaria', 'La Palma', 'Lanzarote', 'Fuerteventura'],
        Cantabria: ['Santander', 'Torrelavega'],
        CastillaLaMancha: ['Toledo', 'Ciudad Real', 'Albacete', 'Cuenca', 'Guadalajara'],
        CastillaYLeon: ['Valladolid', 'León', 'Burgos', 'Salamanca', 'Segovia', 'Soria', 'Ávila', 'Palencia', 'Zamora'],
        Cataluna: ['Barcelona', 'Girona', 'Tarragona', 'Lleida'],
        Ceuta: ['Ceuta'],
        Extremadura: ['Cáceres', 'Badajoz'],
        Galicia: ['A Coruña', 'Lugo', 'Ourense', 'Pontevedra'],
        Madrid: ['Madrid'],
        Melilla: ['Melilla'],
        Murcia: ['Murcia', 'Cartagena', 'Lorca'],
        Navarra: ['Pamplona', 'Tudela'],
        PaisVasco: ['Bilbao', 'San Sebastián', 'Vitoria'],
        Rioja: ['Logroño'],
        Valencia: ['Valencia', 'Alicante', 'Castellón']
    };
    
    const marcasModelos = {
        audi: ['A3', 'A4', 'Q5'],
        bmw: ['Serie 1', 'Serie 3', 'X5'],
        ford: ['Fiesta', 'Focus', 'Mondeo'],
        mercedes: ['C-Class', 'E-Class', 'GLA'],
        toyota: ['Corolla', 'RAV4', 'Yaris'],
        volkswagen: ['Golf', 'Polo', 'Tiguan'],
        nissan: ['Qashqai', 'Micra', 'Leaf']
    };

const comunidadSelect = document.getElementById('comunidad');
const provinciaSelect = document.getElementById('provincia');
const marcaSelect = document.getElementById('marca');
const modeloSelect = document.getElementById('modelo');

// --- Función para manejar el cambio de comunidad ---
comunidadSelect.addEventListener('change', () => {
  const comunidadSeleccionada = comunidadSelect.value;
  provinciaSelect.innerHTML = '';  // Limpiar provincias antes de añadir nuevas opciones

//   console.log('Comunidad seleccionada:', comunidadSeleccionada);  

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
// Modifica la función para incluir la foto JPG
function crearTarjetas(datosUsuario) {
  const contenedorTarjetas = document.getElementById('resultado');
  contenedorTarjetas.innerHTML = ''; // Limpiar tarjetas existentes

  const tiposDeSeguros = ['terceros', 'terceros_ampliado', 'con_franquicia', 'todo_riesgo'];

  // Obtener la foto JPG recibida por el formulario
  const archivoCarnet = document.getElementById('foto_carnet').files[0];
  
  //variable para la imagen HTML
  let imagenHTML = '';

  // Si hay una imagen JPG seleccionada, usar URL.createObjectURL para generar una URL temporal
  if (archivoCarnet) {
      const imagenURL = URL.createObjectURL(archivoCarnet);  // Crear URL temporal para la imagen
      console.log("Imagen cargada:", imagenURL);  // Verifica la URL de la imagen
      // Usar la imagen URL en la tarjeta
      imagenHTML = `<img src="${imagenURL}" alt="Foto del carnet" style="max-width: 100%; max-height: 200px; margin-bottom: 15px;">`;
  }

  // Iterar sobre los tipos de seguro y crear tarjetas
  tiposDeSeguros.forEach((tipo) => {
      const datosConTipo = { ...datosUsuario, tipoSeguro: tipo }; // Copia todas las propiedades existentes del objeto datosUsuario
      const precioFinal = calcularSeguro(datosConTipo);

      const tarjeta = document.createElement('div');
      tarjeta.className = `card mb-3 border-secondary`;

      // Obtener el tipo de seguro seleccionado en el formulario
      const tipoSeguroSeleccionado = document.getElementById('tipo_seguro').value;

      // Si el tipo de seguro seleccionado coincide con el tipo de la tarjeta, aplicar la clase 'cartaSeleccionada'
      if (tipoSeguroSeleccionado === tipo) {
          tarjeta.classList.add('cartaSeleccionada');
      }

      // Contenido de la tarjeta, incluyendo la imagen si se cargó
      tarjeta.innerHTML = `
          <div class="card-body">
              <h5 class="card-title">${tipo.replace('_', ' ').toUpperCase()}</h5>
              ${imagenHTML}  <!-- Aquí se agrega la foto del carnet si está presente -->
              <p class="card-text"><strong>Precio: ${precioFinal.toFixed(2)} €</strong></p>
              <button type="button" class="btn btn-outline-secondary btn-contratar">Contratar</button>
              <button type="button" class="btn btn-outline-danger btn-descartar">Descartar</button>
          </div>
      `;

      // Añadir eventos para los botones
      const botonContratar = tarjeta.querySelector('.btn-contratar');
      const botonDescartar = tarjeta.querySelector('.btn-descartar');

      botonContratar.addEventListener('click', () => {
          alert(`Gracias por contratar el seguro ${tipo}. Atentamente tu asesor de seguros ${datosUsuario.nombre} ${datosUsuario.apellidos}`);
      });

      botonDescartar.addEventListener('click', () => {
          tarjeta.remove(); // Elimina la tarjeta del DOM
      });

      // Añadir la tarjeta al contenedor
      contenedorTarjetas.appendChild(tarjeta);
  });
}




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
        // si algun input por lo que sea esté en rojo (is-invalid) nunca entrará al IF y nos mostrará que completemos los campos, lo mismo con el checkbox
        // console.log(datos);
        if (formIsValid) {
            const checkboxTerminos = document.getElementById('terminos');
            
            // Verificar si el checkbox de términos está marcado
            if (!checkboxTerminos.checked) {
                alert('Acepta los términos, por favor.');
            } else {
                // Si el formulario y el checkbox son válidos, calcular el seguro
                const precioSeguro = calcularSeguro(datos);
                crearTarjetas(datos);
            }
        } else {
            alert('Por favor, complete correctamente todos los campos.');
        }

  });
  
});

