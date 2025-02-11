import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import scipy.io as sio
from scipy import signal
import numpy as np
import pandas as pd

app = Flask(__name__)

# Add CORS configuration
CORS(app, resources={r"/*": {"origins": ["http://localhost:5175", "https://yourdomain.com", "http://147.93.106.39", "http://intuitiverobotics.io", "https://intuitiverobotics.io", "https://www.intuitiverobotics.io", "http://www.intuitiverobotics.io"], "supports_credentials": True}})

UPLOAD_FOLDER = './uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def process_signal(file_path, waveform, sampling_frequency, filter_order, low_cutoff, high_cutoff):
    mat = sio.loadmat(file_path)
    mat = pd.Series(mat)
    at = np.array(mat["val"])
    atdf = pd.DataFrame(at, columns=['respiration', 'ecg'])
    
    if waveform == 'ecg':
        ds = 1
    elif waveform == 'respiration':
        ds = 0
    data1 = atdf.values[50000:80000, ds]
    
    fs = float(sampling_frequency)
    order = int(filter_order)
    lowcut = float(low_cutoff)
    highcut = float(high_cutoff)
    
    nyq = 0.5 * fs
    low = lowcut / nyq
    high = highcut / nyq
    
    if not (0 < low < 1 and 0 < high < 1):
        raise ValueError("Digital filter critical frequencies must be 0 < Wn < 1")
    
    bf, af = signal.butter(order, [low, high], btype='band')
    yf = signal.filtfilt(bf, af, data1)
    
    return yf.tolist()

@app.route('/process-signal', methods=['POST'])
def process_signal_endpoint():
    file = request.files['file']
    waveform = request.form['waveform']
    sampling_frequency = request.form['samplingFrequency']
    filter_order = request.form['filterOrder']
    low_cutoff = request.form['lowCutoff']
    high_cutoff = request.form['highCutoff']
    
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)
    
    try:
        processed_data = process_signal(file_path, waveform, sampling_frequency, filter_order, low_cutoff, high_cutoff)
        return jsonify({'processed_data': processed_data})
    except ValueError as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(port=5001)