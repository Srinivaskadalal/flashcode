
import os
from flask import Flask
from flask_cors import CORS
from routes.events import bp as events_bp
from routes.users import bp as users_bp  
from routes.questions import bp as questions_bp  
from routes.answers import bp as answers_blueprint
from routes.analytics import analytics_bp
from routes.tags import tags_bp
from routes.schedule import important_dates_bp  
from routes.magazine import magazine_bp


app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/")
def home():
    return {"message": "FlashCode API is running!"}, 200
# Register blueprints
app.register_blueprint(events_bp)  
app.register_blueprint(users_bp)  
app.register_blueprint(questions_bp)  
app.register_blueprint(answers_blueprint)
app.register_blueprint(analytics_bp)
app.register_blueprint(tags_bp)
app.register_blueprint(important_dates_bp)  
app.register_blueprint(magazine_bp)


# Debugging: Print registered routes
if __name__ == "__main__":
    with app.app_context():
        print("\n🔹 Registered API Routes:")
        for rule in app.url_map.iter_rules():
            print(f"🔹 {rule.rule} -> {rule.methods}")

    # Use a dynamic port assigned by Render
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
