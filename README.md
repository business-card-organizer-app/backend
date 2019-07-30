https://travis-ci.org/business-card-organizer-app/backend.svg?branch=develop
# BUSINESS CARD ORGANIZER.

## VISION

Create an application that helps user transer and store their business cards virtually.

---

## HEROKU BASE_URL

https://bussiness-card-app.herokuapp.com/

## API Spec

The preferred JSON object to be returned by the API should be structured as follows:

### Users (for Login)

```source-json
Login
{
     "status": 200,
    "data": [
        {
            "id": 2,
            "first_name": "Ikechukwu",
            "last_name": " Nmeregini",
            "email": "nmereginiikechukwu@yahoo.com",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoyLCJ1c2VybmFtZSI6Im5tZXJlZ2luaWlrZWNodWt3dUB5YWhvby5jb20iLCJpYXQiOjE1NjQ0MjUzMjgsImV4cCI6MTU2NDUxMTcyOH0.6_njjykrIyMgqctr0hDvKYi8kuyPoHoHz3TFAV2PgrE"
        }
    ]
}

```

## Users SignUp
```

{
    "status": 201,
    "data": [
        {
            "first_name": "Ikechukwu",
            "last_name": " Nmeregini",
            "email": "nmereginiikechukwu@yahoo.com"
        }
    ]
}
```

### Profile

```source-json
"status": 200,
    "data": [
        {
            "id": "1",
            "first_name": "Vincent",
            "last_name": "Nmeregini",
            "email": "nmereginivincent@gmail.com"
        }
    ]
```

### Event 

```source-json
"status": 201,
    "data": [
        {
           "event_name": "lambda build week",
	        "event_date : "22/8/2019",
	         "event_venue" : " zoom",
	       "event_location": "online",
         "user_id" : 2,
        }
    ]
```

### Get all User Event response

```source-json
 "status": 200,
    "data": [
        {
            "id": 1,
            "name_event": "lambda school hackaton",
            "event_date": "2019-01-11T23:00:00.000Z",
            "event_venue": "zoom",
            "event_location": "online",
            "user_id": 1
        },
        {
            "id": 3,
            "name_event": "lambda school hackaton",
            "event_date": "2019-01-11T23:00:00.000Z",
            "event_venue": "zoom",
            "event_location": "online",
            "user_id": 1
        },
        {
            "id": 4,
            "name_event": "lambda school hackaton",
            "event_date": "2019-01-11T23:00:00.000Z",
            "event_venue": "zoom",
            "event_location": "online",
            "user_id": 1
        },
```


### Errors and Status Codes

If a request fails any validations, expect errors in the following format:

```source-json
{
    "status": 400,
    "message": "User already exists"
}
}
```

If requests on creating or updating event fails any validations, expect errors in the following format:

```source-json
{
    "status": 400,
    "message": {
        "name_event": [
            "The name event field is required."
        ],
        "event_venue": [
            "The event venue field is required."
        ]
    }
}
```

### Other status codes:

401 for Unauthorized requests, when a request requires authentication but it isn't provided

403 for Forbidden requests, when a request may be valid but the user doesn't have permissions to perform the action

404 for Not found requests, when a resource can't be found to fulfill the request

## Endpoints:
### Authentication:

`POST /api/login`

Example request body:

```source-json
{
  "user":{
    "email": "jake@jake.jake",
    "password": "jakejake"
  }
}
```

No authentication required, returns a User

Required fields: `email`, `password`

### Registration:

`POST /api/register`

Example request body:

```source-json
{
  "email": "nmereginiikechukwu@yahoo.com",
	 "first_name" : "Ikechukwu",
	 "last_name" : " Nmeregini",
	 "password": "12345"
}
```

No authentication required, returns a User

Required fields: `email`, `first_name`, `last_name`,`password`

### Get Current User

`GET /api/user/:id`

```source-json
req.header.token = token

Authentication required, returns a User that's the current user
set token on the header and pass the token recieved during Login

```

### Post Event
`POST /api/user/:id/event`
where id id the users id
req.header.token = token

Authentication required, returns a User that's the current user
set token on the header and pass the token recieved during Login

Example request body:

```source-json
{
  	 "event_name": "lambda build week",
	 "event_date : "22/8/2019",
	 "event_venue" : " zoom",
	 "event_location": "online",
}
```

Required fields: `event_name`, `event_date`, `event_venue`
Authentication is required set token in req.header

### Get User Event
`GET /api/user/:id/event`
where id id the users id
req.header.token = token

Authentication required, returns a User that's the current user
set token on the header and pass the token recieved during Login

### Update Event
`PATCH /api/user/:id/event/event_id`
where id is the users id
event_id is the events id

req.header.token = token

Authentication required, returns a User that's the current user
set token on the header and pass the token recieved during Login

Example in request body:
```source-json
{
  	 "event_name": "lambda build week frontend",
	 "event_date : "22/8/2019",
	 "event_venue" : " zoom",
	 "event_location": "online",
}
```
Required fields: `event_name`, `event_date`, `event_venue`

returns all the events for that user

### Delete User Event
`DELETE /api/user/:id/event/event_id`
where id is the users id
event_id is the events id

req.header.token = token

Authentication required, returns a User that's the current user
set token on the header and pass the token recieved during Login

Returns the event deleted by the user.

