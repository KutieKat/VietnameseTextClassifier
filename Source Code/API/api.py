from datetime import date
import calendar
from datetime import datetime, timedelta
from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from functools import wraps
from flask_cors import CORS, cross_origin

# Constants
THIS_WEEK = 1
THIS_MONTH = 2
THIS_QUARTER = 3
THIS_YEAR = 4

# Configurations
app = Flask(__name__)
cors = CORS(app)

app.config['SECRET_KEY'] = 'thisissecret'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////vtc.db'
app.config['CORS_HEADERS'] = 'Content-Type'

db = SQLAlchemy(app)

# Models


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True, nullable=False)
    name = db.Column(db.String(50), nullable=False)
    full_name = db.Column(db.String(50))
    email = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(80), nullable=False)
    admin = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)


class APIKey(db.Model):
    __tablename__ = 'api_key'
    id = db.Column(db.Integer, primary_key=True)
    generated_key = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    remaining_calls = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))


class APICall(db.Model):
    __tablename__ = 'api_call'
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, nullable=False)
    document = db.Column(db.Text(), nullable=False)
    result = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))


# db.create_all()


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
            current_user = User.query.filter_by(
                public_id=data['public_id']).first()
        except:
            return jsonify({
                'message': 'Token is invalid!'
            }), 401

        return f(current_user, *args, **kwargs)

    return decorated

# Routes
# Users


@app.route('/users', methods=['GET'])
@token_required
def get_all_users(current_user):
    # if int(current_user.admin) == 0:
    #     return jsonify({
    #         'message': 'You are not allowed to perform this action!'
    #     })

    users = User.query.all()
    output = []

    for user in users:
        user_data = {}
        user_data['id'] = user.id
        user_data['public_id'] = user.public_id
        user_data['username'] = user.name
        user_data['full_name'] = user.full_name
        user_data['email'] = user.email
        user_data['password'] = user.password
        user_data['admin'] = user.admin
        user_data['created_at'] = user.created_at
        user_data['updated_at'] = user.updated_at
        output.append(user_data)

    return jsonify({
        'message': 'Get all users\' data successfully!',
        'users': output
    })


@app.route('/users/<public_id>', methods=['GET'])
@token_required
def get_one_user(current_user, public_id):
    if current_user.public_id != public_id:
        return jsonify({
            'message': 'You are not allowed to perform this action!'
        })

    user = User.query.filter_by(public_id=public_id).first()

    if not user:
        return jsonify({
            'message': 'No user found!'
        })

    user_data = {}
    user_data['id'] = user.id
    user_data['public_id'] = user.public_id
    user_data['username'] = user.name
    user_data['full_name'] = user.full_name
    user_data['email'] = user.email
    user_data['password'] = user.password
    user_data['admin'] = user.admin
    user_data['created_at'] = user.created_at
    user_data['updated_at'] = user.updated_at

    return jsonify({
        'message': 'Get user data successfully!',
        'user': user_data
    })


@app.route('/users/register', methods=['POST'])
def create_user():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='sha256')
    public_id = str(uuid.uuid4())
    new_user = User(public_id=public_id, name=data['username'], full_name=data['full_name'], email=data['email'], password=hashed_password,
                    admin=data['admin'], created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())

    user = User.query.filter_by(name=data['username']).first()
    email = User.query.filter_by(email=data['email']).first()

    if (user or email):
        return jsonify({
            'message': 'User already existed!',
        }), 409

    db.session.add(new_user)
    db.session.commit()

    token = jwt.encode({
        'public_id': new_user.public_id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
    }, app.config['SECRET_KEY'])

    return jsonify({
        'message': 'Create new user successfully!',
        'token': token.decode('UTF-8')
    })


@app.route('/users/<public_id>', methods=['PUT'])
@token_required
def update_user(current_user, public_id):
    user = User.query.filter_by(public_id=public_id).first()
    data = request.get_json()
    is_updated = False

    if not user:
        return jsonify({
            'message': 'No user found!'
        })

    if data['name'] != '' and data['name'] != user.name:
        is_updated = True
        user.name = user.name

    if data['full_name'] != '' and data['full_name'] != user.full_name:
        is_updated = True
        user.full_name = user.full_name

    if data['email'] != '' and data['email'] != user.email:
        is_updated = True
        user.email = user.email

    if data['admin'] != user.admin:
        is_updated = True
        user.admin = user.admin

    if is_updated == True:
        user.updated_at = datetime.datetime.now()

    db.session.commit()

    return jsonify({
        'message': 'Update user\'s information successfully!'
    })


@app.route('/users/<public_id>/change-password', methods=['PUT'])
@token_required
def change_password(current_user, public_id):
    user = User.query.filter_by(public_id=public_id).first()
    data = request.get_json()

    if not user:
        return jsonify({
            'message': 'No user found!'
        })

    if data['old_password'] != '' and data['new_password'] != '' and data['old_password'] == data['new_password']:
        hashed_password = generate_password_hash(
            data['new_password'], method='sha256')
        user.password = hashed_password

    db.session.commit()

    return jsonify({
        'message': 'Change user\'s password successfully!'
    })


@app.route('/users/<public_id>', methods=['DELETE'])
@token_required
def delete_user(current_user, public_id):
    # if int(current_user.admin) == 0:
    #     return jsonify({
    #         'message': 'You are not allowed to perform this action!'
    #     })

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


@app.route('/users/login')
def login():
    auth = request.authorization

    if not auth or not auth.username or not auth.password:
        return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})

    user = User.query.filter_by(name=auth.username).first()

    if not user:
        return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})

    if check_password_hash(user.password, auth.password):
        token = jwt.encode({
            'public_id': user.public_id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
        }, app.config['SECRET_KEY'])

        return jsonify({
            'token': token.decode('UTF-8')
        })

    return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})

# API Keys


@app.route('/api-keys', methods=['GET'])
@token_required
def get_all_api_keys(current_user):
    # if int(current_user.admin) == 0:
    #     return jsonify({
    #         'message': 'You are not allowed to perform this action!'
    #     })

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


@app.route('/api-keys/<api_key_id>', methods=['GET'])
@token_required
def get_one_api_key(current_user, api_key_id):
    api_key = APIKey.query.filter_by(id=api_key_id).first()

    if not api_key:
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


@app.route('/api-keys', methods=['POST'])
@token_required
def create_api_key(current_user):
    api_key = APIKey.query.filter_by(user_id=current_user.id).first()

    if api_key:
        return jsonify({
            'message': 'You have already had an API key created before!'
        }), 409

    generated_key = str(uuid.uuid4())
    new_api_key = APIKey(generated_key=generated_key, created_at=datetime.datetime.now(
    ), remaining_calls=100, user_id=current_user.id)

    db.session.add(new_api_key)
    db.session.commit()

    return jsonify({
        'message': 'Create new API key successfully!',
        'api_key': generated_key
    })


@app.route('/api-keys/<api_key_id>', methods=['PUT'])
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


@app.route('/api-keys/<api_key_id>', methods=['DELETE'])
@token_required
def delete_api_key(current_user, api_key_id):
    # if int(current_user.admin) == 0:
    #     return jsonify({
    #         'message': 'You are not allowed to perform this action!'
    #     })

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

# API Calls


@app.route('/api-calls', methods=['GET'])
@token_required
def get_all_api_calls(current_user):
    # if int(current_user.admin) == 0:
    #     return jsonify({
    #         'message': 'You are not allowed to perform this action!'
    #     })

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


@app.route('/api-calls/<api_call_id>', methods=['GET'])
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


@app.route('/api-calls', methods=['POST'])
@token_required
def create_api_call(current_user):
    data = request.get_json()
    user_api_key = data["api_key"]
    api_key = APIKey.query.filter_by(
        user_id=current_user.id, generated_key=user_api_key).first()

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
            api_key.remaining_calls = api_key.remaining_calls - 1

            # The returning result is temporarily set to be 'OK', it will be reassigned to the predicting result soon!!
            new_api_call = APICall(document=data['document'], created_at=datetime.datetime.now(
            ), result='OK', user_id=current_user.id)

            db.session.add(new_api_call)
            db.session.commit()

            return jsonify({
                'message': 'Create new API call successfully!'
            })

# Statistics


@app.route('/statistics', methods=['GET'])
@token_required
def get_overview_stats(current_user):
    # if int(current_user.admin) == 0:
    #     return jsonify({
    #         'message': 'You are not allowed to perform this action!'
    #     })

    total_users = len(User.query.all())
    total_api_keys = len(APIKey.query.all())
    total_api_calls = len(APICall.query.all())

    return jsonify({
        'message': 'Get users\' statistics data successfully!',
        'total_users': total_users,
        'total_api_keys': total_api_keys,
        'total_api_calls': total_api_calls
    })


@app.route('/statistics/users', methods=['GET'])
@token_required
def get_user_stats(current_user):
    # if int(current_user.admin) == 0:
    #     return jsonify({
    #         'message': 'You are not allowed to perform this action!'
    #     })

    args = request.args
    duration = THIS_WEEK

    if "duration" in args:
        duration = int(args["duration"])

    today = start = end = datetime.date.today()
    difference = 0

    if duration == THIS_WEEK:
        start = today - timedelta(days=today.weekday())
        end = start + timedelta(days=6)
        difference = 7

    elif duration == THIS_MONTH:
        start = today.replace(day=1)
        end = today.replace(day=calendar.monthrange(
            today.year, today.month)[1])

        difference = (end - start).days + 1

    elif duration == THIS_QUARTER:
        quarter = int((today.month - 1) / 3) + 1
        start = datetime.date(today.year, 3 * quarter - 2, 1)

        month = 3 * quarter
        remaining = int(month / 12)
        end = datetime.date(today.year + remaining, month %
                            12 + 1, 1) + datetime.timedelta(days=-1)

        difference = (end - start).days + 1

    elif duration == THIS_YEAR:
        start = today.replace(month=1, day=1)
        end = today.replace(month=12, day=31)

        difference = (end - start).days + 1

    else:
        start = today - timedelta(days=today.weekday())
        end = start + timedelta(days=6)

        difference = 7

    users = User.query.all()
    output = {}

    dates = [start + datetime.timedelta(days=d) for d in range(difference)]
    dates = [str(d) for d in dates]

    for output_date in dates:
        output_date = '/'.join(reversed(output_date.split('-')[1:3]))
        output[output_date] = 0

    for user in users:
        if (user.created_at.date() >= start and user.updated_at.date() <= end):
            date_string = user.created_at.strftime("%d/%m")

            if date_string in output:
                output[date_string] += 1
            else:
                output[date_string] = 1

    return jsonify({
        'message': 'Get all users\' statistics data successfully!',
        'duration': {
            'starting_date': '-'.join(reversed(str(start).split('-'))),
            'ending_date': '-'.join(reversed(str(end).split('-'))),
        },
        'statistics_data': output
    })


@app.route('/statistics/api-keys', methods=['GET'])
@token_required
def get_user_stats(current_user):
    # if int(current_user.admin) == 0:
    #     return jsonify({
    #         'message': 'You are not allowed to perform this action!'
    #     })

    args = request.args
    duration = THIS_WEEK

    if "duration" in args:
        duration = int(args["duration"])

    today = start = end = datetime.date.today()
    difference = 0

    if duration == THIS_WEEK:
        start = today - timedelta(days=today.weekday())
        end = start + timedelta(days=6)
        difference = 7

    elif duration == THIS_MONTH:
        start = today.replace(day=1)
        end = today.replace(day=calendar.monthrange(
            today.year, today.month)[1])

        difference = (end - start).days + 1

    elif duration == THIS_QUARTER:
        quarter = int((today.month - 1) / 3) + 1
        start = datetime.date(today.year, 3 * quarter - 2, 1)

        month = 3 * quarter
        remaining = int(month / 12)
        end = datetime.date(today.year + remaining, month %
                            12 + 1, 1) + datetime.timedelta(days=-1)

        difference = (end - start).days + 1

    elif duration == THIS_YEAR:
        start = today.replace(month=1, day=1)
        end = today.replace(month=12, day=31)

        difference = (end - start).days + 1

    else:
        start = today - timedelta(days=today.weekday())
        end = start + timedelta(days=6)

        difference = 7

    api_keys = APIKey.query.all()
    output = {}

    dates = [start + datetime.timedelta(days=d) for d in range(difference)]
    dates = [str(d) for d in dates]

    for output_date in dates:
        output_date = '/'.join(reversed(output_date.split('-')[1:3]))
        output[output_date] = 0

    for api_key in api_keys:
        if (api_key.created_at.date() >= start and api_key.updated_at.date() <= end):
            date_string = api_key.created_at.strftime("%d/%m")

            if date_string in output:
                output[date_string] += 1
            else:
                output[date_string] = 1

    return jsonify({
        'message': 'Get all API keys\' statistics data successfully!',
        'duration': {
            'starting_date': '-'.join(reversed(str(start).split('-'))),
            'ending_date': '-'.join(reversed(str(end).split('-'))),
        },
        'statistics_data': output
    })


@app.route('/statistics/api-calls', methods=['GET'])
@token_required
def get_user_stats(current_user):
    # if int(current_user.admin) == 0:
    #     return jsonify({
    #         'message': 'You are not allowed to perform this action!'
    #     })

    args = request.args
    duration = THIS_WEEK

    if "duration" in args:
        duration = int(args["duration"])

    today = start = end = datetime.date.today()
    difference = 0

    if duration == THIS_WEEK:
        start = today - timedelta(days=today.weekday())
        end = start + timedelta(days=6)
        difference = 7

    elif duration == THIS_MONTH:
        start = today.replace(day=1)
        end = today.replace(day=calendar.monthrange(
            today.year, today.month)[1])

        difference = (end - start).days + 1

    elif duration == THIS_QUARTER:
        quarter = int((today.month - 1) / 3) + 1
        start = datetime.date(today.year, 3 * quarter - 2, 1)

        month = 3 * quarter
        remaining = int(month / 12)
        end = datetime.date(today.year + remaining, month %
                            12 + 1, 1) + datetime.timedelta(days=-1)

        difference = (end - start).days + 1

    elif duration == THIS_YEAR:
        start = today.replace(month=1, day=1)
        end = today.replace(month=12, day=31)

        difference = (end - start).days + 1

    else:
        start = today - timedelta(days=today.weekday())
        end = start + timedelta(days=6)

        difference = 7

    api_calls = APICall.query.all()
    output = {}

    dates = [start + datetime.timedelta(days=d) for d in range(difference)]
    dates = [str(d) for d in dates]

    for output_date in dates:
        output_date = '/'.join(reversed(output_date.split('-')[1:3]))
        output[output_date] = 0

    for api_call in api_calls:
        if (api_call.created_at.date() >= start and api_call.updated_at.date() <= end):
            date_string = api_call.created_at.strftime("%d/%m")

            if date_string in output:
                output[date_string] += 1
            else:
                output[date_string] = 1

    return jsonify({
        'message': 'Get all API calls\' statistics data successfully!',
        'duration': {
            'starting_date': '-'.join(reversed(str(start).split('-'))),
            'ending_date': '-'.join(reversed(str(end).split('-'))),
        },
        'statistics_data': output
    })


if __name__ == '__main__':
    app.run(debug=True)
