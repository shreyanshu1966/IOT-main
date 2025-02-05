import React, { useEffect, useState } from 'react';
import SignalProcessing from './Signalprocessing';

function Dashboard() {
 


  return (
    <div>
      <iframe
        src={import.meta.env.VITE_GRAFANA_URL}
        width="100%"
        height="800px"
        frameBorder="5"
      ></iframe>
      <SignalProcessing />
   
    </div>
  );
}

export default Dashboard;