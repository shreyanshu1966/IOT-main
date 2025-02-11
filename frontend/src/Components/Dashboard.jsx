import React, { useState, useEffect } from 'react';
import SignalProcessing from './Signalprocessing';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

function Dashboard() {
  const [hasSubscription, setHasSubscription] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    checkUserRole();
  }, []);

  const checkUserRole = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const isAdminUser = response.data.role === 'admin';
      setIsAdmin(isAdminUser);
      
      if (!isAdminUser) {
        // Only check subscription for non-admin users
        await checkSubscription();
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Error checking user role:', error);
      setLoading(false);
    }
  };

  const checkSubscription = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/subscription/status`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHasSubscription(response.data.active);
    } catch (error) {
      console.error('Error checking subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async () => {
    try {
      // Create order
      const orderResponse = await axios.post(
        `${apiUrl}/api/subscription/create-subscription`,
        {},
        { headers: { Authorization: `Bearer ${token}` }}
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderResponse.data.amount,
        currency: orderResponse.data.currency,
        name: 'Dashboard Subscription',
        description: '1 Month Dashboard Access',
        order_id: orderResponse.data.id,
        handler: async (response) => {
          try {
            await axios.post(
              `${apiUrl}/api/subscription/verify-subscription`,
              response,
              { headers: { Authorization: `Bearer ${token}` }}
            );
            setHasSubscription(true);
          } catch (error) {
            console.error('Payment verification failed:', error);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error initiating subscription:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!hasSubscription && !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h1 className="text-4xl font-bold">Dashboard Subscription Required</h1>
          <p className="text-gray-400">Access our powerful dashboard with real-time data analytics</p>
          <div className="bg-gray-800 p-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">Monthly Subscription</h2>
            <p className="text-3xl font-bold mb-4">₹299/month</p>
            <button
              onClick={handleSubscribe}
              className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="py-6 bg-gray-800 shadow-lg">
        <h1 className="text-3xl font-bold text-center">Dashboard</h1>
      </header>
      <main className="p-6 space-y-6">
        <section className="bg-gray-800 p-4 rounded-lg shadow-md">
          <iframe
            src={`${import.meta.env.VITE_GRAFANA_URL}?kiosk&hideControls`}
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