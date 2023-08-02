from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/process_strings', methods=['POST'])
def process_strings():
    data = request.json
    string = data.get("string1", " ")


    process_string = string.lower()



    response_data = {
        'result': 'Processed succesfully',
        'data': process_string
    }

    return jsonify(response_data)