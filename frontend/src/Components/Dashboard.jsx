import React from 'react';
import SignalProcessing from './Signalprocessing';

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="py-6 bg-gray-800 shadow-lg">
        <h1 className="text-3xl font-bold text-center">Dashboard</h1>
      </header>
      <main className="p-6 space-y-6">
        <section className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Grafana Dashboard</h2>
          <iframe
            src={import.meta.env.VITE_GRAFANA_URL}
            width="100%"
            height="600px"
            frameBorder="0"
            className="rounded-lg"
          ></iframe>
        </section>
        <section className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Signal Processing</h2>
          <SignalProcessing />
        </section>
      </main>
    </div>
  );
}

export default Dashboard;