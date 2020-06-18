from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from functools import wraps

app = Flask(__name__)

app.config['SECRET_KEY'] = 'thisissecret'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////C:/sqlite/Databases.db'

db = SQLAlchemy(app)

# Models
class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True)
    name = db.Column(db.String(50))
    password = db.Column(db.String(80))
    admin = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

class APIKey(db.Model):
    __tablename__ = 'api_key'
    id = db.Column(db.Integer, primary_key=True)
    generated_key = db.Column(db.Text())
    created_at = db.Column(db.DateTime, nullable=False)
    remaining_calls = db.Column(db.Integer)
    user_id = db.Column(db.Integer, ForeignKey('user.id'))

class APICall(db.Model):
    __tablename__ = 'api_call'
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime)
    document = db.Column(db.Text())
    result = db.Column(db.String(50))
    user_id = db.Column(db.Integer, ForeignKey('user.id'))

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return jsonify({
                'message': 'Token is missing!'
            }), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
            current_user = User.query.filter_by(public_id=data['public_id']).first()
        except:
            return jsonify({
                'message': 'Token is invalid!'
            }), 401

        return f(current_user, *args, **kwargs)

    return decorated

# Routes
# User
@app.route('/user', methods=['GET'])
@token_required
def get_all_users(current_user):
    if not current_user.admin:
        return jsonify({
            'message': 'You are not allowed to perform this action!'
        })

    users = User.query.all()
    output = []

    for user in users:
        user_data = {}
        user_data['id'] = user.id
        user_data['public_id'] = user.public_id
        user_data['name'] = user.name
        user_data['password'] = user.password
        user_data['admin'] = user.admin
        user_data['created_at'] = user.created_at
        user_data['updated_at'] = user.updated_at
        output.append(user_data)

    return jsonify({
        'message': 'Get all users\' data successfully!',
        'users': output
    })

@app.route('/user/<public_id>', method=['GET'])
@token_required
def get_one_user(current_user, public_id):
    user = User.query.filter_by(public_id=public_id).first()

    if not user:
        return jsonify({
            'message': 'No user found!'
        })

    user_data = {}
    user_data['id'] = user.id
    user_data['public_id'] = user.public_id
    user_data['name'] = user.name
    user_data['password'] = user.password
    user_data['admin'] = user.admin
    user_data['created_at'] = user.created_at
    user_data['updated_at'] = user.updated_at

    return jsonify({
        'message': 'Get user data successfully!',
        'user': user_data
    })

@app.route('/user'. method=['POST'])
def create_user():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='sha256')
    new_user = User(public_id=str(uuid.uuid4()), name=data['name'], password=hashed_password, admin=False, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({
        'message': 'Create new user successfully!'
    })

@app.route('/user/<public_id>', methods=['PUT'])
@token_required
def update_user(current_user, public_id):
    user = User.query.filter_by(public_id=public_id).first()
    data = request.get_json()

    if not user:
        return jsonify({
            'message': 'No user found!'
        })

    if data['name'] != '' and != user.name:
        user.name = user.name
    
    if data['admin'] != user.admin:
        user.admin = user.admin

    if (data['name'] != '' and != user.name) or data['admin'] != user.admin:
        user.updated_at = datetime.datetime.now()

    db.session.commit()

    return jsonify({
        'message': 'Update user successfully!',
        'user': user
    })

@app.route('/user/<public_id>', method=['DELETE'])
@token_required
def delete_user(current_user, public_id):
    if not current_user.admin:
        return jsonify({
            'message': 'You are not allowed to perform this action!'
        })

    user = User.query.filter_by(public_id=public_id).first()

    if not user:
        return jsonify({
            'message': 'No user found!'
        })

    db.session.delete(user)
    db.session.commit()

    return jsonify({
        'message': 'Delete user successfully!'
    })

@app.route('/login')
def login():
    auth = request.authorization

    if not auth or not auth.username or not auth.password:
        return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})

    user = User.query.filter_by(name=auth.username).first()

    if not user:
        return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})

    if check_password_hash(user.password, auth.password)
        token = jwt.encode({
            'public_id': user.public_id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
        }, app.config['SECRET_KEY'])

        return jsonify({
            'token': token.decode('UTF-8')
        })

    return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})

# API Key
@app.route('/api-key', methods=['GET'])
@token_required
def get_all_api_keys(current_user):
    if not current_user.admin:
        return jsonify({
            'message': 'You are not allowed to perform this action!'
        })

    api_keys = APIKey.query.all()
    output = []

    for api_key in api_keys:
        api_key_data = {}
        api_key_data['id'] = api_key.id
        api_key_data['generated_key'] = api_key.generated_key
        api_key_data['created_at'] = api_key.created_at
        api_key_data['remaining_calls'] = api_key.remaining_calls
        api_key_data['user_id'] = api_key.user_id

        output.append(api_key_data)

    return jsonify({
        'message': 'Get all API keys\' data successfully!',
        'api_keys': output
    })

@app.route('/api-key/<api_key_id>', method=['GET'])
@token_required
def get_one_api_key(current_user, api_key_id):
    api_key = APIKey.query.filter_by(id=api_key_id).first()

    if not user:
        return jsonify({
            'message': 'No API key found!'
        })

    api_key_data = {}
    api_key_data['id'] = api_key.id
    api_key_data['generated_key'] = api_key.generated_key
    api_key_data['created_at'] = api_key.created_at
    api_key_data['remaining_calls'] = api_key.remaining_calls
    api_key_data['user_id'] = api_key.user_id

    return jsonify({
        'message': 'Get API key\'s data successfully!',
        'api_key': api_key_data
    })

@app.route('/api-key'. method=['POST'])
@token_required
def create_api_key(current_user):
    api_key = APIKey.query.filter_by(user_id=current_user.id).first()

    if api_key:
        return jsonify({
            'message': 'You have already had an API key created before!'
        })

    new_api_key = APIKey(generated_key=uuid.uuid4(), created_at=datetime.datetime.now(), remaining_calls=100, user_id=current_user.id)

    db.session.add(new_api_key)
    db.session.commit()

    return jsonify({
        'message': 'Create new API key successfully!'
    })

@app.route('/api-key/<api_key_id>', method=['PUT'])
@token_required
def renew_api_key(current_user, api_key_id):
    api_key = APIKey.query.filter_by(id=api_key_id).first()

    if not api_key:
        return jsonify({
            'message': 'No API key found!'
        })

    api_key.remaining_calls = 100

    db.session.commit()

    return jsonify({
        'message': 'Renew API key successfully!'
    })

@app.route('/api-key/<api_key_id>', method=['DELETE'])
@token_required
def delete_api_key(current_user, api_key_id):
    if not current_user.admin:
        return jsonify({
            'message': 'You are not allowed to perform this action!'
        })

    api_key = APIKey.query.filter_by(id=api_key_id).first()

    if not api_key:
        return jsonify({
            'message': 'No API key found!'
        })

    db.session.delete(api_key)
    db.session.commit()

    return jsonify({
        'message': 'Delete API key successfully!'
    })

# API Call
@app.route('/api-call', methods=['GET'])
@token_required
def get_all_api_calls(current_user):
    if not current_user.admin:
        return jsonify({
            'message': 'You are not allowed to perform this action!'
        })

    api_calls = APICall.query.all()
    output = []

    for api_call in api_calls:
        api_call_data = {}
        api_call_data['id'] = api_call.id
        api_call_data['document'] = api_call.document
        api_call_data['created_at'] = api_call.created_at
        api_call_data['result'] = api_call.result
        api_call_data['user_id'] = api_call.user_id

        output.append(api_call_data)

    return jsonify({
        'message': 'Get all API calls\' data successfully!',
        'api_calls': output
    })

@app.route('/api-call/<api_call_id>', method=['GET'])
@token_required
def get_one_api_call(current_user, api_call_id):
    api_call = APICall.query.filter_by(id=api_call_id).first()

    if not api_call:
        return jsonify({
            'message': 'No API call found!'
        })

    api_call_data = {}
    api_call_data['id'] = api_call.id
    api_call_data['document'] = api_call.document
    api_call_data['created_at'] = api_call.created_at
    api_call_data['result'] = api_call.result
    api_call_data['user_id'] = api_call.user_id

    return jsonify({
        'message': 'Get API call\'s data successfully!',
        'api_call': api_call_data
    })

@app.route('/api-call'. method=['POST'])
@token_required
def create_api_key(current_user):
    data = request.get_json()
    user_api_key = data["api_key"]
    api_key = APIKey.query.filter_by(user_id=current_user.id, generated_key=user_api_key).first()

    if not api_key:
        return jsonify({
            'message': 'Invalid API key!'
        })
    else:
        if api_key.remaining_calls == 0:
            return jsonify({
                'message': 'API key has expired!'
            })
        else:
            api_key.remaining_calls = api_key.remaining_calls -1

            # The returning result is temporarily set to be 'OK', it will be reassigned to the predicting result soon!!
            new_api_call = APICall(document=data['document'], created_at=datetime.datetime.now(), result='OK', user_id=current_user.id)

            db.session.add(new_api_call)
            db.session.commit()

            return jsonify({
                'message': 'Create new API call successfully!'
            })

if __name__ == '__main__':
    app.run(debug=True)