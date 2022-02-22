import json
import sys
import psycopg2 as psql
import config
import operator
from configparser import ConfigParser

def config(filename='../db.ini', section='parkpal'):
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

def newFeature(fid, name):
    try:
        params = config()
        conn = psql.connect(**params)
        cur = conn.cursor()
        cur.execute('INSERT INTO feature (fid, name)'
                    'VALUES (%s, %s)',
                    (
                        fid,
                        name
                    ))
        conn.commit()
        cur.close()
        conn.close()
    except psql.errors.UniqueViolation:
        pass

def tf(val):
    if val == "TRUE":
        return True
    else:
        return False

def newPark(pid, name, fid, lat, lon, hours, youth_only, lighting):
    params = config()
    conn = psql.connect(**params)
    cur = conn.cursor()
    cur.execute('INSERT INTO park (pid, name, fid, lat, lon, hours, youth_only, lighting)'
                'VALUES (%s, %s, %s, %s, %s, %s, %s, %s)',
                (
                    pid,
                    name,
                    fid,
                    lat,
                    lon,
                    hours,
                    youth_only,
                    lighting
                ))
    conn.commit()
    cur.close()
    conn.close()

categories = set(())
parks_combined = {}

if len(sys.argv) <= 1:
    print("Too few arguments. Please input a source (input) and destination (output) JSON like so:")
    print("python3 consolidate.py [in].json")
elif len(sys.argv) == 2:
    with open(sys.argv[1]) as parks:
        parks_json = json.load(parks)
        for i in range(len(parks_json)):
            lat = 0.0
            lon = 0.0
            hours = None
            if "xpos" in parks_json[i].keys():
                lat = float(parks_json[i]["xpos"])
            if "ypos" in parks_json[i].keys():
                lon = float(parks_json[i]["ypos"])
            if "hours" in parks_json[i].keys():
                hours = str(parks_json[i]["hours"])
            newFeature(int(parks_json[i]["feature_id"]), str(parks_json[i]["feature_desc"]))
            print("Added feature {}".format(str(parks_json[i]["feature_desc"])))
            newPark(int(parks_json[i]["pmaid"]), str(parks_json[i]["name"]), str(parks_json[i]["feature_id"]), lat, lon, hours, tf(parks_json[i]["youth_only"]), tf(parks_json[i]["lighting"]))
            print("Added new park {}".format(str(parks_json[i]["name"])))