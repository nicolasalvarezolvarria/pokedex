content = (
    "import requests\n"
    "import re\n"
    "from flask import Flask, render_template\n"
    "\n"
    "app = Flask(__name__)\n"
    "\n"
    "@app.route('/')\n"
    "def home():\n"
    "    return render_template('index.html')\n"
    "\n"
    "@app.route('/about/')\n"
    "def about():\n"
    "    return render_template('about.html')\n"
    "\n"
    "@app.route('/pokemones/')\n"
    "def pokemon_list():\n"
    "    return render_template('pokemon_list.html')\n"
    "\n"
    "@app.route('/pokemon/<name>/')\n"
    "def pokemon(name):\n"
    "    return render_template('pokemon_detail.html', poke_name=name)\n"
    "\n"
    "@app.route('/compare/')\n"
    "def compare():\n"
    "    return render_template('compare.html')\n"
    "\n"
    "@app.route('/runner/')\n"
    "def runner():\n"
    "    return render_template('runner.html')\n"
    "\n"
    "@app.route('/memory/')\n"
    "def memory():\n"
    "    return render_template('memory.html')\n"
    "\n"
    "if __name__ == '__main__':\n"
    "    app.run(debug=True)\n"
)

with open('app.py', 'w', encoding='utf-8') as f:
    f.write(content)

print('app.py written, size:', len(content))
print('First 100 chars:', repr(content[:100]))
