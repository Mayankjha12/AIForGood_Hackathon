// Header.jsx
import React from "react";

// Native scripts for all supported languages (Judges' requirement)
const languageMap = {
  en: "English",
  hi: "हिन्दी (Hindi)",
  pa: "ਪੰਜਾਬੀ (Punjabi)",
  mr: "मराठी (Marathi)",
  gu: "ગુજરાતી (Gujarati)",
  bn: "বাংলা (Bengali)",
  ta: "தமிழ் (Tamil)",
  te: "తెలుగు (Telugu)",
  kn: "ಕನ್ನಡ (Kannada)",
  ml: "മലയാളം (Malayalam)",
  or: "ଓଡ଼ିଆ (Odia)",
  as: "অসমীয়া (Assamese)",
  ur: "اردو (Urdu)",
  sd: "سنڌي (Sindhi)",
  sa: "संस्कृतम् (Sanskrit)",
  ks: "کٲشُر (Kashmiri)",
  kok: "कोंकणी (Konkani)",
  mai: "मैथिली (Maithili)",
  ne: "नेपाली (Nepali)",
};

const allLangCodes = Object.keys(languageMap);

const Header = ({ langData, currentLang, onLangChange, onNavigate, currentPage }) => {
  
  const handleNavClick = (e, page) => {
    e.preventDefault();
    onNavigate(page);
  };

  const navItemClass = (page) =>
    `px-4 py-2 rounded-full font-bold transition-all duration-300 text-sm
     ${
       currentPage === page
         ? "text-green-700 bg-green-100 shadow-sm"
         : "text-gray-600 hover:text-green-700 hover:bg-green-50"
     }`;

  return (
    <header className="fixed top-0 w-full z-50 h-24 flex items-center">
      <nav
        className="flex justify-between items-center w-full
                   max-w-6xl mx-auto px-6 py-3
                   bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-green-50"
      >
        {/* LOGO SECTION */}
        <div
          onClick={(e) => handleNavClick(e, "home")}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="bg-green-600 p-2 rounded-xl group-hover:rotate-12 transition-transform">
            <i className="fa-solid fa-leaf text-xl text-white"></i>
          </div>
          <h1 className="text-xl font-black text-green-700 tracking-tight">
            KrishiSakhi
          </h1>
        </div>

        {/* NAVIGATION LINKS (Desktop) */}
        <ul className="hidden lg:flex items-center gap-1">
          <li><button onClick={(e) => handleNavClick(e, "home")} className={navItemClass("home")}>{langData.home}</button></li>
          <li><button onClick={(e) => handleNavClick(e, "my-farm")} className={navItemClass("my-farm")}>{langData.myFarm}</button></li>
          <li><button onClick={(e) => handleNavClick(e, "todo")} className={navItemClass("todo")}>{langData.todo}</button></li>
          <li><button onClick={(e) => handleNavClick(e, "trend")} className={navItemClass("trend")}>{langData.trend}</button></li>
          <li><button onClick={(e) => handleNavClick(e, "feedback")} className={navItemClass("feedback")}>{langData.feedback}</button></li>
        </ul>

        {/* LANGUAGE SELECTOR */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <i className="fa-solid fa-globe absolute left-3 top-1/2 -translate-y-1/2 text-green-600 pointer-events-none text-xs"></i>
            <select
              className="appearance-none border border-green-100 bg-green-50/50 rounded-full pl-9 pr-8 py-2 text-xs font-bold text-green-800 outline-none focus:ring-2 focus:ring-green-500 cursor-pointer shadow-inner min-w-[150px]"
              value={currentLang}
              onChange={(e) => onLangChange(e.target.value)}
            >
              {allLangCodes.map(lang => (
                <option key={lang} value={lang} className="text-gray-800 bg-white">
                  {languageMap[lang]}
                </option>
              ))}
            </select>
            <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-green-600 pointer-events-none text-[10px]"></i>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;