# ExpressTSCognito
  A backend server configured to point to cognito for authentication
  
## Signup
http://localhost:5000/auth/signup
{
    "username": "sabashaikh",
    "email": "nasihere@gmail.com",
    "password": "Nasir@1234",
    "birthdate": "1986-01-05",
    "gender": "female",
    "name": "Sabah",
    "family_name": "Shaikh"
}

## Verify
http://localhost:5000/auth/verify
{
    "username": "sabashaikh",
    "code": "112875"
}


## signin
http://localhost:5000/auth/signin
{
    "username": "sabashaikh",
    "password": "Nasir@1234"
}

## Auth user details
http://localhost:5000/auth/user
header: eyJraWQiOiJWeFBERnV6WXBpanYzY09jVnhSQzN2Nzd1VTMxdkRzYytwT3p1dlNhOTRZPSIsImFsZyI6IlJTMjU2In0.eyJvcmlnaW5fanRpIjoiZDczYThmNzktNmY3ZC00YzI0LThlMGEtMzI3MzIyZmUyZWYwIiwic3ViIjoiZWU0MmU4YWItNmY5Zi00MzNjLTkxMTYtZGYzMmY2ZGVjNTVkIiwiZXZlbnRfaWQiOiIzYzkyZjU2NS0zZDk2LTRiMWMtOWM0MC1lMWVhZmQ1MDg3OTEiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjMzNTc0ODU1LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl83NWtkeTdmaDgiLCJleHAiOjE2MzM1Nzg0NTUsImlhdCI6MTYzMzU3NDg1NSwianRpIjoiZmRhMTM4YzEtOGE1Ni00MmJlLWFhM2YtYjMyMTY0NGNhY2FiIiwiY2xpZW50X2lkIjoiN2JkdnVibXJlMjJwNmo5NWxwYTg1cDF1YTEiLCJ1c2VybmFtZSI6InNhYmFzaGFpa2gifQ.DihZZC-v9-RoR3LHy4D16DdzmUn7tGh2H3qGhaVmpwVEWZmT8lLvOOaq8lsW6Exs3lo0O6UcZ7MF2PG2DJnA-smcMkmuUtIqTPedJJ2xhER8OKyfY5LW66gkuNq7NWJibFXcwr1g1Rw3-cj2TVWmHy5PWF__L-tRVFKexwUWExjs3BzORGuwjH6qJRaYQEg4dXTKf-j1fMw6yGyE_g1bGk351Bu5u-oLiLirZFTAE9qbuFUPu6pmLjOsEyUlU1uHbwtizC6aPaYLLj0j6jdgAETFr-7ctipAaVxeByeKgOBYx8Qp0lIEhtCIxUdUpL3rrUrRDBk2cPCEPLd4EDVoeQ



## Create a new customer
http://localhost:5000/customer/create
{
    "firstname": "dani",
    "lastname": "sayed",
    "address": "327 west side drive #302 Gaithersburg md 20878",
    "tel": "3233004756",
    "email": "dani.sayed.us@gmail.com",
    "gender": "male",
    "dob": "01/05/2019"
}

## delete a customer
http://localhost:5000/customer/delete
{
    "id": "324534534"
}


## view a customer
http://localhost:5000/customer/view
{
    "id": "324534534"
}


## check in a customer
http://localhost:5000/check/in
{
    "id": "324534534",
   "tel": "3233004756",
    "email": "dani.sayed.us@gmail.com"
}
## check out a customer
http://localhost:5000/check/out
{
    "id": "324534534",
   "tel": "3233004756",
    "email": "dani.sayed.us@gmail.com"
}