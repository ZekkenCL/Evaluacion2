from . import db

class Producto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    precio = db.Column(db.Integer, nullable=False)
    descripcion = db.Column(db.String(200), nullable=False)
    imagen = db.Column(db.String(200), nullable=False)

    def __repr__(self):
        return '<Producto %r>' % self.nombre
    
    def to_dict(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "precio": self.precio,
            "descripcion": self.descripcion,
            "imagen": self.imagen
        }