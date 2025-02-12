import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Tag, ChevronRight, ShoppingCart, Search } from 'lucide-react';
import { getImageUrl } from '../../utils/mediaUtils';
const apiUrl = import.meta.env.VITE_API_URL;

const SubcategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: Infinity });

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const subcategoryResponse = await axios.get(`${apiUrl}/api/admin/categories/${categoryId}/subcategories`);
        setSubcategories(subcategoryResponse.data);
      } catch (error) {
        console.error('Failed to fetch subcategories', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const productResponse = await axios.get(`${apiUrl}/api/products`);
        const filteredProducts = productResponse.data.filter(product => product.category === categoryId);
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };

    fetchSubcategories();
    fetchProducts();
  }, [categoryId]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const filteredProducts = (subcategoryId) => {
    return products.filter(
      (product) =>
        product.subcategory === subcategoryId &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        product.price >= priceFilter.min &&
        product.price <= priceFilter.max
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 space-y-6 lg:space-y-0">
          <div className="flex items-center space-x-4 group">
            <div className="p-3 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl shadow-2xl transform transition-all duration-300 group-hover:rotate-12">
              <Tag className="text-white" size={32} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
              Category Products
            </h1>
          </div>

          {/* Filters Section */}
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            {/* Search */}
            <div className="relative backdrop-blur-lg bg-gray-800/30 rounded-xl p-1 border border-gray-700 hover:border-blue-500 transition-all duration-300 flex-1">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent p-3 pl-12 pr-12 text-gray-300 placeholder-gray-500 focus:outline-none rounded-lg"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" size={20} />
            </div>

            {/* Price Filter */}
            <div className="flex items-center space-x-2 backdrop-blur-lg bg-gray-800/30 rounded-xl p-1 border border-gray-700 hover:border-blue-500 transition-all duration-300">
              <input
                type="number"
                placeholder="Min"
                value={priceFilter.min === 0 ? '' : priceFilter.min}
                onChange={(e) => setPriceFilter((prev) => ({ ...prev, min: Number(e.target.value) || 0 }))}
                className="w-20 bg-transparent p-3 text-gray-300 placeholder-gray-500 focus:outline-none rounded-lg"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                placeholder="Max"
                value={priceFilter.max === Infinity ? '' : priceFilter.max}
                onChange={(e) => setPriceFilter((prev) => ({ ...prev, max: Number(e.target.value) || Infinity }))}
                className="w-20 bg-transparent p-3 text-gray-300 placeholder-gray-500 focus:outline-none rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Subcategories and Products */}
        {subcategories.map((subcategory) => {
          const subcategoryProducts = filteredProducts(subcategory._id);

          return (
            <div key={subcategory._id} className="mb-8 sm:mb-10">
              <div className="flex justify-between items-center mb-6 backdrop-blur-lg bg-gray-800/30 p-4 rounded-xl border border-gray-700">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-200 flex items-center">
                  <ChevronRight className="mr-2 text-blue-400 transform transition-transform group-hover:translate-x-1" />
                  {subcategory.name}
                </h2>
                <span className="text-sm text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full">
                  {subcategoryProducts.length} item{subcategoryProducts.length !== 1 ? 's' : ''}
                </span>
              </div>

              {subcategoryProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {subcategoryProducts.map((product) => (
                    <div
                      key={product._id}
                      className="group relative overflow-hidden backdrop-blur-lg bg-gray-800/30 rounded-2xl border border-gray-700 hover:border-blue-500 transform transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                      onClick={() => handleProductClick(product._id)}
                    >
                      <div className="relative h-48">
                        <img
                          src={getImageUrl(product.image)}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-lg font-semibold text-gray-200 line-clamp-1">
                            {product.name}
                          </h3>
                        </div>
                        <div className="absolute top-3 right-3 p-2 bg-blue-500/20 rounded-full backdrop-blur-sm hover:bg-blue-500/30 transition-colors">
                          <ShoppingCart className="text-blue-400" size={20} />
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                          {product.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            ₹{product.price}
                          </span>
                          <span className="text-sm text-blue-400 hover:text-purple-400 transition-colors">
                            View Details →
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 backdrop-blur-lg bg-gray-800/30 rounded-xl border border-gray-700">
                  <p className="text-gray-400">No products in this subcategory</p>
                </div>
              )}
            </div>
          );
        })}

        {/* No Subcategories */}
        {subcategories.length === 0 && (
          <div className="text-center py-12 backdrop-blur-lg bg-gray-800/30 rounded-xl border border-gray-700">
            <p className="text-gray-400">No subcategories found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubcategoryPage;