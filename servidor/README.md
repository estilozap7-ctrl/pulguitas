# Servidor - Veterinaria Pulguitas

Este es el núcleo de backend para el sistema de gestión de la Veterinaria Pulguitas. Está construido con Node.js, Express y Sequelize, conectándose a una base de datos MySQL.

## 🚀 Tecnologías Utilizadas

- **Runtime**: Node.js
- **Framework**: Express.js
- **ORM**: Sequelize (MySQL)
- **Autenticación**: JSON Web Tokens (JWT) & BCryptJS
- **Logs**: Morgan

## 📦 Elementos y Módulos Desarrollados

### 1. Modelos de Datos (Integridad y Estructura)
El servidor cuenta con una estructura relacional sólida que incluye:
- **User**: Gestión de usuarios con roles (ADMIN, STAFF, CLIENT).
- **Animal**: Registro de mascotas vinculadas a sus dueños.
- **Category & Subcategory**: Sistema jerárquico para organizar inventario (Alimentos, Farmacia, Accesorios, etc.).
- **Product**: Gestión de artículos para venta con control de stock, marcas y caracterizaciones por animal.
- **Service**: Definición de servicios (Cirugía, Estética, Clínica).
- **Appointment**: Agenda de citas médicas y estéticas.
- **Sale & SaleDetail**: Sistema de facturación y control de ventas.
- **ActivityLog**: Historial inmutable de acciones realizadas en el sistema.

### 2. Sistema de Población (Seed)
Se ha desarrollado un script de `seed.js` que inicializa el sistema con:
- **Usuarios Iniciales**: Administradores y clientes de prueba.
- **Inventario Completo (30+ productos)**: 
    - **Alimentos**: 5 opciones para Perros, 5 para Gatos y 5 para Aves (Premium, Adultos, Cachorros).
    - **Accesorios y Diversión**: 15 elementos nuevos entre juguetes (mordedores, túneles, espejos), ropa (capas, chalecos) y elementos didácticos (alfombras olfativas, puzzles).
- **Servicios**: Configuración base de cirugías, baños y desparasitaciones.

### 3. Seguridad y Roles
- Implementación de middlewares para protección de rutas.
- Restricción de funciones administrativas (solo ADMIN puede modificar inventario/precios).

## 🛠️ Comandos Disponibles

- `npm start`: Inicia el servidor de producción.
- `npm run dev`: Inicia el servidor en modo desarrollo.
- `node seed.js`: Reinicia y puebla la base de datos con los datos maestros y de ejemplo.

## 📂 Estructura del Proyecto

```text
servidor/
├── src/
│   ├── config/      # Configuración de DB
│   ├── controllers/ # Lógica de negocio
│   ├── middlewares/ # Seguridad y validación
│   ├── models/      # Definición de tablas
│   ├── routes/      # Endpoints de la API
│   └── index.js     # Punto de entrada
├── seed.js          # Script de población de datos
└── .env             # Variables de entorno
```
