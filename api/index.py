from flask import Flask, Response, request, jsonify, make_response
from app import create_app, db
from app.models.contact import Contact
from app.services.email_service import EmailService
import re
import logging
import time
from functools import wraps

app = create_app()
logger = logging.getLogger(__name__)

# Simple in-memory rate limiting store
ip_request_count = {}
ip_request_timestamp = {}
MAX_REQUESTS = 5  # Maximum 5 requests
RATE_LIMIT_WINDOW = 60  # per minute (60 seconds)

def rate_limit(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Get client IP
        ip = request.remote_addr
        current_time = time.time()
        
        # Initialize if IP not seen before
        if ip not in ip_request_count:
            ip_request_count[ip] = 0
            ip_request_timestamp[ip] = current_time
        
        # Reset counter if window has passed
        if current_time - ip_request_timestamp[ip] > RATE_LIMIT_WINDOW:
            ip_request_count[ip] = 0
            ip_request_timestamp[ip] = current_time
        
        # Increment counter
        ip_request_count[ip] += 1
        
        # Check if rate limit exceeded
        if ip_request_count[ip] > MAX_REQUESTS:
            return jsonify({"error": "Rate limit exceeded. Please try again later."}), 429
        
        return f(*args, **kwargs)
    return decorated_function

def validate_email(email):
    """Validate email format"""
    email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(email_pattern, email) is not None

def sanitize_input(text):
    """Basic input sanitization"""
    if not text:
        return ""
    # Remove potentially dangerous characters
    return re.sub(r'[<>\'";]', '', text)

@app.route('/api/health', methods=['GET'])
def api_health():
    """Health check endpoint."""
    response = jsonify({'status': 'ok', 'message': 'Thor Signia API is running'})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/hello', methods=['GET'])
def api_hello():
    """Simple test endpoint to verify API is working."""
    response = jsonify({'message': 'Hello from Thor Signia API!'})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/contacts', methods=['POST', 'OPTIONS'])
@rate_limit
def create_contact():
    """Create a new contact submission."""
    # Handle preflight CORS requests
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response
        
    try:
        # Get form data
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON data"}), 400
        
        # Validate required fields
        required_fields = ['name', 'email', 'company', 'message']
        for field in required_fields:
            if not data.get(field):
                return jsonify({"error": f"Missing required field: {field}"}), 400
        
        # Validate email format
        if not validate_email(data.get('email', '')):
            return jsonify({"error": "Invalid email format"}), 400
        
        # Sanitize inputs
        sanitized_data = {
            'name': sanitize_input(data['name']),
            'email': sanitize_input(data['email']),
            'phone': sanitize_input(data.get('phone', '')),
            'company': sanitize_input(data['company']),
            'message': sanitize_input(data['message'])
        }
        
        # Validate data lengths
        if len(sanitized_data['name']) > 100:
            return jsonify({"error": "Name is too long (max 100 characters)"}), 400
        if len(sanitized_data['email']) > 120:
            return jsonify({"error": "Email is too long (max 120 characters)"}), 400
        if len(sanitized_data['phone']) > 20:
            return jsonify({"error": "Phone number is too long (max 20 characters)"}), 400
        if len(sanitized_data['company']) > 100:
            return jsonify({"error": "Company name is too long (max 100 characters)"}), 400
        if len(sanitized_data['message']) > 2000:
            return jsonify({"error": "Message is too long (max 2000 characters)"}), 400
        
        # Create new contact
        new_contact = Contact(
            name=sanitized_data['name'],
            email=sanitized_data['email'],
            phone=sanitized_data['phone'],
            company=sanitized_data['company'],
            message=sanitized_data['message']
        )
        
        # Save to database
        db.session.add(new_contact)
        db.session.commit()
        
        # Prepare contact data for email
        contact_data = {
            'name': sanitized_data['name'],
            'email': sanitized_data['email'],
            'phone': sanitized_data['phone'],
            'company': sanitized_data['company'],
            'message': sanitized_data['message'],
            'timestamp': new_contact.created_at.isoformat() if new_contact.created_at else None
        }
        
        # Send email notification - don't block on this
        email_result = EmailService.send_contact_notification(contact_data)
        
        # Backup the submission - don't block on this
        backup_result = EmailService.backup_submission(contact_data) if hasattr(EmailService, 'backup_submission') else {'success': False}
        
        # Create response with proper CORS headers
        response = jsonify({
            'id': new_contact.id,
            'message': 'Contact saved successfully',
            'emailSent': email_result.get('success', False),
            'backupCreated': backup_result.get('success', False)
        })
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response, 201
        
    except Exception as e:
        logger.exception("Error processing contact submission")
        db.session.rollback()
        
        # Return error with proper CORS headers
        response = jsonify({"error": "Failed to save contact"})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response, 500 

@app.route('/api/test', methods=['GET', 'OPTIONS'])
def test_endpoint():
    """Simple test endpoint to verify that the API is working."""
    resp = make_response(jsonify({
        'message': 'Test endpoint is working',
        'timestamp': time.time()
    }))
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, OPTIONS, POST'
    resp.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return resp

@app.route('/api/mock-contact', methods=['POST', 'OPTIONS'])
def mock_contact():
    """Mock contact endpoint for testing."""
    if request.method == 'OPTIONS':
        resp = make_response()
        resp.headers['Access-Control-Allow-Origin'] = '*'
        resp.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        resp.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return resp
        
    resp = make_response(jsonify({
        'id': 1234,
        'message': 'Mock contact created successfully',
        'emailSent': True,
        'backupCreated': True
    }), 201)
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp 