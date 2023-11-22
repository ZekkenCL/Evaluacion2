from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

migrate = Migrate()
db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:beno1989@localhost:3306/evaluacion'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    migrate.init_app(app, db)
    from .models import Producto


    from app.routes import routes
    app.register_blueprint(routes)

    return app