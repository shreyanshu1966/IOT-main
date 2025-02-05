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
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <input type="text" placeholder="Waveform" value={waveform} onChange={(e) => setWaveform(e.target.value)} />
        <input type="text" placeholder="Sampling Frequency" value={samplingFrequency} onChange={(e) => setSamplingFrequency(e.target.value)} />
        <input type="text" placeholder="Filter Order" value={filterOrder} onChange={(e) => setFilterOrder(e.target.value)} />
        <input type="text" placeholder="Low Cutoff" value={lowCutoff} onChange={(e) => setLowCutoff(e.target.value)} />
        <input type="text" placeholder="High Cutoff" value={highCutoff} onChange={(e) => setHighCutoff(e.target.value)} />
        <button type="submit">Process Signal</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {chartData && (
        <div>
          <h2>Processed Signal</h2>
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