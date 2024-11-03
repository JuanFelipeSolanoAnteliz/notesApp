# API Documentation

# To do local tests
## First of all you have to change the branch to local test, currentrly the deployed version is not working correctly so if you wanna try this App execute the following command and go to the README file after that.

**command to swithc branch**

`git branch localProject`

**Create a file `.env` and then copy and paste this in that file**
```
MONGO_URI=mongodb://mongo:jmALqsSRgpmIrYuieEPDAvvCLZySsCSV@junction.proxy.rlwy.net:10635
MONGO_DB=notesApp

EXPRESS_PROTOCOL=http
EXPRESS_HOST_NAME=localhost
EXPRESS_PORT=5000

SECRET_KEY=729e97f2f54e6a1edb3cfe3d7b1b96516458312623d8757bb1cbb4245a8a4d1eb5d3111961baeb8227a6ba6971c15f54da447862813a07d391a02de5447814031cca4ab6921f44d57fb7b2d3e9aa3d8e07987071ede00d3ff13b70ad05134c5162cdd27bb7f58cfd0620548ca45946d16af151f3b4c50965ae44f5cf690cdccb

```

**Execute the following to commands in your bash to start to test this project in your local host**

1. `npm install` 
2. `npm run start`

**After that in your bash you have got a console output whit a link where there is the app**

## USERS

### Sign in

**Method**: POST

**URL**: `http://localhost:5000/users/login`

**Auth required**: False

**Headers**:
```json

{ "Content-Type": "application/json", "x-version": "1.0.0" }

**Body**:

```json
{
  "email": "fluis_martin@gmail.com",
  "password": "123"
}
```

**Responses**:

- Code: 200 OK


```json
{
  "status": 200,
  "message": "You have successfully logged in"
}
```

- Code: 404 Not Found


```json
{
  "status": 404,
  "message": "Email not found",
  "data": null
}
```

- Code: 406 Not Acceptable


```json
{
  "status": 406,
  "message": "Invalid password"
}
```

### Create User

**Method**: POST

**URL**: `http://localhost:5000/users`

**Auth required**: False

**Headers**:

```json
{ "Content-Type": "application/json", "x-version": "1.0.0" }
```

**Body**:

```json
{
  "nombre": "Crispetiny musolino",
  "email": "fluis_martin@gmail.com",
  "nickname": "Musolinino",
  "password": "asd"
}
```

**Responses**:

- Code: 200 OK


```json
{
  "status": 200,
  "message": "You have successfully logged in"
}
```

- Code: 200 OK


```json
{
  "status": 200,
  "message": "El nickName ya existe en la colección."
}
```

- Code: 200 OK


```json
{
  "status": 200,
  "message": "El email ya existe en la colección."
}
```

- Code: 202 Accepted


```json
{
  "status": 202,
  "message": "User created succesfully"
}
```

## NOTES

### Get History

**Method**: GET

**URL**: `http://localhost:5000/notes/:id/history`

**Auth required**: False

**Headers**:

```json
{ "Content-Type": "application/json", "x-version": "1.0.0" }
```

**Response**:

- Code: 200 OK


```json
{
  "status": 200,
  "message": "History obtained",
  "data": [
    {
      "_id": "671ebb48fe842ee29edf9180",
      "title": "Hola mundo, jijij",
      "body": "Esto es una prueba",
      "user": "671d107fe0fb5166d0adbbc6",
      "date": "2024-10-27T22:14:32.180Z",
      "note_id": "671ea4aa90a93206cd9e93d8"
    },
    {
      "_id": "671ebb94fe842ee29edf9182",
      "title": "Hola mundo",
      "body": "",
      "user": "671d107fe0fb5166d0adbbc6",
      "date": "2024-10-27T22:15:48.082Z",
      "note_id": "671ea4aa90a93206cd9e93d8"
    }
  ]
}
```

### Get Note By Id

**Method**: GET

**URL**: `http://localhost:5000/notes/:id`

**Auth required**: False

**Headers**:

```json
{ "Content-Type": "application/json", "x-version": "1.0.0" }
```

**Responses**:

- Code: 200 OK


```json
{
  "status": 200,
  "message": "Note obtained",
  "data": {
    "_id": "671ebcb1fe842ee29edf9183",
    "title": "Otra prueba mas.",
    "body": "Hola voy a tratar de agregar mucho texto aver que pasa, con esto, la idea es mirar que tan responsiva es esta ventanita emergente",
    "date": "2024-10-27T22:20:33.807Z",
    "user": "671d107fe0fb5166d0adbbc6",
    "history":[]
  }
}
```

- Code: 404 Not Found


```json
{
  "status": 404,
  "message": "Note not found",
  "data": null
}
```

### Get All Notes

**Method**: GET

**URL**: `http://localhost:5000/notes/`

**Auth required**: False

**Headers**:

```json
{ "Content-Type": "application/json", "x-version": "1.0.0" }
```

**Response**:

- Code: 200 OK


```json
{
  "status": 200,
  "message": "List of notes obtained",
  "data": [
    {
      "_id": "671d1f501d3f4958e788b394",
      "title": "Compra de víveres",
      "body": "Recordar comprar leche, pan y frutas.<div><br></div><div>Recordar comprar jabon de ropa.</div>",
      "date": "2024-10-25T10:00:00.000Z",
      "user": "671d107fe0fb5166d0adbbc6",
      "history":[]
    },

  ]
}
```

### Find Note By Title Or Desc

**Method**: GET

**URL**: `http://localhost:5000/notes/search?searchTerm=texto a buscar`

**Auth required**: False

**Headers**:

```json
{ "Content-Type": "application/json", "x-version": "1.0.0" }
```


**Responses**:

- Code: 200 OK


```json
{
  "status": 200,
  "message": "Note obtained",
  "data": [
    {
      "_id": "671e41889c8029d0a435dddf",
      "title": "Este es un ejemplo de un texto bastante largo, la idea es mirar que pasa si se estalla la wea xd",
      "body": "XD<div><br></div><div>MAN PQ ESTA TAN CORTICO ESTE TEXTO HAHAHAHAHAHA HOLIIIIIIIIIIIIIII</div><div><br></div>",
      "date": "2024-10-27T13:35:04.175Z",
      "user": "671d107fe0fb5166d0adbbc6",
      "history":[]
    }
  ]
}
```

- Code: 404 Not Found


```json
{
  "status": 404,
  "message": "Note not found",
  "data": []
}
```

### Save Note

**Method**: POST

**URL**: `http://localhost:5000/notes`

**Auth required**: False

**Headers**:

```json
{ "Content-Type": "application/json", "x-version": "1.0.0" }
```

**Body**:

```json
{
  "title": "Otra prueba mas.",
  "body": "Hola voy a tratar de agregar"
}
```

**Response**:

- Code: 201 Created


```json
{
  "status": 201,
  "message": "Note Inserted Succesfully"
}
```

### Update Note

**Method**: PUT

**URL**: `http://localhost:5000/notes/:id`

**Auth required**: False

**Headers**:

```json
{ "Content-Type": "application/json", "x-version": "1.0.0" }
```

**Body**:

```json
{
  "title": "Otra prueba mas, edicion prueba",
  "body": "Hola voy a tratar de agregar"
}
```

**Response**:

- Code: 200 OK


```json
{
  "status": 200,
  "message": "Note Updated Succesfully"
}
```

### Delete Note

**Method**: DELETE

**URL**: `http://localhost:5000/notes/:id`

**Auth required**: False

**Headers**:

```json
{ "Content-Type": "application/json", "x-version": "1.0.0" }
```

**Response**:

- Code: 200 OK


```json
{
  "status": 200,
  "message": "Note Deleted Succesfully"
}
```
