from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS, cross_origin
import psycopg2 as psql
import bcrypt
import config
import json
from configparser import ConfigParser

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
    db_hash = None
    with conn:
        with conn.cursor() as cur:
            cur.execute("SELECT (password) FROM users WHERE username=%s", (user,))
            res = cur.fetchone()
            db_hash = res[0]
    if bcrypt.checkpw(passwd, bytes(db_hash, 'UTF-8')):
        print("{}'s HASHES match! Authorizing access...".format(user))
        return jsonify({"status": "success", "msg": "success"}), 200
    else:
        print("{}'s HASHES don't match :( That's not allowed...".format(user))
        return jsonify({"status": "unauthorized", "msg": "incorrect password"}), 401

@app.route('/auth_register', methods=['POST'])
@cross_origin()
def register():
    request.form = json.loads(request.data)
    user = request.form['username']
    passwd = bytes(request.form['password'], 'UTF-8')
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