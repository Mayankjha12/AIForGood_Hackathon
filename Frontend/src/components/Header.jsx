import React from "react";
import { Leaf, Globe, ChevronDown, User, LogOut } from 'lucide-react';

const Header = ({ langData, currentLang, onLangChange, onNavigate, currentPage, userName }) => {
  
  const navItemClass = (page) =>
    `px-6 py-3 rounded-full font-black text-sm uppercase tracking-tighter transition-all duration-300
     ${currentPage === page ? "bg-green-600 text-white shadow-lg" : "text-gray-500 hover:bg-green-50 hover:text-green-700"}`;

  return (
    <header className="fixed top-0 w-full z-[100] h-28 flex items-center px-4">
      <nav className="flex justify-between items-center w-full max-w-7xl mx-auto px-8 py-4 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/50">
        
        {/* BRANDING */}
        <div onClick={() => onNavigate("home")} className="flex items-center gap-4 cursor-pointer group">
          <div className="bg-green-600 p-3 rounded-2xl shadow-xl group-hover:rotate-12 transition-transform duration-500">
            <Leaf className="text-white" size={28} fill="white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-green-700 uppercase tracking-tighter leading-none italic">KrishiSakhi</h1>
            <div className="flex items-center gap-1 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{userName}</p>
            </div>
          </div>
        </div>

        {/* NAV LINKS */}
        <ul className="hidden lg:flex items-center gap-2">
          <li><button onClick={() => onNavigate("home")} className={navItemClass("home")}>Home</button></li>
          <li><button onClick={() => onNavigate("my-farm")} className={navItemClass("my-farm")}>My Farm</button></li>
          <li><button onClick={() => onNavigate("feedback")} className={navItemClass("feedback")}>Feedback</button></li>
        </ul>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600 pointer-events-none" size={16} />
            <select
              className="appearance-none bg-green-50 border-2 border-green-100 rounded-full pl-10 pr-10 py-3 text-xs font-black text-green-800 outline-none focus:ring-4 focus:ring-green-100 cursor-pointer shadow-inner uppercase tracking-widest"
              value={currentLang}
              onChange={(e) => onLangChange(e.target.value)}
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="pa">ਪੰਜਾਬੀ</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600 pointer-events-none" size={12} />
          </div>

          <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-white shadow-xl cursor-pointer hover:scale-110 transition-all">
            <User size={20} />
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;