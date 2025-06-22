# User Registration Endpoint

## POST `/users/register`

Registers a new user in the system.

### Request Body

Send a JSON object with the following structure:

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

#### Field Requirements

- `fullName.firstName` (string, required): Minimum 3 characters.
- `fullName.lastName` (string, optional): Minimum 3 characters if provided.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

### Responses

- **201 Created**
  - Registration successful.
  - Returns a JSON object with a JWT token and the created user.
  - Example:
    ```json
    {
      "token": "jwt_token_here",
      "user": {
        "_id": "user_id_here",
        "fullName": {
          "firstName": "John",
          "lastName": "Doe"
        },
        "email": "john.doe@example.com",
        "socketId": null
      }
    }
    ```

- **400 Bad Request**
  - Validation failed.
  - Returns a JSON object with an `errors` array describing the issues.
  - Example:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Email!",
          "param": "email",
          "location": "body"
        }
      ]
    }
    ```

### Example Request

```sh
curl -X POST http://localhost:4000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": { "firstName": "John", "lastName": "Doe" },
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }'
```

---

# User Login Endpoint

## POST `/users/login`

Authenticates a user and returns a JWT token.

### Request Body

Send a JSON object with the following structure:

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

#### Field Requirements

- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

### Responses

- **200 OK**
  - Login successful.
  - Returns a JSON object with a JWT token and the user.
  - Example:
    ```json
    {
      "token": "jwt_token_here",
      "user": {
        "_id": "user_id_here",
        "fullName": {
          "firstName": "John",
          "lastName": "Doe"
        },
        "email": "john.doe@example.com",
        "socketId": null
      }
    }
    ```

- **400 Bad Request**
  - Validation failed.
  - Returns a JSON object with an `errors` array describing the issues.
  - Example:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Email!",
          "param": "email",
          "location": "body"
        }
      ]
    }
    ```

- **401 Unauthorized**
  - Invalid email or password.
  - Example:
    ```json
    {
      "message": "Invalid email or password!"
    }
    ```

### Example Request

```sh
curl -X POST http://localhost:4000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }'
```

---

# User Logout Endpoint

## GET `/users/logout`

Logs out the authenticated user by blacklisting their JWT token for 24 hours.

### Authentication

- Requires a valid JWT token in the `Authorization` header as a Bearer token or in the `token` cookie.

### Responses

- **200 OK**
  - Logout successful.
  - Example:
    ```json
    {
      "message": "Logged out!"
    }
    ```

- **401 Unauthorized**
  - If the user is not authenticated or the token is missing/invalid.
  - Example:
    ```json
    {
      "message": "Authentication required"
    }
    ```

### Example Request

```sh
curl -X GET http://localhost:4000/users/logout \
  -H "Authorization: Bearer <your_jwt_token>"
```