import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Loader2, Send } from "lucide-react";

const apiUrl = import.meta.env.VITE_API_URL;

const RequestQuote = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const product = searchParams.get("product") || "";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    product,
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        
        setFormData(prev => ({
          ...prev,
          name: decoded.name || decoded.fullName || decoded.username || "",
          email: decoded.email || decoded.userEmail || "",
        }));

      } catch (error) {
        console.error("Error decoding token:", error);
        setStatus({
          type: "error",
          message: "Session expired. Please login again."
        });
      }
    }
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number is invalid";
    }
    if (!formData.product.trim()) newErrors.product = "Product is required";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    setStatus(null);

    try {
      const response = await axios.post(
        `${apiUrl}/api/quote/request`,
        formData
      );

      if (response.data.success) {
        setStatus({ 
          type: "success", 
          message: "Quote request sent successfully!" 
        });

        // Clear only the message field after success
        setFormData(prev => ({ ...prev, message: "" }));
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: error.response?.data?.error || "Failed to submit request. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-6">
      <div className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Request a Quote
        </h2>

        {status && (
          <div
            className={`p-4 mb-4 rounded-md ${
              status.type === "success"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-gray-300 mb-1">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-400"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-300 mb-1">Your Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-400"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-gray-300 mb-1">Your Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-400"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          {/* Product Field */}
          <div>
            <label className="block text-gray-300 mb-1">Product</label>
            <input
              type="text"
              name="product"
              value={formData.product}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-400"
              readOnly
            />
            {errors.product && <p className="text-red-500 text-sm">{errors.product}</p>}
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-gray-300 mb-1">Additional Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-400"
              placeholder="Write your message here..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-500 text-white py-3 px-6 rounded-md font-semibold transition-all transform hover:scale-[1.02] shadow-lg"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            <span>{loading ? "Sending..." : "Submit Quote Request"}</span>
          </button>
        </form>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mt-4 w-full text-center text-blue-400 hover:underline"
        >
          Back to Product
        </button>
      </div>
    </div>
  );
};

export default RequestQuote;

