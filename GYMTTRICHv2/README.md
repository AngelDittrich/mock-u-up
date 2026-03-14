# GYMTTRICH v2
**Tu Entrenador Personal y Rastreador de Progreso**

## Propósito
GYMTTRICH es una aplicación web (Progressive Web App - PWA) diseñada para registrar, medir y analizar de manera integral la evolución física y el rendimiento deportivo del usuario. La aplicación permite mantener un historial detallado del peso corporal, composición (medidas y pliegues), fuerza en levantamientos principales de hipertrofia y powerlifting, así como el progreso en habilidades de calistenia. Incorpora además un sistema de "Insights" (Perspectivas) que ofrece retroalimentación inteligente sobre el estado del progreso de entrenamiento basándose en los datos insertados, detectando incrementos y posibles estancamientos musculares.

## Tecnologías Utilizadas
El proyecto está construido completamente con tecnologías nativas del lado del cliente, asegurando una alta disponibilidad offline, rendimiento veloz y fácil mantenimiento.
- **HTML5 & CSS3:** Estructura semántica, diseño adaptable (responsive design) usando CSS Grid y Flexbox. Efectos interactivos, temas oscuros y animaciones detalladas.
- **JavaScript (ES6+):** Lógica del lado del cliente sin grandes dependencias de frameworks externos pesados, lo que permite un control total y nativo del DOM.
- **IndexedDB:** Base de datos NoSQL integrada en el navegador. Manejada mediante una capa de promesas (librería `idb`) para almacenar de manera asíncrona registros históricos de métricas, fuerza y calistenia.
- **Service Workers & PWA:** Implementación a través de `sw.js` y `manifest.json`. Proporciona estrategias avanzadas de almacenamiento en caché para funcionar en modo offline (Cache-First, Cache-Last, Stale-While-Revalidate) e instalación como aplicación nativa (desktop y mobile).
- **Chart.js:** Biblioteca implementada a través de un CDN usada para la visualización en gráficas interactivas y estéticas del progreso.
- **Phosphor Icons:** Colección de iconos altamente consistentes y ligeros usados a través de toda la interfaz.

## Arquitectura del Proyecto
La aplicación sigue un modelo tipo *Single Page Application* (SPA), simulando la navegación a través de secciones mediante ocultamiento dinámico e inyección de vistas por JavaScript.

**Estructura de directorios y componentes principales:**

*   **Raíz del proyecto:**
    *   `index.html`: Pantalla de inicio y puerta de seguridad con un código de acceso.
    *   `dashboard.html`: Estructura principal de la app. Funciona como el menú lateral y contenedor dinámico para las diferentes capas (Dashboard, Body Profile, Strength, Calisthenics, Recommendations y Entries).
    *   `sw.js`: Archivo fundamental para habilitar el soporte PWA y comportamiento offline a través de intercepción de tráfico y uso de estrategias de memoria caché de las diferentes rutas o assets.
    *   `manifest.json`: Archivo de configuración PWA (iconos, color de fondo, pantalla de lanzamiento independiente).
    *   `data.json`: Semilla de datos (JSON) utilizada como demostración o inicio base con registros numéricos de progreso.
*   **`css/`**: Contiene la capa de estilos visuales.
    *   `styles.css`: Archivo base que posee todo el CSS de temas, colores, tipografía (Outfit e Inter) y diseño *Responsive*.
    *   `splash.css`: Pantalla de animación inicial que esconde la lógica de renderizado previo a mostrar las gráficas.
*   **`js/`**: Contiene los módulos que orquestan la SPA base de datos local.
    *   `main.js`: Controlador maestro principal. Encargado del enrutamiento simulado, actualizar las instancias de `Chart.js` y realizar el algoritmo estadístico inteligente (Insights) del tren superior e inferior para detectar desbalances o ganancias rápidas de grasa.
    *   `db.js` & `idb.js`: Configuran la base de datos offline. Definen tablas como `user`, `measurements`, `strength` y `calisthenics`.
    *   Otros archivos (por ej. `strength.js`, `dashboard.js`, `calisthenics.js`): Módulos separados que facilitan la administración del código modular.
    *   `entries/`: Lógica enfocada a la gestión de formularios e introducción de nuevos datos a la IndexedDB.

## Funcionalidades Principales
1.  **Dashboard de Progreso General:** Resumen en tiempo real del peso diario, Índice de Masa Corporal (IMC o BMI), cambios milimétricos en el cuerpo y una curva visual con todo el track histórico del cuerpo.
2.  **Tracking Corporal (*Body Profile*):** Sistema dual gráfico y tabular para visualizar crecimientos entre torso vs extremidades (piernas). Rastreo avanzado de pliegues cutáneos para calcular el porcentaje de grasa.
3.  **Registro de Fuerza (*Strength*):** Analítica comparativa de crecimiento de cargas (RM) en los "Big Three" u otros levantamientos clave de progresión muscular.
4.  **Habilidades de Calistenia (*Calisthenics*):** Tarjetas estilo Bento Grid diseñadas para rastrear los tiempos máximos (en segundos/minutos) de técnicas precisas como Handstand, L-Sit y V-Sit, acompañado con gráficos lineales.
5.  **Recomendaciones Avanzadas (*Insights AI*):** Sistema algorítmico interno integrado capaz de analizar los recientes promedios de datos y compararlos. Por ejemplo, detectar si las piernas se rezagan frente al entrenamiento del torso, o arrojar señales si el peso subió bruscamente (potencial grasa) pero las medidas perimetrales no mejoraron, prescribiendo medidas de acción o rutinas dinámicamente. 
6.  **App Instalable (PWA):** No necesita ser bajada de Google Play o App Store, basta con utilizar la compatibilidad de "Añadir a Pantalla de Inicio" que genera `manifest.json`. Todas las métricas quedarán blindadas localmente en caché.

## Flujo de Datos
1.  **Ingreso:** El usuario ingresa un bloque de entrenamiento o medición a través de un panel de `Entries`.
2.  **Validación y Guarda:** El módulo gestor captura los datos y mediante la API Promisificada en `db.js`, sube al almacén IndexedDB el registro validado.
3.  **Lectura / Renderizado:** Al ingresar en las secciones web, `main.js` y otros módulos consultan toda la tira histórica de almacenamiento y repintan dinámicamente tanto las tablas directas, como los contenedores gráficos de las `Chart.js`.
4.  **Evolución Constante:** Debido al encapsulamiento de PWA, el progreso queda guardado dentro del entorno del navegador protegiendo la privacidad de la persona con rendimientos comparables mes a mes.
