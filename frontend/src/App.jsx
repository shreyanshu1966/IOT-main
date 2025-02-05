import React, { useState, useEffect } from "react";
const apiUrl = import.meta.env.VITE_API_URL;
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";

import NavBar from "./Components/NavAndFooter/NavBar";
import ShoppingCart from "./Components/CartAndCheckout/Shoppingcart";
import Footer from "./Components/NavAndFooter/Footer";
import SolutionSlider from "./SolutionSlider";
import TestimonialSection from "./Components/OurCustomer/TestimonialSection";
import CheckoutPage from "./Components/CartAndCheckout/CheckoutPage";
import Card from "./Components/Product/Card";
import Login from "./Components/LoginAndSignup/Login";
import Signup from "./Components/LoginAndSignup/Signup";
import AdminPanel from "./Components/Admin/AdminPanel";
import UserOrders from "./UserOrders";
import ProductDetails from "./Components/Product/ProductDetails";
import axios from "axios";
import ScrollToTop from "./ScrollToTop";
import ProductPage from "./Components/Product/ProductPage";
import SubcategoryPage from "./Components/Product/SubcategoryPage"; // Import the SubcategoryPage component
import ForgotPassword from "./Components/LoginAndSignup/ForgotPassword";
import ResetPassword from "./Components/LoginAndSignup/ResetPassword";
import fetchFeaturedProducts from "./featuredProducts";
import OurCustomer from "./Components/OurCustomer/OurCustomer"; // Corrected import statement

import FeaturedProduct from "./Components/Product/FeaturedProduct";
import TestimonialAdmin from "./Components/Admin/TestimonialAdmin";
import OurCustomerAdmin from './Components/Admin/OurCustomerAdmin';
import Admincarousel from './Components/Admin/Admincarousel';
import AdminOrder from './Components/Admin/AdminOrder';
import AboutTestimonial from "./Components/NavAndFooter/AboutTestimonial";
import About from "./Components/NavAndFooter/About";
import Dashboard from "./Components/Dashboard";
// Add the new quick links
const quickLinks = [
  {
    name: "Terms and Conditions",
    url: "https://merchant.razorpay.com/policy/PkxnLXQOaL587H/terms",
  },
  {
    name: "Cancellation and Refund",
    url: "https://merchant.razorpay.com/policy/PkxnLXQOaL587H/refund",
  },
  {
    name: "Shipping and Delivery",
    url: "https://merchant.razorpay.com/policy/PkxnLXQOaL587H/shipping",
  },
];

function QuickLinks() {
  return (
    <div>
      {quickLinks.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.name}
        </a>
      ))}
    </div>
  );
}

const App = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userRole, setUserRole] = useState("");

  // const navigate =useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUserRole(decodedToken.role);
    } else {
      localStorage.removeItem("token");
      setUserRole("");
    }
  }, [token]);

  const addToCart = async (product) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/cart/add`,
        { productId: product._id, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setCart(response.data.products);
    } catch (error) {
      console.error("Error adding to cart:", error);
      if (error.response?.status === 401) {
        // Handle unauthorized access - redirect to login
        Navigate("/login");
      }
    }
  };

  const removeFromCart = async (productId) => {
    await axios.post(
      `${apiUrl}/api/cart/remove`,
      { productId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    fetchCart();
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return; // Prevent quantity from being less than 1
    try {
      const response = await axios.post(
        `${apiUrl}/api/cart/update`,
        { productId, quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCart(response.data.products);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(response.data?.products || []); // Handle null cart object
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart([]); // Set cart to an empty array in case of error
    }
  };

  const fetchProducts = async () => {
    const response = await axios.get(`${apiUrl}/api/products`);
    setProducts(response.data);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await fetchFeaturedProducts();
      setFeaturedProducts(products);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    fetchCart();
    fetchProducts();
  }, [token]);

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.product.price * item.quantity, 0)
      .toFixed(2);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-gray-100 pt-20">
        <NavBar
          cartLength={cart.length}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          setIsCartOpen={setIsCartOpen}
          setSearchQuery={setSearchQuery}
          setToken={setToken} // Pass setToken to NavBar
        />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <SolutionSlider />



                <FeaturedProduct
                  featuredProducts={featuredProducts}
                  addToCart={addToCart}
                />
                <AboutTestimonial/>

                <OurCustomer />
                <TestimonialSection />
              </>
            }
          />
          <Route
            path="/products"
            element={
              <ProductPage
                products={filteredProducts}
                addToCart={addToCart}
                setSearchQuery={setSearchQuery}
              />
            }
          />
          <Route
            path="/product/:id"
            element={<ProductDetails addToCart={addToCart} />}
          />
          <Route
            path="/checkout"
            element={
              token ? (
                <CheckoutPage
                  cart={cart}
                  calculateTotal={calculateTotal}
                  token={token}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/category/:categoryId" element={<SubcategoryPage />} />{" "}
          {/* Add this route */}
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/TestimonialAdmin" element={<TestimonialAdmin />} />
          <Route path="/OurCustomerAdmin" element={<OurCustomerAdmin />} />
          <Route path="/Admincarousel" element={<Admincarousel />} />
          <Route path="/AdminOrder" element={<AdminOrder />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Protected routes */}
          <Route
            path="/admin"
            element={
              token && userRole === "admin" ? (
                <AdminPanel token={token} />
              ) : (
                <Navigate to="/admin" />
              )
            }
          />
          <Route
            path="/orders"
            element={
              token ? <UserOrders token={token} /> : <Navigate to="/login" />
            }
          />
        </Routes>
        {isCartOpen && (
          <ShoppingCart
            cartItems={cart}
            setIsCartOpen={setIsCartOpen}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
            calculateTotal={calculateTotal}
          />
        )}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
