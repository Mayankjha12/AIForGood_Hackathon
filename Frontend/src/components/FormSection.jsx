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

    // GPS Logic (No changes here)
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
                const aiRes = await axios.post(`${backendURL}/api/ai/chat`, {
                    prompt: "Provide technical agricultural advice for this submission in English.",
                    farmData: { ...formData, healthScore: response.data.score }
                });
                setChatReply(aiRes.data.reply);
                setIsChatOpen(true);
                setIsChatLoading(false);
            }
        } catch (error) { alert("Submission error. Check server."); }
    };

    return (
        <section className="py-12 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-center text-4xl font-bold text-green-600 mb-8">{langData.formHeading}</h2>
                <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 flex flex-col items-center border-r pr-8">
                        <select className="p-3 border rounded-xl w-full mb-4" value={currentLang} onChange={(e) => onLangChange(e.target.value)}>
                            {Object.keys(languageMap).map(lang => (<option key={lang} value={lang}>{languageMap[lang]}</option>))}
                        </select>
                        <p className="text-sm text-gray-500 italic text-center">Language selected: {languageMap[currentLang]}</p>
                    </div>
                    <div className="flex-1">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <FormInputs langData={langData} setFormData={setFormData} formData={formData} onLocationDetect={handleLocationDetect} />
                            <button type="submit" className="w-full py-4 bg-green-600 text-white font-bold rounded-2xl">
                                {isChatLoading ? 'Analyzing...' : langData.submitBtn}
                            </button>
                        </form>
                    </div>
                </div>
                {isChatOpen && (
                    <div className="fixed bottom-10 right-10 w-96 bg-white shadow-2xl rounded-3xl p-6 border-t-8 border-green-600 z-50">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-bold">AI Technical Advice</h4>
                            <button onClick={() => setIsChatOpen(false)}>✖</button>
                        </div>
                        <p className="text-sm italic">"{chatReply}"</p>
                    </div>
                )}
            </div>
        </section>
    );
};
export default FormSection;
