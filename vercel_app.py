from app import create_app

# Create Flask app instance
app = create_app()

# This is the handler that Vercel uses
def handler(request, context):
    return app(request, context)

# If running locally
if __name__ == '__main__':
    app.run() 