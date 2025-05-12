import os
import json
import smtplib
import html
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import logging
import re

logger = logging.getLogger(__name__)

class EmailService:
    @staticmethod
    def sanitize_html(text):
        """Sanitize text for HTML to prevent XSS attacks"""
        if not text:
            return ""
        # First escape all HTML special characters
        escaped = html.escape(text)
        # Convert newlines to <br> tags for readability
        return escaped.replace('\n', '<br>')

    @staticmethod
    def send_contact_notification(contact_data):
        """Send an email notification when a new contact form is submitted."""
        try:
            # Validate and sanitize input data
            if not isinstance(contact_data, dict):
                logger.error("Invalid contact data format")
                return {"success": False, "error": "Invalid data format"}
            
            required_fields = ['name', 'email', 'company', 'message']
            for field in required_fields:
                if field not in contact_data or not contact_data[field]:
                    logger.error(f"Missing required field: {field}")
                    return {"success": False, "error": f"Missing required field: {field}"}
            
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
                
                # Validate email format
                email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
                if not re.match(email_pattern, email_from) or not re.match(email_pattern, email_to):
                    logger.error("Invalid email configuration")
                    return {"success": False, "error": "Invalid email configuration"}
                
                # Create message
                msg = MIMEMultipart()
                msg['From'] = email_from
                msg['To'] = email_to
                
                # Sanitize subject data
                safe_name = EmailService.sanitize_html(contact_data['name']).replace('<br>', ' ')
                safe_company = EmailService.sanitize_html(contact_data['company']).replace('<br>', ' ')
                
                msg['Subject'] = f"New Contact Form Submission: {safe_name} from {safe_company}"
                
                # Format the email content with sanitized data
                html_content = f"""
                <h2>New Contact Form Submission</h2>
                <p><strong>Date:</strong> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
                <hr>
                <p><strong>Name:</strong> {EmailService.sanitize_html(contact_data['name'])}</p>
                <p><strong>Email:</strong> {EmailService.sanitize_html(contact_data['email'])}</p>
                <p><strong>Phone:</strong> {EmailService.sanitize_html(contact_data.get('phone', 'Not provided'))}</p>
                <p><strong>Company:</strong> {EmailService.sanitize_html(contact_data['company'])}</p>
                <h3>Message:</h3>
                <p>{EmailService.sanitize_html(contact_data['message'])}</p>
                """
                
                msg.attach(MIMEText(html_content, 'html'))
                
                # Connect to SMTP server with timeout
                timeout = 10  # 10 seconds timeout
                try:
                    if smtp_secure:
                        server = smtplib.SMTP_SSL(smtp_host, smtp_port, timeout=timeout)
                    else:
                        server = smtplib.SMTP(smtp_host, smtp_port, timeout=timeout)
                        server.starttls()
                    
                    server.login(smtp_user, smtp_pass)
                    server.send_message(msg)
                    server.quit()
                    
                    logger.info(f"Email notification sent for contact from {contact_data['email']}")
                    return {"success": True, "message": "Email notification sent"}
                except smtplib.SMTPException as smtp_err:
                    logger.error(f"SMTP error: {str(smtp_err)}")
                    return {"success": False, "error": f"SMTP error: {str(smtp_err)}"}
                except TimeoutError:
                    logger.error("SMTP connection timeout")
                    return {"success": False, "error": "SMTP connection timeout"}
            
            else:
                # In development without email configuration, just log the notification
                logger.warning("Email configuration not found - logging contact submission instead")
                # Don't log the entire submission data in production for privacy reasons
                if os.getenv('FLASK_ENV') != 'production':
                    logger.info(f"CONTACT SUBMISSION: {json.dumps(contact_data)}")
                else:
                    logger.info(f"CONTACT SUBMISSION from: {contact_data.get('email', 'unknown')}")
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
            # Validate input
            if not isinstance(contact_data, dict):
                return {"success": False, "error": "Invalid data format"}
            
            backup_dir = os.path.join(os.path.dirname(__file__), '..', 'data')
            backup_file = os.path.join(backup_dir, 'contact_submissions.json')
            
            # Validate paths to prevent path traversal attacks
            canonical_backup_dir = os.path.realpath(backup_dir)
            canonical_app_dir = os.path.realpath(os.path.join(os.path.dirname(__file__), '..'))
            
            if not canonical_backup_dir.startswith(canonical_app_dir):
                logger.error("Attempted path traversal detected")
                return {"success": False, "error": "Invalid backup directory"}
            
            # Create backup directory if it doesn't exist
            if not os.path.exists(backup_dir):
                os.makedirs(backup_dir)
            
            # Add timestamp and sanitize data
            submission_with_timestamp = {
                'name': str(contact_data.get('name', '')),
                'email': str(contact_data.get('email', '')),
                'phone': str(contact_data.get('phone', '')),
                'company': str(contact_data.get('company', '')),
                'message': str(contact_data.get('message', '')),
                'timestamp': datetime.now().isoformat()
            }
            
            # Read existing data or create empty array
            submissions = []
            if os.path.exists(backup_file):
                try:
                    with open(backup_file, 'r') as f:
                        file_content = f.read()
                        if file_content.strip():
                            submissions = json.loads(file_content)
                        else:
                            submissions = []
                except json.JSONDecodeError:
                    logger.warning("Invalid JSON in backup file, creating new backup")
                    submissions = []
            
            # Add new submission and write back to file
            submissions.append(submission_with_timestamp)
            
            # Limit the number of stored submissions to prevent file size issues
            if len(submissions) > 1000:
                submissions = submissions[-1000:]  # Keep only the most recent 1000
            
            with open(backup_file, 'w') as f:
                json.dump(submissions, f, indent=2)
            
            logger.info(f"Backup saved to: {backup_file}")
            return {"success": True}
        
        except Exception as e:
            logger.error(f"Failed to backup submission: {str(e)}")
            return {"success": False, "error": str(e)} 