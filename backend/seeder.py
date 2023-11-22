from app import db, create_app
from app.models import Producto

app = create_app()
app.app_context().push()

def seed_data():
    # Datos de prueba para Clientes
    productos = [
        Producto(nombre='Producto 1', precio=1000, descripcion='Descripcion 1', imagen='https://picsum.photos/200'),
        Producto(nombre='Producto 2', precio=2000, descripcion='Descripcion 2', imagen='https://picsum.photos/200'),
        Producto(nombre='Producto 3', precio=3000, descripcion='Descripcion 3', imagen='https://picsum.photos/200'),
        Producto(nombre='Producto 4', precio=4000, descripcion='Descripcion 4', imagen='https://picsum.photos/200'),
    ]

    # Insertar en la base de datos
    db.session.add_all(productos)

    db.session.commit()

if __name__ == '__main__':
    seed_data()