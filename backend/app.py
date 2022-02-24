from flask import Flask
import psycopg2 as psql
import config
from configparser import ConfigParser

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
        "fid": park[2],
        "lat": park[3],
        "lon": park[4],
        "hours": park[5],
        "youth_only": park[6],
        "lighting": park[7]
    }

app = Flask(__name__)

@app.route('/')
def healthcheck():
    return 'The Backend is running as expected'

@app.route('/parks')
def getParks():
    try:
        params = config()
        conn = psql.connect(**params)
        cur = conn.cursor()
        cur.execute('SELECT * FROM park')
        parks = cur.fetchall()
        conn.close()
        ret = []
        for park in parks:
            ret.append(parkOut(park))
        return str(ret)
    except (Exception, psql.DatabaseError) as error:
        print(error)
        conn.close()
        return 500

if __name__ == '__main__':
    app.run()