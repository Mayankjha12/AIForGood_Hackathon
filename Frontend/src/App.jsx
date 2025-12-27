import React, { useState, useCallback } from 'react';
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

const supportedLangs = Object.keys(translations);

function App() {
    const [currentLang, setCurrentLang] = useState('en');
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState('home'); 

    const handleLanguageChange = useCallback((newLang) => {
        if (supportedLangs.includes(newLang)) {
            setCurrentLang(newLang);
            document.documentElement.lang = newLang;
        }
    }, []);

    const navigateToResults = () => {
        setCurrentPage('results');
        setIsFormVisible(false);
    };

    const langData = translations[currentLang] || translations.en;

    // Smooth scroll + scroll-margin-top fix
    const handleNavigate = (page) => {
        setCurrentPage(page);
        const element = document.getElementById(page);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const renderPage = () => {
        const pageWrapperClass = "pt-28 scroll-mt-28"; // navbar height ke hisab se padding top

        switch(currentPage) {
            case 'my-farm': 
                return <div id="my-farm" className={pageWrapperClass}><MyFarm langData={langData} /></div>;
            case 'todo': 
                return <div id="todo" className={pageWrapperClass}><ToDoList langData={langData} /></div>;
            case 'trend': 
                return <div id="trend" className={pageWrapperClass}><LocalTrend langData={langData} /></div>;
            case 'feedback': 
                return <div id="feedback" className={pageWrapperClass}><Feedback langData={langData} /></div>;
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
        <div className="min-h-screen flex flex-col font-lato text-gray-800">
            {/* Fixed navbar with backdrop blur */}
            <Header 
                langData={langData} 
                currentLang={currentLang}
                onLangChange={handleLanguageChange}
                onNavigate={handleNavigate}
                currentPage={currentPage}
            />
            <main className="flex-grow">
                {renderPage()}
            </main>
            <Footer langData={langData} />
        </div>
    );
}

export default App;
