# Import smtplib for the actual sending function
import smtplib

# Import the email modules we'll need
from email.message import EmailMessage

from flask import Flask, request

app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/email', methods=['POST'])
def send_email():
    email = request.json.get('email', None)
    # SMTP stuff
    s = smtplib.SMTP(host='smtp.ethereal.email', port=587)
    s.starttls()
    s.login('antonetta96@ethereal.email', '6uXDBvv5HTxjQ7e256')

    msg = EmailMessage()
    msg.set_content('Long time no see my friend!')

    # me == the sender's email address
    # you == the recipient's email address
    msg['Subject'] = ' A hello from a far'
    msg['From'] = 'Jimmy <jimmy@jimmy.com>'
    msg['To'] = f'{email}'

    s.send_message(msg)
    s.quit()
    return 'Email sent!'
