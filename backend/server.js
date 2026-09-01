const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;


/* =========================================
   MIDDLEWARE
========================================= */

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


/* =========================================
   RUTA PRINCIPAL
========================================= */

app.get("/", (req, res) => {

    res.json({
        ok: true,
        mensaje: "Servidor de DAM Construcción activo"
    });

});


/* =========================================
   CONFIGURACIÓN DEL CORREO
========================================= */
const transporter = nodemailer.createTransport({

    host: process.env.SMTP_HOST,

    port: Number(process.env.SMTP_PORT),

    secure: process.env.SMTP_SECURE === "true",

    requireTLS: true,

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },

    tls: {
        rejectUnauthorized: false
    }

});


/* =========================================
   VERIFICAR CONEXIÓN CON CORREO
========================================= */

transporter.verify((error, success) => {

    if (error) {

        console.error(
            "❌ Error al conectar con el correo:"
        );

        console.error(error.message);

    } else {

        console.log(
            "✅ Servidor de correo listo"
        );

    }

});


/* =========================================
   FORMULARIO DE CONTACTO
========================================= */

app.post("/api/contacto", async (req, res) => {

    try {

        const {
            nombre,
            email,
            telefono,
            servicio,
            mensaje
        } = req.body;


        /* =====================================
           VALIDACIÓN
        ===================================== */

        if (
            !nombre ||
            !email ||
            !servicio ||
            !mensaje
        ) {

            return res.status(400).json({

                ok: false,

                mensaje:
                    "Por favor completa todos los campos obligatorios."

            });

        }


        /* =====================================
           CORREO
        ===================================== */

        const mailOptions = {

            from: process.env.EMAIL_USER,

            to: process.env.EMAIL_DESTINO,

            replyTo: email,

            subject:
                `Nueva solicitud de servicio - DAM Construcción`,

            html: `

                <div style="
                    font-family: Arial, sans-serif;
                    max-width: 650px;
                    margin: auto;
                    border: 1px solid #ddd;
                    border-radius: 10px;
                    overflow: hidden;
                ">

                    <div style="
                        background: #111;
                        color: white;
                        padding: 25px;
                    ">

                        <h1 style="
                            margin: 0;
                            color: #f5a900;
                        ">
                            DAM Construcción
                        </h1>

                        <p>
                            Nueva solicitud de servicio
                        </p>

                    </div>


                    <div style="
                        padding: 25px;
                    ">

                        <h2>
                            Información del cliente
                        </h2>


                        <p>
                            <strong>Nombre:</strong>
                            ${nombre}
                        </p>


                        <p>
                            <strong>Correo:</strong>
                            ${email}
                        </p>


                        <p>
                            <strong>Teléfono:</strong>
                            ${telefono || "No proporcionado"}
                        </p>


                        <p>
                            <strong>Servicio:</strong>
                            ${servicio}
                        </p>


                        <hr>


                        <h2>
                            Mensaje
                        </h2>


                        <p style="
                            background: #f5f5f5;
                            padding: 15px;
                            border-radius: 6px;
                        ">
                            ${mensaje}
                        </p>

                    </div>


                    <div style="
                        background: #111;
                        color: white;
                        padding: 15px;
                        text-align: center;
                    ">

                        DAM Construcción © 2026

                    </div>

                </div>

            `

        };


        /* =====================================
           ENVIAR CORREO
        ===================================== */

        await transporter.sendMail(mailOptions);


        console.log(
            `✅ Solicitud recibida de ${nombre}`
        );


        /* =====================================
           RESPUESTA AL FRONTEND
        ===================================== */

        res.status(200).json({

            ok: true,

            mensaje:
                "Solicitud enviada correctamente."

        });


    } catch (error) {

        console.error(
            "❌ Error enviando correo:"
        );

        console.error(error);


        res.status(500).json({

            ok: false,

            mensaje:
                "No se pudo enviar la solicitud."

        });

    }

});


/* =========================================
   INICIAR SERVIDOR
========================================= */

app.listen(PORT, () => {

    console.log("");
    console.log("====================================");
    console.log("🏗️  DAM CONSTRUCCIÓN");
    console.log("====================================");

    console.log(
        `🚀 Servidor ejecutándose en http://localhost:${PORT}`
    );

    console.log("====================================");
    console.log("");

});