/* =========================================
   MENÚ PARA CELULAR
========================================= */

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

const header = document.querySelector(".header");

if (header) {

    const actualizarHeader = function () {

        header.classList.toggle("scrolled", window.scrollY > 24);

    };

    window.addEventListener("scroll", actualizarHeader, { passive: true });

    actualizarHeader();

}

if (menuBtn && nav) {

    menuBtn.addEventListener("click", function () {

        nav.classList.toggle("show");

    });

}


/* =========================================
   CERRAR MENÚ AL SELECCIONAR UNA OPCIÓN
========================================= */

const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (nav) {

            nav.classList.remove("show");

        }

    });

});


/* =========================================
   ELEMENTOS DEL FORMULARIO
========================================= */

const formulario = document.getElementById("contactForm");

const successModal = document.getElementById("successModal");

const closeModal = document.getElementById("closeModal");

const modalOk = document.getElementById("modalOk");

const modalOverlay = document.querySelector(".modal-overlay");


/* =========================================
   ABRIR POPUP
========================================= */

function abrirModal() {

    if (!successModal) {
        return;
    }

    successModal.classList.add("active");

    // Evita que la página se mueva detrás del popup
    document.body.style.overflow = "hidden";

}


/* =========================================
   CERRAR POPUP
========================================= */

function cerrarModal() {

    if (!successModal) {
        return;
    }

    successModal.classList.remove("active");

    // Permitir nuevamente el desplazamiento
    document.body.style.overflow = "";

}


/* =========================================
   BOTÓN X DEL POPUP
========================================= */

if (closeModal) {

    closeModal.addEventListener("click", function () {

        cerrarModal();

    });

}


/* =========================================
   BOTÓN "ENTENDIDO"
========================================= */

if (modalOk) {

    modalOk.addEventListener("click", function () {

        cerrarModal();

    });

}


/* =========================================
   CERRAR AL HACER CLIC EN EL FONDO
========================================= */

if (modalOverlay) {

    modalOverlay.addEventListener("click", function () {

        cerrarModal();

    });

}


/* =========================================
   CERRAR CON LA TECLA ESC
========================================= */

document.addEventListener("keydown", function (event) {

    if (
        event.key === "Escape" &&
        successModal &&
        successModal.classList.contains("active")
    ) {

        cerrarModal();

    }

});


/* =========================================
   FORMULARIO DE CONTACTO
========================================= */

if (formulario) {

    formulario.addEventListener("submit", async function (event) {

        // Evitar que la página se recargue
        event.preventDefault();


        /* =====================================
           BOTÓN ENVIAR
        ===================================== */

        const btnEnviar =
            document.getElementById("btnEnviar");


        /* =====================================
           OBTENER DATOS DEL FORMULARIO
        ===================================== */

        const nombre =
            document
                .getElementById("nombre")
                .value
                .trim();


        const email =
            document
                .getElementById("email")
                .value
                .trim();


        const telefono =
            document
                .getElementById("telefono")
                .value
                .trim();


        const servicio =
            document
                .getElementById("servicio")
                .value;


        const mensaje =
            document
                .getElementById("mensaje")
                .value
                .trim();


        /* =====================================
           CREAR OBJETO CON LOS DATOS
        ===================================== */

        const datos = {

            nombre: nombre,

            email: email,

            telefono: telefono,

            servicio: servicio,

            mensaje: mensaje

        };


        /* =====================================
           CAMBIAR ESTADO DEL BOTÓN
        ===================================== */

        if (btnEnviar) {

            btnEnviar.disabled = true;

            btnEnviar.textContent =
                "Enviando solicitud...";

        }


        try {

            /* =====================================
               ENVIAR DATOS AL BACKEND
            ===================================== */

            const response = await fetch(
                "http://localhost:3000/api/contacto",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(datos)
                }
            );


            /* =====================================
               LEER RESPUESTA DEL SERVIDOR
            ===================================== */

            const resultado =
                await response.json();


            /* =====================================
               ENVÍO CORRECTO
            ===================================== */

            if (response.ok && resultado.ok) {

                // Limpiar formulario
                formulario.reset();


                // Restaurar botón
                if (btnEnviar) {

                    btnEnviar.disabled = false;

                    btnEnviar.textContent =
                        "Enviar solicitud";

                }


                // Mostrar popup
                abrirModal();


            } else {

                /* =================================
                   ERROR DEL SERVIDOR
                ================================= */

                if (btnEnviar) {

                    btnEnviar.disabled = false;

                    btnEnviar.textContent =
                        "Enviar solicitud";

                }


                alert(
                    resultado.mensaje ||
                    "No se pudo enviar la solicitud."
                );

            }


        } catch (error) {

            /* =====================================
               ERROR DE CONEXIÓN
            ===================================== */

            console.error(
                "Error al enviar el formulario:",
                error
            );


            if (btnEnviar) {

                btnEnviar.disabled = false;

                btnEnviar.textContent =
                    "Enviar solicitud";

            }


            alert(
                "No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose."
            );

        }

    });

}