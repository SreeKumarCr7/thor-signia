"""
Simple test script to verify that the API endpoints are working correctly.
This script allows manual testing of the /api/contacts endpoint.
"""

from flask import Flask, jsonify, make_response, request
import time

app = Flask(__name__)

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

if __name__ == '__main__':
    app.run(debug=True, port=5001) 