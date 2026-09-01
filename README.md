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

### Frontend - GitHub Pages

1. Ve a https://github.com/EdithRiosC/dam-construccion
2. Settings → Pages → Source: "Deploy from a branch"
3. Branch: "main", Folder: "/ (root)" → Save

URL: https://edithriosc.github.io/dam-construccion/

### Backend - Render (Recomendado)

1. Ve a https://render.com y crea una cuenta con GitHub
2. Haz clic en "New +" → "Web Service"
3. Conecta el repositorio "EdithRiosC/dam-construccion"
4. Configura:
   - Name: dam-construccion-backend
   - Root Directory: backend
   - Runtime: Node
   - Build Command: npm install
   - Start Command: node server.js
5. En "Environment Variables" agrega:

| Key                | Value                      |
|--------------------|----------------------------|
| EMAIL_USER         | nena2nena14@gmail.com      |
| EMAIL_PASS         | (contraseña de aplicacion) |
| EMAIL_DESTINO      | nena2nena14@gmail.com      |
| SMTP_HOST          | smtp.gmail.com             |
| SMTP_PORT          | 587                        |
| SMTP_SECURE        | false                      |

6. Haz clic en "Create Web Service"

### Backend - Railway (Alternativa)

1. Ve a https://railway.app y crea una cuenta con GitHub
2. Haz clic en "New Project" → "Deploy from GitHub Repo"
3. Selecciona el repositorio "EdithRiosC/dam-construccion"
4. En Variables agrega las mismas variables de entorno que Render
5. En Settings → Networking → Generate Domain para obtener la URL

### Backend local con PM2 (produccion local)

```bash
npm install -g pm2
cd backend
pm2 start server.js --name dam-backend
pm2 save
pm2 startup
```

Comandos PM2:
- pm2 status → ver estado
- pm2 logs dam-backend → ver logs
- pm2 restart dam-backend → reiniciar
- pm2 stop dam-backend → detener

## URLs de produccion

- Frontend: https://edithriosc.github.io/dam-construccion/
- Backend: (URL de Render o Railway)
