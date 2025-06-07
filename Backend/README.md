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