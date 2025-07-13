# 🚀 API Endpoint Documentation

> **Modern Transportation API** - Complete endpoint reference with authentication, ride management, and mapping services.

---

## 📋 Table of Contents

- [🔐 Authentication](#-authentication)
  - [User Registration](#user-registration)
  - [User Login](#user-login)
  - [User Profile](#user-profile)
  - [User Logout](#user-logout)
- [👨‍✈️ Captain Management](#-captain-management)
  - [Captain Registration](#captain-registration)
  - [Captain Login](#captain-login)
  - [Captain Profile](#captain-profile)
  - [Captain Logout](#captain-logout)
- [🗺️ Maps & Location](#️-maps--location)
  - [Get Coordinates](#get-coordinates)
  - [Get Distance & Time](#get-distance--time)
  - [Get Suggestions](#get-suggestions)
- [🚗 Ride Management](#-ride-management)
  - [Create Ride](#create-ride)
  - [Get Fare Estimate](#get-fare-estimate)

---

## 🔐 Authentication

### User Registration

```http
POST /users/register
```

**Description:** Creates a new user account with unique email and secure password.

#### Request Body

```json
{
  "fullname": {
    "firstname": "string",    // Required. Min 3 characters
    "lastname": "string"      // Optional. Min 3 characters if provided
  },
  "email": "string",          // Required. Valid email format
  "password": "string"        // Required. Min 6 characters
}
```

#### Responses

<details>
<summary><strong>✅ 201 Created</strong></summary>

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

</details>

<details>
<summary><strong>❌ 400 Bad Request</strong></summary>

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

</details>

---

### User Login

```http
POST /users/login
```

**Description:** Authenticates user credentials and returns access token.

#### Request Body

```json
{
  "email": "string",          // Required. Valid email format
  "password": "string"        // Required. Min 6 characters
}
```

#### Responses

<details>
<summary><strong>✅ 200 OK</strong></summary>

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

</details>

<details>
<summary><strong>❌ 401 Unauthorized</strong></summary>

```json
{
  "message": "Invalid email or password"
}
```

</details>

<details>
<summary><strong>❌ 400 Bad Request</strong></summary>

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

</details>

---

### User Profile

```http
GET /users/profile
```

**Description:** Retrieves authenticated user's profile information.

**Authentication:** 🔒 Required (JWT token via cookie or header)

#### Responses

<details>
<summary><strong>✅ 200 OK</strong></summary>

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}
```

</details>

<details>
<summary><strong>❌ 401 Unauthorized</strong></summary>

```json
{
  "message": "Unauthorized"
}
```

</details>

---

### User Logout

```http
GET /users/logout
```

**Description:** Logs out user by blacklisting JWT token.

**Authentication:** 🔒 Required

#### Responses

<details>
<summary><strong>✅ 200 OK</strong></summary>

```json
{
  "message": "User logged out successfully"
}
```

</details>

<details>
<summary><strong>❌ 401 Unauthorized</strong></summary>

```json
{
  "message": "Unauthorized"
}
```

</details>

---

## 👨‍✈️ Captain Management

### Captain Registration

```http
POST /captains/register
```

**Description:** Creates a new captain (driver) account with vehicle details.

#### Request Body

```json
{
  "fullname": {
    "firstname": "string",    // Required. Min 3 characters
    "lastname": "string"      // Optional. Min 3 characters if provided
  },
  "email": "string",          // Required. Valid email format
  "password": "string",       // Required. Min 6 characters
  "vehicle": {
    "color": "string",        // Required. Min 3 characters
    "plate": "string",        // Required. Min 3 characters
    "capacity": "number",     // Required. Integer, min 1
    "vehicleType": "string"   // Required. One of: 'car', 'bike', 'auto'
  }
}
```

#### Responses

<details>
<summary><strong>✅ 201 Created</strong></summary>

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
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

</details>

<details>
<summary><strong>❌ 400 Bad Request</strong></summary>

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

</details>

---

### Captain Login

```http
POST /captains/login
```

**Description:** Authenticates captain credentials and returns access token.

#### Request Body

```json
{
  "email": "string",          // Required. Valid email format
  "password": "string"        // Required. Min 6 characters
}
```

#### Responses

<details>
<summary><strong>✅ 200 OK</strong></summary>

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "507f1f77bcf86cd799439011",
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

</details>

<details>
<summary><strong>❌ 401 Unauthorized</strong></summary>

```json
{
  "message": "Invalid email or password"
}
```

</details>

<details>
<summary><strong>❌ 400 Bad Request</strong></summary>

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

</details>

---

### Captain Profile

```http
GET /captains/profile
```

**Description:** Retrieves authenticated captain's profile and vehicle information.

**Authentication:** 🔒 Required (JWT token via cookie or header)

#### Responses

<details>
<summary><strong>✅ 200 OK</strong></summary>

```json
{
  "captain": {
    "_id": "507f1f77bcf86cd799439011",
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

</details>

<details>
<summary><strong>❌ 401 Unauthorized</strong></summary>

```json
{
  "message": "Invalid or expired authentication token"
}
```

</details>

---

### Captain Logout

```http
GET /captains/logout
```

**Description:** Logs out captain by blacklisting JWT token.

**Authentication:** 🔒 Required

#### Responses

<details>
<summary><strong>✅ 200 OK</strong></summary>

```json
{
  "message": "Logout successfully"
}
```

</details>

<details>
<summary><strong>❌ 401 Unauthorized</strong></summary>

```json
{
  "message": "Invalid or expired authentication token"
}
```

</details>

---

## 🗺️ Maps & Location

### Get Coordinates

```http
GET /maps/get-coordinates?address={address}
```

**Description:** Converts address string to latitude and longitude coordinates.

**Authentication:** 🔒 Required

#### Query Parameters

| Parameter | Type   | Required | Description                    |
|-----------|--------|----------|--------------------------------|
| address   | string | Yes      | The address to geocode         |

#### Responses

<details>
<summary><strong>✅ 200 OK</strong></summary>

```json
{
  "ltd": 28.7041,
  "lng": 77.1025
}
```

</details>

<details>
<summary><strong>❌ 400 Bad Request</strong></summary>

```json
{
  "errors": [
    {
      "msg": "Address is required",
      "param": "address",
      "location": "query"
    }
  ]
}
```

</details>

<details>
<summary><strong>❌ 404 Not Found</strong></summary>

```json
{
  "message": "Coordinates not found"
}
```

</details>

---

### Get Distance & Time

```http
GET /maps/get-distanse-time?origin={origin}&destination={destination}
```

**Description:** Calculates distance and travel time between two locations.

**Authentication:** 🔒 Required

#### Query Parameters

| Parameter   | Type   | Required | Description           |
|-------------|--------|----------|-----------------------|
| origin      | string | Yes      | Starting location     |
| destination | string | Yes      | Destination location  |

#### Responses

<details>
<summary><strong>✅ 200 OK</strong></summary>

```json
{
  "distance": {
    "text": "10 km",
    "value": 10000
  },
  "duration": {
    "text": "20 mins",
    "value": 1200
  }
}
```

</details>

<details>
<summary><strong>❌ 400 Bad Request</strong></summary>

```json
{
  "errors": [
    {
      "msg": "Origin is required",
      "param": "origin",
      "location": "query"
    }
  ]
}
```

</details>

<details>
<summary><strong>❌ 500 Internal Server Error</strong></summary>

```json
{
  "message": "Internal server error"
}
```

</details>

---

### Get Suggestions

```http
GET /maps/get-suggestions?input={input}
```

**Description:** Provides autocomplete suggestions for location input.

**Authentication:** 🔒 Required

#### Query Parameters

| Parameter | Type   | Required | Description                          |
|-----------|--------|----------|--------------------------------------|
| input     | string | Yes      | Partial address or place name        |

#### Responses

<details>
<summary><strong>✅ 200 OK</strong></summary>

```json
[
  "Connaught Place, New Delhi, Delhi, India",
  "New Delhi Railway Station, New Delhi, Delhi, India",
  "New Delhi Airport, New Delhi, Delhi, India"
]
```

</details>

<details>
<summary><strong>❌ 400 Bad Request</strong></summary>

```json
{
  "errors": [
    {
      "msg": "Input is required",
      "param": "input",
      "location": "query"
    }
  ]
}
```

</details>

<details>
<summary><strong>❌ 500 Internal Server Error</strong></summary>

```json
{
  "message": "Internal server error"
}
```

</details>

---

## 🚗 Ride Management

### Create Ride

```http
POST /rides/create
```

**Description:** Creates a new ride request for authenticated user.

**Authentication:** 🔒 Required

#### Request Body

```json
{
  "pickup": "string",         // Required. Min 3 characters
  "destination": "string",    // Required. Min 3 characters
  "vehicleType": "string"     // Required. One of: 'auto', 'car', 'bike'
}
```

#### Responses

<details>
<summary><strong>✅ 201 Created</strong></summary>

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "user": "507f1f77bcf86cd799439012",
  "pickup": "Connaught Place, New Delhi",
  "destination": "India Gate, New Delhi",
  "fare": 193,
  "status": "pending",
  "otp": "1234"
}
```

</details>

<details>
<summary><strong>❌ 400 Bad Request</strong></summary>

```json
{
  "errors": [
    {
      "msg": "Invalid pickup address",
      "param": "pickup",
      "location": "body"
    }
  ]
}
```

</details>

<details>
<summary><strong>❌ 500 Internal Server Error</strong></summary>

```json
{
  "message": "Unable to create ride. Please try again."
}
```

</details>

---

### Get Fare Estimate

```http
GET /rides/get-fare?pickup={pickup}&destination={destination}
```

**Description:** Calculates fare estimates for different vehicle types.

**Authentication:** 🔒 Required

#### Query Parameters

| Parameter   | Type   | Required | Description           |
|-------------|--------|----------|-----------------------|
| pickup      | string | Yes      | Pickup location       |
| destination | string | Yes      | Destination location  |

#### Responses

<details>
<summary><strong>✅ 200 OK</strong></summary>

```json
{
  "auto": 120,
  "car": 193,
  "bike": 65
}
```

</details>

<details>
<summary><strong>❌ 400 Bad Request</strong></summary>

```json
{
  "errors": [
    {
      "msg": "Invalid Pickup Location",
      "param": "pickup",
      "location": "query"
    }
  ]
}
```

</details>

<details>
<summary><strong>❌ 500 Internal Server Error</strong></summary>

```json
{
  "message": "Unable to calculate fare. Please try again."
}
```

</details>

---

## 📝 Important Notes

### Authentication
- All protected endpoints require JWT token via cookie or `Authorization: Bearer <token>` header
- Tokens are blacklisted upon logout for security

### Error Handling
- `400` status codes return validation errors in `errors` array format
- `401` status codes indicate authentication issues
- `500` status codes represent server-side errors

### Data Formats
- All timestamps are in ISO 8601 format
- Coordinates are in decimal degrees (WGS84)
- Distances are in meters, durations in seconds
- Fares are in local currency units

### Rate Limiting
- API requests may be rate-limited per user/IP
- Implement exponential backoff for failed requests

---

## 🔧 Development

### Base URL
```
https://api.yourapp.com/v1
```

### Headers
```http
Content-Type: application/json
Authorization: Bearer <your-jwt-token>
```

### Example cURL
```bash
curl -X POST "https://api.yourapp.com/v1/users/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword"
  }'
```

---

<div align="center">

**Made with ❤️ for Modern Transportation**

*Need help? Check our [support documentation](https://support.yourapp.com) or [contact our team](mailto:api@yourapp.com)*

</div>