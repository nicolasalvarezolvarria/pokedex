import sys
import traceback
import requests
from flask_frozen import Freezer
from app import app

# ── Frozen-Flask configuration ────────────────────────────────────────────────
app.config['FREEZER_DESTINATION'] = 'docs'
app.config['FREEZER_BASE_URL'] = 'http://localhost/'
app.config['FREEZER_REMOVE_EXTRA_FILES'] = True
app.config['FREEZER_IGNORE_MIMETYPE_WARNINGS'] = True

freezer = Freezer(app)

# ── URL generators ─────────────────────────────────────────────────────────────

@freezer.register_generator
def pokemon():
    """Pre-generate detail pages for all 151 original Pokémon."""
    try:
        response = requests.get('https://pokeapi.co/api/v2/pokemon?limit=151')
        response.raise_for_status()
        results = response.json()['results']
        for poke in results:
            yield {'name': poke['name']}
    except Exception as e:
        print(f"Warning: could not fetch Pokemon list - {e}", file=sys.stderr)
        for i in range(1, 152):
            yield {'name': str(i)}


# ── Always run freeze when this script is executed ────────────────────────────
print("Freezing Flask app to docs/ ...")
sys.stdout.flush()

try:
    freezer.freeze()
    print("Done! Static site is in the docs/ folder.")
except Exception as e:
    print(f"ERROR during freeze: {e}", file=sys.stderr)
    traceback.print_exc()
    sys.exit(1)
