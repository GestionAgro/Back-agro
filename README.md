 **Gestión de Remitos y Facturas**

Esta aplicación web fue desarrollada para resolver un problema muy común en establecimientos lácteos y agropecuarios de pequeña y mediana escala: la falta de control y trazabilidad de los insumos que ingresan al campo.

Cada recepción de productos llega acompañada de un remito, y posteriormente el proveedor envía la factura correspondiente.

Sin embargo, en la práctica este proceso suele gestionarse de manera informal:

- Remitos enviados por WhatsApp  
- Documentos en papel que se extravían  
- Falta de un archivo centralizado  
- Dificultad para relacionar qué factura corresponde a qué remito  

Esto genera múltiples problemas: pérdida de información, falta de trazabilidad, errores en el registro de insumos y complicaciones administrativas y contables.

La aplicación busca digitalizar, organizar y unificar todo este flujo documental, ofreciendo un sistema claro, ordenado y confiable.

El objetivo principal es garantizar un registro seguro, centralizado y fácil de consultar por cualquier responsable del establecimiento.

---

## ¿A quién está dirigido?

- Establecimientos lácteos, ganaderos y agropecuarios  
- Administradores de tambos  
- Veterinarios encargados del manejo de insumos  
- Pequeñas y medianas empresas que necesitan controlar su stock sin procesos complejos  

---

## Vista previa de la aplicación

### **Listado de remitos**

En esta pantalla se muestra un listado completo de todos los remitos cargados, junto con su información relevante: número de remito, empresa emisora, detalle, quién lo recibió y su estado (pendiente o imputado, es decir, ya asociado a una factura).

Además, cada fila cuenta con acciones para:

- Ver el remito en detalle  
- Editarlo  
- Eliminarlo  

El funcionamiento es similar para las facturas, con la diferencia de que las facturas incluyen la acción adicional de asociar un remito cuando corresponda.
<img width="1914" height="908" alt="Captura de pantalla 2025-11-26 095352" src="https://github.com/user-attachments/assets/c81d4f11-7dfe-4d98-8445-7c350760e201" />

---

## Gestión de productos y stock

El sistema incluye un módulo de stock donde se registran automáticamente los productos incluidos en cada remito.

- Si el producto ya existe, su cantidad se actualiza.  
- Si es un producto nuevo, se crea automáticamente.  

También es posible agregar productos manualmente o reducir el stock, registrando quién retiró los insumos para mantener la trazabilidad del inventario físico.
<img width="1907" height="841" alt="Captura de pantalla 2025-11-26 095501" src="https://github.com/user-attachments/assets/ecba87a7-b5bf-4d5c-a971-a8b63a80fb2c" />

---

## Auditorías y eventos

Cada modificación realizada sobre remitos, facturas o productos genera automáticamente un registro en la sección de auditorías: creación, edición, asociación, eliminaciones, etc.

Cada tipo de entidad cuenta con su propia auditoría detallada.

Existe también un apartado de eventos, pensado para registrar acciones del mundo real, como:

- Quién recibió un remito  
- Quién cargó una factura  
- Quién retiró un producto del stock  
<img width="1900" height="828" alt="Captura de pantalla 2025-11-26 095613" src="https://github.com/user-attachments/assets/7fc7d811-df99-4d54-a135-f921532e2071" />

---

## Reportes 

El sistema incluye una sección de reportes visuales.

Por ejemplo, es posible ver el total de los importes facturados de forma anual para llevar un control claro de los gastos del establecimiento.
<img width="1903" height="788" alt="Captura de pantalla 2025-11-26 095807" src="https://github.com/user-attachments/assets/5c2f41d6-6774-41bd-a07a-f7ef9690127f" />

---

## Requisitos previos para la instalación

Para poder ejecutar este proyecto, necesitas tener instalado en tu máquina:

- Node.js v18 o superior  
- npm (incluido con Node.js)  
- Git para clonar los repositorios  
- MongoDB  

---

## Instalación y ejecución

### 1. Clonar los repositorios

**Backend:**
git clone https://github.com/GestionAgro/Back-agro.git
cd Back-agro


**Frontend:**
git clone https://github.com/GestionAgro/Front-agro.git
cd Front-agro


---

### 2. Configurar y ejecutar el backend

cd Back-agro
npm install

Crear un archivo **.env** en **Back-agro/** con:

PORT=3000

Iniciar el backend en modo desarrollo:

npm run dev

El backend estará disponible en:  
**http://localhost:3000**

---

### 3. Configurar y ejecutar el frontend

cd Front-agro
npm install

Crear un archivo **.env** en **Front-agro/** con:

VITE_API_URL=http://localhost:3000

Iniciar el frontend:

npm run dev

El frontend estará disponible en:  
**http://localhost:5173**

---

## Scripts disponibles

### **Backend:**
- **npm run dev**: Levanta el servidor en desarrollo con recarga automática  
- **npm start**: Levanta el servidor en modo producción  

### **Frontend:**
- **npm run dev**: Levanta el servidor de desarrollo de Vite  
- **npm run build**: Genera la versión optimizada para producción  
