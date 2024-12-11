/*
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
// buscar expresion regular para DNI
const EDAD_MINIMA = 18;
const FECHA_ACTUAL = Date.now(); // Con esto hay q hacer la condicion de fecha del carne y fecha de matriculacion
// buscar expresion regular para matricula
const LONGITUD_CP = 5;
// buscar como aceptar solo JPG


