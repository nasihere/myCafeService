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
header: eyJraWQiOiJWeFBERnV6WXBpanYzY09jVnhSQzN2Nzd1VTMxdkRzYytwT3p1dlNhOTRZPSIsImFsZyI6IlJTMjU2In0.eyJvcmlnaW5fanRpIjoiYjQ4MzJmZWQtZDI4OC00Y2JhLThlYjEtYjliMDA4YjE2ZWM4Iiwic3ViIjoiZWU0MmU4YWItNmY5Zi00MzNjLTkxMTYtZGYzMmY2ZGVjNTVkIiwiZXZlbnRfaWQiOiIxOTEwNzc1My1kYjIxLTRhZmQtYmMyOC03ODIzMjUyMTM2NDMiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjMzNTc5MzE2LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl83NWtkeTdmaDgiLCJleHAiOjE2MzM2NjU3MTYsImlhdCI6MTYzMzU3OTMxNiwianRpIjoiMjVlMzEwYTktY2YwYS00MzdjLWFhZDgtNDc0ZDEwYTQ4NTA3IiwiY2xpZW50X2lkIjoiN2JkdnVibXJlMjJwNmo5NWxwYTg1cDF1YTEiLCJ1c2VybmFtZSI6InNhYmFzaGFpa2gifQ.ajzwPc7pvNaTG1azkSeu7u0dz5NTvSBR9KDRF9WNFJNbk_jLqcsAc39pjPfzEVs4lI2i0FGzn5GRdRLnjUOa85r9Bg4M7NaFYhC7Ss4rhoND8vXQPSBRMZKjgXNwEMCx4LMwjAqZoNPoQ6yd5qQYm_M3XiZzxN4LS1VBi-xC3klqlXiHVcyPCFMsRhL69aHFaS_HU5kF9IN1MHJfdClfXYWCzgs2Ec7LQwHnfc_mcwzThODp8oKeD7gSzD_bXPIWeCVDXCNev-Z5Cyh41DIkDe0CY4mtgLTP35nJ1x8B7BlRPjyPXCvny2vARGwRR8YTfzpSuu1KidaV7wZ9_Wlo4A



## Create a new customer
http://localhost:5000/customer/create
{
    "username": "sabashaikh",
    "firstname": "dani",
    "lastname": "sayed",
    "address": "327 west side drive #302 Gaithersburg md 20878",
    "tel": "3233004756",
    "email": "dani.sayed.us@gmail.com",
    "gender": "M",
    "dob": "01/05/2019"
}

## delete a customer
http://localhost:5000/customer/delete
{
    "id": "c5954f60-2726-11ec-ae42-253759f4b7f9"
}


## view a customer
http://localhost:5000/customer/view
{
    "custid": "c5954f60-2726-11ec-ae42-253759f4b7f9"
}
## upload a customer
http://localhost:5000/customer/upload
{
    "custid": "c5954f60-2726-11ec-ae42-253759f4b7f9",
    "description": "Driving License",
    "filenumber": "DMV-1234567",
}


## check in a customer
http://localhost:5000/check/in
{
    "custid": "c5954f60-2726-11ec-ae42-253759f4b7f9",
   "computerno": "3"
}
## check out a customer
http://localhost:5000/check/out
{
    "id": "a95d48b0-272c-11ec-b0b1-1bfe818a5e3f"
}

## findByCellPhone
http://localhost:5000/customer/findByCellPhone
{
    "cellphone": "4084667445"
}