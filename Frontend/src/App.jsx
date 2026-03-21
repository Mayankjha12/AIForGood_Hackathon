import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FormSection from './components/FormSection';
import Footer from './components/Footer';
import ChatbotResult from './components/ChatbotResult';

// Naye components
import MyFarm from './components/MyFarm';
import ToDoList from './components/ToDoList';
import LocalTrend from './components/LocalTrend';
import Feedback from './components/Feedback';
import { translations } from './data/translations';

// FACE AUTH COMPONENTS (Abhi jo humne banaye)
import FaceAuthLogin from './components/FaceAuthLogin';
import FaceRegister from './components/FaceRegister';

const supportedLangs = Object.keys(translations);

function App() {
    // 1. Auth States
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null); // Kisan ka naam yahan store hoga
    const [showRegister, setShowRegister] = useState(false);

    // 2. App flow states
    const [currentLang, setCurrentLang] = useState('en');
    const [currentPage, setCurrentPage] = useState('home');
    const [isFormVisible, setIsFormVisible] = useState(false);

    const langData = translations[currentLang] || translations.en;

    const handleLanguageChange = useCallback((newLang) => {
        if (supportedLangs.includes(newLang)) {
            setCurrentLang(newLang);
            document.documentElement.lang = newLang;
        }
    }, []);

    // 3. Login/Register Success Handlers
    const handleAuthSuccess = (userName) => {
        setUser(userName);
        setIsLoggedIn(true);
        setCurrentPage('home');
    };

    const navigateToResults = () => {
        setCurrentPage('results');
        setIsFormVisible(false);
    };

    const handleNavigate = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // 4. Main Rendering Logic
    const renderPage = () => {
        const pageWrapperClass = "pt-28 scroll-mt-28";

        // Agar user login nahi hai, toh sirf Auth Screen dikhao
        if (!isLoggedIn) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
                    <div className="max-w-md w-full">
                        {showRegister ? (
                            <FaceRegister 
                                onSuccess={handleAuthSuccess} 
                                onCancel={() => setShowRegister(false)} 
                            />
                        ) : (
                            <div className="space-y-6">
                                <FaceAuthLogin 
                                    onSuccess={handleAuthSuccess} 
                                    onCancel={() => {}} // Yahan exit logic daal sakte ho
                                />
                                <button 
                                    onClick={() => setShowRegister(true)}
                                    className="w-full text-indigo-600 font-black uppercase tracking-widest text-sm hover:underline"
                                >
                                    Naye Kisan ho? Register Karo
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        // Agar login hai, toh purana switch case
        switch(currentPage) {
            case 'my-farm': 
                return <div id="my-farm" className={pageWrapperClass}><MyFarm langData={langData} userName={user} /></div>;
            case 'todo': 
                return <div id="todo" className={pageWrapperClass}><ToDoList langData={langData} /></div>;
            case 'trend': 
                return <div id="trend" className={pageWrapperClass}><LocalTrend langData={langData} /></div>;
            case 'feedback': 
                return <div id="feedback" className={pageWrapperClass}><Feedback userName={user} currentLang={currentLang} /></div>;
            case 'results': 
                return <div className={pageWrapperClass}><ChatbotResult langData={langData} /></div>;
            default: // Home Page
                return (
                    <>
                        <Hero 
                            langData={langData}
                            onShowForm={() => {
                                setIsFormVisible(true);
                                setTimeout(() => {
                                    document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
                                }, 100);
                            }}
                        />
                        {isFormVisible && (
                            <div id="form-section" className={pageWrapperClass}>
                                <FormSection 
                                    langData={langData} 
                                    currentLang={currentLang}
                                    onLangChange={handleLanguageChange}
                                    onFormSubmitSuccess={navigateToResults}
                                />
                            </div>
                        )}
                    </>
                );
        }
    };

    return (
        <div className="min-h-screen flex flex-col font-lato text-gray-800 bg-white">
            {/* Header tabhi dikhao jab login ho */}
            {isLoggedIn && (
                <Header 
                    langData={langData} 
                    currentLang={currentLang}
                    onLangChange={handleLanguageChange}
                    onNavigate={handleNavigate}
                    currentPage={currentPage}
                    userName={user}
                />
            )}
            
            <main className="flex-grow">
                {renderPage()}
            </main>

            {isLoggedIn && <Footer langData={langData} />}
        </div>
    );
}

export default App;