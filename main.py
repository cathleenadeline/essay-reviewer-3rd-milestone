from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=False)

API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-v0.1"
HEADERS = {"Authorization": "Bearer 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"}


def query(payload):
    response = requests.post(API_URL, headers=HEADERS, json=payload)
    return response.json()

@app.route('/process_text', methods=['POST'])
def process_text():
    try:
        data = request.get_json()

        if 'text' not in data:
            return jsonify({'error': 'Missing input: "text" field'}), 400

        text_input = data['text']

        # Call the Hugging Face API
        output = query({
            "inputs": text_input
        })

        return jsonify(output), 200, {'Content-Type': 'application/json'}


    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    #app.run(host='0.0.0.0', port=5000, debug=True)
    app.run(debug=True)
