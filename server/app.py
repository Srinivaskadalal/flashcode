from flask import Flask
from flask_cors import CORS
from routes.events import bp as events_bp
from routes.blogs import bp as blogs_bp
from routes.upload import bp as upload_bp

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

app.register_blueprint(events_bp)
app.register_blueprint(blogs_bp)
app.register_blueprint(upload_bp)

if __name__ == "__main__":
    app.run(debug=True)
