# Routes/createOwnerRoutes.py
from flask import Blueprint
from Controllers.createOwnerController import insert_owner

# Crear un Blueprint para las rutas relacionadas con "Owner"
create_owner_bp = Blueprint('create_owner', __name__)

# Definir la ruta para registrar un nuevo propietario
create_owner_bp.route('/register', methods=['POST'])(insert_owner)
