# Hello World API

API for all hello world programming languages.

## API Documentation (_still in progress_)

The API url is `https://start-express-ts-marj4n.vercel.app/api` and the following endpoints are available:

### Authentication

- **POST** `/auth/register` - Register a new user.

_Required fields_: `username`, `email`, `password`
<br>
_Example request body_:

```json
{
  "email": "jokowi@gmail.com",
  "password": "jokowi12345",
  "username": "jokowi"
}
```

- **POST** `/auth/login` - Login a user.

_Required fields_: `email`, `password`
<br>
_Example request body_:

```json
{
  "email": "jokowi@gmail.com",
  "password": "jokowi12345"
}
```

- **GET** `/auth/logout` - Logout a user.

_Description_: Only authenticated users can logout.

### Users

- **GET** `/users` - Get all users.

_Description_: Only authenticated users can get all users.

- **GET** `/users/:id` - Get a user by id.

_Description_: Only Authenticated users can get a user by id.
<br>
_Url example_: `http://localhost:8080/api/users/2`

- **PATCH** `/users/:id` - Update a user by id.

_Description_: Only the user's owner can update the user.
<br>
_Url example_: `http://localhost:8080/api/users/2`
<br>
_Required fields_: `username`
<br>
_Example request body_:

```json
{
  "username": "Jamashin"
}
```

- **DELETE** `/users/:id` - Delete a user by id.

_Description_: Only the user's owner can delete the user.
<br>
_Url example_: `http://localhost:8080/api/users/2`

### Books

- **GET** `/books` - Get all books.

_Description_: Everyone can get all books.

- **GET** `/books/:id` - Get a book by id.

_Description_: Everyone can get a book by id.
<br>
_Url example_: `http://localhost:8080/api/books/2`

- **POST** `/books` - Create a new book.

_Description_: Only authenticated users can create a book.
<br>
_Required fields_: `title`, `author`, `description`, `publicationYear`
<br>
_Example request body_:

```json
{
  "title": "Dangerous Zombie",
  "author": "Genmu",
  "description": "Gachan! Level Up! D-Dangerous! Zombie! D-Dangerous! Zombie!",
  "publicationYear": 2016
}
```

- **PATCH** `/books/:id` - Update a book by id.

_Description_: Only the book's owner can update the book.
<br>
_Url example_: `http://localhost:8080/api/books/2`
<br>
_Required fields_: `title`, `author`, `description`, `publicationYear`
<br>
_Example request body_:

```json
{
  "title": "Taddle Legacy",
  "author": "Genmu",
  "description": "Gachan! Level Up! Tadoru rekishi! Mezameru kishi! Taddle Legacy~!",
  "publicationYear": 2017
}
```

- **DELETE** `/books/:id` - Delete a book by id.

_Description_: Only the book's owner can delete the book.
<br>
_Url example_: `http://localhost:8080/api/books/2`
