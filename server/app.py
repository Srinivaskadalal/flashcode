from flask import Flask
from flask_cors import CORS
from routes.events import bp as events_bp
from schedule_routes import schedule_bp 


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

app.register_blueprint(events_bp)
app.register_blueprint(schedule_bp)


if __name__ == "__main__":
    app.run(debug=True)
