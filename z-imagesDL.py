import os
import json
import requests

# Load Pokémon list
with open('frontend/src/assets/data/pokemonList.json', encoding='utf-8') as f:
    pokemon_list = json.load(f)

# Output directory
output_dir = 'gen1_sprite/colored'
os.makedirs(output_dir, exist_ok=True)

base_url = 'https://img.pokemondb.net/sprites/red-blue/normal/'

for poke in pokemon_list:
    poke_id = poke['id']
    name_en = poke['name']['en'].lower().replace("♀", "-f").replace("♂", "-m").replace(". ", "-").replace("'", "").replace(". ", "-").replace(" ", "-")
    # Special cases for Nidoran
    if poke_id == "029":
        name_en = "nidoran-f"
        url = f"{base_url}{name_en}-color.png"
    elif poke_id == "032":
        name_en = "nidoran-m"
        url = f"{base_url}{name_en}-color.png"
    elif poke_id == "025":
        url = f"{base_url}pikachu-color.png"
    else:
        url = f"{base_url}{name_en}-color.png"
    filename = f"{poke_id}.png"
    out_path = os.path.join(output_dir, filename)
    try:
        r = requests.get(url, timeout=10)
        r.raise_for_status()
        with open(out_path, 'wb') as imgf:
            imgf.write(r.content)
        print(f"Downloaded {filename} -> {url}")
    except Exception as e:
        print(f"Failed {filename} -> {url}: {e}")
