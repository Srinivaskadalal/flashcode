from flask import Flask
from flask_cors import CORS
from routes.events import bp as events_bp

app = Flask(__name__)

# Enable CORS for frontend access (Allow all origins)
CORS(app, resources={r"/*": {"origins": "*"}})

# Register API Routes
app.register_blueprint(events_bp)  # ✅ Register events route

if __name__ == "__main__":
    app.run(debug=True)
