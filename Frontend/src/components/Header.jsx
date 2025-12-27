// Header.jsx
import React from "react";

const languageMap = {
  en: "English", hi: "Hindi", pa: "Punjabi", mr: "Marathi", gu: "Gujarati",
  bn: "Bengali", ta: "Tamil", te: "Telugu", kn: "Kannada", ml: "Malayalam",
  or: "Odia", as: "Assamese", ur: "Urdu", sd: "Sindhi", sa: "Sanskrit",
  ks: "Kashmiri", kok: "Konkani", mai: "Maithili", ne: "Nepali",
};

const allLangCodes = Object.keys(languageMap);

const Header = ({ langData, currentLang, onLangChange, onNavigate, currentPage }) => {
  const handleNavClick = (e, page) => {
    e.preventDefault();
    onNavigate(page);
  };

  const navItemClass = (page) =>
    `px-4 py-2 rounded-full font-medium transition-all duration-300
     ${
       currentPage === page
         ? "text-green-700 bg-green-100"
         : "text-gray-700 hover:text-green-700 hover:bg-green-50"
     }`;

  return (
    <header className="fixed top-0 w-full z-50 h-20">
      <nav
        className="flex justify-between items-center
                   max-w-6xl mx-auto px-8 py-4
                   bg-white rounded-full shadow-xl mt-4"
      >
        {/* LOGO */}
        <div
          onClick={(e) => handleNavClick(e, "home")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <i className="fa-solid fa-leaf text-3xl text-green-600"></i>
          <h1 className="text-xl font-semibold text-green-700">
            KrishiSakhi
          </h1>
        </div>

        {/* NAV LINKS */}
        <ul className="hidden lg:flex items-center gap-3">
          <li><button onClick={(e) => handleNavClick(e, "home")} className={navItemClass("home")}>{langData.home}</button></li>
          <li><button onClick={(e) => handleNavClick(e, "my-farm")} className={navItemClass("my-farm")}>{langData.myFarm}</button></li>
          <li><button onClick={(e) => handleNavClick(e, "todo")} className={navItemClass("todo")}>{langData.todo}</button></li>
          <li><button onClick={(e) => handleNavClick(e, "trend")} className={navItemClass("trend")}>{langData.trend}</button></li>
          <li><button onClick={(e) => handleNavClick(e, "feedback")} className={navItemClass("feedback")}>{langData.feedback}</button></li>
        </ul>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          <select
            className="border border-gray-300 rounded-full px-4 py-2 text-sm"
            value={currentLang}
            onChange={(e) => onLangChange(e.target.value)}
          >
            {allLangCodes.map(lang => (
              <option key={lang} value={lang}>{languageMap[lang]}</option>
            ))}
          </select>
        </div>
      </nav>
    </header>
  );
};

export default Header;
