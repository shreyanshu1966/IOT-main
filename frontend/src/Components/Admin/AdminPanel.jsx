import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
// import TestimonialAdmin from "./TestimonialAdmin"; // Import the new component
import { ChevronRight } from "lucide-react";
import OurCustomerAdmin from "./OurCustomerAdmin"; // Import the new component
const apiUrl = import.meta.env.VITE_API_URL;
import { Link } from "react-router-dom";
// import OurCustomer from './../OurCustomer/OurCustomer';

const isValidYouTubeUrl = (url) => {
  const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  return pattern.test(url);
};

const AdminPanel = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
    featured: false,
    rating: 0,
    reviews: 0,
    features: [], // Keep as array
    documents: [],
    video: "",
    videoUrl: "", // Add videoUrl field
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState(""); // Ensure setError is defined here
  const [userPage, setUserPage] = useState(1);
  const [productPage, setProductPage] = useState(1);
  const [userSearch, setUserSearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [orders, setOrders] = useState([]);

  const [newSolution, setNewSolution] = useState({
    name: "",
    image: null, // Change from empty string to null
  });
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [orderSearch, setOrderSearch] = useState("");
  const [orderPage, setOrderPage] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [newSubcategory, setNewSubcategory] = useState("");
  // Add state for category editing
  const [editingCategory, setEditingCategory] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  // Add state for expanded categories
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const itemsPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/admin/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
        setTotalUsers(response.data.length);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]); // Set users to an empty array in case of error
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/admin/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
        setTotalProducts(response.data.length);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // Set products to an empty array in case of error
      }
    };

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/api/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
        setTotalOrders(response.data.length);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
    fetchProducts();
    fetchOrders();

    fetchCategories();
  }, [token]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/admin/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchSubcategories = async (categoryId) => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/admin/categories/${categoryId}/subcategories`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSubcategories(response.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${apiUrl}/api/admin/categories`,
        {
          name: newCategory,
          isSubcategory: false, // Explicitly set as main category
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewCategory("");
      fetchCategories();
    } catch (error) {
      setError("Error adding category", error);
    }
  };

  // Update handleAddSubcategory function
  const handleAddSubcategory = async (parentId) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/admin/subcategories`,
        {
          name: newSubcategory,
          parentId,
          isSubcategory: true, // Explicitly set as subcategory
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update the newProduct state with the new subcategory
      setNewProduct((prev) => ({
        ...prev,
        subcategory: response.data._id, // Set the new subcategory ID
      }));

      setNewSubcategory("");
      fetchSubcategories(parentId);
    } catch (error) {
      setError("Error adding subcategory");
      console.error("Error adding subcategory:", error);
    }
  };

  // Add these functions to AdminPanel component
  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`${apiUrl}/api/admin/categories/${categoryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCategories(); // Refresh categories list
    } catch (error) {
      setError("Failed to delete category");
      console.error("Error deleting category:", error);
    }
  };

  const handleUpdateCategory = async (categoryId) => {
    try {
      await axios.put(
        `${apiUrl}/api/admin/categories/${categoryId}`,
        { name: editCategoryName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingCategory(null);
      setEditCategoryName("");
      fetchCategories(); // Refresh categories list
    } catch (error) {
      setError("Failed to update category");
      console.error("Error updating category:", error);
    }
  };

  // Update handleInputChange function
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "videoUrl") {
      // Validate YouTube URL
      if (value && !isValidYouTubeUrl(value)) {
        setError("Please enter a valid YouTube URL");
        return;
      }
      setError(""); // Clear error if URL is valid
    }

    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === "checkbox" ? checked : value,
      // Clear video file if URL is provided and vice versa
      ...(name === "videoUrl" && value ? { video: null } : {}),
      ...(name === "video" ? { videoUrl: "" } : {}),
    }));
    setNewSolution((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update the handleFileChange function to handle multiple files
  // Update handleFileChange to handle solution images
  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (name === "image") {
      if (files[0]) {
        const file = files[0];
        if (file.type.startsWith("image/")) {
          // Check if this is for solution or product
          if (e.target.closest("#solutionForm")) {
            setNewSolution((prev) => ({
              ...prev,
              image: file,
            }));
          } else {
            setNewProduct((prev) => ({
              ...prev,
              image: file,
            }));
          }
        } else {
          setError("Please upload an image file");
        }
      }
    } else if (name === "documents") {
      // Handle multiple document uploads
      const documentFiles = Array.from(files);
      const newDocuments = documentFiles.map((file) => ({
        name: file.name,
        file: file,
      }));

      setNewProduct((prev) => ({
        ...prev,
        documents: [...(prev.documents || []), ...newDocuments],
      }));
    }
  };

  // Add this new function to handle feature operations
  const handleFeatureChange = (index, value) => {
    setNewProduct((prev) => {
      const updatedFeatures = [...prev.features];
      updatedFeatures[index] = value;
      return {
        ...prev,
        features: updatedFeatures,
      };
    });
  };

  const addFeature = () => {
    setNewProduct((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  const removeFeature = (index) => {
    setNewProduct((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  // Update the handleAddProduct function
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();

      // Add basic fields including subcategory
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("description", newProduct.description);
      formData.append("category", newProduct.category);
      formData.append("subcategory", newProduct.subcategory); // Add subcategory
      formData.append("featured", newProduct.featured);
      formData.append("rating", newProduct.rating);
      formData.append("reviews", newProduct.reviews);
      formData.append("features", JSON.stringify(newProduct.features));

      // Add image file
      if (newProduct.image instanceof File) {
        formData.append("image", newProduct.image);
      }

      // Add document files
      if (newProduct.documents?.length) {
        newProduct.documents.forEach((doc, index) => {
          if (doc.file instanceof File) {
            formData.append(`documents`, doc.file);
            formData.append(`documentNames`, doc.name);
          }
        });
      }

      const response = await axios.post(
        `${apiUrl}/api/admin/products`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update products list with new product
      setProducts((prev) => [...prev, response.data]);

      // Reset form
      setNewProduct({
        name: "",
        price: "",
        description: "",
        image: null,
        category: "",
        subcategory: "", // Reset subcategory
        featured: false,
        rating: 0,
        reviews: 0,
        features: [],
        documents: [],
      });

      setError("");
    } catch (err) {
      console.error("Error adding product:", err);
      setError(err.response?.data?.message || "Error adding product");
    } finally {
      setLoading(false);
    }
  };

  // Update handleUpdateProduct function
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();

      // Filter out empty features
      const cleanedFeatures = newProduct.features.filter(
        (f) => f.trim() !== ""
      );

      // Add basic fields
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("description", newProduct.description);
      formData.append("category", newProduct.category);
      formData.append("subcategory", newProduct.subcategory); // Add subcategory
      formData.append("featured", newProduct.featured);
      formData.append("rating", newProduct.rating);
      formData.append("reviews", newProduct.reviews);
      formData.append("features", JSON.stringify(cleanedFeatures));
      formData.append("videoUrl", newProduct.videoUrl || "");

      // Add image if it's a File object
      if (newProduct.image instanceof File) {
        formData.append("image", newProduct.image);
      }

      // Add documents if they exist and are File objects
      if (newProduct.documents?.length) {
        newProduct.documents.forEach((doc, index) => {
          if (doc.file instanceof File) {
            formData.append("documents", doc.file);
            formData.append(`documentNames`, doc.name);
          }
        });
      }

      const response = await axios.put(
        `${apiUrl}/api/admin/products/${selectedProduct._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update products list
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === selectedProduct._id ? response.data : product
        )
      );

      // Reset form
      setSelectedProduct(null);
      setNewProduct({
        name: "",
        price: "",
        description: "",
        image: null,
        category: "",
        featured: false,
        rating: 0,
        reviews: 0,
        features: [],
        documents: [],
        videoUrl: "",
      });
      setError("");
    } catch (err) {
      console.error("Update error:", err);
      setError(err.response?.data?.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`${apiUrl}/api/admin/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
      setTotalProducts(totalProducts - 1);
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("Failed to delete product.");
    }
  };

  const handleEditProduct = (product) => {
    console.log("Editing product:", product); // Log the selected product
    setSelectedProduct(product);
    setNewProduct({
      ...product,
      _id: product._id || "", // Ensure _id is set
    });
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(userSearch.toLowerCase())
  );
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(productSearch.toLowerCase())
  );
  const filteredOrders = orders.filter((order) =>
    order._id.toLowerCase().includes(orderSearch.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(
    (userPage - 1) * itemsPerPage,
    userPage * itemsPerPage
  );
  const paginatedProducts = filteredProducts.slice(
    (productPage - 1) * itemsPerPage,
    productPage * itemsPerPage
  );
  const paginatedOrders = filteredOrders.slice(
    (orderPage - 1) * itemsPerPage,
    orderPage * itemsPerPage
  );

  // Add toggle handler
  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
        fetchSubcategories(categoryId);
      }
      return newSet;
    });
  };

  const handleDeleteSubcategory = async (subcategoryId, categoryId) => {
    setIsLoading(true);
    try {
      // Optimistically update UI
      setCategories((prevCategories) =>
        prevCategories.map((cat) => ({
          ...cat,
          subcategories: cat.subcategories.filter(
            (sub) => sub._id !== subcategoryId
          ),
        }))
      );

      // API call
      await axios.delete(`${apiUrl}/api/admin/subcategories/${subcategoryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Force refresh subcategories
      if (selectedCategory) {
        await fetchSubcategories(selectedCategory);
      }
      // Force refresh categories
      await fetchCategories();

      // If all else fails, reload page
      if (!selectedCategory) {
        window.location.reload();
      }
    } catch (error) {
      setError("Failed to delete subcategory");
      console.error("Error:", error);
      // Revert optimistic update
      await fetchCategories();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Admin Panel</h2>
      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Dashboard</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-100 rounded-lg">
            <h4 className="text-xl font-semibold">Total Users</h4>
            <p className="text-2xl">{totalUsers}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <h4 className="text-xl font-semibold">Total Products</h4>
            <p className="text-2xl">{totalProducts}</p>
          </div>
        </div>
      </section>
      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Users</h3>
        <input
          type="text"
          placeholder="Search users..."
          value={userSearch}
          onChange={(e) => setUserSearch(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg"
        />
        <ul>
          {paginatedUsers.map((user) => (
            <li
              key={user._id}
              className="mb-2 flex justify-between items-center"
            >
              <span>
                {user.username} - {user.role}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setUserPage((prev) => Math.max(prev - 1, 1))}
            disabled={userPage === 1}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            Previous
          </button>
          <span>Page {userPage}</span>
          <button
            onClick={() =>
              setUserPage((prev) =>
                filteredUsers.length > prev * itemsPerPage ? prev + 1 : prev
              )
            }
            disabled={filteredUsers.length <= userPage * itemsPerPage}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            Next
          </button>
        </div>
      </section>
      <section>
        <h3 className="text-2xl font-semibold mb-4">Products</h3>
        <input
          type="text"
          placeholder="Search products..."
          value={productSearch}
          onChange={(e) => setProductSearch(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg"
        />
        <ul className="mb-4">
          {paginatedProducts.map((product) => (
            <li
              key={product._id}
              className="mb-2 flex justify-between items-center"
            >
              <span>
                {product.name} - ₹{product.price}
              </span>
              <div>
                <button
                  onClick={() => handleEditProduct(product)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setProductPage((prev) => Math.max(prev - 1, 1))}
            disabled={productPage === 1}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            Previous
          </button>
          <span>Page {productPage}</span>
          <button
            onClick={() =>
              setProductPage((prev) =>
                filteredProducts.length > prev * itemsPerPage ? prev + 1 : prev
              )
            }
            disabled={filteredProducts.length <= productPage * itemsPerPage}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            Next
          </button>
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form
          onSubmit={selectedProduct ? handleUpdateProduct : handleAddProduct}
          className="space-y-4"
        >
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Product Media</label>
            {/* Main product image */}
            <div className="mb-4">
              <label className="block text-sm text-gray-600">Main Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            {/* Video URL or file */}
            <div className="mb-4">
              <label className="block text-sm text-gray-600">
                Video (URL or File)
              </label>
              <input
                type="text"
                name="videoUrl"
                value={newProduct.videoUrl}
                onChange={handleInputChange}
                placeholder="Enter video URL (YouTube/Vimeo)"
                className="w-full px-4 py-2 border rounded-lg mb-2"
              />
            </div>
            <div>
              {error && error.includes("YouTube") && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-gray-700">Category</label>
            <div className="flex gap-2">
              <select
                name="category"
                value={newProduct.category}
                onChange={(e) => {
                  handleInputChange(e);
                  fetchSubcategories(e.target.value);
                }}
                className="flex-1 px-4 py-2 border rounded-lg"
              >
                <option value="">Select Category</option>
                {categories
                  .filter((category) => !category.isSubcategory) // Only show main categories
                  .map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
              </select>

              {/* Add Category Button */}
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="New Category"
                  className="px-4 py-2 border rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          {newProduct.category && (
            <div>
              <label className="block text-gray-700">Subcategory</label>
              <div className="flex gap-2">
                <select
                  name="subcategory"
                  value={newProduct.subcategory}
                  onChange={handleInputChange}
                  className="flex-1 px-4 py-2 border rounded-lg"
                >
                  <option value="">Select Subcategory</option>
                  {subcategories
                    .filter((subcat) => subcat.isSubcategory) // Only show subcategories
                    .map((subcategory) => (
                      <option key={subcategory._id} value={subcategory._id}>
                        {subcategory.name}
                      </option>
                    ))}
                </select>
                <input
                  type="text"
                  value={newSubcategory}
                  onChange={(e) => setNewSubcategory(e.target.value)}
                  placeholder="New Subcategory"
                  className="px-4 py-2 border rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleAddSubcategory(newProduct.category)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                  Add
                </button>
              </div>
            </div>
          )}
          <div>
            <label className="block text-gray-700">Featured</label>
            <input
              type="checkbox"
              name="featured"
              checked={newProduct.featured}
              onChange={handleInputChange}
              className="mr-2"
            />
            Featured
          </div>
          <div>
            <label className="block text-gray-700">Rating (0-5)</label>
            <input
              type="number"
              name="rating"
              min="0"
              max="5"
              step="0.1"
              value={newProduct.rating}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-700">Number of Reviews</label>
            <input
              type="number"
              name="reviews"
              min="0"
              value={newProduct.reviews}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Product Features
              <button
                type="button"
                onClick={addFeature}
                className="ml-2 px-2 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
              >
                + Add Feature
              </button>
            </label>
            <div className="space-y-2">
              {newProduct.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder={`Feature ${index + 1}`}
                    className="flex-1 px-4 py-2 border rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
              {newProduct.features.length === 0 && (
                <p className="text-gray-500 text-sm">
                  No features added. Click &quot;Add Feature&quot; to add
                  product features.
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-gray-700">Documents</label>
            <div className="space-y-2">
              {newProduct.documents.map((doc, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Document name"
                    value={doc.name}
                    onChange={(e) => {
                      const newDocs = [...newProduct.documents];
                      newDocs[index].name = e.target.value;
                      setNewProduct((prev) => ({
                        ...prev,
                        documents: newDocs,
                      }));
                    }}
                    className="flex-1 px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="URL"
                    value={doc.url}
                    onChange={(e) => {
                      const newDocs = [...newProduct.documents];
                      newDocs[index].url = e.target.value;
                      setNewProduct((prev) => ({
                        ...prev,
                        documents: newDocs,
                      }));
                    }}
                    className="flex-1 px-4 py-2 border rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setNewProduct((prev) => ({
                        ...prev,
                        documents: prev.documents.filter((_, i) => i !== index),
                      }));
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  setNewProduct((prev) => ({
                    ...prev,
                    documents: [...prev.documents, { name: "", url: "" }],
                  }));
                }}
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
              >
                Add Document
              </button>
            </div>
          </div>
          <div>
            <label className="block text-gray-700">Documents</label>
            <input
              type="file"
              name="documents"
              multiple
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-lg mb-2"
            />
            {/* Show uploaded document names */}
            <div className="space-y-2">
              {newProduct.documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{doc.name}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setNewProduct((prev) => ({
                        ...prev,
                        documents: prev.documents.filter((_, i) => i !== index),
                      }));
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg"
            disabled={loading} // Disable button when loading
          >
            {loading
              ? "Adding..."
              : selectedProduct
              ? "Update Product"
              : "Add Product"}
          </button>
        </form>
        {loading && <p>Loading...</p>} {/* Display loading indicator */}
      </section>

      {/* Categories Management Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Manage Categories</h3>
        <div className="space-y-4">
          {categories
            .filter((category) => !category.isSubcategory)
            .map((category) => (
              <div
                key={category._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                {/* Category Header */}
                <div
                  className="p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => toggleCategory(category._id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`transform transition-transform ${
                          expandedCategories.has(category._id)
                            ? "rotate-90"
                            : ""
                        }`}
                      >
                        <ChevronRight size={20} />
                      </div>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                        Category
                      </span>
                      {editingCategory === category._id ? (
                        <input
                          type="text"
                          value={editCategoryName}
                          onChange={(e) => setEditCategoryName(e.target.value)}
                          className="border rounded px-2 py-1"
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        <span className="font-semibold">{category.name}</span>
                      )}
                    </div>
                    <div
                      className="flex gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {editingCategory === category._id ? (
                        <>
                          <button
                            onClick={() => handleUpdateCategory(category._id)}
                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setEditingCategory(null);
                              setEditCategoryName("");
                            }}
                            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setEditingCategory(category._id);
                              setEditCategoryName(category.name);
                            }}
                            className="px-3 py-1 text-blue-500 hover:bg-blue-50 rounded"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Delete this category and all its subcategories?"
                                )
                              ) {
                                handleDeleteCategory(category._id);
                              }
                            }}
                            className="px-3 py-1 text-red-500 hover:bg-red-50 rounded"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Subcategories Section */}
                {expandedCategories.has(category._id) && (
                  <div className="p-4 pl-8 space-y-2 border-t">
                    {subcategories
                      .filter((sub) => sub.parent === category._id)
                      .map((subcategory) => (
                        <div
                          key={subcategory._id}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100"
                        >
                          <div className="flex items-center gap-2">
                            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">
                              Subcategory
                            </span>
                            <span>{subcategory.name}</span>
                          </div>
                          <button
                            onClick={() =>
                              handleDeleteSubcategory(
                                subcategory._id,
                                category._id
                              )
                            }
                            disabled={isLoading}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400"
                          >
                            {isLoading ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      ))}

                    {/* Add Subcategory Form */}
                    <div className="flex gap-2 mt-4">
                      <input
                        type="text"
                        value={newSubcategory}
                        onChange={(e) => setNewSubcategory(e.target.value)}
                        placeholder="New Subcategory"
                        className="flex-1 px-3 py-2 border rounded"
                      />
                      <button
                        onClick={() => handleAddSubcategory(category._id)}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Add Subcategory
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
      <section className="mt-5">
        <Link to="/adminorder" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Manage Orders
        </Link>
      </section>
      <section className="mt-5">
        <Link
          to="/admincarousel"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Manage Carousel
        </Link>
      </section>
      <section className="mt-5">
        <Link
          to="/OurCustomerAdmin"
          className=" w-full bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Testimonial for Brand
        </Link>
      </section>

      <section className="mt-5">
        <Link
          to="/TestimonialAdmin"
          className="  w-full bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Testimonial for Customers
        </Link>
      </section>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default AdminPanel;

