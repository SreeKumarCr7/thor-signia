from flask import Blueprint, jsonify, request, current_app, make_response
from app import db
from app.models.contact import Contact
from app.services.email_service import EmailService
import logging
import os
import re
import time
from functools import wraps
from datetime import datetime, timedelta

bp = Blueprint('contacts', __name__, url_prefix='/api/contacts')
logger = logging.getLogger(__name__)

# Simple in-memory rate limiting store
# In production, this should use Redis or similar
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

def add_security_headers(response):
    """Add security headers to response"""
    response.headers['Content-Security-Policy'] = "default-src 'self'"
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    return response

@bp.after_request
def secure_headers(response):
    """Add security headers to all responses"""
    return add_security_headers(response)

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

@bp.route('', methods=['POST'])
@rate_limit
def create_contact():
    """Create a new contact submission."""
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
        backup_result = EmailService.backup_submission(contact_data)
        
        return jsonify({
            'id': new_contact.id,
            'message': 'Contact saved successfully',
            'emailSent': email_result.get('success', False),
            'backupCreated': backup_result.get('success', False)
        }), 201
        
    except Exception as e:
        logger.exception("Error processing contact submission")
        db.session.rollback()
        return jsonify({"error": "Failed to save contact"}), 500

@bp.route('', methods=['GET'])
def get_contacts():
    """Get all contacts (development environment only)."""
    try:
        # In production, don't allow listing all contacts
        if os.getenv('FLASK_ENV') == 'production':
            return jsonify({"error": "Access restricted in production"}), 403
        
        contacts = Contact.query.order_by(Contact.created_at.desc()).all()
        return jsonify([contact.to_dict() for contact in contacts])
        
    except Exception as e:
        logger.exception("Error retrieving contacts")
        return jsonify({"error": "Failed to retrieve contacts"}), 500

@bp.route('/<int:id>', methods=['GET'])
def get_contact(id):
    """Get a specific contact (development environment only)."""
    try:
        # In production, don't allow accessing specific contacts
        if os.getenv('FLASK_ENV') == 'production':
            return jsonify({"error": "Access restricted in production"}), 403
        
        contact = Contact.query.get(id)
        if not contact:
            return jsonify({"error": "Contact not found"}), 404
            
        return jsonify(contact.to_dict())
        
    except Exception as e:
        logger.exception(f"Error retrieving contact {id}")
        return jsonify({"error": "Failed to retrieve contact"}), 500

# Health check route
@bp.route('/health', methods=['GET'])
def health_check():
    """Simple route to check if the API is running."""
    return jsonify({
        "status": "ok",
        "service": "contacts-api"
    }) 