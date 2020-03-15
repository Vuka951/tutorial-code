from flask import Flask, request
from flask_cors import CORS
import stripe

stripe.api_key = 'sk_test_...'

endpoint_secret = 'whsec_...'

app = Flask(__name__)
CORS(app)

user_info = {}

@app.route('/pay', methods=['POST'])
def pay():
    try:
        email = request.json.get('email', None)

        if not email:
            return 'You need to send an Email!', 400

        intent = stripe.PaymentIntent.create(
            amount=50000,
            currency='usd',
            receipt_email=email
        )

        return {"client_secret": intent['client_secret']}, 200
    except AttributeError:
        return 'Provide an Email and Password in JSON format in the request body', 400


@app.route('/sub', methods=['POST'])
def sub():
    email = request.json.get('email', None)
    payment_method = request.json.get('payment_method', None)

    if not email:
        return 'You need to send an Email!', 400
    if not payment_method:
        return 'You need to send an payment_method!', 400

    # This creates a new Customer and attaches the default PaymentMethod in one API call.
    customer = stripe.Customer.create(
        payment_method=payment_method,
        email=email,
        invoice_settings={
            'default_payment_method': payment_method,
        },
    )
    # Creates a subscription and attaches the customer to it
    subscription = stripe.Subscription.create(
        customer=customer['id'],
        items=[
            {
            'plan': 'plan_GnyhHtud6IghKl',
            },
        ],
        expand=['latest_invoice.payment_intent'],
    )

    status = subscription['latest_invoice']['payment_intent']['status'] 
    client_secret = subscription['latest_invoice']['payment_intent']['client_secret']

    user_info['customer_id'] = customer['id']
    user_info['email'] = email
    
    return {'status': status, 'client_secret': client_secret}, 200


@app.route('/webhook', methods=['POST'])
def webhook():
    payload = request.get_data()
    sig_header = request.headers.get('Stripe_Signature', None)

    if not sig_header:
        return 'No Signature Header!', 400

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError as e:
        # Invalid payload
        return 'Invalid payload', 400
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return 'Invalid signature', 400

    if event['type'] == 'payment_intent.succeeded':
        email = event['data']['object']['receipt_email'] # contains the email that will recive the recipt for the payment (users email usually)
        
        user_info['paid_50'] = True
        user_info['email'] = email
    if event['type'] == 'invoice.payment_succeeded':
        email = event['data']['object']['customer_email'] # contains the email that will recive the recipt for the payment (users email usually)
        customer_id = event['data']['object']['customer'] # contains the customer id
        
        user_info['paid'] = True
    else:
        return 'Unexpected event type', 400

    return '', 200

@app.route('/user', methods=['GET'])
def user():
    return user_info, 200
