from flask import Flask, render_template_string
from flask_cors import CORS
from config import Config
from utils.db import db
from routes.auth import auth_bp
from routes.livestock import livestock_bp

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

db.init_app(app)

app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(livestock_bp, url_prefix='/api')

@app.route('/')
def home():
  with open('./home.html', 'r', encoding="utf-8") as f: html_content = f.read()
  return render_template_string(html_content)

with app.app_context(): db.create_all()  # creates tables if not exist

if __name__ == "__main__": app.run(debug=True, host='0.0.0.0', port=5000)