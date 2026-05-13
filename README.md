# EspinaRosa E-commerce

Plataforma de ventas de productos de belleza y cuidado personal construida con el stack MERN (MongoDB, Express, React, Node.js) y Tailwind CSS.

## Estructura del Proyecto

El proyecto está dividido en dos partes principales:
- `/frontend`: Aplicación en React + Vite.
- `/backend`: Servidor API en Node.js + Express.

## Requisitos Previos

- Node.js instalado (v18 o superior recomendado).
- MongoDB (Local o una URI de MongoDB Atlas).

## Instrucciones de Instalación

### 1. Configurar y Ejecutar el Backend

1. Abre una terminal y navega a la carpeta `/backend`:
   ```bash
   cd backend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno:
   Abre el archivo `backend/.env` y asegúrate de configurar tu `MONGODB_URI`. Si tienes un clúster en MongoDB Atlas, reemplaza la cadena local con la tuya:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://<usuario>:<password>@cluster0.mongodb.net/espinarosa
   JWT_SECRET=supersecretkey_change_in_production
   ```
4. Población inicial de la Base de Datos (Opcional):
   Para probar la tienda con productos y un usuario administrador inicial, ejecuta el seeder:
   ```bash
   node seeder.js
   ```
   *(Las credenciales de admin serán: admin@espinarosa.com / admin123)*
5. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

### 2. Configurar y Ejecutar el Frontend

1. Abre otra terminal y navega a la carpeta `/frontend`:
   ```bash
   cd frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Visita `http://localhost:5173` en tu navegador.

## Características

- **Diseño Responsivo y Premium**: Animaciones suaves con Framer Motion y Tailwind CSS v4.
- **Carrito de Compras Global**: Estado administrado con Zustand y un Drawer interactivo.
- **Botón de Compra por WhatsApp**: Integración rápida para ventas directas.
- **Panel de Administrador Privado**: Dashboard moderno protegido por JSON Web Tokens (JWT).
