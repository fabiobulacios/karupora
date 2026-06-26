# Karu Porã — Análisis Completo y Hoja de Ruta de Mejoras

> **Karu Porã** significa "Buena Comida" en guaraní. Es una plataforma web de recetas de cocina paraguaya con planificador semanal de comidas.

---

## 1. Qué es la app y para qué sirve

Karu Porã es una aplicación web fullstack construida con **Django** (Python) y **Bootstrap 3**. Su objetivo es:

- Mostrar un catálogo de recetas de cocina paraguaya con imágenes.
- Permitir ver cada receta en detalle con ingredientes, cantidades y pasos de preparación.
- Ofrecer un planificador semanal donde el usuario elige almuerzo y cena para cada día de la semana.
- Imprimir el menú semanal generado.

---

## 2. Stack tecnológico actual

| Capa | Tecnología |
|------|-----------|
| Backend | Django 2.2 (Python) |
| Base de datos | SQLite3 |
| Frontend | Django Templates (HTML server-side rendering) |
| CSS | Bootstrap 3 + CSS personalizado |
| JS | jQuery, WOW.js, Animate.css, Morphext, Superfish, Sticky.js |
| Iconos | Font Awesome |
| Subida de imágenes | Django ImageField + carpeta /media/ |

---

## 3. Estructura del proyecto

```
karupora/
├── todolist/               → Configuración general de Django
│   ├── settings.py         → Configuración (DB, idioma, rutas estáticas)
│   └── urls.py             → Router principal de URLs
├── pendientes/             → App principal
│   ├── models.py           → Modelos de base de datos
│   ├── views.py            → Lógica de cada página
│   ├── admin.py            → Panel de administración
│   ├── templates/          → Archivos HTML
│   └── static/             → CSS, JS, imágenes, librerías
├── media/                  → Imágenes subidas por usuarios/admin
├── db.sqlite3              → Base de datos SQLite
└── manage.py               → CLI de Django
```

---

## 4. Modelos de base de datos (lo que guarda la app)

```
Unidad          → unidades de medida (taza, gramo, litro...)
  ↑
Ingrediente     → nombre del ingrediente + su unidad
  ↑
Insumo          → ingrediente + cantidad numérica
  ↑ (Many-to-Many)
Receta          → nombre, porciones, imagen, preparación, insumos
```

**Ejemplo:** La receta "Sopa Paraguaya" tiene 500g de queso, 3 tazas de harina de maíz, etc.

---

## 5. Páginas y rutas actuales

| URL | Página | Estado |
|-----|--------|--------|
| `/recetas` | Página de inicio (hero, about, servicios) | Funciona |
| `/lista_recetas` | Grilla de todas las recetas con imagen | Funciona |
| `/recetas/<id>` | Detalle de receta (1x, 2x, 10x porciones) | Parcial |
| `/semanal` | Planificador: seleccionar almuerzo/cena por día | Funciona |
| `/impresion` | Tabla imprimible del menú semanal | Funciona |
| `/registro` | Registro de usuario | No funciona |
| `/busqueda` | Búsqueda de recetas por nombre | Incompleta |
| `/admin` | Panel de administración Django | Funciona |

---

## 6. Funcionalidades actuales en detalle

### 6.1 Catálogo de recetas (`/lista_recetas`)
- Muestra todas las recetas en grilla responsive (4 columnas en desktop, 1 en móvil).
- Cada tarjeta tiene: imagen de fondo, nombre de la receta, botón "Ver más".
- Estilos aplicados al hover (overlay oscuro al pasar el mouse).

### 6.2 Detalle de receta (`/recetas/<id>`)
- Imagen de la receta.
- Tabla de ingredientes con columnas para 1 porción, 2 porciones y 10 porciones.
- Texto de preparación paso a paso.
- **Bug conocido:** La multiplicación de cantidades (x2, x10) tiene un error en el bucle y solo muestra el último valor calculado.

### 6.3 Planificador semanal (`/semanal`)
- 7 filas (lunes a domingo), cada una con dos menús desplegables: almuerzo y cena.
- Todas las recetas disponibles aparecen como opciones.
- Al confirmar, redirige a la página de impresión.

### 6.4 Impresión del menú (`/impresion`)
- Tabla con el menú seleccionado por día.
- Botón para abrir el diálogo de impresión del navegador.

### 6.5 Panel de administración (`/admin`)
- CRUD completo de Unidades, Ingredientes, Insumos y Recetas.
- Permite subir imágenes para cada receta.

---

## 7. Bugs conocidos a corregir

| Bug | Descripción | Solución sugerida |
|-----|-------------|-------------------|
| Multiplicación de porciones | El bucle en `views.py` solo conserva el último valor calculado | Usar `lista_insumos = [(i, i.cantidad_insumo*2, i.cantidad_insumo*10) for i in insumos]` y pasarla como contexto |
| Búsqueda no tiene URL activa | La vista `busqueda()` existe pero no está mapeada correctamente | Agregar `path('busqueda', busqueda)` al router |
| Registro no funcional | La página existe pero el formulario no guarda datos | Implementar con `UserCreationForm` de Django |
| DEBUG=True en producción | Expone información sensible | Mover a variable de entorno |
| SECRET_KEY expuesta | Está hardcodeada en settings.py | Mover a `.env` con `python-decouple` |

---

## 8. Mejoras de CSS propuestas

### 8.1 Modernizar el sistema de colores
- El rojo principal (`rgb(240, 4, 4)`) es demasiado agresivo. Propuesta: usar `#C0392B` (rojo terracota más suave) como primario y `#E8D5B7` (crema) como acento.
- Agregar variables CSS (`--primary-color`, `--accent-color`) para mantener consistencia.

### 8.2 Tarjetas de recetas más modernas
- Cambiar el overlay de fondo de imagen por tarjetas con sombra (`box-shadow`) y borde redondeado (`border-radius: 12px`).
- Agregar efecto de elevación al hover: `transform: translateY(-4px)` con transición suave.
- Mostrar la imagen en la parte superior de la tarjeta, no como fondo completo.

### 8.3 Tipografía mejorada
- Aumentar el peso y tamaño de los títulos de receta.
- Mejorar el espaciado entre líneas del texto de preparación (`line-height: 1.8`).
- Usar Google Fonts más modernas: **Playfair Display** para títulos y **Lato** para cuerpo.

### 8.4 Tabla de ingredientes
- Aplicar estilos alternos (`striped`) con el tono crema propuesto.
- Añadir íconos de Font Awesome junto a las unidades (ej: cucharita, vaso).
- Hacer la tabla horizontalmente scrollable en móvil (`overflow-x: auto`).

### 8.5 Planificador semanal
- Mejorar los `<select>` con una librería como **Select2** para buscador dentro del dropdown.
- Usar un layout de grilla tipo calendario (7 columnas en desktop, scroll horizontal en móvil).
- Agregar colores distintos por día de la semana.

### 8.6 Hero section
- Mejorar el fondo con un overlay degradado en vez de color sólido.
- Agregar una imagen de comida paraguaya de alta resolución como fondo.
- El texto animado de Morphext puede quedar mejor con un tamaño más grande y fuente serif.

### 8.7 Responsive móvil
- Ajustar el menú de navegación para móvil: actualmente usa Superfish (desactualizado).
- Mejorar el padding en pantallas pequeñas para que las tarjetas no se corten.
- Los botones deben tener `min-height: 44px` para facilitar el toque en pantallas táctiles.

### 8.8 Página de impresión
- Agregar `@media print` para ocultar navegación, footer y botones al imprimir.
- Añadir el logo de Karu Porã en la parte superior del menú imprimible.
- Mejorar el formato de la tabla imprimible con bordes y tipografía legible.

---

## 9. Nuevas features propuestas

### 9.1 Autenticación de usuarios (ALTA PRIORIDAD)
- Registro, login y logout con Django Auth.
- Cada usuario tiene su propio historial de menús semanales guardados.
- Perfil de usuario con preferencias (vegetariano, sin gluten, etc.).

### 9.2 Sistema de favoritos
- Botón de corazón en cada receta para guardarla como favorita.
- Página `/favoritas` que muestra solo las recetas marcadas.
- Guardado por sesión (sin login) o en base de datos (con login).

### 9.3 Búsqueda y filtros avanzados
- Búsqueda en tiempo real con AJAX (sin recargar la página) por nombre.
- Filtros por: tiempo de preparación, cantidad de porciones, tipo de plato (entrada, principal, postre).
- Ordenamiento por nombre, popularidad, recientes.

### 9.4 Calificaciones y comentarios
- Sistema de rating de 1 a 5 estrellas por receta.
- Sección de comentarios debajo de cada receta.
- Mostrar promedio de calificaciones en la tarjeta del catálogo.

### 9.5 Lista de compras automática
- Desde el menú semanal, generar automáticamente la lista de ingredientes con cantidades sumadas.
- Agrupar por tipo de ingrediente (lácteos, carnes, verduras...).
- Opción de exportar como PDF o compartir por WhatsApp.

### 9.6 Escalado de porciones dinámico
- En la página de detalle, un control deslizante o campo numérico para ajustar el número de porciones.
- Las cantidades de ingredientes se actualizan en tiempo real con JavaScript sin recargar.

### 9.7 Compartir en redes sociales
- Botones de compartir en WhatsApp, Facebook e Instagram para cada receta.
- Meta tags Open Graph para que el link compartido muestre imagen y descripción.

### 9.8 Modo oscuro
- Toggle en la navegación para alternar entre modo claro y oscuro.
- Guardado en `localStorage` para persistir la preferencia del usuario.

### 9.9 Recetas relacionadas
- Al final de cada detalle de receta, mostrar 3-4 recetas similares (misma categoría o ingredientes comunes).

### 9.10 Categorías de recetas
- Agregar un campo `categoria` al modelo Receta (Sopas, Carnes, Postres, Bebidas...).
- Filtrar el catálogo por categoría con tabs o botones de filtro.
- Página `/categoria/<nombre>` que muestre solo recetas de esa categoría.

### 9.11 Panel de estadísticas para admin
- Recetas más visitadas.
- Recetas más agregadas al planificador semanal.
- Gráficos simples con Chart.js.

### 9.12 PWA (Progressive Web App)
- Agregar un manifest.json y service worker para que la app sea instalable en el celular.
- Cachear las recetas para funcionar offline.
- Notificaciones push para nuevas recetas.

---

## 10. Mejoras técnicas (backend/infraestructura)

| Mejora | Descripción |
|--------|-------------|
| Migrar a Django 4.x | La versión actual (2.2) ya no tiene soporte de seguridad |
| Cambiar a PostgreSQL | SQLite no escala bien para producción |
| Paginación | La lista de recetas cargará muy lento con muchas recetas |
| Caché de templates | Usar `django.views.decorators.cache` para páginas estáticas |
| Optimización de imágenes | Redimensionar automáticamente las imágenes subidas con Pillow |
| Variables de entorno | Mover SECRET_KEY y DEBUG a un archivo `.env` |
| Tests unitarios | Agregar tests básicos para modelos y vistas |
| Despliegue | Configurar para Heroku, Railway o VPS con nginx + gunicorn |

---

## 11. Prioridades sugeridas

### Fase 1 — Correcciones urgentes (1-2 semanas)
1. Corregir bug de multiplicación de porciones.
2. Activar la búsqueda de recetas.
3. Mover SECRET_KEY a variable de entorno.
4. Mejorar CSS de tarjetas (cards modernas con hover).
5. Arreglar responsive móvil (padding y navegación).

### Fase 2 — Features principales (1 mes)
1. Autenticación de usuarios (registro + login).
2. Sistema de favoritos.
3. Escalado dinámico de porciones.
4. Categorías de recetas + filtros.
5. Mejoras visuales generales (paleta de colores, tipografía, hero).

### Fase 3 — Features avanzadas (2-3 meses)
1. Lista de compras automática desde el menú semanal.
2. Calificaciones y comentarios.
3. Compartir en redes sociales con Open Graph.
4. Modo oscuro.
5. PWA / instalable en celular.

---

*Documento generado para el proyecto Karu Porã — cocina paraguaya en la web.*
