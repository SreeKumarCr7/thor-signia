from flask import Blueprint, jsonify, request, current_app
from app import db
from app.models.contact import Contact
from app.services.email_service import EmailService
import logging
import os

bp = Blueprint('contacts', __name__, url_prefix='/api/contacts')
logger = logging.getLogger(__name__)

@bp.route('', methods=['POST'])
def create_contact():
    """Create a new contact submission."""
    try:
        # Get form data
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'company', 'message']
        for field in required_fields:
            if not data.get(field):
                return jsonify({"error": f"Missing required field: {field}"}), 400
        
        # Create new contact
        new_contact = Contact(
            name=data['name'],
            email=data['email'],
            phone=data.get('phone', ''),
            company=data['company'],
            message=data['message']
        )
        
        # Save to database
        db.session.add(new_contact)
        db.session.commit()
        
        # Prepare contact data for email
        contact_data = {
            'name': data['name'],
            'email': data['email'],
            'phone': data.get('phone', ''),
            'company': data['company'],
            'message': data['message'],
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