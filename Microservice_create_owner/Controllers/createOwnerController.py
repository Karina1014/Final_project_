from flask import jsonify, request
from Services.supabase_client import get_supabase

def insert_owner():
    """Controlador para registrar un propietario."""
    print("Recibiendo solicitud para registrar un propietario...")

    # Obtener los datos de la solicitud POST
    data = request.get_json()
    print("Datos recibidos:", data)

    # Validar que los datos estén presentes
    required_fields = ['id_card', 'name', 'lastname', 'phone', 'email']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Faltan datos requeridos"}), 400

    try:
        # Obtener la instancia de Supabase
        print("Conectando con Supabase...")
        supabase = get_supabase()

        # Insertar el registro en la tabla "Owner"
        print("Insertando datos en Supabase...")
        response = supabase.from_("owner").insert([{
            "id_card": data['id_card'],
            "name": data['name'],
            "lastname": data['lastname'],
            "phone": data['phone'],
            "email": data['email']
        }]).execute()

        # Imprimir la respuesta de la inserción
        print("Respuesta de Supabase:", response)
        if response.error:
            print("Error en la respuesta de Supabase:", response.error)
        else:
            print("Inserción exitosa, datos insertados:", response.data)

        # Verificar si la inserción fue exitosa
        if response.data:  # Si hay datos, la inserción fue exitosa
            print("Propietario registrado con éxito")
            return jsonify({
                "message": "Propietario registrado con éxito",
                "data": response.data
            }), 201
        else:  # Si no hay datos, ocurrió un error
            print("Error al insertar propietario:", response.error)
            return jsonify({
                "error": "Error al insertar propietario",
                "details": response.error
            }), 500

    except Exception as e:
        print("Excepción ocurrida:", str(e))
        print("Detalles de la excepción:", e.__dict__)  # Esto imprimirá más detalles sobre la excepción
        # Capturar y manejar cualquier excepción
        return jsonify({"error": f"Error al procesar la solicitud: {str(e)}"}), 500
