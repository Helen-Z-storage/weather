
import csv, json
import urllib.request

years = ["2019", "2020", "2021", "2022", "2023"]


# Opening JSON file
with open('capital.json', 'rb') as openfile:
 
    # Reading from json file
    capitals = json.load(openfile)["capitals"]
 

lst = []
n = len(capitals)
for i in range(n):
    city_data = {}
    capital = capitals[i]
    country_code = capital["country_code"]

    population = []
    with open("WPP2022_Demographic_Indicators_Medium.csv", encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf)
        for rows in csvReader:
            print(rows["ISO2_code"], capital["country_code"])
            if rows["ISO2_code"] == capital["country_code"] and rows["Time"] in years:
                print("access")
                population.append({
                    "year": int(rows["Time"]),
                    "total": rows["TPopulation1July"],
                    "males": rows["TPopulationMale1July"],
                    "females": rows["TPopulationFemale1July"],
                    "births": rows["Births"],
                    "deaths": rows["Deaths"]
                })


    
    city_data = {
            "country": capital["country"],
            "city": capital["city"],
            "country_code": capital["country_code"],
            "lat": capital["lat"],
            "lon": capital["lon"],
            "population": population
        }
    lst.append(city_data)


with open("population.json", "w") as outfile:
    json.dump(lst, outfile)