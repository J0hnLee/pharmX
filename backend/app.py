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
from flask_cors import CORS
import json
from app_init import create_app
import os

config_name = os.getenv('FLASK_CONFIG')
app, cache, client = create_app(config_name)


# app = Flask(__name__)
# CORS(app)
# cache = redis.Redis(host='redis', port=6379)
# # use command 'docker inspect {mongo-container-name}' to find Gateway
# # Making a Connection with MongoClient
# #client = MongoClient("mongodb://localhost:27017/")
#client = MongoClient("mongodb://172.19.0.1:27018/")
# database
db = client["medical_data"]
# collection
company = db["hospital_data"]
df = pd.read_csv(
    './modules_under_development/1.write_data_to _mongodb/hospbsc.csv')
company.insert_many(df.to_dict('record'))

# mongo = PyMongo(app, uri="mongodb://172.19.0.1:27017/drug_data")
total_requests = Counter('request_count', 'Total webapp request count')

# TODO:
# add patients CRUD


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

# todo:
# replace NaN in database
# because NaN is not a valid value in json.


@app.route('/hospital_info/<string:hospital_number>', methods=['GET', 'POST'])
def hospital_info(hospital_number):
    record = company.find_one({"醫事機構代碼": hospital_number})

    if '_id' in record:
        del record['_id']
    # records=json.dumps(record, ensure_ascii=True)
    # # encode json to utf-8
    # encoded_data = records.encode('utf-8')
    encoded_data = jsonify(record)
    return encoded_data


@app.route('/member', methods=['GET'])
def member():
    print()
    return jsonify({'hello': 'world'})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
