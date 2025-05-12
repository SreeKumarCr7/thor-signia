from app import create_app

app = create_app()

# Required for Vercel serverless deployment
handler = app

if __name__ == "__main__":
    app.run() 