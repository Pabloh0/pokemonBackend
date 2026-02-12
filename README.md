# 🎮 Pokedex API (Node.js & Firestore)

Esta es una API REST profesional desarrollada con **Node.js** y **Express**, diseñada para gestionar una base de datos de Pokémon y sus movimientos utilizando **Firebase Firestore** como motor de base de datos.

[![Desplegado en Render](https://img.shields.io/badge/Render-Deployed-brightgreen)](https://tu-url-de-render.com)

## 🚀 Características

* **Arquitectura de Capas:** Separación clara entre Rutas, Controladores, Servicios y Acceso a Datos (Modelos).
* **Gestión de Datos:** CRUD completo para Pokémon y movimientos.
* **Filtrado Dinámico:** Soporte para consultas por tipo, generación, orden ascendente/descendente y límites de resultados.
* **Seguridad:** Validación de acceso mediante `api-key` para operaciones sensibles (POST, PATCH, DELETE).
* **Rendimiento:** Implementación de caché mediante `apicache` en las rutas de consulta.
* **Documentación:** Especificación de API abierta con **Swagger** integrada en el código.

---

## 🛠️ Tecnologías

* **Entorno:** Node.js / Express.
* **Base de Datos:** Firebase Firestore.
* **Documentación:** Swagger / OpenAPI 3.0.
* **Caché:** apicache.

---

## 📂 Estructura del Proyecto



* `routes/`: Definición de endpoints y documentación Swagger.
* `controllers/`: Manejo de la lógica de las peticiones HTTP.
* `services/`: Lógica de negocio intermedia.
* `database/`: Conexión a Firebase y lógica de persistencia de datos.

---

## ⚙️ Configuración e Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/tu-usuario/nombre-repo.git](https://github.com/tu-usuario/nombre-repo.git)
   cd nombre-repo
