// import React from 'react';
// import { 
//   Phone,
//   Mail,
//   MapPin,
//   Linkedin,
//   Github,
//   Twitter,
//   ClipboardCheck,
//   Cpu,
//   Factory,
//   Cloud,
//   ArrowRight
// } from 'lucide-react';

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-gradient-to-t from-gray-900 to-gray-800 border-t border-gray-700">
//       <div className="container mx-auto px-4 py-12 lg:py-16">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
//           {/* Company Overview */}
//           <div className="space-y-4">
//             <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
//               Intuitive Robotics
//             </h3>
//             <p className="text-gray-400 text-sm leading-relaxed">
//               Pioneering AI, IoT, and Robotics solutions since 2022. Bridging cutting-edge technology with industrial applications for smarter, sustainable solutions.
//             </p>
//             <div className="flex space-x-4">
//               <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                 <Linkedin className="w-5 h-5" />
//               </a>
//               <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                 <Github className="w-5 h-5" />
//               </a>
//               <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                 <Twitter className="w-5 h-5" />
//               </a>
//             </div>
//           </div>

//           {/* Core Services */}
//           <div className="space-y-4">
//             <h3 className="text-xl font-bold text-white mb-4">Our Expertise</h3>
//             <ul className="space-y-3">
//               {[
//                 { icon: Cpu, text: 'AI-Powered Data Analytics' },
//                 { icon: Cloud, text: 'Industrial IoT Solutions' },
               
//                 { icon: Factory, text: 'Smart Manufacturing' },
//                 { icon: ClipboardCheck, text: 'Predictive Maintenance' }
//               ].map((item, index) => (
//                 <li key={index} className="flex items-start space-x-2 group">
//                   <item.icon className="w-4 h-4 mt-1 text-blue-400 flex-shrink-0" />
//                   <span className="text-gray-400 text-sm group-hover:text-white transition-colors">
//                     {item.text}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Quick Links */}
//           <div className="space-y-4">
//             <h3 className="text-xl font-bold text-white mb-4">Resources</h3>
//             <ul className="space-y-3">
//               {[
//                 { text: 'Terms & Conditions', url: '#' },
//                 { text: 'Privacy Policy', url: '#' },
//                 { text: 'Shipping Policy', url: '#' },
//                 { text: 'Refund Policy', url: '#' }
//               ].map((link, index) => (
//                 <li key={index}>
//                   <a 
//                     href={link.url} 
//                     className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group"
//                   >
//                     <ArrowRight className="w-4 h-4 mr-2 text-blue-400 group-hover:translate-x-1 transition-transform" />
//                     {link.text}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact Information */}
//           <div className="space-y-4">
//             <h3 className="text-xl font-bold text-white mb-4">Connect With Us</h3>
//             <div className="space-y-3">
//               <div className="flex items-start group">
//                 <MapPin className="w-5 h-5 mr-3 mt-1 text-blue-400 flex-shrink-0" />
//                 <p className="text-gray-400 text-sm">
//                   565, Natun Pally, Central Road<br/>
//                   Sonarpur, Kolkata-700150, W.B.
//                 </p>
//               </div>
//               <div className="flex items-center group">
//                 <Phone className="w-5 h-5 mr-3 text-blue-400" />
//                 <p className="text-gray-400 text-sm">+91 98049 55613</p>
//               </div>
//               <div className="flex items-center group">
//                 <Mail className="w-5 h-5 mr-3 text-blue-400" />
//                 <a href="mailto:research@intuitiverobotics.in" className="text-gray-400 text-sm hover:text-white">
//                   research@intuitiverobotics.in
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Copyright & Mission */}
//         <div className="border-t border-gray-800 pt-8 text-center">
//           <p className="text-sm text-gray-400 mb-2">
//             © {currentYear} Intuitive Robotics OPC Pvt. Ltd. All rights reserved.
//           </p>
//           <p className="text-xs text-gray-500">
//             Bridging Innovation with Industrial Applications - Creating Smarter Futures
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React from 'react';
import { 
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Github,
  Twitter,
  ClipboardCheck,
  Cpu,
  
  Factory,
  Cloud,
  ArrowRight
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-t from-gray-900 to-gray-800 border-t border-gray-700">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Company Overview */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Intuitive Robotics OPC Pvt. Ltd.
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Pioneering AI, IoT, and Robotics solutions since 2022. Bridging cutting-edge technology with industrial applications for smarter, sustainable solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Core Services */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Our Expertise</h3>
            <ul className="space-y-3">
              {[
                { icon: Cpu, text: 'AI-Powered Data Analytics' },
                { icon: Cloud, text: 'Industrial IoT Solutions' },
                { icon: Factory, text: 'Smart Manufacturing' },
                { icon: ClipboardCheck, text: 'Predictive Maintenance' }
              ].map((item, index) => (
                <li key={index} className="flex items-start space-x-2 group">
                  <item.icon className="w-4 h-4 mt-1 text-blue-400 flex-shrink-0" />
                  <span className="text-gray-400 text-sm group-hover:text-white transition-colors">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              {[
                { text: 'Terms & Conditions', url: 'https://merchant.razorpay.com/policy/PkxnLXQOaL587H/terms' },
                { text: 'Privacy Policy', url: 'https://merchant.razorpay.com/policy/PkxnLXQOaL587H/privacy' },
                { text: 'Shipping Policy', url: 'https://merchant.razorpay.com/policy/PkxnLXQOaL587H/shipping' },
                { text: 'Refund Policy', url: 'https://merchant.razorpay.com/policy/PkxnLXQOaL587H/refund' }
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url} 
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 text-blue-400 group-hover:translate-x-1 transition-transform" />
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Contact Details</h3>
            <div className="space-y-3">
              <div className="flex items-start group">
                <MapPin className="w-5 h-5 mr-3 mt-1 text-blue-400 flex-shrink-0" />
                <a 
                  href="https://goo.gl/maps/3Wp62rRqEE7wMEjA6" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 text-sm hover:text-white transition-colors"
                >
                  565, Natun Pally, Central Road<br/>
                  Purbapara, Sonarpur<br/>
                  Kolkata-700150, W.B.
                </a>
              </div>
              <div className="flex items-center group">
                <Phone className="w-5 h-5 mr-3 text-blue-400" />
                <div className="text-gray-400 text-sm">
                  <p>+91 94330 43040</p>
                </div>
              </div>
              <div className="flex items-center group">
                <Mail className="w-5 h-5 mr-3 text-blue-400" />
                <div className="text-gray-400 text-sm">
                  <a href="mailto:research@intuitiverobotics.in" className="hover:text-white block">
                    research@intuitiverobotics.in
                  </a>
                  <a href="mailto:intuitiveroboticsindia@gmail.com" className="hover:text-white block">
                    intuitiveroboticsindia@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Mission */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-400 mb-2">
            © {currentYear} Intuitive Robotics OPC Pvt. Ltd. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Bridging Innovation with Industrial Applications - Creating Smarter Futures
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;