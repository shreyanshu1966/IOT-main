import React, { useEffect, useState } from "react";
import {
  ShoppingCart,
  Menu,
  X,
  LogOut,
  Home,
  Package,
  ClipboardList,
  Settings,
  LogIn,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Dashboard from "../Dashboard"; // Import the Dashboard component

const NavBar = ({
  cartLength,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  setIsCartOpen,
  setSearchQuery,
}) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const decodedToken = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const userRole = decodedToken ? decodedToken.role : "";
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleMenuClick = (e) => {
    e.stopPropagation();
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest(".mobile-menu-container")) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  const isActive = (path) => location.pathname === path;

  const NavLink = ({ to, icon: Icon, children }) => (
    <Link
      to={to}
      className={`relative flex items-center space-x-2 p-2 rounded-lg transition-all ${
        isActive(to)
          ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400"
          : "text-gray-300 hover:bg-gray-800/30 hover:text-white"
      }`}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      <Icon className="h-5 w-5" />
      <span className="font-medium">{children}</span>
      {isActive(to) && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-0.5 bg-blue-400 rounded-full animate-pulse" />
      )}
    </Link>
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gray-900 ${
        isScrolled || isMobileMenuOpen
          ? "py-3 backdrop-blur-xl shadow-2xl shadow-blue-900/20"
          : "py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center space-x-3 group"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="relative h-12 w-12 rounded-xl bg-white p-1 shadow-lg">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-full w-full object-contain rounded-lg transition-transform duration-300 group-hover:rotate-[15deg]"
              />
              <div className="absolute inset-0 rounded-lg border-2 border-white/10" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-red-600 bg-clip-text text-transparent">
              INTUITIVE ROBOTICS
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/" icon={Home}>
              Home
            </NavLink>
            <NavLink to="/products" icon={Package}>
              Products
            </NavLink>
            <NavLink to="/dashboard" icon={Settings}>
              Dashboard
            </NavLink>
            {userRole === "user" && (
              <NavLink to="/orders" icon={ClipboardList}>
                Orders
              </NavLink>
            )}
            {userRole === "admin" && (
              <NavLink to="/admin" icon={Settings}>
                Admin
              </NavLink>
            )}
            {!token ? (
              <NavLink to="/login" icon={LogIn}>
                Login
              </NavLink>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 p-2 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-all"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Logout</span>
              </button>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {userRole !== "admin" && (
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-gray-800 rounded-lg transition-all duration-300 group"
              >
                <div className="relative">
                  <ShoppingCart className="h-6 w-6 text-gray-300 group-hover:text-blue-400 transition-colors" />
                  {cartLength > 0 && (
                    <span className="absolute -top-2 -right-2 px-2 py-0.5 text-xs font-bold bg-red-500 text-white rounded-full transform scale-100 hover:scale-110 transition-transform shadow-sm">
                      {cartLength}
                    </span>
                  )}
                </div>
              </button>
            )}

            <button
              onClick={handleMenuClick}
              className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-7 w-7 text-gray-300" />
              ) : (
                <Menu className="h-7 w-7 text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="mobile-menu-container md:hidden mt-4 bg-gray-800 backdrop-blur-lg rounded-xl p-4 shadow-2xl border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col space-y-3">
              <NavLink to="/" icon={Home}>
                Home
              </NavLink>
              <NavLink to="/products" icon={Package}>
                Products
              </NavLink>
              <NavLink to="/dashboard" icon={Settings}>
                Dashboard
              </NavLink>
              {userRole === "user" && (
                <NavLink to="/orders" icon={ClipboardList}>
                  Orders
                </NavLink>
              )}
              {userRole === "admin" && (
                <NavLink to="/admin" icon={Settings}>
                  Admin
                </NavLink>
              )}
              {!token ? (
                <NavLink to="/login" icon={LogIn}>
                  Login
                </NavLink>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 p-2 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-all"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;