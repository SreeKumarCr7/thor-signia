import os
import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

class EmailService:
    @staticmethod
    def send_contact_notification(contact_data):
        """Send an email notification when a new contact form is submitted."""
        try:
            # Check if required environment variables exist
            if os.getenv('EMAIL_HOST') and os.getenv('EMAIL_USER') and os.getenv('EMAIL_PASS'):
                # Email configuration
                smtp_host = os.getenv('EMAIL_HOST')
                smtp_port = int(os.getenv('EMAIL_PORT', 587))
                smtp_secure = os.getenv('EMAIL_SECURE', 'false').lower() == 'true'
                smtp_user = os.getenv('EMAIL_USER')
                smtp_pass = os.getenv('EMAIL_PASS')
                email_from = os.getenv('EMAIL_FROM', 'noreply@thorsignia.in')
                email_to = os.getenv('EMAIL_TO', 'info@thorsignia.in')
                
                # Create message
                msg = MIMEMultipart()
                msg['From'] = email_from
                msg['To'] = email_to
                msg['Subject'] = f"New Contact Form Submission: {contact_data['name']} from {contact_data['company']}"
                
                # Format the email content
                html_content = f"""
                <h2>New Contact Form Submission</h2>
                <p><strong>Date:</strong> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
                <hr>
                <p><strong>Name:</strong> {contact_data['name']}</p>
                <p><strong>Email:</strong> {contact_data['email']}</p>
                <p><strong>Phone:</strong> {contact_data['phone'] or 'Not provided'}</p>
                <p><strong>Company:</strong> {contact_data['company']}</p>
                <h3>Message:</h3>
                <p>{contact_data['message'].replace('\n', '<br>')}</p>
                """
                
                msg.attach(MIMEText(html_content, 'html'))
                
                # Connect to SMTP server and send email
                if smtp_secure:
                    server = smtplib.SMTP_SSL(smtp_host, smtp_port)
                else:
                    server = smtplib.SMTP(smtp_host, smtp_port)
                    server.starttls()
                
                server.login(smtp_user, smtp_pass)
                server.send_message(msg)
                server.quit()
                
                logger.info(f"Email notification sent for contact from {contact_data['email']}")
                return {"success": True, "message": "Email notification sent"}
            
            else:
                # In development without email configuration, just log the notification
                logger.warning("Email configuration not found - logging contact submission instead")
                logger.info(f"CONTACT SUBMISSION: {json.dumps(contact_data)}")
                return {"success": False, "message": "Email not configured, submission logged"}
                
        except Exception as e:
            logger.error(f"Failed to send email notification: {str(e)}")
            return {"success": False, "error": str(e)}
    
    @staticmethod
    def backup_submission(contact_data):
        """Create a JSON file backup of submissions (only in development)."""
        if os.getenv('FLASK_ENV') == 'production':
            return {"success": False, "reason": "Backup not supported in production environment"}
        
        try:
            backup_dir = os.path.join(os.path.dirname(__file__), '..', 'data')
            backup_file = os.path.join(backup_dir, 'contact_submissions.json')
            
            # Create backup directory if it doesn't exist
            if not os.path.exists(backup_dir):
                os.makedirs(backup_dir)
            
            # Add timestamp
            submission_with_timestamp = {
                **contact_data,
                "timestamp": datetime.now().isoformat()
            }
            
            # Read existing data or create empty array
            submissions = []
            if os.path.exists(backup_file):
                with open(backup_file, 'r') as f:
                    submissions = json.load(f)
            
            # Add new submission and write back to file
            submissions.append(submission_with_timestamp)
            
            with open(backup_file, 'w') as f:
                json.dump(submissions, f, indent=2)
            
            logger.info(f"Backup saved to: {backup_file}")
            return {"success": True}
        
        except Exception as e:
            logger.error(f"Failed to backup submission: {str(e)}")
            return {"success": False, "error": str(e)} 