import requests  # Para hacer solicitudes HTTP a la PokeAPI
import re        # Para extraer el ID del Pokémon de la URL de la API
from flask import Flask, render_template  # Para crear la aplicación web

app = Flask(__name__)  # Inicializa la aplicación Flask

# ──────────────────────────────────────────────
# Rutas estáticas (compatibles con Frozen-Flask)
# ──────────────────────────────────────────────

@app.route("/")
def home():
    # Página principal de búsqueda de Pokémon (client-side JS)
    return render_template('index.html')

@app.route("/about/")
def about():
    # Página informativa sobre la Pokédex
    return render_template('about.html')

@app.route("/pokemones/")
def pokemon_list():
    # Lista todos los Pokémon - la paginación y carga se hacen client-side
    return render_template('pokemon_list.html')

@app.route("/pokemon/<name>/")
def pokemon(name: str) -> str:
    # Página de detalle - datos cargados client-side vía JS
    return render_template('pokemon_detail.html', poke_name=name)

@app.route("/compare/")
def compare():
    # Página de comparación de Pokémon (client-side JS)
    return render_template('compare.html')

@app.route("/runner/")
def runner():
    # Página del juego Charmander Runner
    return render_template('runner.html')

@app.route("/memory/")
def memory():
    # Página del juego de memoria Pokémon
    return render_template('memory.html')


if __name__ == "__main__":
    print("Iniciando Flask...")  # Indicación en consola
    app.run(debug=True)  # Inicia el servidor Flask en modo debug
