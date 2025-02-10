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
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-2xl font-bold text-gray-100 mb-6">Signal Processing Controls</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Upload File</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="block w-full text-gray-300 bg-gray-700 border border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* Input fields with labels */}
            <div className="space-y-4">
              {[
                { label: 'Waveform', value: waveform, setter: setWaveform },
                { label: 'Sampling Frequency', value: samplingFrequency, setter: setSamplingFrequency },
                { label: 'Filter Order', value: filterOrder, setter: setFilterOrder },
                { label: 'Low Cutoff', value: lowCutoff, setter: setLowCutoff },
                { label: 'High Cutoff', value: highCutoff, setter: setHighCutoff },
              ].map((field) => (
                <div key={field.label}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{field.label}</label>
                  <input
                    type="text"
                    placeholder={field.label}
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    className="block w-full text-gray-300 bg-gray-700 border border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Process Signal
            </button>
          </form>
          {error && (
            <div className="mt-4 p-4 bg-red-900/50 border border-red-500 rounded-lg">
              <p className="text-red-500">{error}</p>
            </div>
          )}
        </div>

        {/* Graph Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-100 mb-6">Signal Visualization</h2>
          {chartData ? (
            <Plot
              data={[chartData]}
              layout={{
                paper_bgcolor: 'rgba(31, 41, 55, 0)', // dark background
                plot_bgcolor: 'rgba(31, 41, 55, 0)', // dark background
                title: {
                  text: 'Processed Signal Visualization',
                  font: { color: '#fff', size: 20 }
                },
                xaxis: {
                  title: 'Sample Index',
                  showgrid: true,
                  gridcolor: '#374151',
                  linecolor: '#4B5563',
                  tickfont: { color: '#9CA3AF' },
                  titlefont: { color: '#fff' }
                },
                yaxis: {
                  title: 'Amplitude',
                  showgrid: true,
                  gridcolor: '#374151',
                  linecolor: '#4B5563',
                  tickfont: { color: '#9CA3AF' },
                  titlefont: { color: '#fff' }
                },
                margin: { t: 50, r: 30, b: 50, l: 60 },
                autosize: true
              }}
              style={{ width: '100%', height: '500px' }}
              config={{ responsive: true }}
            />
          ) : (
            <div className="h-[500px] flex items-center justify-center border-2 border-dashed border-gray-700 rounded-lg">
              <p className="text-gray-400">No data to display</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignalProcessing;