# Modelo Entidad-Relación Evolucionado - Pulguitas (Gestión de Tiempos y Citas)

He actualizado el modelo para incluir la gestión de **Citas (Appointments)**, control de **Horarios** y **Costos** detallados, permitiendo a los clientes programar actividades de salud y recreación.

## Diagrama de Entidad-Relación Actualizado (Mermaid)

```mermaid
erDiagram
    %% Gestión de Usuarios y Mascotas
    USER ||--o{ ANIMAL : "es dueño de"
    USER ||--o{ APPOINTMENT : "solicita (Cliente)"
    USER ||--o{ APPOINTMENT : "atiende (Staff)"
    
    ANIMAL ||--o{ APPOINTMENT : "es el paciente/sujeto"

    %% Definición de Servicios y Costos
    SERVICE ||--o{ APPOINTMENT : "define"
    SERVICE {
        int id PK
        string nombre "Consulta, Baño, Entrenamiento"
        decimal costo_base
        int duracion_minutos "Tiempo estimado"
        boolean requiere_cita
    }

    %% Gestión de Citas y Tiempos
    APPOINTMENT {
        int id PK
        int animal_id FK
        int service_id FK
        int client_id FK
        int staff_id FK
        datetime fecha_hora_inicio
        datetime fecha_hora_fin
        enum estado "PENDIENTE, CONFIRMADA, COMPLETADA, CANCELADA"
        decimal costo_final
        text notas
    }

    %% Registro de Resultados (Historial Técnico)
    APPOINTMENT ||--o| ACTIVITY_LOG : "genera"
    ACTIVITY_LOG {
        int id PK
        int appointment_id FK
        text observaciones_tecnicas
        datetime fecha_registro
    }

    %% Disponibilidad de Staff
    USER ||--o{ AVAILABILITY : "tiene"
    AVAILABILITY {
        int id PK
        int staff_id FK
        enum dia_semana "LUN, MAR, MIE, JUE, VIE, SAB, DOM"
        time hora_inicio
        time hora_fin
    }
```

## Nuevas Capacidades del Modelo

### 1. Gestión de Tiempos (Horarios y Disponibilidad)
*   **Entidad `AVAILABILITY`**: Permite al Administrador definir en qué horarios trabaja el personal de salud y recreación. Esto evita solapamientos de citas.
*   **Duración Estimada**: Cada servicio (ej. "Corte de pelo") tiene un campo `duracion_minutos` para bloquear el calendario automáticamente.

### 2. Control de Citas (Appointments)
*   **Estados de Cita**: Seguimiento desde que se solicita (Pendiente) hasta que se realiza (Completada).
*   **Costo Final**: Permite ajustar el precio base del servicio si hubo complicaciones o cargos extra durante la actividad.

### 3. Registro de Actividades Vinculado
*   A diferencia de una simple venta, la cita genera un `ACTIVITY_LOG` (Historial Clínico/Recreativo) que queda guardado perpetuamente para la mascota.

### 4. Flujo para el Dueño (Cliente)
*   El cliente puede ver los horarios disponibles.
*   Selecciona su mascota y el servicio.
*   El sistema reserva el bloque de tiempo del Staff responsable.
