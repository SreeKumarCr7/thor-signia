from flask import Flask, Response, request
from app import create_app

app = create_app()

@app.route('/api/health', methods=['GET'])
def api_health():
    """Health check endpoint."""
    return {'status': 'ok', 'message': 'Thor Signia API is running'}

@app.route('/api/hello', methods=['GET'])
def api_hello():
    """Simple test endpoint to verify API is working."""
    return {'message': 'Hello from Thor Signia API!'} 