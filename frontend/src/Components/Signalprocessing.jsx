import React, { useState } from 'react';
import Plot from 'react-plotly.js';

function SignalProcessing() {
  const [file, setFile] = useState(null);
  const [waveform, setWaveform] = useState('');
  const [samplingFrequency, setSamplingFrequency] = useState('');
  const [filterOrder, setFilterOrder] = useState('');
  const [lowCutoff, setLowCutoff] = useState('');
  const [highCutoff, setHighCutoff] = useState('');
  const [error, setError] = useState('');
  const [chartData, setChartData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('waveform', waveform);
    formData.append('samplingFrequency', samplingFrequency);
    formData.append('filterOrder', filterOrder);
    formData.append('lowCutoff', lowCutoff);
    formData.append('highCutoff', highCutoff);

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/process-signal`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const errorMessage = await response.json();
        setError(`Error: ${errorMessage.error}`);
        return;
      }
      const data = await response.json();
      setChartData({
        x: Array.from({ length: data.processed_data.length }, (_, i) => i),
        y: data.processed_data,
        type: 'scatter',
        mode: 'lines',
        marker: { color: 'blue' },
      });
    } catch (err) {
      setError(`Error: ${err.message}`);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Upload File</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="block w-full text-gray-300 bg-gray-700 border border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Waveform</label>
          <input
            type="text"
            placeholder="Waveform"
            value={waveform}
            onChange={(e) => setWaveform(e.target.value)}
            className="block w-full text-gray-300 bg-gray-700 border border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <input
          type="text"
          placeholder="Sampling Frequency"
          value={samplingFrequency}
          onChange={(e) => setSamplingFrequency(e.target.value)}
          className="block w-full text-white bg-gray-700 border border-gray-600 rounded-lg p-2"
        />
        <input
          type="text"
          placeholder="Filter Order"
          value={filterOrder}
          onChange={(e) => setFilterOrder(e.target.value)}
          className="block w-full text-white bg-gray-700 border border-gray-600 rounded-lg p-2"
        />
        <input
          type="text"
          placeholder="Low Cutoff"
          value={lowCutoff}
          onChange={(e) => setLowCutoff(e.target.value)}
          className="block w-full text-white bg-gray-700 border border-gray-600 rounded-lg p-2"
        />
        <input
          type="text"
          placeholder="High Cutoff"
          value={highCutoff}
          onChange={(e) => setHighCutoff(e.target.value)}
          className="block w-full text-white bg-gray-700 border border-gray-600 rounded-lg p-2"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {chartData && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Processed Signal</h2>
          <Plot
            data={[chartData]}
            layout={{
              title: 'Processed Signal Visualization',
              xaxis: {
                title: 'Sample Index',
                showgrid: true,
                zeroline: true,
                showline: true,
                mirror: 'ticks',
                gridcolor: '#bdbdbd',
                gridwidth: 2,
                zerolinecolor: '#969696',
                zerolinewidth: 4,
                linecolor: '#636363',
                linewidth: 6,
              },
              yaxis: {
                title: 'Amplitude',
                showgrid: true,
                zeroline: true,
                showline: true,
                mirror: 'ticks',
                gridcolor: '#bdbdbd',
                gridwidth: 2,
                zerolinecolor: '#969696',
                zerolinewidth: 4,
                linecolor: '#636363',
                linewidth: 6,
              },
            }}
          />
        </div>
      )}
    </div>
  );
}

export default SignalProcessing;