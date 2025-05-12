from app import create_app

# Create the Flask application instance
app = create_app()
 
# This is the handler for Vercel serverless
def handler(request, context):
    """Handle a request to the API."""
    return app(request, context) 