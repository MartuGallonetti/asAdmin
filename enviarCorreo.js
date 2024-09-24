//inicializamos el servicio de emailjs
emailjs.init("g1jjSZzVEwYuBKOS-");

//Funcion que valida si el email tiene el formato correcto
const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

// Función que muestra el modal
const mostrarModal = () => {
    const modal = document.getElementById("modalAgradecimiento");
    modal.style.display = "block";

    // Cerrar el modal después de 5 segundos
    setTimeout(() => {
        modal.style.display = "none";
    }, 5000);
};

//Funcion que envía el correo
const enviarCorreo = () => {
    const formulario = document.getElementById("formulario");
    const emailUsuario = document.getElementById("email");
    const nombre = document.getElementById("nombre");
    const telefono = document.getElementById("telefono");
    const propiedad = document.getElementById("propiedad");
    const mensaje = document.getElementById("mensaje");

    //Validamos si el email tiene el formato correcto
    if (!validarEmail(emailUsuario.value)) {
        alertify.error("Por favor, ingrese un correo electrónico válido.");
        return false;
    }

    // Ponemos los datos del correo a enviar
    const data = {
        to: `mgallonetti03@gmail.com`,
        from: "info.contacto.as@gmail.com",
        subject: "Contacto As administraciones",
        message: `
        Nombre: ${nombre.value}
        Telefono: ${telefono.value}
        Email: ${emailUsuario.value}
        Propiedad: ${propiedad.value}
        Mensaje: ${mensaje.value}
        `,
    };

    // Enviamos el correo con la librería emailjs
    emailjs
        .send("service_9uxrrac", "template_ry2eh2m", data)
        .then((response) => {
            console.log("Correo enviado:", response);
            alertify.success(
                `Gracias por comunicarse con As administraciones, nos contactaremos a la brevedad ${emailUsuario.value}`
            );
            formulario.reset();

            // Mostramos el modal de agradecimiento
            mostrarModal();
        })
        .catch((error) => {
            console.error("Error al enviar el correo:", error);
        });
};

const enviar = document.getElementById("enviar");

// Escuchamos el botón finalizar compra
enviar.addEventListener("click", (e) => {
    e.preventDefault();
    enviarCorreo();
});

// Cerrar el modal si se hace clic fuera de él
window.onclick = (event) => {
    const modal = document.getElementById("modalAgradecimiento");
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
