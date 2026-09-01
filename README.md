# D.A.M Construccion

Sitio web corporativo de la empresa D.A.M Construccion.

## Requisitos previos

- [Node.js](https://nodejs.org/) (v18 o superior)
- Git

## Instalacion

```bash
git clone https://github.com/EdithRiosC/dam-construccion.git
cd dam-construccion
cd backend
npm install
```

## Configuracion

Crea el archivo `backend/.env` con las siguientes variables:

```
PORT=3000
EMAIL_USER=tu_correo@gmail.com
EMAIL_PASS=tu_contraseña_de_aplicacion
EMAIL_DESTINO=correo_destino@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
```

> Para usar Gmail necesitas generar una **Contraseña de aplicacion** en https://myaccount.google.com/apppasswords

## Ejecutar

```bash
cd backend
npm run dev
```

El servidor estara disponible en http://localhost:3000

## Estructura del proyecto

```
dam-construccion/
├── index.html          Pagina principal
├── nosotros.html       Pagina Nosotros
├── servicios.html      Pagina Servicios
├── proyectos.html      Pagina Proyectos
├── contacto.html       Pagina Contacto
├── css/estilos.css     Estilos globales
├── js/script.js        Logica del frontend
├── img/                Imagenes
└── backend/
    ├── server.js       Servidor Express
    ├── package.json    Dependencias
    └── .env            Variables de entorno (no subir a git)
```

## Despliegue

- **Frontend:** GitHub Pages - https://edithriosc.github.io/dam-construccion/
- **Backend:** Railway - https://railway.app
