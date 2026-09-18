# SENA SpaceHub

Frontend (React 19 + TypeScript + Vite + Tailwind CSS 4) para gestionar el inventario de equipos y los préstamos de los ambientes de formación.

## Requisitos

- Node.js 20+
- API REST del backend en ejecución (por defecto `http://localhost:3000/api/v1`)

## Comandos

```
npm install     # instalar dependencias
npm run dev     # servidor de desarrollo
npm run build   # comprobar tipos y generar dist/
npm run lint    # oxlint
```

## Configuración

Crea un `.env` en la raíz para cambiar la URL del backend:

```
VITE_API_URL=http://localhost:3000/api/v1
```

## Endpoints que consume

- `POST /auth/login`, `POST /auth/register`, `POST /auth/logout`
- `GET/POST /equipos`, `PUT/DELETE /equipos/:placaSena`
- `GET/POST /prestamos`, `PUT /prestamos/:id/devolver`
- `GET /usuarios/aprendices` (Administrador e Instructor)
- `GET /dashboard/stats`

## Roles

`Administrador`, `Instructor` y `Aprendiz`. Solo el Administrador puede crear, editar y eliminar equipos, y registrar devoluciones.
