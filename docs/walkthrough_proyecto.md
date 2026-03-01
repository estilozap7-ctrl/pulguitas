# Recorrido del Proyecto: Pulguitas Veterinaria

He organizado el contenido del proyecto para que puedas revisar cada componente clave del servidor y del cliente.

## 📂 Estructura General

El proyecto se divide en dos carpetas principales: `cliente` y `servidor`.

### 1. Servidor (Backend)

El servidor utiliza **Node.js**, **Express** y **Sequelize** para la gestión de datos.

#### 🛠️ Configuración y Modelos
- **[db.js](file:///c:/Users/labc1.GEMCRAK/.gemini/antigravity/playground/magnetic-flare/pulguitas/servidor/src/config/db.js)**: Configuración de la conexión a MySQL/PostgreSQL.
- **[models/index.js](file:///c:/Users/labc1.GEMCRAK/.gemini/antigravity/playground/magnetic-flare/pulguitas/servidor/src/models/index.js)**: Definición de todas las relaciones (Usuarios, Mascotas, Citas, Ventas).
- **[User.js](file:///c:/Users/labc1.GEMCRAK/.gemini/antigravity/playground/magnetic-flare/pulguitas/servidor/src/models/User.js)**: Modelo con roles `ADMIN`, `STAFF` y `CLIENT`.

#### 🕹️ Controladores (Lógica de Negocio)
- **[authController.js](file:///c:/Users/labc1.GEMCRAK/.gemini/antigravity/playground/magnetic-flare/pulguitas/servidor/src/controllers/authController.js)**: Registro y Login con encriptación Bcrypt y JWT.
- **[adminController.js](file:///c:/Users/labc1.GEMCRAK/.gemini/antigravity/playground/magnetic-flare/pulguitas/servidor/src/controllers/adminController.js)**: Gestión de categorías, productos, servicios y personal.
- **[appointmentController.js](file:///c:/Users/labc1.GEMCRAK/.gemini/antigravity/playground/magnetic-flare/pulguitas/servidor/src/controllers/appointmentController.js)**: Lógica para agendar citas, gestionar tiempos y costos.

#### 🛣️ Rutas (Endpoints API)
- **[index.js (Rutas)](file:///c:/Users/labc1.GEMCRAK/.gemini/antigravity/playground/magnetic-flare/pulguitas/servidor/src/routes/index.js)**: Agregador de rutas protegidas por JWT.

---

### 2. Cliente (Frontend)

Desarrollado con **React**, **Vite**, **Tailwind CSS** y **Redux**.

#### 🎨 Interfaz Principal
- **[App.jsx](file:///c:/Users/labc1.GEMCRAK/.gemini/antigravity/playground/magnetic-flare/pulguitas/cliente/src/App.jsx)**: Dashboard principal con las 4 categorías:
  - 📦 **Alimentos**: Venta de comida.
  - 📈 **Actividades**: Recreación y entrenamiento.
  - 🏥 **Salud**: Higiene y medicina.
  - 🔘 **Varios**: Accesorios.
- **[index.css](file:///c:/Users/labc1.GEMCRAK/.gemini/antigravity/playground/magnetic-flare/pulguitas/cliente/src/index.css)**: Estilos base con Tailwind.

#### 🧠 Gestión de Estado (Redux Toolkit)
- **[authSlice.js](file:///c:/Users/labc1.GEMCRAK/.gemini/antigravity/playground/magnetic-flare/pulguitas/cliente/src/redux/slices/authSlice.js)**: Estado de autenticación del usuario.
- **[inventorySlice.js](file:///c:/Users/labc1.GEMCRAK/.gemini/antigravity/playground/magnetic-flare/pulguitas/cliente/src/redux/slices/inventorySlice.js)**: Estado de los elementos de venta y actividades.

---

## 🚀 Cómo ejecutar el proyecto

### Servidor
```bash
cd pulguitas/servidor
npm start
```

### Cliente
```bash
cd pulguitas/cliente
npm run dev
```

---

## 🔍 Vista previa del Dashboard actual
Puedes ver el estado visual actual del proyecto en la pestaña del navegador abierta en `http://localhost:5173`.
