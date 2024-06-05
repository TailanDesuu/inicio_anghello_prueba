// Función para validar el formato del correo electrónico
const validarEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

// validar el formato del número de teléfono ( solo números)
const validarTelefono = (telefono) => {
    const re = /^\d{9}$/;
    return re.test(String(telefono));
};

// validación y envío del formulario
formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Obtener datos del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const rut = document.getElementById('rut').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const edad = document.getElementById('edad').value.trim();
    const fnacimiento = document.getElementById('fnacimiento').value.trim();
    const fgusto = document.getElementById('fgusto').value.trim();
    const fnonimo = document.getElementById('fnonimo').value.trim();
    
    // Validar datos del formulario
    if (!nombre || !apellido || !rut || !correo || !edad || !fnacimiento || !fgusto || !fnonimo) {
        alert('Todos los campos son obligatorios.');
        return;
    }

    if (!validarEmail(correo)) {
        alert('Por favor, ingrese un correo electrónico válido.');
        return;
    }


    try {
        // Agregar un nuevo documento con un ID generado
        await addDoc(collection(db, 'contactos'), {
            nombre: nombre,
            apellido: apellido,
            rut: rut,
            correo: correo,
            edad: edad,
            fnacimiento: fnacimiento,
            fgusto: fgusto,
            fnonimo: fnonimo
        });
        alert('Datos enviados exitosamente!');
        formulario.reset(); // Limpiar el formulario
    } catch (e) {
        console.error('Error al agregar el documento: ', e);
        alert('Hubo un error al enviar los datos.');
    }
});
