
import json
import requests

API_key = "87391d7ad955bd47f528c419e1b7519d"

# Opening JSON file
with open('country-list.json', 'rb') as openfile:
 
    # Reading from json file
    country_lst = json.load(openfile)
 

# Opening JSON file
with open('slim-2.json', 'rb') as openfile1:
 
    # Reading from json file
    city_lst = json.load(openfile1)

lst = []
n = len(country_lst)
m = len(city_lst)

for i in range(n):
    #print(country_lst[i])
    curr_country = country_lst[i]['country']
    curr_cap = country_lst[i]['capital']
    city_dict = {}
    for j in range(m):
        curr_city = city_lst[j]
        if curr_country == curr_city['name']:
            city_dict = {
                "country": curr_country,
                "city": curr_cap, 
                "city_id": curr_city['country-code'],
                "country_code": curr_city['alpha-2']
                }
    if city_dict == {}:
        city_dict = country_lst[i]
    lst.append(city_dict)
        

with open("capital.json", "w") as outfile:
    json.dump(lst, outfile)

city_name = 
country_code = 
url = "http://api.openweathermap.org/geo/1.0/direct?q=" + city_name + ",," + country_code + "&appid=" + API_key
response_API = requests.get(url)
data = response_API.text
json_data = json.loads(data)
print(json_data)