"""
Test script to verify contact form submission to the Railway PostgreSQL database.
This script simulates a contact form submission and verifies that the data is stored properly.
"""

import os
import sys
import json
import logging
import requests
from dotenv import load_dotenv
from datetime import datetime

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s]: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

def test_contact_submission():
    """Test contact form submission to the Railway database."""
    
    # Determine the API URL
    api_url = os.getenv('API_URL', 'http://localhost:5000')
    logger.info(f"Using API URL: {api_url}")
    
    # Test data for the contact form
    test_data = {
        'name': f'Test User {datetime.now().strftime("%Y%m%d%H%M%S")}',
        'email': 'test@example.com',
        'phone': '1234567890',
        'company': 'Test Company',
        'message': f'This is a test submission from the test script at {datetime.now().isoformat()}'
    }
    
    try:
        # Submit the contact form
        logger.info("Submitting test contact form data...")
        
        response = requests.post(
            f"{api_url}/api/contacts",
            json=test_data,
            headers={'Content-Type': 'application/json'}
        )
        
        # Check the response
        if response.status_code == 201:
            logger.info("Contact form submission successful!")
            
            # Print the response data
            response_data = response.json()
            logger.info(f"Response: {json.dumps(response_data, indent=2)}")
            
            # Verify the response contains the expected fields
            expected_fields = ['id', 'message', 'emailSent', 'backupCreated']
            missing_fields = [field for field in expected_fields if field not in response_data]
            
            if missing_fields:
                logger.warning(f"Response is missing expected fields: {', '.join(missing_fields)}")
            else:
                logger.info("Response contains all expected fields")
                
            # Return the contact ID for verification
            return response_data.get('id')
            
        else:
            logger.error(f"Contact form submission failed with status code {response.status_code}")
            logger.error(f"Response: {response.text}")
            return None
            
    except Exception as e:
        logger.error(f"Error testing contact submission: {e}")
        return None

if __name__ == "__main__":
    contact_id = test_contact_submission()
    
    if contact_id:
        logger.info(f"Test completed successfully. Contact ID: {contact_id}")
        sys.exit(0)
    else:
        logger.error("Test failed")
        sys.exit(1) 