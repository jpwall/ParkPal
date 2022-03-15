from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS, cross_origin
from configparser import ConfigParser
from cryptography.hazmat.primitives import serialization
from cryptography import x509
from cryptography.hazmat.backends import default_backend
import psycopg2 as psql
import bcrypt
import config
import json
import jwt

private_key = open('.cert/privatekey.pem', 'r').read()
public_key = open('.cert/publickey.cer', 'r').read()

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def config(filename='db.ini', section='parkpal'):
    parser = ConfigParser()
    parser.read(filename)

    db = {}
    if parser.has_section(section):
        params = parser.items(section)
        for param in params:
            db[param[0]] = param[1]
    else:
        raise Exception('Section {0} not found in the {1} file'.format(section, filename))
    
    return db

def connect():
    """ Connect to the PostgreSQL database server """
    conn = None
    try:
        params = config()

        print('Connecting to the PostgreSQL database...')
        conn = psql.connect(**params)
		
        cur = conn.cursor()
        
        print('PostgreSQL database version:')
        cur.execute('SELECT version()')

        db_version = cur.fetchone()
        print(db_version)
       
        cur.close()
    except (Exception, psql.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
            print('Database connection closed.')

def parkOut(park):
    return {
        "pid": park[0],
        "name": park[1],
        "fids": [park[2]],
        "lat": park[3],
        "lon": park[4],
        "hours": park[5],
        "youth_only": park[6],
        "lighting": park[7]
    }

def featureOut(feature):
    return {
        "fid": feature[0],
        "name": feature[1],
        "image": feature[2]
    }

@app.route('/')
def healthcheck():
    return 'The Backend is running as expected'

@app.route('/auth_login', methods=['POST'])
@cross_origin()
def login():
    request.form = json.loads(request.data)
    user = request.form['username']
    passwd = bytes(request.form['password'], 'UTF-8')
    salt = bcrypt.gensalt()
    hashed_pass = bcrypt.hashpw(passwd, salt)
    params = config()
    conn = psql.connect(**params)
    res = None
    with conn:
        with conn.cursor() as cur:
            cur.execute("SELECT password, id FROM users WHERE username=%s", (user,))
            res = cur.fetchone()
    if res is not None:
        if bcrypt.checkpw(passwd, bytes(res[0], 'UTF-8')):
            print("{}'s HASHES match! Authorizing access...".format(user))
            print("Creating JWT for {}".format(user))
            payload_data = {
                "sub": res[1],
                "nickname": user
            }
            new_token = jwt.encode(
                payload=payload_data,
                key=private_key,
                algorithm='RS256'
            )
            print("{} is {}'s JWT token".format(new_token, user))
            return jsonify({"status": "success", "msg": "success", "token": str(new_token)}), 200
        else:
            print("{}'s HASHES don't match :( The password provided was wrong...".format(user))
            return jsonify({"status": "unauthorized", "msg": "incorrect password"}), 401
    else:
        return jsonify({"status": "unauthorized", "msg": "incorrect username"}), 401

@app.route('/auth_register', methods=['POST'])
@cross_origin()
def register():
    request.form = json.loads(request.data)
    user = request.form['username']
    passwd = bytes(request.form['password'], 'UTF-8')
    if len(user) > 0 and len(request.form['password']) > 0:
        salt = bcrypt.gensalt()
        hashed_pass = bcrypt.hashpw(passwd, salt)
        print("{}'s Hashed Password: {}".format(user, hashed_pass))
        try:
            params = config()
            conn = psql.connect(**params)
            with conn:
                with conn.cursor() as cur:
                    cur.execute("INSERT INTO users (username, password) VALUES (%s, %s) RETURNING id", (user, hashed_pass.decode('utf8')))
                    cur.fetchone()
            conn.close()
            return jsonify({"status": "success", "msg": "success"}), 200
        except psql.errors.UniqueViolation:
            return jsonify({"status": "error", "msg": "Please choose a different username"}), 409
    else:
        return jsonify({"status": "error", "msg": "Username or password must not be empty"}), 400

@app.route('/auth_editnote', methods=['POST'])
@cross_origin()
def editNote():
    request.form = json.loads(request.data)
    note = request.form['note']
    park = request.form['pid']
    raw_jwt = request.headers.get('Authorization')
    if raw_jwt[0:7] == "Bearer ":
        raw_jwt = raw_jwt[7:]
        print(raw_jwt)
        jwt_options = {
            'verify_signature': True,
            'verify_exp': True,
            'verify_nbf': False,
            'verify_iat': True,
            'verify_aud': False
        }
        jwt_data = jwt.decode(options=jwt_options, jwt=raw_jwt, key=public_key, algorithms=['RS256', ])
        print("JWT: {}".format(jwt_data))
        print("note: {}".format(note))
        print("park: {}".format(park))
        #try:
        params = config()
        conn = psql.connect(**params)
        with conn:
            with conn.cursor() as cur:
                cur.execute("SELECT * FROM notes WHERE uid = %s AND pid = %s",
                    (jwt_data["sub"], park))
                existing = cur.fetchone()
                if existing == None:
                    cur.execute("INSERT INTO notes (uid, pid, note) VALUES (%s, %s, %s)",
                        (jwt_data["sub"], park, note))
                else:
                    cur.execute("UPDATE notes SET note = %s WHERE uid = %s AND pid = %s",
                        (note, jwt_data["sub"], park))
        return jsonify({"status": "success", "msg": "Note saved"}), 200
        #except:
        #    return jsonify({"status": "failure", "msg": "Error saving note"}), 500
    else:
        return jsonify({"status": "error", "msg": "Invalid token"}), 400

@app.route('/auth_getnote', methods=['POST'])
@cross_origin()
def getNote():
    request.form = json.loads(request.data)
    park = request.form['pid']
    raw_jwt = request.headers.get('Authorization')
    if raw_jwt[0:7] == "Bearer ":
        raw_jwt = raw_jwt[7:]
        print(raw_jwt)
        jwt_options = {
            'verify_signature': True,
            'verify_exp': True,
            'verify_nbf': False,
            'verify_iat': True,
            'verify_aud': False
        }
        jwt_data = jwt.decode(options=jwt_options, jwt=raw_jwt, key=public_key, algorithms=['RS256', ])
        try:
            params = config()
            conn = psql.connect(**params)
            note = None
            with conn:
                with conn.cursor() as cur:
                    cur.execute("SELECT * FROM notes WHERE uid = %s AND pid = %s",
                        (jwt_data["sub"], park))
                    note = cur.fetchone()
            conn.close()
            if note != None:
                return jsonify({"status": "success", "msg": "Note retrieved", "note": note[2]}), 200
            else:
                return jsonify({"status": "success", "msg": "Note retrieved", "note": ""}), 200
        except:
            return jsonify({"status": "success", "msg": "Note not retrieved", "note": "Error retrieving note"}), 500
    else:
        return jsonify({"status": "error", "msg": "Invalid token"}), 400

@app.route('/parks')
def getParks():
    try:
        params = config()
        conn = psql.connect(**params)
        cur = conn.cursor()
        cur.execute('SELECT * FROM park')
        parks = cur.fetchall()
        conn.close()
        ret = {}
        for park in parks:
            if str(park[1]) in ret.keys():
                ret[str(park[1])]["fids"].append(park[2])
            else:
                ret[str(park[1])] = parkOut(park)
        retarr = []
        for park in ret:
            retarr.append(ret[str(park)])
        return json.dumps(retarr)
    except (Exception, psql.DatabaseError) as error:
        print(error)
        conn.close()
        return 500

@app.route('/features')
def getFeatures():
    try:
        params = config()
        conn = psql.connect(**params)
        cur = conn.cursor()
        cur.execute('SELECT * FROM feature')
        features = cur.fetchall()
        conn.close()
        ret = []
        for feature in features:
            ret.append(featureOut(feature))
        return json.dumps(ret)
    except (Exception, psql.DatabaseError) as error:
        print(error)
        conn.close()
        return 500

if __name__ == '__main__':
    app.run()