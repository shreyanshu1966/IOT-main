import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;

const UserOrders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/orders/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (error) {
        setError('Error fetching orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const handleCancelOrder = async (orderId) => {
    try {
      await axios.put(
        `${apiUrl}/api/orders/${orderId}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders(orders.map(order => 
        order._id === orderId 
          ? { ...order, status: 'Canceled', cancelTime: new Date() } 
          : order
      ));
    } catch (err) {
      console.error('Error canceling order:', err);
      setError('Error canceling order. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
          Order History
        </h2>

        {orders.length === 0 ? (
          <div className="text-center py-12 backdrop-blur-lg bg-gray-800/30 rounded-2xl border border-gray-700">
            <p className="text-gray-400 mb-4">No orders found</p>
            <Link 
              to="/products" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text font-semibold hover:from-blue-500 hover:to-purple-500 transition-all"
            >
              Explore Products →
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div 
                key={order._id}
                className="group relative backdrop-blur-lg bg-gray-800/30 rounded-2xl border border-gray-700 p-6 hover:border-blue-500 transition-all duration-300"
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row justify-between mb-6 pb-6 border-b border-gray-700">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-sm text-blue-400">#{order._id.slice(-6)}</span>
                      <span className="text-xs text-gray-400">
                        {dayjs(order.createdAt).format('DD MMM YYYY · HH:mm')}
                      </span>
                    </div>
                    <div className={`inline-block px-3 py-1 rounded-full text-sm ${
                      order.status === 'Delivered' 
                        ? 'bg-green-500/20 text-green-400' 
                        : order.status === 'Canceled'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {order.status}
                    </div>
                  </div>

                  <div className="sm:text-right mt-4 sm:mt-0">
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
                      ₹{order.totalAmount.toFixed(2)}
                    </div>
                    {order.status === 'Pending' && (
                      <button 
                        onClick={() => handleCancelOrder(order._id)}
                        className="mt-2 px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl hover:from-red-500 hover:to-pink-500 transition-all"
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>

                {/* Products List */}
                <div className="space-y-4">
                  {order.products.map((item) => (
                    <div 
                      key={item.product._id}
                      className="flex items-center justify-between p-4 bg-gray-900/20 rounded-xl hover:bg-gray-900/40 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-16 h-16 object-cover rounded-lg transform transition-transform duration-300 hover:scale-105" 
                        />
                        <div>
                          <h3 className="font-semibold text-gray-200">{item.product.name}</h3>
                          <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="block text-lg font-bold text-blue-400">
                          ₹{item.product.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-400">per item</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 rounded-2xl" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrders;