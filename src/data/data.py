
import json
import urllib.request

API_key = "87391d7ad955bd47f528c419e1b7519d"

# Opening JSON file
with open('capital1.json', 'rb') as openfile:
 
    # Reading from json file
    capitals = json.load(openfile)["capitals"]
 

lst = []
n = len(capitals)
for i in range(n):
    city_data = {}
    capital = capitals[i]

    url = "http://api.openweathermap.org/geo/1.0/direct?q=" + capital["city"] + ",," + capital["country_code"] + "&appid=" + API_key
    try:
        response_API = urllib.request.urlopen(url)
    except:
        lst.append(capital)
        continue

    with response_API:
        data = response_API.read()
        # I'm guessing this would output the html source code ?
        json_data = json.loads(data)
        if json_data:
            city_data = {
                    "country": capital["country"],
                    "city": capital["city"],
                    "country_code": capital["country_code"],
                    "lat": json_data[0]["lat"],
                    "lon": json_data[0]["lon"]
                }
        else:
            city_data = capital
    lst.append(city_data)


with open("capital.json", "w") as outfile:
    json.dump(lst, outfile)