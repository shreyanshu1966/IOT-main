// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { 
//   Folder, 
//   ChevronRight, 
//   Tag,
//   Search,
//   X 
// } from 'lucide-react';
// const apiUrl = import.meta.env.VITE_API_URL;

// const ProductPage = () => {
//   const [categories, setCategories] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get(`${apiUrl}/api/admin/categories`);
//         // Filter categories to only include those with isSubcategory: false
//         const mainCategories = response.data.filter(category => !category.isSubcategory);
//         setCategories(mainCategories);
//       } catch (error) {
//         console.error('Failed to fetch categories', error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleCategoryClick = (categoryId) => {
//     navigate(`/category/${categoryId}`);
//   };

//   const filteredCategories = categories.filter(category => 
//     category.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-4xl font-extrabold mb-10 text-gray-800 flex items-center">
//           <Folder className="mr-4 text-blue-600" size={40} />
//           Product Categories
//         </h1>
        
//         {/* Search Input */}
//         <div className="mb-6 relative">
//           <input 
//             type="text" 
//             placeholder="Search categories..." 
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full p-3 pl-10 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//           {searchTerm && (
//             <X 
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600" 
//               size={20} 
//               onClick={() => setSearchTerm('')}
//             />
//           )}
//         </div>
        
//         {filteredCategories.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {filteredCategories.map(category => (
//               <div
//                 key={category._id}
//                 className={`
//                   transform transition-all duration-300 
//                   bg-white rounded-xl shadow-lg 
//                   hover:shadow-2xl hover:-translate-y-2
//                   border border-gray-100
//                   cursor-pointer
//                 `}
//                 onClick={() => handleCategoryClick(category._id)}
//               >
//                 <div className="p-6">
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className="text-xl font-bold text-gray-800 flex items-center">
//                       <Tag className="mr-2 text-blue-500" size={20} />
//                       {category.name}
//                     </h3>
//                     <ChevronRight className="text-gray-400" size={20} />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center text-gray-500 py-10">
//             No categories found matching your search.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductPage;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Folder, 
  ChevronRight, 
  Tag,
  Search,
  X 
} from 'lucide-react';
const apiUrl = import.meta.env.VITE_API_URL;

const ProductPage = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/admin/categories`);
        const mainCategories = response.data.filter(category => !category.isSubcategory);
        setCategories(mainCategories);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center space-x-4 mb-12 group">
          <div className="p-3 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl shadow-2xl transform transition-all duration-300 group-hover:rotate-12">
            <Folder className="text-white" size={40} />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
            Product Categories
          </h1>
        </div>

        {/* Search Input */}
        <div className="mb-12 relative max-w-2xl mx-auto">
          <div className="relative backdrop-blur-lg bg-gray-800/30 rounded-xl p-1 border border-gray-700 hover:border-blue-500 transition-all duration-300">
            <input 
              type="text" 
              placeholder="Search categories..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent p-4 pl-14 pr-14 text-gray-300 placeholder-gray-500 focus:outline-none rounded-lg"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-400" size={20} />
            {searchTerm && (
              <X 
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-blue-400 transition-colors" 
                size={20} 
                onClick={() => setSearchTerm('')}
              />
            )}
          </div>
        </div>

        {/* Categories Grid */}
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCategories.map(category => (
              <div
                key={category._id}
                className={`
                  relative overflow-hidden
                  backdrop-blur-lg bg-gray-800/30
                  rounded-2xl border border-gray-700
                  transform transition-all duration-300
                  hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500
                  cursor-pointer group
                `}
                onClick={() => handleCategoryClick(category._id)}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Tag className="text-blue-400" size={20} />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-200">
                        {category.name}
                      </h3>
                    </div>
                    <ChevronRight className="text-blue-400 transform transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 backdrop-blur-lg bg-gray-800/30 rounded-xl border border-gray-700">
            <p className="text-gray-400 text-lg">No categories found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;