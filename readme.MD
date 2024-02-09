# Part 0

- Crear un repositorio con librerias React + Vite instaladas
  > npm create vite@latest "name" -- --template react
  > cd "name"
  > npm install
  > npm run dev

# Part 2

- instalar servidor JSON de manera global:

  > npm i -g json-server

- por defecto se ejectua en el puerto "3000", la cambiaremos al puerto "3001". Por defecto el "--watch" busca cualquier cambio guardado en el archivo

  > npx json-server --port 3001 --watch db.json

- en el directorio raiz instalar:

  > npm i axios

  > npm i json-server --save-dev

- en "package.json", "scripts" agregar:

  > "server": "json-server -p3001 --watch db.json"

# Part 3
- instalar express para backend:

  > npm i express

- instalar nodemon como dependencia de desarrollo; esta nos permite que mire los cambios hechos y se actualize

  > npm i --save-dev nodemon

- agregamos en package.json>scripts :
  
  > "dev": "nodemon index.js",

- corremos con el comando:

  > npm run dev