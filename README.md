# Roda - Frontend (Simulador de crédito para movilidad eléctrica)

## 1. Descripción del proyecto
Interfaz web que permite simular un crédito para bicicleta o moto eléctrica, ver de inmediato el resumen y la tabla de amortización completa, y opcionalmente registrar una solicitud de crédito con datos personales. Consume la API REST del backend (ver repositorio de Backend).

## 2. Tecnologías utilizadas
- **React** (Vite como bundler)
- **Axios** — llamadas HTTP al backend
- **ESLint** — linter por defecto de Vite

## 3. Estructura del proyecto
```
Frontend/
├── src/
│   ├── components/
│   │   ├── FormularioSimulacion.jsx   # formulario de datos del vehículo/crédito
│   │   ├── ResumenCredito.jsx          # tabla con el resumen calculado
│   │   ├── TablaAmortizacion.jsx        # tabla de amortización mes a mes
│   │   └── FormularioSolicitud.jsx       # formulario de datos personales
│   ├── services/
│   │   └── api.js                          # llamadas centralizadas a la API
│   ├── App.jsx                               # componente raíz, maneja el estado compartido
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## 4. Instalación paso a paso
```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd Frontend

# 2. Instalar dependencias
npm install
```

## 5. Variables de entorno
No se usan variables de entorno en el frontend. La URL del backend está definida como constante en `src/services/api.js`:
```js
const API_URL = "https://roda-backend-jr4j.onrender.com";
```
> Actualmente apunta al backend desplegado en producción (Render). Si se quiere correr contra un backend local, cambiar esta constante a `http://127.0.0.1:8000` antes de ejecutar `npm run dev`.

## 6. Ejecutar el proyecto
```bash
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`, consumiendo el backend según la URL configurada en `api.js` (ver sección 5).

## 7. Flujo de la aplicación

1. El usuario llena `FormularioSimulacion` con los datos del vehículo y el crédito.
2. Al enviar, se llama a `POST /simular` y se muestra `ResumenCredito` con los totales calculados.
3. Inmediatamente después, `TablaAmortizacion` llama a `POST /amortizacion` y muestra el plan de pagos completo — sin que el usuario haya entregado datos personales todavía.
4. Si el usuario decide continuar, llena `FormularioSolicitud` con sus datos personales. Al enviar, se llama a `POST /solicitudes`, combinando los datos de la simulación con los datos personales, y se registra la solicitud en el backend.

Este orden (simular → ver resumen y amortización → registrar) responde directamente a la HU-01 del enunciado: el usuario debe poder conocer el valor de sus cuotas antes de tomar una decisión, no después de haberse registrado.

## 8. Manejo de estado

El estado se maneja con `useState` de React, centralizado en `App.jsx` (patrón "lifting state up"): `App.jsx` guarda el resultado de la simulación y el de la solicitud, y los reparte como props a los componentes que los necesitan. No se usó Context API ni ninguna librería de manejo de estado global (Redux, Zustand), porque el flujo es lineal y de una sola pantalla, perfecto para este alcance.

## 9. Validaciones implementadas (frontend)

Además de los atributos `required` en cada input, se implementaron validaciones en tiempo real (mientras el usuario escribe), como apoyo de UX — la validación más fuerte ocurre siempre en el backend:

| Validación | Componente |
|---|---|
| valor_vehiculo ≥ $500.000 COP | FormularioSimulacion |
| cuota_inicial debe ser menor al valor del vehículo | FormularioSimulacion |
| Formato de correo válido | FormularioSolicitud |
| Teléfono solo dígitos | FormularioSolicitud |

El botón de envío de cada formulario se deshabilita mientras existan errores de validación pendientes.

## 10. Decisiones técnicas y supuestos

- **`services/api.js` centraliza todas las llamadas HTTP:** evita repetir la URL base y la lógica de manejo de errores en cada componente.
- **Componentes controlados:** todos los inputs de formulario usan `value` + `onChange` administrados por React, no el DOM, para poder validar en tiempo real y leer los valores antes de enviarlos a la API.
- **`TablaAmortizacion` depende de los datos de la simulación, no de un ID de solicitud registrada:** ver punto 7. Esto permite verla sin necesidad de haberse registrado, en línea con la HU-01.

## 11. Alcance y limitaciones conocidas

- Sin estilos visuales elaborados (CSS mínimo); el foco del desarrollo estuvo en la lógica, la integración con el backend y las validaciones.
- No hay manejo de rutas (React Router): toda la aplicación vive en una sola vista, ya que el flujo es lineal y no lo requiere.
- No se persiste el estado entre recargas de página (por ejemplo, con localStorage); si el usuario recarga, debe simular de nuevo.

## 12. Despliegue

- Frontend en producción: https://rd-frontend.vercel.app

> Nota: si la primera petición al backend tarda en responder, es porque el plan gratuito de Render "duerme" el servicio tras un periodo de inactividad (ver README del repositorio de Backend).