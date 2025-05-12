from app import create_app

# Create the Flask application instance
app = create_app()

# This is needed for Vercel serverless functions
handler = app.wsgi_app

# For running the application locally
if __name__ == "__main__":
    app.run() 