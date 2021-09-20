# third-party imports
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import redis
from pymongo import MongoClient
from flask_cors import CORS

# local imports
from .config import app_config
# db variable initialization
db = SQLAlchemy()


def create_app(config_name):
    # existing code remains
    app = Flask(__name__, instance_relative_config=True)
    # app.config.from_object(app_config[config_name])
    # app.config.from_pyfile('./config.py')
    db.init_app(app)

    CORS(app)
    cache = redis.Redis(host='redis', port=6379)
    # use command 'docker inspect {mongo-container-name}' to find Gateway
    # Making a Connection with MongoClient
    #client = MongoClient("mongodb://localhost:27017/")
    client = MongoClient("mongodb://172.19.0.1:27018/")

    # from app import models

    # from .admin import admin as admin_blueprint
    # app.register_blueprint(admin_blueprint, url_prefix='/admin')

    return app, cache, client
