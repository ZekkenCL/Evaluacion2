from flask import jsonify, request, Blueprint
from app import db
from app.models import Producto


routes = Blueprint('routes', __name__)

@routes.route('/api/products', methods=['GET'])
def get_products():
    products = Producto.query.all()
    return jsonify([product.to_dict() for product in products])

@routes.route('/api/products', methods=['POST'])
def add_product():
    # Obtener datos de la solicitud
    data = request.get_json()

    # Validar los datos (opcionalmente puedes agregar más validaciones aquí)
    if not data or 'nombre' not in data or 'precio' not in data or 'descripcion' not in data or 'imagen' not in data:
        return jsonify({'message': 'Datos faltantes o incorrectos'}), 400

    # Crear un nuevo producto
    new_product = Producto(
        nombre=data['nombre'],
        precio=data['precio'],
        descripcion=data['descripcion'],
        imagen=data['imagen']
    )

    # Agregar el producto a la base de datos
    db.session.add(new_product)
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error al agregar el producto a la base de datos', 'error': str(e)}), 500

    # Devolver una respuesta
    return jsonify(new_product.to_dict()), 201

@routes.route('/api/products/<int:id>', methods=['PUT'])
def update_product(id):
    # Buscar el producto por ID
    product = Producto.query.get(id)
    if not product:
        return jsonify({'message': 'Producto no encontrado'}), 404

    # Obtener datos de la solicitud
    data = request.get_json()
    if not data:
        return jsonify({'message': 'No hay datos para actualizar'}), 400

    # Actualizar los campos del producto
    product.nombre = data.get('nombre', product.nombre)
    product.precio = data.get('precio', product.precio)
    product.descripcion = data.get('descripcion', product.descripcion)
    product.imagen = data.get('imagen', product.imagen)

    # Guardar los cambios en la base de datos
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error al actualizar el producto', 'error': str(e)}), 500

    # Devolver una respuesta
    return jsonify(product.to_dict()), 200

@routes.route('/api/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    # Buscar el producto por ID
    product = Producto.query.get(id)
    if not product:
        return jsonify({'message': 'Producto no encontrado'}), 404

    # Eliminar el producto de la base de datos
    try:
        db.session.delete(product)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error al eliminar el producto', 'error': str(e)}), 500

    # Devolver una respuesta
    return jsonify({'message': 'Producto eliminado exitosamente'}), 200