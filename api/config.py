import os

# CORS
# En desarrollo dejarla asi hasta que se pueda implementar con una IP local
ALLOWED_ORIGINS = ["*"]

# Directorios
STATIC_DIR = os.path.join(os.path.dirname(__file__), "static")
SCREENSHOTS_DIR = os.path.join(os.path.dirname(__file__), "screenshots")


# Puerto y host
HOST = "0.0.0.0"
PORT = 5000

# Otras configuraciones
DEBUG = True