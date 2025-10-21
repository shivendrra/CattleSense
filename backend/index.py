# from flask import Flask
# app = Flask(__name__)
# @app.route("/")
# def hello():
#   return "Hello World!"
# if __name__ == "__main__":
#   app.run(debug=True) # debug=True enables auto-reloading and a debugger

from flask import Flask, render_template_string
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

class Config:
  SQLALCHEMY_DATABASE_URI = (
    f"mysql+pymysql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@"
    f"{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
  )
  SQLALCHEMY_TRACK_MODIFICATIONS = False
  FIREBASE_CRED = os.getenv("FIREBASE_CRED")

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

@app.route('/')
def home():
  with open('./home.html', 'r', encoding="utf-8") as f:
    html_content = f.read()
  return render_template_string(html_content)

if __name__ == "__main__":
  app.run(debug=True, host='0.0.0.0', port=5000)