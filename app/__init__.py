from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(name)s: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger(__name__)

# Load environment variables from .env file
load_dotenv()

# Initialize SQLAlchemy
db = SQLAlchemy()

def create_app():
    """Initialize the core application."""
    app = Flask(__name__, static_folder='../dist', static_url_path='/')
    
    # Configure security settings
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', os.urandom(24).hex())
    app.config['SESSION_COOKIE_SECURE'] = os.getenv('FLASK_ENV') == 'production'
    app.config['SESSION_COOKIE_HTTPONLY'] = True
    app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
    app.config['PERMANENT_SESSION_LIFETIME'] = 3600  # 1 hour
    
    # Configure CORS to allow requests from any origin
    CORS(app, resources={r"/*": {"origins": "*"}})
    
    # Configure the database to use SQLite regardless of environment
    # for demo purposes (avoiding psycopg2 dependency)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///contacts.db'
    
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JSON_SORT_KEYS'] = False
    
    # Security headers middleware
    @app.after_request
    def add_security_headers(response):
        # Add security headers, but allow cross-origin requests
        response.headers['X-Content-Type-Options'] = 'nosniff'
        response.headers['X-XSS-Protection'] = '1; mode=block'
        
        # Set CORS headers to ensure they aren't overridden
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
        
        return response
    
    # Initialize plugins
    db.init_app(app)
    
    with app.app_context():
        # Import parts of the application
        from app.routes import contacts
        
        # Register blueprints
        app.register_blueprint(contacts.bp)
        
        # Create database tables (if they don't exist)
        db.create_all()
        
        # Add a basic API health check route
        @app.route('/api/health')
        def health_check():
            return {'status': 'ok', 'message': 'Thor Signia API is running'}
        
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