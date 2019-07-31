[![Build Status](https://travis-ci.org/business-card-organizer-app/backend.svg?branch=develop)](https://travis-ci.org/business-card-organizer-app/backend)
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

### Generate Cards 

```source-json
 "status": 201,
    "data": [
       {
            "id": 1,
            "qr_code": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOVSURBVO3BO67kWgIDwcwD7X/LnDaeQUuAoKrbn2GE+YWZ/xxmymGmHGbKYaYcZsphphxmymGmHGbKYaYcZsphphxmymGmHGbKxUsqPykJn6TSkvCESktCU/lJSXjjMFMOM+UwUy4+LAmfpPJJKk+o3EnCE0n4JJVPOsyUw0w5zJSLL1N5IglPqDyRhKbyhkpLwhMqTyThmw4z5TBTDjPl4h+ThKbSVFoSmkpLwv+Tw0w5zJTDTLn4x6i0JDSVpvKGSkvC3+wwUw4z5TBTLr4sCb+Tyhsq35SEP8lhphxmymGmXHyYyu+UhKbSktBUWhKaSktCU3lC5U92mCmHmXKYKeYX/mIqbyThDZWWhL/ZYaYcZsphply8pNKS0FQ+KQktCXdUnlB5Igl3VD4pCd90mCmHmXKYKRcfpvJEEr4pCU3lThKeULmThKbSkvCESkvCJx1mymGmHGbKxYcloam0JDyh0pLwhEpLwh2VloSm8oTKHZU7Sbij0pLwxmGmHGbKYaaYX/gglZaEpnInCXdUWhKaSkvCGyotCU3lThKaSkvCGyotCW8cZsphphxmysWXqdxJwh2VloQnVFoS7qg8kYSm0lTuqLQkNJWfdJgph5lymCkXL6m0JDSVN5LQVFoSWhKeULmThDsqd5LQVFoSmkpLQlNpSfikw0w5zJTDTLn4w6jcScIdlZaEO0loKk3lDZU7Km+otCS8cZgph5lymCkXX5aEpvJEEppKS8IbKi0JTaUloancSUJTuZOEO0loKp90mCmHmXKYKRc/LAlPqLyh0pJwR+WTVN5QaUloSfikw0w5zJTDTDG/8BdTaUl4Q6UloancScITKneS8JMOM+UwUw4z5eIllZ+UhJaEptKS0FTuJKGptCQ0lTsqLQl3ktBUnkjCG4eZcpgph5ly8WFJ+CSVOyp3VO4k4ZuS8IRKS8JPOsyUw0w5zJSLL1N5IglvJOGOyhNJaCp3VN5IQlN5IglvHGbKYaYcZsrFP06lJaGp3ElCS0JTaUloKi0JTaWp/E6HmXKYKYeZcvGPS8KdJDSVptKS0JJwJwl3ktBU7iShqXzSYaYcZsphplx8WRK+KQlN5U4SmsqdJDSVJ5LQVJ5Iwk86zJTDTDnMlIsPU/lJKi0JbyShqbQk/CSVn3SYKYeZcpgp5hdm/nOYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgp/wOBdYNA7Yhm3QAAAABJRU5ErkJggg==",
            "occupation": "software engineer",
            "phone": "08097425429",
            "created_at": "2019-07-31T10:52:30.523Z",
            "user_id": 1
        }
	]
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

### Create Card

`POST /api/user/:id/card`
where id is the users id

req.header.token = token

Authentication required, returns a User that's the current user
set token on the header and pass the token recieved during Login

Example in request body:
```source-json
{
  	 qr_code: "https://www.google.com",
   	 occupation: "Software engineer",
   	 phone: "08097425429"
}
```
Required fields: `qr_code`, `occupation`, `phone`
		`qr_code` must be a valid url and `phone` a valid moblile number.

### Get a user Bussiness Card

`GET /api/user/:id/card`
where id is the users id

req.header.token = token

Authentication required, returns a User that's the current user
set token on the header and pass the token recieved during Login

Returns the users bussiness card

### Update a Users Bussiness Card

`PATCH /api/user/:id/card`
where id is the users id

req.header.token = token

Authentication required, returns a User that's the current user
set token on the header and pass the token recieved during Login

Example in request body:
```source-json
{
  	 qr_code: "https://www.google.com",
   	 occupation: "Software engineer",
   	 phone: "08097425429"
}
```
Required fields: `qr_code`, `occupation`, `phone`
		`qr_code` must be a valid url and `phone` a valid moblile number.
