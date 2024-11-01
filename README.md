# API Documentation

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

### Update User

**Method**: PUT

**URL**: `http://localhost:5000/users/:id`

**Auth required**: False

**Headers**:

```json
{ "Content-Type": "application/json", "x-version": "1.0.0" }
```

**Body**:

```json
{
  "email": "m@gmail.com",
  "password": "123"
}
```

**Responses**:

- Code: 200 OK


```json
{
  "status": 200,
  "message": "User modified succesfully",
  "data": {
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
  }
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
    "description": "Hola voy a tratar de agregar mucho texto aver que pasa, con esto, la idea es mirar que tan responsiva es esta ventanita emergente, mirar si con mucho texto se puede desbordar o algo.&nbsp;<div><br></div><div>De momento, va super bien la cosa, estaba pensando agregar tres parrafos para hacerlo largo pero ya me esta dando pereza, por cierto, que rico suena el teclado en verdad, hjahaha que chevere este proyecto fr.&nbsp;</div><div><br></div><div>&nbsp;El profe miguel dijo que este proyecto era para hacer como ffiltro a los otros, pero en 4 horas yo no hago esto ni borracho, o bueno tal vez si, lo unico que me llevo tanto tiempo fue el tema de las apis.</div><div><br></div><div><br></div><div>jeje</div>",
    "created_at": "2024-10-27T22:20:33.807Z",
    "user_id": "671d107fe0fb5166d0adbbc6",
    "estado": "visible"
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
      "description": "Recordar comprar leche, pan y frutas.<div><br></div><div>Recordar comprar jabon de ropa.</div>",
      "created_at": "2024-10-25T10:00:00.000Z",
      "user_id": "671d107fe0fb5166d0adbbc6",
      "estado": "visible"
    },
    {
      "_id": "671e41889c8029d0a435dddf",
      "title": "Este es un ejemplo de un texto bastante largo, la idea es mirar que pasa si se estalla la wea xd",
      "description": "XD<div><br></div><div>MAN PQ ESTA TAN CORTICO ESTE TEXTO HAHAHAHAHAHA HOLIIIIIIIIIIIIIII</div><div><br></div>",
      "created_at": "2024-10-27T13:35:04.175Z",
      "user_id": "671d107fe0fb5166d0adbbc6",
      "estado": "visible"
    }
  ]
}
```

### Find Note By Title Or Desc

**Method**: POST

**URL**: `http://localhost:5000/notes/search`

**Auth required**: False

**Headers**:

```json
{ "Content-Type": "application/json", "x-version": "1.0.0" }
```

**Body**:

```json
{
  "text": "HAHAHA"
}
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
      "description": "XD<div><br></div><div>MAN PQ ESTA TAN CORTICO ESTE TEXTO HAHAHAHAHAHA HOLIIIIIIIIIIIIIII</div><div><br></div>",
      "created_at": "2024-10-27T13:35:04.175Z",
      "user_id": "671d107fe0fb5166d0adbbc6",
      "estado": "visible"
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
  "description": "Hola voy a tratar de agregar"
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
  "description": "Hola voy a tratar de agregar"
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

```plaintext

This 
```