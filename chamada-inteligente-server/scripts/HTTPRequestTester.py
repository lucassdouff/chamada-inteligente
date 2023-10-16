import requests

route = "/user/login"

URL = "http://localhost:3000"+route
# location given here
location = "delhi technological university"
 
# defining a params dict for the parameters to be sent to the API
#BODY = {'password':12346, "email": "paulos@email.com", "name": "Paulo", "enrollment": 37988077, "id_course": 1}
BODY = {'password':12346, "email": "paulo@email.com"}
PARAMS = {}
 
# sending get request and saving the response as response object
r = requests.get(url = URL, json = BODY)

print(r.json())

# extracting data in json format
#data = r.json()
 