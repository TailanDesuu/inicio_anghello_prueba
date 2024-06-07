import { obtenerusuarios, actualizarusuarios, registrarusuarios } from "./promesas.js";

document.addEventListener("DOMContentLoaded", () => { // añade event liseners alos botones registar y actualizar
    const btnRegistrar = document.getElementById("btnRegistrar");
    const btnActualizar = document.getElementById("btnActualizar");

    if (btnRegistrar) {
        btnRegistrar.addEventListener('click', registrar);// recolecta los datos del formulario u los envia a la base de datos
    }
    if (btnActualizar) {
        btnActualizar.addEventListener('click', actualizar);//lo mimos pero con actualizar
    }
    cargarDatos(); // Llamamos  para cargar los datos para mostarlos en la tabla
});

// esta funcion maneja el eveneto clic en el boton registro y recolecto los datos del formulario (registro)
const registrar = (event) => {   
    event.preventDefault();                     
        
    //  los datos del formulario
    let eNombre = document.getElementById("nombre");
    let eApellido = document.getElementById("apellido");  
    let eRut = document.getElementById("rut");
    let eCorreo = document.getElementById("correo");
    let eEdad = document.getElementById("edad");
    let eFnacimiento = document.getElementById("fnacimiento");
    let eContrasena = document.getElementById("Contrasena");
    let eFgusto = document.getElementById("fgusto");

    // Validar que se hayan encontrado los elementos del formulario y si no tira un comentario por consola 
    if (!eNombre || !eApellido || !eRut || !eCorreo || !eEdad || !eFnacimiento || !eContrasena || !eFgusto) {
        console.log("Uno o más elementos del formulario no se encontraron."); // este
        return;
    }

    // Obtener los valores de los elementos del formulario
    let vNombre = eNombre.value;
    let vApellido = eApellido.value;
    let vRut = eRut.value;
    let vCorreo = eCorreo.value;
    let vEdad = eEdad.value;
    let vFnacimiento = eFnacimiento.value;
    let vContrasena = eContrasena.value;
    let vFgusto = eFgusto.value;

    // Obtener el estado de los checkboxes
    let creadorChecked = document.getElementById("Creador")?.checked || false;
    let lectorChecked = document.getElementById("lector")?.checked || false;

    // Crear el objeto con los datos del usuario
    let objeto = {
        nombre: vNombre,
        apellido: vApellido,
        rut: vRut,
        correo: vCorreo,
        edad: vEdad,
        fnacimiento: vFnacimiento,
        contrasena: vContrasena,
        fgusto: vFgusto,
        creador: creadorChecked,
        lector: lectorChecked
    };

    // Registrar al usuario en la base de datos
    
    registrarusuarios(objeto) // llamamos ala funcion registrausuarios y le pasamos el argumetno objeto 

        .then(() => {// esta es una promesa que se ejecuta cuando el registro es exitoso

            alert("¡Se registró con éxito!");// la alerta para validar que se envio

            window.location.href = "pagina.html"; // te manda a la pagina de incio usando window.locarion.href

            cargarDatos();  // Actualizar la tabla de usuarios
        })
        .catch((error) => {//el catch maneja cualquier error que pueda ocurrir al enviar el registro ala base de datos

            console.log(error);// esta alerta se muestra en consola
        });
};
// esta funcion optiene los usuarios de la base de datos y construye la tabla que se muestra en pagina.html
const cargarDatos = () => {

    // Obtener los usuarios de la base de datos
    obtenerusuarios()

        .then((usuarios) => {// esta funcion de control se ejecuta cuando la promesa anterio (obtener usuarios ) se ejecuta correctamente en caso de que no, pues no se muestra nada todo en negro
            
            // Construir la tabla con los datos de los usuarios
            let estructura = ''; // se crea esta variable para almacenar la tabla usuario
            usuarios.forEach((usuario) => { // este for, recorre cada objeto "usuario" en la coleccion "usuarios"de la base de datos
                estructura += '<tr>'; // para cada usuario se contruye su fila en la tabla con (tr) y se agregan los datos con (td)
                estructura += '<td>' + usuario.nombre + '</td>'; // con los valores nombre,rut,correo, etc
                estructura += '<td>' + usuario.apellido + '</td>';
                estructura += '<td>' + usuario.rut + '</td>';
                estructura += '<td>' + usuario.correo + '</td>';
                estructura += '<td>' + usuario.edad + '</td>';
                estructura += '<td>' + usuario.fnacimiento + '</td>';
                estructura += '<td><button class="editar" data-id="' + usuario.id + '">Editar</button></td>';// boton editar en la fila acciones de la tabla
                estructura += '<td><button class="eliminar" data-id="' + usuario.id + '">Eliminar</button></td>';// boton eliminar en la fila acciones de la tabla
                estructura += '</tr>'; // cada boton contiene el atributo (data-id) que contiene el Id del usuario lo cualles permite borrar o editar
            });

            // Actualizar la tabla en el DOM
            const tbUsuarios = document.getElementById('tbusuarios'); // selecciona la tabla usuarios mediante su ID (tbusuarios)
            if (tbUsuarios) { // verifica si se encontro el elemento 
                tbUsuarios.innerHTML = estructura; // si el elemento existe se actualiza con (innerhtml)

                //selecciona todos los elementos que tienen la clase (editar)osea los botones 
                const botonesEditar = document.querySelectorAll('.editar');// para cada editar se agrega un event listener que se activa al hacer click
                botonesEditar.forEach((boton) => {
                    boton.addEventListener('click', () => {// dentro tienen el ID del usuario asociado para editar mediante (data-id)
                        const idUsuario = boton.getAttribute('data-id');
                       
                    });
                });
                // lo mismo que el anterior pero con los botones eliminar
                const botonesEliminar = document.querySelectorAll('.eliminar');
                botonesEliminar.forEach((boton) => {
                    boton.addEventListener('click', () => {
                        const idUsuario = boton.getAttribute('data-id');
                        
                    });
                });
            }
        })
        .catch((error) => { 
            console.log(error);
        });
};
// esta funcion maneja el evento click enel boton actualizar
const actualizar = (event) => {
    event.preventDefault();  // recarga la pagina
    // optiene los datos del formulario para asi editarlos 
    // Obtener los datos del formulario de actualización
    let eNombre = document.getElementById("UPDnombre");
    let eApellido = document.getElementById("UPDapellido");
    let eRut = document.getElementById("UPDrut");
    let eCorreo = document.getElementById("UPDcorreo");
    let eEdad = document.getElementById("UPDedad");
    let eFnacimiento = document.getElementById("UPDfnacimiento");

    // Validar que se hayan encontrado los elementos del formulario de actualización
    if (!eNombre || !eApellido || !eRut || !eCorreo || !eEdad || !eFnacimiento) {
        console.log(" :D no se encontro nada.");// si no los encuentra arroja el error por la consola
        return;
    }

    // Obtener los valores de los elementos del formulario de actualización
    let vNombre = eNombre.value;
    let vApellido = eApellido.value;
    let vRut = eRut.value;
    let vCorreo = eCorreo.value;
    let vEdad = eEdad.value;
    let vFnacimiento = eFnacimiento.value;

    // Crear el objeto con los datos actualizados del usuario
    let objeto = {
        nombre: vNombre,
        apellido: vApellido,
        rut: vRut,
        correo: vCorreo,
        edad: vEdad,
        fnacimiento: vFnacimiento
    };

    // Obtener el ID del usuario a actualizar
    let id = document.getElementById('btnActualizar').value;// se optiene ID del usuario desde el (btonactualizar)

    // Actualizar los datos del usuario en la base de datos
    actualizarusuarios(objeto, id)// llamamos ala funcion actualizarusuarios, esta me dio problemas porque la habia defindio con una U mayuscula xd
        .then(() => { //para actuaalizar (onjeto,id) para actualizar los datos del usuario
            alert('¡Se actualizó correctamente!');// alerta avisando que se actualizo correctamente :D
            cargarDatos();  // Actualizar la tabla de usuarios
        })
        .catch((error) => {
            console.log(error);// en caso de error tira el error por consola 
        });
};
