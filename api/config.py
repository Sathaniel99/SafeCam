import os

# CORS
ALLOWED_ORIGINS = ["http://localhost:5173"]

# Directorios
STATIC_DIR = os.path.join(os.path.dirname(__file__), "static")
SCREENSHOTS_DIR = os.path.join(os.path.dirname(__file__), "screenshots")


# Puerto y host
HOST = "127.0.0.1"
PORT = 5000

# Otras configuraciones
DEBUG = True