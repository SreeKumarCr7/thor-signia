from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os
import logging
import urllib.parse

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
    
    # Configure the database - Use Railway PostgreSQL if available, otherwise SQLite
    database_url = os.getenv('DATABASE_URL')
    
    # If DATABASE_URL is not provided, try to construct it from individual components
    if not database_url:
        pg_user = os.getenv('POSTGRES_USER')
        pg_password = os.getenv('POSTGRES_PASSWORD')
        pg_host = os.getenv('PGHOST')
        pg_port = os.getenv('PGPORT')
        pg_db = os.getenv('POSTGRES_DB')
        
        # If all PostgreSQL environment variables are set, construct the DATABASE_URL
        if pg_user and pg_password and pg_host and pg_port and pg_db:
            # URL encode the password to handle special characters
            encoded_password = urllib.parse.quote_plus(pg_password)
            database_url = f"postgresql://{pg_user}:{encoded_password}@{pg_host}:{pg_port}/{pg_db}"
            logger.info(f"Constructed PostgreSQL URL from environment variables for host: {pg_host}")
    
    # Configure SQLAlchemy with the database URL
    if database_url:
        # Convert postgres:// to postgresql:// if necessary
        if database_url.startswith('postgres://'):
            database_url = database_url.replace('postgres://', 'postgresql://', 1)
            
        app.config['SQLALCHEMY_DATABASE_URI'] = database_url
        logger.info(f"Using PostgreSQL database at {database_url.split('@')[1].split('/')[0] if '@' in database_url else 'unknown host'}")
    else:
        # Fallback to SQLite for local development
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///contacts.db'
        logger.info("Using SQLite database")
    
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
        response.headers['Access-Control-Allow-Methods'] = 'GET, OPTIONS, POST, PUT, DELETE'
        
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