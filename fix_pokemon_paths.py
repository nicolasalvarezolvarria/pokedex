import os
import re

pokemon_dir = "docs/pokemon"

# Procesar todos los directorios de Pokémon
for pokemon_name in os.listdir(pokemon_dir):
    pokemon_path = os.path.join(pokemon_dir, pokemon_name)
    if not os.path.isdir(pokemon_path):
        continue
    
    index_file = os.path.join(pokemon_path, "index.html")
    if not os.path.exists(index_file):
        continue
    
    with open(index_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Reemplazar rutas de CSS
    content = content.replace('href="/static/', 'href="../../static/')
    
    # Reemplazar links de navegación
    content = content.replace('href="/"', 'href="../../"')
    content = content.replace('href="/pokemones/"', 'href="../../pokemones/"')
    content = content.replace('href="/compare/"', 'href="../../compare/"')
    content = content.replace('href="/memory/"', 'href="../../memory/"')
    content = content.replace('href="/runner/"', 'href="../../runner/"')
    content = content.replace('href="/about/"', 'href="../../about/"')
    
    with open(index_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Updated {pokemon_name}")

print("Done!")
