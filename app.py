from app import create_app
import os

app = create_app()

if __name__ == '__main__':
    # Get port from environment or use 5000 as default
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=os.getenv('FLASK_ENV') == 'development') 