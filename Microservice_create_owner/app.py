# app.py
from flask import Flask
from Routes.createOwnerRoutes import create_owner_bp

# Inicializar la aplicación Flask
app = Flask(__name__)

# Registrar las rutas de los propietarios
app.register_blueprint(create_owner_bp)


# Iniciar la aplicación Flask
if __name__ == "__main__":
    app.run(debug=True)
