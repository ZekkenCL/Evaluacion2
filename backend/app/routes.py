from flask import jsonify, request
from app import db
from app.models import Producto

@app.route('/api/product', methods=['GET'])
def get_products():
    products = Producto.query.all()
    return jsonify([product.to_dict() for product in products])