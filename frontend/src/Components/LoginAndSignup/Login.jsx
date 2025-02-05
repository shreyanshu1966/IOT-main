// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// const apiUrl = import.meta.env.VITE_API_URL;

// const Login = ({ setToken }) => {
//   const [identifier, setIdentifier] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${apiUrl}/api/auth/login`, { identifier, password });
//       setToken(response.data.token);
//       navigate('/');
//     } catch (err) {
//       setError('Invalid credentials');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <h2 className="text-2xl font-bold mb-4">Login</h2>
//       {error && <p className="text-red-500">{error}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-gray-700">Username or Email</label>
//           <input
//             type="text"
//             value={identifier}
//             onChange={(e) => setIdentifier(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg"
//           />
//         </div>
//         <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg">Login</button>
//       </form>
//       <div className="mt-4 text-center">
//         <p>
//           Forgot your password? <Link to="/forgot-password" className="text-blue-500">Reset it here</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';

const apiUrl = import.meta.env.VITE_API_URL;

const Login = ({ setToken }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.post(`${apiUrl}/api/auth/login`, { identifier, password });
      setToken(response.data.token);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-space-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-scale-in">
        <div className="backdrop-blur-xl bg-gray-900/50 rounded-2xl border border-gray-700 shadow-2xl p-8 space-y-6 hover:shadow-blue-500/10 transition-all duration-300">
          {/* Header */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-400">Continue your journey with us</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-gradient-to-r from-red-600/30 to-pink-600/30 p-4 rounded-xl flex items-center gap-3 border border-red-500/30 animate-fade-in">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <span className="text-red-300">{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl transform opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-0 placeholder-gray-500 text-gray-200 transition-all"
                    placeholder="Email or Username"
                    required
                  />
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl transform opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-0 placeholder-gray-500 text-gray-200 transition-all"
                    placeholder="Password"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-600 bg-gray-800/50 checked:bg-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-400">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-blue-400 hover:text-purple-400 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-4 rounded-xl font-medium transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/20"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                  Authenticating...
                </>
              ) : (
                'Access System'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center pt-4 border-t border-gray-800">
            <p className="text-gray-400">
              New here?{' '}
              <Link
                to="/Signup"
                className="font-medium text-blue-400 hover:text-purple-400 transition-colors"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;