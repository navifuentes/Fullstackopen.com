# Part 2

## C - Obteniendo datos del servidor

- instalar servidor JSON de manera global:

  > npm i -g json-server

- por defecto se ejectua en el puerto "3000", la cambiaremos al puerto "3001". Por defecto el "--watch" busca cualquier cambio guardado en el archivo

  > npx json-server --port 3001 --watch db.json

- en el directorio raiz instalar:

  > npm i axios

  > npm i json-server --save-dev

- en "package.json", "scripts" agregar:

  > "server": "json-server -p3001 --watch db.json"
