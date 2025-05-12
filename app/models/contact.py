from app import db
from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime
import re

class Contact(db.Model):
    """Contact form submission model."""
    
    __tablename__ = 'contacts'
    
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    email = Column(String(120), nullable=False)
    phone = Column(String(20), nullable=True)
    company = Column(String(100), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    def __init__(self, name, email, phone, company, message):
        self.name = self.validate_name(name)
        self.email = self.validate_email(email)
        self.phone = self.validate_phone(phone)
        self.company = self.validate_company(company)
        self.message = self.validate_message(message)
    
    @staticmethod
    def validate_name(name):
        """Validate and sanitize name"""
        if not name or not isinstance(name, str):
            raise ValueError("Name is required and must be a string")
        
        # Trim and limit length
        name = name.strip()[:100]
        
        # Basic sanitization
        name = re.sub(r'[<>\'";]', '', name)
        
        if not name:
            raise ValueError("Name cannot be empty after sanitization")
            
        return name
    
    @staticmethod
    def validate_email(email):
        """Validate email format"""
        if not email or not isinstance(email, str):
            raise ValueError("Email is required and must be a string")
            
        # Trim and limit length
        email = email.strip()[:120]
        
        # Basic sanitization
        email = re.sub(r'[<>\'";]', '', email)
        
        # Email format validation
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, email):
            raise ValueError("Invalid email format")
            
        return email
    
    @staticmethod
    def validate_phone(phone):
        """Validate phone number"""
        if not phone:
            return None
            
        if not isinstance(phone, str):
            raise ValueError("Phone must be a string")
            
        # Trim and limit length  
        phone = phone.strip()[:20]
        
        # Allow only digits, spaces, +, -, and parentheses
        phone = re.sub(r'[^\d\s\+\-\(\)]', '', phone)
            
        return phone
    
    @staticmethod
    def validate_company(company):
        """Validate and sanitize company"""
        if not company or not isinstance(company, str):
            raise ValueError("Company is required and must be a string")
            
        # Trim and limit length
        company = company.strip()[:100]
        
        # Basic sanitization
        company = re.sub(r'[<>\'";]', '', company)
        
        if not company:
            raise ValueError("Company cannot be empty after sanitization")
            
        return company
    
    @staticmethod
    def validate_message(message):
        """Validate and sanitize message"""
        if not message or not isinstance(message, str):
            raise ValueError("Message is required and must be a string")
            
        # Trim and limit length (maximum 2000 characters)
        message = message.strip()[:2000]
        
        # Basic sanitization
        message = re.sub(r'[<>\'";]', '', message)
        
        if not message:
            raise ValueError("Message cannot be empty after sanitization")
            
        return message
    
    def __repr__(self):
        return f'<Contact {self.name} - {self.email}>'
    
    def to_dict(self):
        """Convert instance to a dictionary."""
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'company': self.company,
            'message': self.message,
            'created_at': self.created_at.isoformat() if self.created_at else None
        } 