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

  _Deploy_

- para Fly.io; establecer el valor de variables de entorno desde la consola:

  > fly secrets set MONGODB_URI="mongodb+srv://fullstack:thepasswordishere@cluster0.o1opl.mongodb.net/noteApp?retryWrites=true&w=majority"

# Part 4 | Authentication

### creacion de blog asociada al user con token

- Crear un archivo login en controllers donde definimos el loginRouter.

- importamos las librerias "jsonwebtoken","bcrypt" y "express".Router() . Tambien el User model.

  > const jwt = require('jsonwebtoken')
  > const bcrypt = require('bcrypt')
  > const loginRouter = require('express').Router()
  > const User = require('../models/user')

- destructuramos los datos traidos en el request

  > const {username, password} = req.body

- se comienza buscando el usario en la base de datos

  > const user = await User.findOne({ username })

- se verifica la que el user existe , y luego se verifica la password; el resultado se guarda en la const (Boolean)

  > const passwordCorrect = user === null
  > ? false
  > : await bcrypt.compare(password, user.passwordHash)

- si no se encuentra la password en "bcrypt.compare(....), respondemos con un codigo de estado "401 unauthorized"

  > if (!(user && passwordCorrect)) {
  > return response.status(401).json({
  > error: 'invalid username or password'
  > })
  > }

- si la contraseña es correcta se crea un token con el metodo "jwt.sign(....)

  > const userForToken = {
  > username: user.username,
  > id: user.\_id,
  > }
  > const token = jwt.sign(userForToken, process.env.SECRET)

- se firma digitalemnte con la variable SECRET, lo que garantiza que solo los que conocen la variable pueden generar un token valido
- una solicitud exitosa responde con el codigo "200 OK" y el token se envia al browser

  > response
  > .status(200)
  > .send({ token, username: user.username, name: user.name })

- creamos una funcion "getTokenFrom" que aisla el token del "header authorization".

  > const getTokenFrom = request => {
  > const authorization = request.get('authorization')
  > if (authorization && authorization.startsWith>('Bearer ')) {
  > return authorization.replace('Bearer ', '')
  > }
  > return null
  > }

- se comprueba la validez con "jwt.verify"

  > const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  > if (!decodedToken.id) {
  > return response.status(401).json({ error: 'token invalid' })
  > }
  > const user = await User.findById(decodedToken.id)

- agregamos el manejo de error por si el token es invalido

  > else if (error.name === 'JsonWebTokenError') {
  > return response.status(401).json({ error: error.message })
  > }

- en POSTMAN debemos agregar el token devuelto en el "login" en "authorization" , definida en "bearer token"

- Si la aplicación tiene múltiples interfaces que requieren identificación, la validación de JWT debe separarse en su propio middleware. También se podría utilizar alguna librería existente como "express-jwt".

### caducar token

- limitamos el periodo de validacion del token el router de login

  ` const token = jwt.sign(
  userForToken, 
  process.env.SECRET,
  { expiresIn: 60*60 }
)`

- hay que manejar el error a un token caducado

  `else if (error.name === 'TokenExpiredError') {
  return response.status(401).json({
    error: 'token expired'
  })
}`
