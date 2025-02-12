import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Loader2, Star, FileText, ImageIcon, Video, ChevronDown, Send } from 'lucide-react';
import { getImageUrl, getDocumentUrl } from '../../utils/mediaUtils';

const apiUrl = import.meta.env.VITE_API_URL;

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mediaType, setMediaType] = useState('image');

  const token = localStorage.getItem('token');
  let userRole = '';

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userRole = decodedToken.role || '';
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiUrl}/api/products/${id}`);
        setProduct(response.data);
        setError(null);
      } catch (error) {
        setError('Failed to load product details. Please try again later.');
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleRequestQuote = () => {
    navigate(`/request-quote?product=${encodeURIComponent(product.name)}`);
  };

  const renderMedia = () => {
    if (mediaType === 'video') {
      if (product.videoUrl) {
        if (product.videoUrl.includes('youtube.com') || product.videoUrl.includes('youtu.be')) {
          const videoId = product.videoUrl.includes('youtu.be') 
            ? product.videoUrl.split('youtu.be/')[1]
            : product.videoUrl.split('v=')[1].split('&')[0];
          return (
            <div className="aspect-video w-full h-full">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
                className="w-full h-full rounded-lg"
                allowFullScreen
                title={product.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          );
        }
        return (
          <div className="aspect-video w-full h-full">
            <video
              src={product.videoUrl}
              className="w-full h-full rounded-lg object-contain"
              controls
              autoPlay
              muted
              playsInline
              loop
            />
          </div>
        );
      }
    }

    return (
      <img
        src={getImageUrl(product.image)}
        alt={product.name}
        className="w-full h-full object-contain rounded-lg"
        loading="lazy"
      />
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center text-white">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-space-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 backdrop-blur-lg rounded-3xl bg-opacity-20 bg-gray-800 p-8 border border-gray-700 shadow-2xl">
          {/* Media Section */}
          <div className="space-y-6">
            <div className="relative group aspect-square rounded-2xl overflow-hidden border border-gray-700 bg-gradient-to-tr from-gray-800 to-gray-900">
              {renderMedia()}
              
              {/* Media Toggle */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 bg-gray-900/50 backdrop-blur-sm rounded-full p-1">
                {product?.image && (
                  <button
                    onClick={() => setMediaType('image')}
                    className={`px-4 py-2 rounded-full transition-all flex items-center ${
                      mediaType === 'image' 
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'hover:bg-gray-700/50 text-gray-300'
                    }`}
                  >
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Image
                  </button>
                )}
                {product?.videoUrl && (
                  <button
                    onClick={() => setMediaType('video')}
                    className={`px-4 py-2 rounded-full transition-all flex items-center ${
                      mediaType === 'video'
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'hover:bg-gray-700/50 text-gray-300'
                    }`}
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Video
                  </button>
                )}
              </div>
            </div>

            {/* Request Quote Button */}
            {userRole !== 'admin' && (
              <button
                onClick={handleRequestQuote}
                className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-4 px-8 rounded-xl font-semibold transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-blue-500/20"
              >
                <Send className="w-5 h-5" />
                <span>Request Quote</span>
              </button>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6 text-gray-300">
            {/* Title and Rating */}
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">
                {product.name}
              </h1>
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-700 text-gray-600'}`}
                    />
                  ))}
                </div>
                <span className="text-gray-400 text-sm">
                  ({product.reviews.toLocaleString()} reviews)
                </span>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-1">
              <p className="text-4xl font-bold text-gray-100">
                ₹{product.price.toLocaleString()}
              </p>
              {product.originalPrice && (
                <p className="text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-lg leading-relaxed text-gray-400">
              {product.description}
            </p>

            {/* Features Accordion */}
            <div className="border border-gray-700 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex justify-between items-center p-4 bg-gray-800/50 cursor-pointer hover:bg-gray-800 transition-colors">
                  <span className="text-xl font-semibold">Key Features</span>
                  <ChevronDown className="w-5 h-5 transform transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <div className="p-4 pt-2 space-y-3 border-t border-gray-700">
                  {product.features.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <p className="text-gray-300">{feature}</p>
                    </div>
                  ))}
                </div>
              </details>
            </div>

            {/* Documents */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Product Documents</h3>
              <div className="grid grid-cols-1 gap-3">
                {product.documents.map((doc, i) => (
                  <a
                    key={i}
                    href={getDocumentUrl(doc.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 rounded-lg border border-gray-700 bg-gray-800/30 hover:border-blue-500 hover:bg-blue-500/10 transition-all group"
                  >
                    <FileText className="w-5 h-5 text-blue-400 mr-3" />
                    <span className="group-hover:text-blue-400 transition-colors">
                      {doc.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;