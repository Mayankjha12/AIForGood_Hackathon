import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-gray-100 py-8 px-6">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand Section */}
        <div>
          <h2 className="text-white text-3xl font-bold mb-4 tracking-wide">
            KrishiSakhi
          </h2>
          <p className="text-sm text-gray-200 leading-relaxed">
            Delivering modern digital solutions with innovation to solve farm problems
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-white font-semibold mb-5 uppercase tracking-widest text-sm">
            Company
          </h3>
          <ul className="space-y-2 text-gray-100">
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/services" className="hover:text-white">Services</a></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-white font-semibold mb-4 uppercase tracking-widest text-sm">
            Support
          </h3>
          <ul className="space-y-2 text-gray-100">
            <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
            <li className="text-gray-200"> 91-923XXXXXXX</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto border-t border-green-300/30 mt-6 pt-4 text-sm text-gray-100">
        <div className="flex flex-col items-center gap-3">

          {/* Social Icons - FIXED href="#" issue for Netlify */}
          <div className="flex gap-6 text-xl">
            <a href="/" aria-label="Facebook" className="hover:text-white transition">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="/" aria-label="X (Twitter)" className="hover:text-white transition">
              <i className="fa-brands fa-x-twitter"></i>
            </a>
            <a href="/" aria-label="Instagram" className="hover:text-white transition">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>

          {/* Copyright */}
          <p className="text-center">
            © {currentYear} KrishiSakhi. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
