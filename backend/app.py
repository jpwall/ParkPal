from flask import Flask

app = Flask(__name__)

@app.route('/test')
def healthcheck():
    return 'Placeholder'

if __name__ == '__main__':
    app.run()