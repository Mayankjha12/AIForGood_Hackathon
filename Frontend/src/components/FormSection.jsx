import React, { useState } from 'react';
import axios from 'axios';
import FormInputs from './FormInputs';

const languageMap = {
    "en": "English", "hi": "Hindi", "pa": "Punjabi", "mr": "Marathi", "gu": "Gujarati", 
    "bn": "Bengali", "ta": "Tamil", "te": "Telugu", "kn": "Kannada", "ml": "Malayalam", 
    "or": "Odia", "as": "Assamese", "ur": "Urdu", "sd": "Sindhi", "sa": "Sanskrit", 
    "ks": "Kashmiri", "kok": "Konkani", "mai": "Maithili", "ne": "Nepali"
};

const FormSection = ({ langData, currentLang, onLangChange }) => {
    const [formData, setFormData] = useState({});
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatReply, setChatReply] = useState("");
    const [isChatLoading, setIsChatLoading] = useState(false);

    // Location Auto-detect with English Alerts
    const handleLocationDetect = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const geoRes = await axios.get(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                        );
                        const address = geoRes.data.address;
                        const city = address.city || address.town || address.village || "Unknown City";
                        const state = address.state || "Unknown State";
                        setFormData(prev => ({ ...prev, location: `${city}, ${state}` }));
                    } catch (err) {
                        setFormData(prev => ({ ...prev, location: `Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}` }));
                    }
                },
                () => alert("Please grant GPS permission to detect your location.")
            );
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const backendURL = 'https://kisan-sakhi-new.onrender.com';
        
        try {
            const response = await axios.post(`${backendURL}/api/farms/submit`, {
                ...formData,
                dateSubmitted: new Date().toISOString()
            });

            if (response.data.success) {
                setIsChatLoading(true);
                try {
                    // Gemini AI call with trained English context
                    const aiRes = await axios.post(`${backendURL}/api/ai/chat`, {
                        prompt: "Technical agricultural advice for this submission.",
                        farmData: { ...formData, healthScore: response.data.score }
                    });
                    setChatReply(aiRes.data.reply);
                    setIsChatOpen(true);
                } catch (aiErr) {
                    console.error("AI Error:", aiErr);
                }
                setIsChatLoading(false);
            }
        } catch (error) {
            alert("Submission error. Please check your internet connection.");
        }
    };

    return (
        <section id="form-section" className="py-12 flex justify-center bg-gray-50 min-h-screen relative">
            <div className="w-full max-w-6xl px-4">
                <h2 className="text-center text-4xl font-bold text-green-600 mb-8">{langData.formHeading}</h2>
                <div className="flex flex-col lg:flex-row gap-8 shadow-xl rounded-3xl bg-white p-6 border border-gray-100">
                    <div className="flex-1 p-8 rounded-2xl bg-green-50/50 border border-green-100 flex flex-col items-center">
                        <select className="p-3 border border-gray-200 rounded-xl w-full mb-4 shadow-sm" value={currentLang} onChange={(e) => onLangChange(e.target.value)}>
                            {Object.keys(languageMap).map(lang => (
                                <option key={lang} value={lang}>{languageMap[lang]}</option>
                            ))}
                        </select>
                        <p className="text-sm text-gray-500 italic text-center mt-4">Location & voice systems ready. Please fill the details.</p>
                    </div>

                    <div className="flex-1 p-2">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <FormInputs langData={langData} setFormData={setFormData} formData={formData} onLocationDetect={handleLocationDetect} />
                            <button type="submit" className="w-full px-8 py-4 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 shadow-xl transition-all">
                                {isChatLoading ? 'Analyzing ML Data...' : langData.submitBtn}
                            </button>
                        </form>
                    </div>
                </div>

                {/* PREMIUM CHATBOT UI */}
                {isChatOpen && (
                    <div className="fixed bottom-10 right-10 w-96 bg-white shadow-2xl rounded-3xl p-6 border-t-8 border-green-600 z-50 transition-all duration-500">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-bold text-gray-800 flex items-center gap-2">
                                <i className="fa-solid fa-robot text-green-600"></i> KrishiSakhi AI Expert
                            </h4>
                            <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-red-500">✖</button>
                        </div>
                        <div className="max-h-60 overflow-y-auto pr-2">
                            <p className="text-sm text-gray-700 italic leading-relaxed font-medium bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                "{chatReply}"
                            </p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                            <a href="/myfarm" className="text-xs font-black text-green-600 hover:underline uppercase tracking-tighter">
                                View Full History Tracking →
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
export default FormSection;
