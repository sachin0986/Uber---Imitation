# /users/register Endpoint Documentation

## Description
This endpoint allows new users to register by providing their email, password, and full name. The endpoint validates the input, hashes the password, creates a user, and returns an authentication token along with the created user details.

## HTTP Request
- **Method:** POST  
- **URL:** `/users/register`

## Request Body
The endpoint expects a JSON payload with the following structure:

```json
{
  "fullname": {
    "firstname": "Required. Must be at least 3 characters.",
    "lastname": "Optional. Must be at least 3 characters if provided."
  },
  "email": "Required. A valid email address is necessary.",
  "password": "Required. Must be at least 6 characters."
}
```

### Example Request
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Responses

### Success (HTTP 201)
On successful registration, the response will include a JSON object containing the authentication token and the user data.

```json
{
  "token": "JWT token here",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
    // Other user details may be included
  }
}
```

### Validation Error (HTTP 400)
If the input validation fails, the endpoint returns a 400 status code with details about the validation errors.

```json
{
  "errors": [
    {
      "msg": "Please enter a valid email address",
      "param": "email",
      "location": "body"
    }
    // Additional error objects if applicable
  ]
}
```

## Additional Notes
- **Password Security:** The provided password is securely hashed before being stored.
- **Token Generation:** An authentication token is generated using JWT.
- **Required Fields:** `fullname.firstname`, `email`, and `password` are mandatory. The `fullname.lastname` field is optional.

# /users/login Endpoint Documentation

## Description
The `/users/login` endpoint authenticates an existing user using their email and password. If the credentials are valid, the endpoint returns a JSON web token along with the user details.

## Endpoint Details

- **Method:** POST  
- **URL:** `/users/login`

## Request Body

The endpoint expects a JSON payload with the following structure:

```json
{
  "email": "Required. A valid email address.",
  "password": "Required. Must be at least 6 characters long."
}
```

### Example Request

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Responses

### Success (HTTP 200)
On successful authentication, the response contains a JSON object with the authentication token and user details.

```json
{
  "token": "JWT token here",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
    // Additional user details if applicable
  }
}
```

### Error Responses

#### Unauthorized (HTTP 401)
If the credentials are invalid, the endpoint returns a 401 status code with an error message.

```json
{
  "message": "Invalid email or password"
}
```

#### Validation Error (HTTP 400)
If the input validation fails (e.g., invalid email format or password too short), a 400 status code is returned with details about the validation errors.

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

## Additional Notes
- **Token Generation:** A JSON web token (JWT) is generated upon successful authentication.
- **Password Verification:** The user's provided password is compared against the stored hash using bcrypt.
- **Cookie Handling:** On successful login, the token is also set as an HTTP cookie.