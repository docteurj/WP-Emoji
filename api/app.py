from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.sequence import pad_sequences
import pickle
from y_list import y

# Load the tokenizer
with open("tokenizer10.pkl", "rb") as f:
    tokenizer = pickle.load(f)

# Load the model
model = tf.keras.models.load_model("v10.h5")

classes = y

app = Flask(__name__)

@app.route('/process_strings', methods=['POST'])
def process_strings():
    data = request.json
    string = data.get("string1", " ")
    new_input_sequence = tokenizer.texts_to_sequences([string])
    padded_new_sequence = pad_sequences(new_input_sequence, maxlen=403)
    predicted_class_index = np.argmax(model.predict(padded_new_sequence), axis=-1)
    predicted_emoji = classes[predicted_class_index[0]]
    process_string = string + " :" + predicted_emoji + ":"

    response_data = {
        'result': 'Processed succesfully',
        'data': process_string
    }

    return jsonify(response_data)
