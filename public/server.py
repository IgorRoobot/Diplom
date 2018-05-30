# -*- coding: utf-8 -*-
import os
from label_image import Main
from datetime import timedelta
from functools import update_wrapper
from werkzeug.utils import secure_filename
from flask import Flask, request, redirect, flash, jsonify, Response, make_response, current_app
import sqlite3
import json

UPLOAD_FOLDER = '/var/www/i-dyplom/public_html/uploads/'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.secret_key = 'eqwd13eqdas123'
app.debug = True


def crossdomain(origin=None, methods=None, headers=None,
				max_age=21600, attach_to_all=True,
				automatic_options=True):
	if methods is not None:
		methods = ', '.join(sorted(x.upper() for x in methods))
	if headers is not None and not isinstance(headers, str):
		headers = ', '.join(x.upper() for x in headers)
	if not isinstance(origin, str):
		origin = ', '.join(origin)
	if isinstance(max_age, timedelta):
		max_age = max_age.total_seconds()

	def get_methods():
		if methods is not None:
			return methods

		options_resp = current_app.make_default_options_response()
		return options_resp.headers['allow']

	def decorator(f):
		def wrapped_function(*args, **kwargs):
			if automatic_options and request.method == 'OPTIONS':
				resp = current_app.make_default_options_response()
			else:
				resp = make_response(f(*args, **kwargs))
			if not attach_to_all and request.method != 'OPTIONS':
				# return resp
				pass

			h = resp.headers

			h['Access-Control-Allow-Origin'] = origin
			h['Access-Control-Allow-Headers'] = origin
			h['Access-Control-Allow-Methods'] = get_methods()
			h['Access-Control-Max-Age'] = str(max_age)
			if headers is not None:
				h['Access-Control-Allow-Headers'] = headers
			return resp

		f.provide_automatic_options = False
		return update_wrapper(wrapped_function, f)
	return decorator

def allowed_file(filename):
	return '.' in filename and \
		   filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def upload_file(request):
	# return request
	if request.method == 'POST':
		if 'file' not in request.files:
			flash('No file part')
			return redirect(request.url)

		file = request.files['file']

		if file.filename == '':
			flash('No selected file')
			return redirect(request.url)

		if file and allowed_file(file.filename):
			filename = secure_filename(file.filename)
			file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
			file.save(file_path)

			result = Main()
			result = result.search(file_path)
			return result


@app.route("/", methods=['POST', 'OPTIONS'])
@crossdomain(origin='*')
def main():
	result = json.dumps(upload_file(request))
	resp = Response(str(result))
	resp.headers['Access-Control-Allow-Origin'] = '*'
	return resp

# @app.route("/mock", methods=['GET', 'OPTIONS'])
# @crossdomain(origin='*')
# def get_mushrooms():
# 	conn = sqlite3.connect("/var/www/i-dyplom/public_html/data.db")
# 	with conn:
# 		cur = conn.cursor()

# 		# получаем категорию
# 		cur.execute("SELECT * FROM images")
# 		data = cur.fetchall()
# 		# формируем результат
# 		resp = Response(data)
# 		resp.headers['Access-Control-Allow-Origin'] = '*'
# 		return resp
# 	return 'Mushrooms'

@app.route("/mushrooms/full", methods=['GET'])
def get_mushrooms_full():
	return 'Mushrooms full'

@app.route("/mushrooms/", methods=['GET'])
@crossdomain(origin='*')
def get_mock():
	conn = sqlite3.connect("/var/www/i-dyplom/public_html/data.db")
	with conn:
		cur = conn.cursor()
		cur.execute("SELECT * FROM images")
		data = cur.fetchall()
		# resp = Response()
		result = []
		for item in data:
			result.append({
				"data": {
					"id": item[0],
					"title": item[1],
					"description": item[2],
					"url": item[3]
				},
				"full": {
					"domain": item[4],
					"realm": item[5],
					"department": item[6],
					"class": item[7],
					"order": item[8],
					"family": item[9],
					"rod": item[10],
					"species": item[11],
					"mixed_forests": item[12],
					"forest_steppe": item[13],
					"steppe": item[14],
					"mountains": item[15]
				}
			})

		return jsonify(result)
	# resp = Response(open('/home/rkn/my-dyplom.ddns.net/mock.json', 'r', encoding="utf-8").read())
	return resp

if __name__ == '__main__':
	app.run(debug=True)
