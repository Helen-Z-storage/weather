
import csv, json
import urllib.request

API_key = "87391d7ad955bd47f528c419e1b7519d"

def icon_img(icon):
    return "https://openweathermap.org/img/wn/" + icon + "@2x.png"

# Opening JSON file
with open('capital.json', 'rb') as openfile:
 
    # Reading from json file
    capitals = json.load(openfile)["capitals"]
 

lst = []
n = len(capitals)
for i in range(n):
    print(i)
    city_data = {}
    capital = capitals[i]
    url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + str(capital["lat"]) + "&lon=" + str(capital["lon"]) + "&units=metric&cnt=8&appid=" + API_key
              
    try:
        response_API = urllib.request.urlopen(url)
    except:
        lst.append(capital)
        continue

    with response_API:
        data = response_API.read()
        # I'm guessing this would output the html source code ?
        json_data = json.loads(data)
        if json_data and json_data["cod"] == "200":
            city_data = {
                    "country": capital["country"],
                    "city": capital["city"],
                    "lat": capital["lat"],
                    "lon": capital["lon"],
                    
                    "tags": " ",
                    "icon": icon_img(json_data["list"][0]["weather"][0]["icon"]),
                    "curr_forecast": {
                        "timestamp": json_data["list"][0]["dt_txt"],
                        "temp": json_data["list"][0]["main"]["temp"],
                        "feels_like": json_data["list"][0]["main"]["feels_like"],
                        "temp_min": json_data["list"][0]["main"]["temp_min"],
                        "temp_max": json_data["list"][0]["main"]["temp_max"],
                        "icon": icon_img(json_data["list"][0]["weather"][0]["icon"])
                    },
                    "detail_forecast": [
                        {
                                "timestamp": obj["dt_txt"], 
                                "temp": obj["main"]["temp"],
                                "feels_like": obj["main"]["feels_like"],
                                "temp_min": obj["main"]["temp_min"],
                                "temp_max": obj["main"]["temp_max"],
                                "icon": icon_img(obj["weather"][0]["icon"]),
                            }
                        for obj in json_data["list"]]
            }



    
    lst.append(city_data)

with open("weather.json", "w") as outfile:
    json.dump(lst, outfile)