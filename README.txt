lsof -ti:5000
kill 5625


#!/usr/bin/env python
# encoding: utf-8
from flask import Flask, request, jsonify
from openai import OpenAI

client = OpenAI(api_key='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')

app = Flask(__name__)

# Set your OpenAI API key

@app.route('/generate_response', methods=['POST'])
def generate_response():
    try:
        # Get input JSON from the request
        input_data = request.json
        user_input = input_data.get('user_input', '')

        # Call the OpenAI API to generate a response
        response = client.chat.completions.create(model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": user_input},
        ])

        # Extract the generated response
        generated_response = response.choices[0].message.content.strip()

        # Create output JSON
        output_data = {'generated_response': generated_response}

        return jsonify(output_data)

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)