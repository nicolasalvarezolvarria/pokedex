# 🎮 Pokédex Web Application

Una aplicación web interactiva construida con Flask que permite explorar, buscar y visualizar información detallada de Pokémon utilizando la [PokéAPI](https://pokeapi.co/).

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![Flask](https://img.shields.io/badge/Flask-2.0+-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## ✨ Características

- 🔍 **Búsqueda de Pokémon**: Busca cualquier Pokémon por nombre
- 📋 **Lista Completa**: Visualiza los primeros 151 Pokémon con paginación
- 📊 **Detalles Completos**: Información detallada incluyendo:
  - Tipo(s) del Pokémon
  - Altura y peso
  - Habilidades
  - Estadísticas base con barras visuales
  - Datos completos en formato JSON
- 🎨 **Diseño Moderno**: Interfaz responsiva con gradientes y animaciones
- 📱 **Responsive**: Optimizado para dispositivos móviles y escritorio

## 🛠️ Tecnologías Utilizadas

- **Backend**: Python 3.8+, Flask
- **API**: [PokéAPI](https://pokeapi.co/) - API RESTful de Pokémon
- **Frontend**: HTML5, CSS3 (con animaciones y gradientes modernos)
- **Dependencias**: 
  - `requests` - Para realizar peticiones HTTP a la PokéAPI
  - `Flask` - Framework web de Python

## 📋 Requisitos Previos

- Python 3.8 o superior
- pip (gestor de paquetes de Python)
- Conexión a internet (para acceder a la PokéAPI)

## 🚀 Instalación

1. **Clona el repositorio**:
```bash
git clone https://github.com/tu-usuario/pokedex.git
cd pokedex
```

2. **Crea un entorno virtual** (recomendado):
```bash
python -m venv venv
```

3. **Activa el entorno virtual**:
   - En Windows:
     ```bash
     venv\Scripts\activate
     ```
   - En macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Instala las dependencias**:
```bash
pip install flask requests
```

## 🎯 Uso

1. **Inicia la aplicación**:
```bash
python app.py
```

2. **Accede a la aplicación** en tu navegador:
```
http://localhost:5000
```

3. **Navega por las diferentes secciones**:
   - **Página Principal (/)**: Redirige a la búsqueda de Pokémon
   - **Buscar Pokémon (/pokemon)**: Busca un Pokémon específico por nombre
   - **Lista de Pokémon (/pokemones)**: Visualiza todos los Pokémon con paginación
   - **Detalle de Pokémon (/pokemon/<nombre>)**: Ver información completa de un Pokémon
   - **Sobre la Pokédex (/about)**: Información sobre el proyecto

## 📁 Estructura del Proyecto

```
pokedex/
│
├── app.py                          # Aplicación principal de Flask
├── requirements.txt                # Dependencias del proyecto (opcional)
│
├── static/                         # Archivos estáticos
│   └── css/
│       ├── base.css               # Estilos base y navegación
│       ├── pokemon_search.css     # Estilos para búsqueda
│       ├── pokemon_list.css       # Estilos para lista
│       ├── pokemon_detail.css     # Estilos para detalles
│       └── about.css              # Estilos para página about
│
└── templates/                      # Plantillas HTML
    ├── navbar.html                # Barra de navegación
    ├── pokemon_search.html        # Página de búsqueda
    ├── pokemon_list.html          # Página de lista
    ├── pokemon_detail.html        # Página de detalles
    └── about.html                 # Página sobre el proyecto
```

## 🎨 Características de Diseño

- **Gradientes Modernos**: Fondos con degradados de color (#667eea → #764ba2)
- **Animaciones Suaves**: Transiciones y efectos hover en tarjetas
- **Cards Elevadas**: Sombras y bordes redondeados para mejor UX
- **Barras de Progreso**: Visualización de estadísticas con barras animadas
- **Diseño Responsive**: Grid adaptativo para diferentes tamaños de pantalla
- **Tema Pokémon**: Uso de la icónica Pokébola en la navegación

## 🔌 API Utilizada

Este proyecto utiliza la [PokéAPI](https://pokeapi.co/), una API RESTful gratuita que proporciona información completa sobre Pokémon.

**Endpoints utilizados**:
- `GET /pokemon/{name}` - Obtiene datos de un Pokémon específico
- `GET /pokemon?limit=151` - Lista los primeros 151 Pokémon

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Notas de Desarrollo

Este proyecto fue desarrollado como una herramienta de aprendizaje utilizando:
- **Python** para el desarrollo backend
- **Flask** como framework web
- **Frida Code Copilot** para asistencia en el desarrollo y automatización

El objetivo principal fue aprender sobre:
- Integración de APIs RESTful
- Desarrollo web con Flask
- Diseño responsive y moderno con CSS
- Uso de agentes inteligentes en el desarrollo

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- [PokéAPI](https://pokeapi.co/) - Por proporcionar una API completa y gratuita
- Equipo de Pokémon - Por crear un universo increíble
- Comunidad de desarrolladores - Por las herramientas y recursos

## 📞 Contacto

¿Tienes preguntas o sugerencias? No dudes en abrir un issue en el repositorio.

---

**¡Atrapa todos los Pokémon mientras aprendes a programar! 🎯**
