// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// const apiUrl = import.meta.env.VITE_API_URL;

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     address: '',
//     username: '',
//     password: '',
//     phone: '',
//     agreedTerms: false,
//     agreedRefund: false,
//     agreedShipping: false,
//     agreedPrivacy: false
//   });
//   const [otp, setOtp] = useState('');
//   const [showOtpInput, setShowOtpInput] = useState(false);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [notification, setNotification] = useState('');
//   const [agreedTerms, setAgreedTerms] = useState(false);
//   const [agreedRefund, setAgreedRefund] = useState(false);
//   const [agreedShipping, setAgreedShipping] = useState(false);
//   const [agreedPrivacy, setAgreedPrivacy] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);

//     // Validate agreements
//     if (!formData.agreedTerms || !formData.agreedRefund || 
//         !formData.agreedShipping || !formData.agreedPrivacy) {
//       setError('You must agree to all terms and policies');
//       setIsLoading(false);
//       return;
//     }

//     // Client-side validation
//     if (!formData.name || !formData.email || !formData.address || 
//         !formData.username || !formData.password || !formData.phone) {
//       setError('All fields are required');
//       setIsLoading(false);
//       return;
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       setError('Invalid email format');
//       setIsLoading(false);
//       return;
//     }

//     // Username validation
//     const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
//     if (!usernameRegex.test(formData.username)) {
//       setError('Username must be 3-16 characters long and can only contain letters, numbers, and underscores');
//       setIsLoading(false);
//       return;
//     }

//     // Phone validation
//     const phoneRegex = /^[0-9]{10}$/;
//     if (!phoneRegex.test(formData.phone)) {
//       setError('Phone number must be 10 digits');
//       setIsLoading(false);
//       return;
//     }

//     try {
//       if (!showOtpInput) {
//         const response = await axios.post(
//           `${apiUrl}/api/auth/signup`, 
//           formData
//         );
//         setShowOtpInput(true);
//         setNotification('OTP sent to your email');
//       } else {
//         await axios.post(`${apiUrl}/api/auth/verify-otp`, {
//           email: formData.email,
//           otp
//         });
//         navigate('/login');
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'Error creating account');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
//       {error && <p className="text-red-500">{error}</p>}
//       {notification && <p className="text-green-500">{notification}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {!showOtpInput ? (
//           <>
//             <div>
//               <label className="block text-gray-700">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700">Address</label>
//               <input
//                 type="text"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700">Username</label>
//               <input
//                 type="text"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700">Phone</label>
//               <input
//                 type="text"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg"
//               />
//             </div>
//             <div className="space-y-2">
//               <div>
//                 <input
//                   type="checkbox"
//                   checked={formData.agreedTerms}
//                   onChange={(e) => setFormData(prev => ({
//                     ...prev,
//                     agreedTerms: e.target.checked
//                   }))}
//                   className="mr-2"
//                 />
//                 <label className="text-gray-700">
//                   I agree to the 
//                   <a href="https://merchant.razorpay.com/policy/PkxnLXQOaL587H/terms" 
//                     className="text-blue-500 ml-1"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     Terms and Conditions
//                   </a>
//                 </label>
//               </div>

//               <div>
//                 <input
//                   type="checkbox"
//                   checked={formData.agreedRefund}
//                   onChange={(e) => setFormData(prev => ({
//                     ...prev,
//                     agreedRefund: e.target.checked
//                   }))}
//                   className="mr-2"
//                 />
//                 <label className="text-gray-700">
//                   I agree to the 
//                   <a href="https://merchant.razorpay.com/policy/PkxnLXQOaL587H/refund"
//                     className="text-blue-500 ml-1"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     Cancellation and Refund Policy
//                   </a>
//                 </label>
//               </div>

//               <div>
//                 <input
//                   type="checkbox"
//                   checked={formData.agreedShipping}
//                   onChange={(e) => setFormData(prev => ({
//                     ...prev,
//                     agreedShipping: e.target.checked
//                   }))}
//                   className="mr-2"
//                 />
//                 <label className="text-gray-700">
//                   I agree to the 
//                   <a href="https://merchant.razorpay.com/policy/PkxnLXQOaL587H/shipping"
//                     className="text-blue-500 ml-1"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     Shipping and Delivery Policy
//                   </a>
//                 </label>
//               </div>

//               <div>
//                 <input
//                   type="checkbox"
//                   checked={formData.agreedPrivacy}
//                   onChange={(e) => setFormData(prev => ({
//                     ...prev,
//                     agreedPrivacy: e.target.checked
//                   }))}
//                   className="mr-2"
//                 />
//                 <label className="text-gray-700">
//                   I agree to the 
//                   <a href="https://merchant.razorpay.com/policy/PkxnLXQOaL587H/privacy"
//                     className="text-blue-500 ml-1" 
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     Privacy Policy
//                   </a>
//                 </label>
//               </div>
//             </div>
//           </>
//         ) : (
//           <div>
//             <label className="block text-gray-700">Enter OTP</label>
//             <input
//               type="text"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg"
//               required
//             />
//           </div>
//         )}
//         <button 
//           type="submit" 
//           className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg"
//           disabled={isLoading}
//         >
//           {isLoading ? 'Submitting...' : (showOtpInput ? 'Verify OTP' : 'Sign Up')}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Signup;







import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle2, XCircle, UserPlus, Mail, Phone, Home, Lock, User } from 'lucide-react';

const apiUrl = import.meta.env.VITE_API_URL;

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    username: '',
    password: '',
    phone: '',
    agreedTerms: false,
    agreedRefund: false,
    agreedShipping: false,
    agreedPrivacy: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(formData.password));
  }, [formData.password]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return 'bg-red-500';
      case 2:
      case 3:
        return 'bg-yellow-500';
      case 4:
      case 5:
        return 'bg-green-500';
      default:
        return 'bg-gray-200';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!formData.agreedTerms || !formData.agreedRefund || 
        !formData.agreedShipping || !formData.agreedPrivacy) {
      setError('You must agree to all terms and policies');
      setIsLoading(false);
      return;
    }

    if (!formData.name || !formData.email || !formData.address || 
        !formData.username || !formData.password || !formData.phone) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Invalid email format');
      setIsLoading(false);
      return;
    }

    const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
    if (!usernameRegex.test(formData.username)) {
      setError('Username must be 3-16 characters long and can only contain letters, numbers, and underscores');
      setIsLoading(false);
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError('Phone number must be 10 digits');
      setIsLoading(false);
      return;
    }

    try {
      if (!showOtpInput) {
        const response = await axios.post(`${apiUrl}/api/auth/signup`, formData);
        setShowOtpInput(true);
        setNotification('OTP sent to your email');
      } else {
        await axios.post(`${apiUrl}/api/auth/verify-otp`, {
          email: formData.email,
          otp
        });
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-space-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-2xl animate-fade-in">
        <div className="backdrop-blur-xl bg-gray-900/50 rounded-2xl border border-gray-700 shadow-2xl p-8 space-y-6 hover:shadow-blue-500/10 transition-all duration-300">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-block p-3 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl shadow-lg transform transition-transform duration-300 hover:rotate-12">
              <UserPlus className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
              Join Our Community
            </h1>
            <p className="text-gray-400">Create your account to get started</p>
          </div>

          {/* Notifications */}
          {error && (
            <div className="bg-gradient-to-r from-red-600/30 to-pink-600/30 p-4 rounded-xl flex items-center gap-3 border border-red-500/30 animate-fade-in">
              <XCircle className="w-5 h-5 text-red-400" />
              <span className="text-red-300">{error}</span>
            </div>
          )}

          {notification && (
            <div className="bg-gradient-to-r from-green-600/30 to-emerald-600/30 p-4 rounded-xl flex items-center gap-3 border border-green-500/30 animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span className="text-green-300">{notification}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {!showOtpInput ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                    <div className="relative">
                      <User className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-800/50 border border-gray-700 rounded-xl placeholder-gray-500 text-gray-200 focus:border-blue-500 focus:ring-0 transition-all"
                        placeholder="Full Name"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                    <div className="relative">
                      <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-800/50 border border-gray-700 rounded-xl placeholder-gray-500 text-gray-200 focus:border-blue-500 focus:ring-0 transition-all"
                        placeholder="Email Address"
                      />
                    </div>
                  </div>

                  {/* Address Input */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                    <div className="relative">
                      <Home className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-800/50 border border-gray-700 rounded-xl placeholder-gray-500 text-gray-200 focus:border-blue-500 focus:ring-0 transition-all"
                        placeholder="Street Address"
                      />
                    </div>
                  </div>

                  {/* Username Input */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                    <div className="relative">
                      <User className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-800/50 border border-gray-700 rounded-xl placeholder-gray-500 text-gray-200 focus:border-blue-500 focus:ring-0 transition-all"
                        placeholder="Username"
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                    <div className="relative">
                      <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full pl-12 pr-12 py-3.5 bg-gray-800/50 border border-gray-700 rounded-xl placeholder-gray-500 text-gray-200 focus:border-blue-500 focus:ring-0 transition-all"
                        placeholder="Password"
                      />
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-400"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    <div className="mt-3">
                      <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs mt-1 text-gray-400">
                        Password strength: {['None', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][passwordStrength]}
                      </p>
                    </div>
                  </div>

                  {/* Phone Input */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                    <div className="relative">
                      <Phone className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-800/50 border border-gray-700 rounded-xl placeholder-gray-500 text-gray-200 focus:border-blue-500 focus:ring-0 transition-all"
                        placeholder="Phone Number"
                      />
                    </div>
                  </div>
                </div>

                {/* Policies */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['agreedTerms', 'agreedRefund', 'agreedShipping', 'agreedPrivacy'].map((policy, index) => (
                    <label key={policy} className="flex items-start space-x-3 p-3 bg-gray-800/30 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors">
                      <div className="relative">
                        <input
                          type="checkbox"
                          name={policy}
                          checked={formData[policy]}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                          formData[policy] 
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-transparent'
                            : 'bg-gray-700 border border-gray-600'
                        }`}>
                          {formData[policy] && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">
                        I agree to {['Terms', 'Refund', 'Shipping', 'Privacy'][index]} Policy
                      </span>
                    </label>
                  ))}
                </div>
              </>
            ) : (
              /* OTP Input */
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                <div className="relative">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-6 py-3.5 bg-gray-800/50 border border-gray-700 rounded-xl placeholder-gray-500 text-gray-200 focus:border-blue-500 focus:ring-0 transition-all"
                    placeholder="Enter verification code"
                    required
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-4 rounded-xl font-medium transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/20"
            >
              {isLoading ? (
                <>
                  {/* <Loader2 className="w-5 h-5 animate-spin text-white" /> */}
                  {showOtpInput ? 'Verifying...' : 'Creating Account...'}
                </>
              ) : (
                showOtpInput ? 'Verify Identity' : 'Continue Registration'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;