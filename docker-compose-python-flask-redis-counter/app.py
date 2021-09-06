from flask import render_template
import pandas as pd
import time
import redis
import prometheus_client
from prometheus_client import Counter
from flask import Response, Flask, jsonify
from bson import json_util
from flask_pymongo import PyMongo
import pymongo
from pymongo import MongoClient
from flask import stream_with_context, request


app = Flask(__name__)
cache = redis.Redis(host='redis', port=6379)
# use command 'docker inspect {mongo-container-name}' to find Gateway
# Making a Connection with MongoClient
#client = MongoClient("mongodb://localhost:27017/")
client = MongoClient("mongodb://172.19.0.1:27018/")
# database
db = client["medical_data"]
# collection
company = db["hospital_data"]
df = pd.read_csv('./data/hospbsc.csv')
company.insert_many(df.to_dict('record'))
print(company)

# mongo = PyMongo(app, uri="mongodb://172.19.0.1:27017/drug_data")
total_requests = Counter('request_count', 'Total webapp request count')


def get_hit_count():
    retries = 5
    while True:
        try:
            return cache.incr('hits')
        except redis.exceptions.ConnectionError as exc:
            if retries == 0:
                raise exc
            retries -= 1
            time.sleep(0.5)


@app.route('/hits')
def get_index():
    count = get_hit_count()
    return '這是你第 {} 參訪\n'.format(count)


@app.route('/metrics')
def requests_count():
    total_requests.inc()
    return Response(prometheus_client.generate_latest(total_requests), mimetype='text/plain')


@app.route('/')
def index():
    total_requests.inc()
    return jsonify({
        'status': 'ok'
    })


@app.route('/hospital_info/<string:hospital_number>', methods=['GET', 'POST'])
def hospital_info(hospital_number):
    record = company.find_one({"醫事機構代碼": hospital_number})

    if '_id' in record:
        del record['_id']
    return record


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
