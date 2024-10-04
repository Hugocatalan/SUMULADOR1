// Genero un array para guardar los usuarios registrados
let usuarios = [
    { nombre: "Hugo", contraseña: "123" },
    { nombre: "Admin", contraseña: "123" },
    { nombre: "Marco", contraseña: "1234" },
    { nombre: "Tutor", contraseña: "1234" }

];

// Unifique los sms en una constante y luego los uso cuando sean necesarios
const mensajes = {
    usuarioRegistrado: (nombre) => `${nombre} ha sido registrado correctamente.`,
    usuarioExistente: "Este nombre de usuario ya está registrado. Intente con otro.",
    accesoConcedido: (nombre) => `¡Acceso concedido! Bienvenido/a, ${nombre}. ¡Este es tu espacio!`,
    usuarioIncorrecto: "Usuario o contraseña incorrectos.",
    maxIntentos: "Superaste el máximo de intentos. El acceso ha sido bloqueado. ¡HASTA LA PRÓXIMA!",
    intentosRestantes: (intentos) => `Intentos restantes: ${3 - intentos}`,
    salir: "Has salido del programa. Lo esperamos en una próxima oportunidad.",
    opcionNoValida: "La opción no es válida. Intente de nuevo."
};

// Función para registrar un usuario
function registrarUsuario() {
    let nombre = prompt("Ingrese su nombre:");
    if (nombre === null) return alert(mensajes.salir);  // Salir si se cancela
    let contraseña = prompt("Ingrese su contraseña:");
    if (contraseña === null) return alert(mensajes.salir);  // Salir si se cancela

    // Verificar que la contraseña no esté vacía
    if (!contraseña) {
        alert("La contraseña no puede estar vacía. Intente nuevamente.");
        return;
    }

    // Verificar si el usuario ya existe en el array
    let usuarioExiste = usuarios.some(usuario => usuario.nombre === nombre);

    if (usuarioExiste) {
        alert(mensajes.usuarioExistente);
    } else {
        // Guardamos el usuario y la contraseña en el array
        usuarios.push({ nombre: nombre, contraseña: contraseña });
        alert(mensajes.usuarioRegistrado(nombre));
        iniciarSesion();  // Después de registrarse, va al inicio de sesión
    }
}

// Función para iniciar sesión
function iniciarSesion() {
    let intentosFallidos = 0; // Contador de intentos fallidos
    let accesoConcedido = false;  // Acceso denegado por defecto

    // Ciclo while para controlar intentos de acceso
    while (intentosFallidos < 3 && !accesoConcedido) {
        let nombre = prompt("Ingrese su nombre de usuario:");
        if (nombre === null) return alert(mensajes.salir);  // Salir si se cancela
        let contraseña = prompt("Ingrese su contraseña:");
        if (contraseña === null) return alert(mensajes.salir);  // Salir si se cancela

        // Verifico si el usuario existe y la contraseña es correcta
        let usuarioEncontrado = usuarios.find(usuario => usuario.nombre === nombre && usuario.contraseña === contraseña);

        // Verificación de acceso
        if (usuarioEncontrado) {
            alert(mensajes.accesoConcedido(nombre));
            accesoConcedido = true;
        } else {
            alert(mensajes.usuarioIncorrecto);
            intentosFallidos++; // Incremento el contador de errores
            if (intentosFallidos === 3) {
                alert(mensajes.maxIntentos);
            } else {
                alert(mensajes.intentosRestantes(intentosFallidos)); // Muestra cuántos intentos quedan
            }
        }
    }
}

// Función para ver si el usuario quiere registrarse, ingresar o salir
function menu() {
    let opcion = prompt("¿Desea registrarse, ingresar o salir? (escriba 'R' para registrarse, 'I' para ingresar o 'S' para salir)");
    if (opcion === null) return alert(mensajes.salir);  // Salir si se cancela

    // Verifico lo que ingresó el usuario por un switch
    switch (opcion.toLowerCase()) {
        case 'r':
            registrarUsuario();
            break;
        case 'i':
            iniciarSesion();
            break;
        case 's':
            alert(mensajes.salir);
            break;
        default:
            alert(mensajes.opcionNoValida);
            menu();  // Vuelvo a preguntar si la opción no es válida
    }
}

// Llamada inicial al menú
menu();

