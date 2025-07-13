# API Endpoint Documentation

---

## /users/register Endpoint Documentation

### Description
This endpoint allows new users to register by providing their email, password, and full name. The endpoint validates the input, hashes the password, creates a user, and returns an authentication token along with the created user details.

### HTTP Request
- **Method:** POST  
- **URL:** `/users/register`

### Request Body

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

#### Example Request

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

### Responses

#### <span style="color:green">Success (HTTP 201)</span>

```json
{
  "token": "JWT token here",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

#### <span style="color:red">Validation Error (HTTP 400)</span>

```json
{
  "errors": [
    {
      "msg": "Please enter a valid email address",
      "param": "email",
      "location": "body"
    }
  ]
}
```

---

## /users/login Endpoint Documentation

### Description
The `/users/login` endpoint authenticates an existing user using their email and password. If the credentials are valid, the endpoint returns a JSON web token along with the user details.

### HTTP Request
- **Method:** POST  
- **URL:** `/users/login`

### Request Body

```json
{
  "email": "Required. A valid email address.",
  "password": "Required. Must be at least 6 characters long."
}
```

#### Example Request

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Responses

#### <span style="color:green">Success (HTTP 200)</span>

```json
{
  "token": "JWT token here",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

#### <span style="color:red">Unauthorized (HTTP 401)</span>

```json
{
  "message": "Invalid email or password"
}
```

#### <span style="color:red">Validation Error (HTTP 400)</span>

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

---

## /users/profile Endpoint Documentation

### Description
The `/users/profile` endpoint returns the profile data of the authenticated user.

### HTTP Request
- **Method:** GET  
- **URL:** `/users/profile`
- **Authentication:** Required. This endpoint requires a valid JWT token sent via cookie or authorization header.

### Responses

#### <span style="color:green">Success (HTTP 200)</span>

```json
{
  "_id": "user_id",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}
```

#### <span style="color:red">Unauthorized (HTTP 401)</span>

```json
{
  "message": "Unauthorized"
}
```

---

## /users/logout Endpoint Documentation

### Description
The `/users/logout` endpoint logs out the authenticated user by blacklisting the JWT token and clearing the authentication cookie.

### HTTP Request
- **Method:** GET  
- **URL:** `/users/logout`
- **Authentication:** Required

### Responses

#### <span style="color:green">Success (HTTP 200)</span>

```json
{
  "message": "User logged out successfully"
}
```

#### <span style="color:red">Unauthorized (HTTP 401)</span>

```json
{
  "message": "Unauthorized"
}
```

---

## /captains/register Endpoint Documentation

### Description
This endpoint allows new captains (drivers) to register by providing their personal and vehicle details. The endpoint validates the input, hashes the password, creates a captain, and returns an authentication token along with the created captain details.

### HTTP Request
- **Method:** POST  
- **URL:** `/captains/register`

### Request Body

```json
{
  "fullname": {
    "firstname": "Required. Must be at least 3 characters.",
    "lastname": "Optional. Must be at least 3 characters if provided."
  },
  "email": "Required. A valid email address.",
  "password": "Required. Must be at least 6 characters.",
  "vehicle": {
    "color": "Required. Must be at least 3 characters.",
    "plate": "Required. Must be at least 3 characters.",
    "capacity": "Required. Integer, at least 1.",
    "vehicleType": "Required. One of: 'car', 'bike', 'auto'."
  }
}
```

#### Example Request

```json
{
  "fullname": {
    "firstname": "Alice",
    "lastname": "Smith"
  },
  "email": "alice.smith@example.com",
  "password": "securePass123",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Responses

#### <span style="color:green">Success (HTTP 201)</span>

```json
{
  "token": "JWT token here",
  "captain": {
    "fullname": {
      "firstname": "Alice",
      "lastname": "Smith"
    },
    "email": "alice.smith@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ1234",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

#### <span style="color:red">Validation Error (HTTP 400)</span>

```json
{
  "errors": [
    {
      "msg": "Invalid email address",
      "param": "email",
      "location": "body"
    }
  ]
}
```

---

## /captains/login Endpoint Documentation

### Description
The `/captains/login` endpoint authenticates a captain (driver) using their email and password. On successful authentication, it returns a JWT token and the captain's details.

### HTTP Request
- **Method:** POST  
- **URL:** `/captains/login`

### Request Body

```json
{
  "email": "Required. A valid email address.",
  "password": "Required. Must be at least 6 characters long."
}
```

#### Example Request

```json
{
  "email": "captain@example.com",
  "password": "securePass123"
}
```

### Responses

#### <span style="color:green">Success (HTTP 200)</span>

```json
{
  "token": "JWT token here",
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "Alice",
      "lastname": "Smith"
    },
    "email": "captain@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ1234",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

#### <span style="color:red">Unauthorized (HTTP 401)</span>

```json
{
  "message": "Invalid email or password"
}
```

#### <span style="color:red">Validation Error (HTTP 400)</span>

```json
{
  "errors": [
    {
      "msg": "Invalid email address",
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

---

## /captains/profile Endpoint Documentation

### Description
The `/captains/profile` endpoint returns the profile data of the authenticated captain.

### HTTP Request
- **Method:** GET  
- **URL:** `/captains/profile`
- **Authentication:** Required. A valid JWT token must be provided via cookie or Authorization header.

### Responses

#### <span style="color:green">Success (HTTP 200)</span>

```json
{
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "Alice",
      "lastname": "Smith"
    },
    "email": "captain@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ1234",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

#### <span style="color:red">Unauthorized (HTTP 401)</span>

```json
{
  "message": "Invalid or expired authentication token"
}
```

---

## /captains/logout Endpoint Documentation

### Description
The `/captains/logout` endpoint logs out the authenticated captain by blacklisting the JWT token and clearing the authentication cookie.

### HTTP Request
- **Method:** GET  
- **URL:** `/captains/logout`
- **Authentication:** Required

### Responses

#### <span style="color:green">Success (HTTP 200)</span>

```json
{
  "message": "Logout successfully"
}
```

#### <span style="color:red">Unauthorized (HTTP 401)</span>

```json
{
  "message": "Invalid or expired authentication token"
}
```

---

## Additional Notes

- **Authentication:** All endpoints except `/users/register`, `/users/login`, `/captains/register`, and `/captains/login` require a valid JWT token.
- **Token Handling:** On login, the JWT token is set as a cookie. On logout, the token is blacklisted and the cookie is cleared.
- **Validation:** All endpoints validate input and return detailed error messages for invalid requests.

---

> **Note:**  
> The color styling (`green` for success, `red` for failure) is for documentation clarity.  
> In Markdown viewers that do not support HTML/CSS, the color may not be visible.