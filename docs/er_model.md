# Modelo Entidad-Relación - Pulguitas Veterinaria

Este modelo define la estructura de datos necesaria para gestionar inventarios, actividades de salud, usuarios con roles específicos y ventas.

## Diagrama ER (Mermaid)

```mermaid
erDiagram
    USER ||--o{ ANIMAL : "es dueño de"
    USER ||--o{ SALE : "realiza/vende"
    USER {
        int id PK
        string name
        string email
        string password
        string role "ADMIN, STAFF, CLIENT"
        string phone
    }

    ROLE {
        int id PK
        string name
    }

    ANIMAL {
        int id PK
        string name
        string species
        string breed
        int age
        int owner_id FK
    }

    CATEGORY ||--o{ PRODUCT : "contiene"
    CATEGORY ||--o{ SERVICE : "contiene"
    CATEGORY {
        int id PK
        string name
        string type "PRODUCTO, SERVICIO"
    }

    PRODUCT {
        int id PK
        string name
        string description
        decimal price
        int stock
        int category_id FK
    }

    SERVICE {
        int id PK
        string name
        string description
        decimal price
        int category_id FK
    }

    SALE ||--|{ SALE_DETAIL : "tiene"
    SALE {
        int id PK
        int client_id FK
        int staff_id FK
        decimal total
        datetime date
    }

    SALE_DETAIL {
        int id PK
        int sale_id FK
        int product_id FK
        int quantity
        decimal unit_price
    }

    ACTIVITY_LOG {
        int id PK
        int service_id FK
        int animal_id FK
        int staff_id FK
        datetime activity_date
        text notes
    }

    SERVICE ||--o{ ACTIVITY_LOG : "registrada en"
    ANIMAL ||--o{ ACTIVITY_LOG : "recibe"
    USER ||--o{ ACTIVITY_LOG : "realiza (Staff)"
```

## Descripción de Entidades

### 1. Usuarios (Users)
- **Roles**:
    - `ADMIN`: Control total sobre categorías, productos, servicios y gestión de otros usuarios.
    - `STAFF`: Personal de la veterinaria que registra ventas y realiza actividades de salud/recreación.
    - `CLIENT`: Dueños de mascotas que realizan compras.
- **Atributos**: Correo electrónico único para login, contraseña encriptada y datos de contacto.

### 2. Categorías (Categories)
- Organizan tanto los **elementos de venta** (Alimentos, Varios) como los **servicios** (Salud, Recreación).

### 3. Elementos de Venta (Products)
- Registro de stock y precios. Pertenecen a categorías de tipo "PRODUCTO".

### 4. Actividades y Servicios (Services)
- Definición de servicios ofrecidos (ej. "Vacunación", "Paseo recreativo"). Pertenecen a categorías de tipo "SERVICIO".

### 5. Animales (Animals)
- Vinculados a un usuario de tipo `CLIENT`. Esencial para el seguimiento de actividades de salud e higiene.

### 6. Transacciones y Registros
- **Sale / SaleDetail**: Registro detallado de compras de productos.
- **ActivityLog**: Registro de qué servicio se le prestó a qué animal, quién lo realizó y en qué fecha.
