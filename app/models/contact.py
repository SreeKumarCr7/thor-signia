from app import db
from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime

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
        self.name = name
        self.email = email
        self.phone = phone
        self.company = company
        self.message = message
    
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