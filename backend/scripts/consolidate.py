import json
import sys

categories = set(())

if len(sys.argv) <= 2:
    print("Too few arguments. Please input a source (input) and destination (output) JSON like so:")
    print("python3 consolidate.py [in].json [out].json")
elif len(sys.argv) == 3:
    with open(sys.argv[1]) as parks:
        parks_json = json.load(parks)
        for i in range(len(parks_json)):
            categories.add(str(parks_json[i]["feature_desc"]))
    print(categories)
else:
    print("Too many arguments. Please input a source (input) and destination (output) JSON like so:")
    print("python3 consolidate.py [in].json [out].json")