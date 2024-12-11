# Proyecto de Formulario para Cálculo de Seguro de Coche

Nos ha contratado una aseguradora de coche para crear un formulario y calcular el precio del seguro en función de los datos recogidos. A continuación se detallan los requisitos mínimos del proyecto.

## Tipos de Campos del Formulario

- **Texto**: 
  - Nombre
  - Apellidos
  - DNI
  - Correo electrónico

- **Números**:
  - Teléfono
  - Código postal

- **Fecha**:
  - Fecha del carnet de conducir
  - Fecha de matriculación
  - Fecha de nacimiento

- **Selectores**:
  - Sexo (Hombre, Mujer, Otro)
  - Comunidad, Provincia (dependientes)
  - Marca, Modelo (dependientes)
  - Tipo de seguro (Terceros, Terceros ampliado, Con franquicia, Todo riesgo)
  - Tipo vehículo (Diesel, Gasolina, Híbrido, Eléctrico)

- **Fichero**: Permite subir un fichero de imagen en formato `.jpg` con la foto del carnet de conducir. Opcionalmente, se puede previsualizar el fichero y subirlo arrastrándolo.

- **Checkbox**: Casilla de aceptación de términos y condiciones.

## Validaciones

- **Nombre y Apellidos**: Solo letras, no vacíos, máximo 30 caracteres por campo.
- **DNI**: Formato válido. Ocho dígitos y letra mayúscula.
- **Fecha de nacimiento**: Mayor de 18 años.
- **Fecha del carnet**: No posterior a la fecha actual.
- **Fecha de matriculación**: No posterior a la fecha actual.
- **Matrícula**: Formato español válido (e.g., 1234-ABC).
- **Código postal**: 5 dígitos numéricos.
- **Fichero**: Debe ser de tipo `.jpg`.

Es recomendable validar en tiempo real cada campo para mejorar la experiencia de usuario. Algunos campos se actualizarán de forma dinámica, como al seleccionar una comunidad, que cargará sus provincias correspondientes.

## Función de Cálculo del Seguro

El formulario no debe enviarse por defecto. Al enviar el formulario, se ejecutará la función `calcularSeguro`, que tomará en cuenta los siguientes datos para el cálculo:

- **Edad del conductor**: Mayor de 18 años; los menores de 25 años pagan un 10% más.
- **Años con el permiso de conducir**: Descuento del 10% para quienes tienen más de 5 años de experiencia.
- **Penalización por tipo de vehículo**: 
  - Diesel: 20%
  - Gasolina: 15%
  - Híbrido: 5%
  - Eléctrico: 0%
- **Precio base tipo de seguro**:
  - 500 (Terceros)
  - 650 (Terceros ampliado)
  - 750 (Con franquicia)
  - 1000 (Todo riesgo)
- **Años del coche**: Penalización del 1% por cada año de antigüedad, a partir de 10 años.

## Resultados

Como resultado, se mostrarán cuatro tarjetas con los diferentes precios, junto con dos botones: uno para **descartar** y otro para **contratar** el seguro.

- **Si descartas** una tarjeta, esta se eliminará.
- **Si contratas**, se mostrará una alerta con el mensaje:
  
  ```text
  Gracias por contratar. Atentamente tu asesor de seguros [TunombreyApellidos]
