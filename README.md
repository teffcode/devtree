# DevTree 🌲

## ✨ Primeros pasos:

Creación de archivos e instalaciones iniciales:

1. Crear **entry point**: `index.js`
2. Crear **package.json** (Dependencias de producción y desarrollo): `npm init`
3. Instalamos **Express**: `npm install express` (aquí se crea la parte de `dependencies` en el `package.json`, el `node_modules` y el `package-lock` que es donde están las otras dependendicias que necesita Express para funcionar)
4. Añadir el `.gitignore`

Uso de Express con CommonJS:

1. Se trae la dependencia con CommonJS en el index.js: `const express = require("express");`
2. Se crea la instancia del servidor: `const app = express();`
3. Se crea el servidor: `app.listen(4000, () => console.log("Servidor funcionando..."));`
4. Se corre el servidor con: `node index.js`
5. Se va al navegador: `http://localhost:4000/`
6. Creamos una ruta: `app.get("/", (req, res) => res.send("Hola mundo en Express"));`
7. Paramos el server en la terminal y volvemos a correr: `node index.js`
8. Debe aparecer ahora en el navegador **"Hola mundo en Express"**

Habilitar modo Watch (de forma nativa con el **modo watch**):
> para no estar deteniendo y arrancando el server desde la terminal.

1. Correr: `node --watch index.js`
2. Añadir comando al package.json: `"scripts": { "dev": "node --watch index.js" },`
3. Correr en la terminal: `npm run dev`

Habilitar modo Watch (con la librería de desarrollo **nodemon**):
> para no estar deteniendo y arrancando el server desde la terminal.

1. Correr: `npm i --save-dev nodemon` o `npm i --D nodemon` (aparecera `devDependencies` en el `package.json`)
2. Añadir comando al package.json: `"scripts": { "dev": "nodemon index.js" },`
3. Correr en la terminal: `npm run dev`

Uso de ECMAScript (para usar TypeScript):

1. Ir al package.json y añadir: `"type": "module",`
2. Cambiar `const express = require("express");` por `import express from "express";`

TypeScript:
> Express no soporta TS por lo que se debe hacer con un archivo llamado **tsconfig.json**

1. Instalar TA: `npm i -D typescript ts-node`
2. Crear el archivo **tsconfig.json**
3. Crear el folder **src**
4. Cambiar extensión de index.js por index.ts
5. Cambiar el comando en package.json `dev": "node --watch src/index.ts"` por `dev": "nodemon src/index.ts"`
6. Instalar nodemon en desarrollo `npm i -D nodemon` 
7. Remover **"type": "module",** del `package.json`
8. Correr: `npm run dev`
9. Installar `npm i -D @types/express`
10. Agregar los tipos **Request** and **Response** en el **index.ts**: `app.get("/", (req: Request, res: Response) => {`

Compilar código TypeScript a JavaScript:

1. Agregar al package.json en scripts: `"build": "tsc"` (tsc = typescript compiler)
2. Ejecutar en la terminal `npm run build`
3. Ver que se crea la carpeta `/dist`
4. También agregamos al package.json en scripts: `"start": "node dist/index.js"` (en el server estará sirviendo es la versión de js y no la de ts)
5. Ejecutar en la terminal `npm run start`
6. Pero, `npm run dev` es para la parte de pruebas así que seguimos con ese

Separación del entry point:

src/index.ts

```
import app from "./server";

const port = process.env.PORT || 4000;

app.listen(port, () => console.log("Servidor funcionando en el puerto:", port));
```

src/router.ts

```
import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hola mundo en Express")
});

export default router;
```

src/server.ts

```
import express from "express";
import router from "./router";

const app = express();

app.use("/", router);

export default app;
```

## ✨ Routing, DB, ORM:

Para crear un POST:

1. Permitir leer formularios con `app.use(express.json());` en **server.ts**
2. Usar `router.post...` en **router.ts**

Añadir una DB y un ORM:


