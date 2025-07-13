# API Endpoint Documentation

---

## /users/register

**POST** `/users/register`

Register a new user.

### Description

Creates a new user account. Requires a unique email and a password. Returns a JWT token and user details on success.

### Request Body

```json
{
  "fullname": {
    "firstname": "Required. At least 3 characters.",
    "lastname": "Optional. At least 3 characters if provided."
  },
  "email": "Required. Valid email.",
  "password": "Required. At least 6 characters."
}
```

### <span style="color:green">Success (201)</span>

```json
{
  "token": "JWT token here",
  "user": {
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john.doe@example.com"
  }
}
```

### <span style="color:red">Validation Error (400)</span>

```json
{
  "errors": [
    { "msg": "Please enter a valid email address", "param": "email", "location": "body" }
  ]
}
```

---

## /users/login

**POST** `/users/login`

Authenticate a user.

### Description

Logs in a user with email and password. Returns a JWT token and user details on success.

### Request Body

```json
{
  "email": "Required. Valid email.",
  "password": "Required. At least 6 characters."
}
```

### <span style="color:green">Success (200)</span>

```json
{
  "token": "JWT token here",
  "user": {
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john.doe@example.com"
  }
}
```

### <span style="color:red">Unauthorized (401)</span>

```json
{ "message": "Invalid email or password" }
```

### <span style="color:red">Validation Error (400)</span>

```json
{
  "errors": [
    { "msg": "Invalid Email", "param": "email", "location": "body" },
    { "msg": "Password must be at least 6 characters long", "param": "password", "location": "body" }
  ]
}
```

---

## /users/profile

**GET** `/users/profile`

Get authenticated user's profile.

### Description

Returns the profile of the currently authenticated user.

- **Authentication:** Required (JWT via cookie or header)

### <span style="color:green">Success (200)</span>

```json
{
  "_id": "user_id",
  "fullname": { "firstname": "John", "lastname": "Doe" },
  "email": "john.doe@example.com"
}
```

### <span style="color:red">Unauthorized (401)</span>

```json
{ "message": "Unauthorized" }
```

---

## /users/logout

**GET** `/users/logout`

Logout the authenticated user.

### Description

Logs out the current user by blacklisting the JWT token.

- **Authentication:** Required

### <span style="color:green">Success (200)</span>

```json
{ "message": "User logged out successfully" }
```

### <span style="color:red">Unauthorized (401)</span>

```json
{ "message": "Unauthorized" }
```

---

## /captains/register

**POST** `/captains/register`

Register a new captain (driver).

### Description

Creates a new captain account with vehicle details. Returns a JWT token and captain details on success.

### Request Body

```json
{
  "fullname": {
    "firstname": "Required. At least 3 characters.",
    "lastname": "Optional. At least 3 characters if provided."
  },
  "email": "Required. Valid email.",
  "password": "Required. At least 6 characters.",
  "vehicle": {
    "color": "Required. At least 3 characters.",
    "plate": "Required. At least 3 characters.",
    "capacity": "Required. Integer, at least 1.",
    "vehicleType": "Required. One of: 'car', 'bike', 'auto'."
  }
}
```

### <span style="color:green">Success (201)</span>

```json
{
  "token": "JWT token here",
  "captain": {
    "fullname": { "firstname": "Alice", "lastname": "Smith" },
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

### <span style="color:red">Validation Error (400)</span>

```json
{
  "errors": [
    { "msg": "Invalid email address", "param": "email", "location": "body" }
  ]
}
```

---

## /captains/login

**POST** `/captains/login`

Authenticate a captain.

### Description

Logs in a captain with email and password. Returns a JWT token and captain details on success.

### Request Body

```json
{
  "email": "Required. Valid email.",
  "password": "Required. At least 6 characters."
}
```

### <span style="color:green">Success (200)</span>

```json
{
  "token": "JWT token here",
  "captain": {
    "_id": "captain_id",
    "fullname": { "firstname": "Alice", "lastname": "Smith" },
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

### <span style="color:red">Unauthorized (401)</span>

```json
{ "message": "Invalid email or password" }
```

### <span style="color:red">Validation Error (400)</span>

```json
{
  "errors": [
    { "msg": "Invalid email address", "param": "email", "location": "body" },
    { "msg": "Password must be at least 6 characters long", "param": "password", "location": "body" }
  ]
}
```

---

## /captains/profile

**GET** `/captains/profile`

Get authenticated captain's profile.

### Description

Returns the profile of the currently authenticated captain.

- **Authentication:** Required (JWT via cookie or header)

### <span style="color:green">Success (200)</span>

```json
{
  "captain": {
    "_id": "captain_id",
    "fullname": { "firstname": "Alice", "lastname": "Smith" },
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

### <span style="color:red">Unauthorized (401)</span>

```json
{ "message": "Invalid or expired authentication token" }
```

---

## /captains/logout

**GET** `/captains/logout`

Logout the authenticated captain.

### Description

Logs out the current captain by blacklisting the JWT token.

- **Authentication:** Required

### <span style="color:green">Success (200)</span>

```json
{ "message": "Logout successfully" }
```

### <span style="color:red">Unauthorized (401)</span>

```json
{ "message": "Invalid or expired authentication token" }
```

---

## /maps/get-coordinates

**GET** `/maps/get-coordinates?address=...`

Get coordinates for a given address.

### Description

Returns latitude and longitude for a given address string.

- **Authentication:** Required

### Query Parameters

- `address` (string, required): The address to geocode.

### <span style="color:green">Success (200)</span>

```json
{
  "ltd": 28.7041,
  "lng": 77.1025
}
```

### <span style="color:red">Error (400/404)</span>

```json
{ "errors": [ ... ] }
```
or
```json
{ "message": "Coordinates not found" }
```

---

## /maps/get-distanse-time

**GET** `/maps/get-distanse-time?origin=...&destination=...`

Get distance and time between two locations.

### Description

Returns distance and estimated travel time between two addresses.

- **Authentication:** Required

### Query Parameters

- `origin` (string, required)
- `destination` (string, required)

### <span style="color:green">Success (200)</span>

```json
{
  "distance": { "text": "10 km", "value": 10000 },
  "duration": { "text": "20 mins", "value": 1200 }
}
```

### <span style="color:red">Error (400/500)</span>

```json
{ "errors": [ ... ] }
```
or
```json
{ "message": "Internal server error" }
```

---

## /maps/get-suggestions

**GET** `/maps/get-suggestions?input=...`

Get autocomplete suggestions for a location input.

### Description

Returns location suggestions for a partial address or place name.

- **Authentication:** Required

### Query Parameters

- `input` (string, required): The partial address or place name.

### <span style="color:green">Success (200)</span>

```json
[
  "Connaught Place, New Delhi, Delhi, India",
  "New Delhi Railway Station, New Delhi, Delhi, India"
]
```

### <span style="color:red">Error (400/500)</span>

```json
{ "errors": [ ... ] }
```
or
```json
{ "message": "Internal server error" }
```

---

## /rides/create

**POST** `/rides/create`

Create a new ride.

### Description

Creates a new ride request for the authenticated user.

- **Authentication:** Required

### Request Body

```json
{
  "pickup": "Required. String, at least 3 characters.",
  "destination": "Required. String, at least 3 characters.",
  "vehicleType": "Required. One of: 'auto', 'car', 'bike'."
}
```

### <span style="color:green">Success (201)</span>

```json
{
  "_id": "ride_id",
  "user": "user_id",
  "pickup": "Pickup Address",
  "destination": "Destination Address",
  "fare": 193,
  "status": "pending",
  "otp": "1234"
}
```

### <span style="color:red">Validation Error (400)</span>

```json
{
  "errors": [
    { "msg": "Invalid pickup address", "param": "pickup", "location": "body" }
  ]
}
```

### <span style="color:red">Error (500)</span>

```json
{ "message": "Error message" }
```

---

## /rides/get-fare

**GET** `/rides/get-fare?pickup=...&destination=...`

Get fare estimate for a ride.

### Description

Returns fare estimates for different vehicle types between two locations.

- **Authentication:** Required

### Query Parameters

- `pickup` (string, required)
- `destination` (string, required)

### <span style="color:green">Success (200)</span>

```json
{
  "auto": 120,
  "car": 193,
  "bike": 65
}
```

### <span style="color:red">Validation Error (400)</span>

```json
{
  "errors": [
    { "msg": "Invalid Pickup Location", "param": "pickup", "location": "query" }
  ]
}
```

### <span style="color:red">Error (500)</span>

```json
{ "message": "Error message" }
```

---

## Notes

- All endpoints requiring authentication expect a JWT token via cookie or `Authorization: Bearer <token>` header.
- Validation errors return a 400 status with an `errors` array.
- All times and fares are examples; actual values depend on input and business logic.