import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;

const CheckoutPage = ({ cart, calculateTotal, token }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '', // Add email field
    phone: '', // Add phone field
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePaymentSuccess = async (response) => {
    try {
      // Create order after successful payment
      const orderDetails = {
        products: cart.map(item => ({ 
          product: item.product._id, 
          quantity: item.quantity 
        })),
        totalAmount: calculateTotal(),
        paymentDetails: {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature
        },
        shippingAddress: formData // Include shipping address in the order details
      };

      console.log('Order details:', orderDetails); // Log order details

      await axios.post(`${apiUrl}/api/orders`, orderDetails, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Redirect to orders page after successful order creation
      navigate('/orders');
    } catch (err) {
      console.error('Error placing order:', err.response ? err.response.data : err); // Log the error response
      setError('Error placing order. Please try again.');
    }
  };

  const handlePayment = async () => {
    try {
      const orderResponse = await axios.post(
        `${apiUrl}/api/payment/create-order`,
        { amount: calculateTotal() }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderResponse.data.amount,
        currency: orderResponse.data.currency,
        name: 'ANJALI ENTERPRISE',
        description: 'Purchase Payment',
        image: '/logo.jpeg', // Add your company logo
        order_id: orderResponse.data.id,
        handler: handlePaymentSuccess,
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone
        },
        notes: {
          address: formData.address,
          shipping_address: `${formData.address}, ${formData.city}, ${formData.state}, ${formData.zipCode}`
        },
        theme: {
          color: '#3B82F6', // Brand color
          backdrop_color: '#ffffff',
          hide_topbar: false
        },
        modal: {
          confirm_close: true,
          animation: true,
          backdropclose: false,
          escape: false,
          handleback: true
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      setError('Error initiating payment. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.address || !formData.email || !formData.phone) {
      setError('Please fill in all required fields');
      return;
    }
    handlePayment();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
          Secure Checkout
        </h2>

        {/* Order Summary */}
        <div className="backdrop-blur-lg bg-gray-800/30 rounded-2xl border border-gray-700 p-6 shadow-2xl hover:shadow-blue-500/10 transition-all">
          <h3 className="text-2xl font-semibold mb-6 text-gray-200">Order Summary</h3>
          <ul className="space-y-4 mb-6">
            {cart.map((item) => (
              <li key={item.product._id} className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-lg border border-gray-700 overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="text-gray-300">{item.product.name} x {item.quantity}</span>
                </div>
                <span className="font-medium bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
                  ₹{(item.product.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center pt-6 border-t border-gray-700">
            <span className="text-xl font-semibold text-gray-200">Total:</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
              ₹{calculateTotal()}
            </span>
          </div>
        </div>

        {/* Shipping Form */}
        <div className="backdrop-blur-lg bg-gray-800/30 rounded-2xl border border-gray-700 p-6 shadow-2xl hover:shadow-blue-500/10 transition-all">
          <h3 className="text-2xl font-semibold mb-6 text-gray-200">Shipping Details</h3>
          {error && (
            <div className="mb-6 p-4 bg-gradient-to-r from-red-600/30 to-pink-600/30 rounded-xl border border-red-500/30 flex items-center space-x-3">
              <span className="text-red-300">{error}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-0 text-gray-200 placeholder-gray-500 transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-0 text-gray-200 placeholder-gray-500 transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-0 text-gray-200 placeholder-gray-500 transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-0 text-gray-200 placeholder-gray-500 transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-0 text-gray-200 placeholder-gray-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-0 text-gray-200 placeholder-gray-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-0 text-gray-200 placeholder-gray-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-0 text-gray-200 placeholder-gray-500 transition-all"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-4 rounded-xl font-medium transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-blue-500/20"
            >
              Proceed to Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;