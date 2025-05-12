from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Initialize SQLAlchemy
db = SQLAlchemy()

def create_app():
    """Initialize the core application."""
    app = Flask(__name__, static_folder='../dist', static_url_path='/')
    CORS(app)
    
    # Configure the database to use SQLite regardless of environment
    # for demo purposes (avoiding psycopg2 dependency)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///contacts.db'
    
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JSON_SORT_KEYS'] = False
    
    # Initialize plugins
    db.init_app(app)
    
    with app.app_context():
        # Import parts of the application
        from app.routes import contacts
        
        # Register blueprints
        app.register_blueprint(contacts.bp)
        
        # Create database tables (if they don't exist)
        db.create_all()
        
        # Serve frontend in production
        @app.route('/')
        def index():
            return app.send_static_file('index.html')
        
        @app.route('/<path:path>')
        def catch_all(path):
            try:
                return app.send_static_file(path)
            except:
                return app.send_static_file('index.html')
                
        return app 