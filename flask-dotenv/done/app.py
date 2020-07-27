from flask import Flask
from dotenv import load_dotenv
import os
load_dotenv()
app = Flask(__name__)


@app.route('/')
def hello_world():
    return f'Hello, {os.getenv("SECRET_NAME")}, the menaing of life is {os.getenv("MEANING_OF_LIFE")}'
