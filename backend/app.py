from flask import Flask, request, jsonify
from flask_cors import CORS
from keras.models import model_from_json
import numpy as np
import pandas as pd
import logging

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def load_model():
    """Load model with error handling"""
    try:
        with open('model.json', 'r') as json_file:
            model = model_from_json(json_file.read())
        model.load_weights("model.weights.h5")
        model.compile(optimizer='adam', 
                     loss='binary_crossentropy', 
                     metrics=['accuracy'])
        logger.info("Model loaded successfully")
        return model
    except Exception as e:
        logger.error(f"Model loading failed: {str(e)}")
        raise

model = load_model()


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        logger.info(f"Received data: {data}")
        
        # Convert all values to numeric
        input_data = pd.DataFrame([[
            int(data['statuses_count']),
            int(data['followers_count']),
            int(data['friends_count']),
            int(data['favourites_count']),
            int(data['lang_num']),
            int(data['listed_count']),
            int(data['geo_enabled']),
            int(data['profile_use_background_image'])
        ]], columns=[
            'statuses_count', 'followers_count', 'friends_count',
            'favourites_count', 'lang_num', 'listed_count',
            'geo_enabled', 'profile_use_background_image'
        ])
        
        # Predict
        proba = float(model.predict(input_data)[0][0])
        return jsonify({
            "probability": proba,
            "is_fake": proba > 0.5
        })
    except ValueError as e:
        logger.error(f"Invalid input format: {str(e)}")
        return jsonify({"error": "All inputs must be numeric"}), 400
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)