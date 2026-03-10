import requests # Para hacer solicitudes HTTP a la PokeAPI
import re       # Para extraer el ID del Pokémon de la URL de la API
from flask import Flask, request, render_template, redirect, url_for # Para crear la aplicación web

app = Flask(__name__) # Inicializa la aplicación Flask

@app.route("/", methods=["GET", "POST"])
def home():
    # Página principal de búsqueda de Pokémon
    pokemon_data = None
    error = None
    if request.method == "POST":
        poke_name = request.form.get("name")
        if poke_name:
            url = f"https://pokeapi.co/api/v2/pokemon/{poke_name.lower()}"
            try:
                response = requests.get(url)
                response.raise_for_status()
                data = response.json()
                pokemon_data = {
                    "name": data['name'].title(),
                    "type": ', '.join([t['type']['name'] for t in data['types']]),
                    "image": data['sprites']['front_default'],
                    "height": data['height'] / 10,
                    "weight": data['weight'] / 10,
                    "abilities": [a['ability']['name'] for a in data['abilities']],
                    "stats": {s['stat']['name']: s['base_stat'] for s in data['stats']}
                }
            except requests.exceptions.HTTPError:
                error = f"No se encontró información sobre el Pokémon '{poke_name}'."
            except Exception as e:
                error = f"Error al consultar la PokeAPI: {str(e)}"
    return render_template('index.html', pokemon=pokemon_data, error=error)

@app.route("/about")
def about():
    # Página informativa sobre la Pokédex
    return render_template('about.html')

@app.route("/pokemones")
def pokemon_list():
    # Lista los primeros 151 Pokémon con nombres e imágenes, usando paginación
    page = int(request.args.get('page', 1))
    per_page = 24  # Número de Pokémon por página
    offset = (page - 1) * per_page
    total_pokemones = 151

    url = "https://pokeapi.co/api/v2/pokemon?limit=151"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        results = data["results"]
        pokemones = []
        for poke in results:
            # Extrae el ID del Pokémon usando regex
            match = re.search(r'/pokemon/(\d+)/', poke["url"])
            poke_id = match.group(1) if match else ""
            img_url = f"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{poke_id}.png"
            pokemones.append({
                "name": poke["name"].title(),
                "image": img_url
            })

        # Calcula última página para la paginación
        last_page = (total_pokemones + per_page - 1) // per_page
        return render_template(
            "pokemon_list.html",
            pokemones=pokemones,
            page=page,
            last_page=last_page
        )

        # (El siguiente return nunca se ejecuta, puedes eliminarlo)
        return render_template("pokemon_list.html", pokemones=pokemones)
    except Exception as e:
        return f"Error al consultar la API: {str(e)}"

@app.route("/pokemon/<name>")
def pokemon(name: str) -> str:
    # Muestra detalles de un Pokémon específico (nombre en la URL)
    url = f"https://pokeapi.co/api/v2/pokemon/{name.lower()}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()

        # Extrae y prepara los datos del Pokémon para la plantilla
        poke_name = data['name']
        poke_type = ', '.join([t['type']['name'] for t in data['types']])
        image_url = data['sprites']['front_default']
        abilities = [a['ability']['name'] for a in data['abilities']]
        stats = {s['stat']['name']: s['base_stat'] for s in data['stats']}
        poke_height = data['height'] / 10
        poke_weight = data['weight'] / 10

        # Renderiza la plantilla con los detalles del Pokémon y el JSON completo
        return render_template(
            'pokemon_detail.html',
            poke_name=poke_name,
            poke_type=poke_type,
            image_url=image_url,
            abilities=abilities,
            stats=stats,
            poke_height=poke_height,
            poke_weight=poke_weight,
            raw_json=data
        )
    except requests.exceptions.HTTPError:
        return f"No se encontró información sobre el Pokémon '{name}'."
    except Exception as e:
        return f"Error al consultar la PokeAPI: {str(e)}"

@app.route("/compare", methods=["GET", "POST"])
def compare():
    # Página de comparación de Pokémon
    pokemon1 = None
    pokemon2 = None
    winner = None
    error = None
    
    if request.method == "POST":
        name1 = request.form.get("pokemon1")
        name2 = request.form.get("pokemon2")
        
        if name1 and name2:
            try:
                # Obtener datos del primer Pokémon
                url1 = f"https://pokeapi.co/api/v2/pokemon/{name1.lower()}"
                response1 = requests.get(url1)
                response1.raise_for_status()
                data1 = response1.json()
                
                # Obtener datos del segundo Pokémon
                url2 = f"https://pokeapi.co/api/v2/pokemon/{name2.lower()}"
                response2 = requests.get(url2)
                response2.raise_for_status()
                data2 = response2.json()
                
                # Procesar datos del primer Pokémon
                pokemon1 = {
                    "name": data1['name'].title(),
                    "type": ', '.join([t['type']['name'].title() for t in data1['types']]),
                    "image": data1['sprites']['front_default'],
                    "stats": {
                        "hp": data1['stats'][0]['base_stat'],
                        "attack": data1['stats'][1]['base_stat'],
                        "defense": data1['stats'][2]['base_stat'],
                        "special-attack": data1['stats'][3]['base_stat'],
                        "special-defense": data1['stats'][4]['base_stat'],
                        "speed": data1['stats'][5]['base_stat']
                    }
                }
                pokemon1["total"] = sum(pokemon1["stats"].values())
                
                # Procesar datos del segundo Pokémon
                pokemon2 = {
                    "name": data2['name'].title(),
                    "type": ', '.join([t['type']['name'].title() for t in data2['types']]),
                    "image": data2['sprites']['front_default'],
                    "stats": {
                        "hp": data2['stats'][0]['base_stat'],
                        "attack": data2['stats'][1]['base_stat'],
                        "defense": data2['stats'][2]['base_stat'],
                        "special-attack": data2['stats'][3]['base_stat'],
                        "special-defense": data2['stats'][4]['base_stat'],
                        "speed": data2['stats'][5]['base_stat']
                    }
                }
                pokemon2["total"] = sum(pokemon2["stats"].values())
                
                # Determinar el ganador
                if pokemon1["total"] > pokemon2["total"]:
                    winner = "pokemon1"
                elif pokemon2["total"] > pokemon1["total"]:
                    winner = "pokemon2"
                else:
                    winner = "tie"
                    
            except requests.exceptions.HTTPError:
                error = "No se pudo encontrar uno o ambos Pokémon. Verifica los nombres."
            except Exception as e:
                error = f"Error al consultar la PokeAPI: {str(e)}"
    
    return render_template('compare.html', 
                         pokemon1=pokemon1, 
                         pokemon2=pokemon2, 
                         winner=winner, 
                         error=error)

@app.route("/runner")
def runner():
    # Página del juego Charmander Runner
    return render_template('runner.html')

if __name__ == "__main__":
    print("Iniciando Flask...") # Indicación en consola
    app.run(debug=True) # Inicia el servidor Flask en modo debug
