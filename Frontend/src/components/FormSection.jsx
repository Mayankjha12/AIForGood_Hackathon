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
    const [voiceOutput, setVoiceOutput] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatReply, setChatReply] = useState("");
    const [isChatLoading, setIsChatLoading] = useState(false);

    const voiceLangCodes = {
        'en': 'en-IN', 'hi': 'hi-IN', 'pa': 'pa-IN', 'mr': 'mr-IN', 'gu': 'gu-IN', 'bn': 'bn-IN', 'ta': 'ta-IN', 'te': 'te-IN',
        'kn': 'kn-IN', 'ml': 'ml-IN', 'or': 'or-IN', 'as': 'as-IN', 'ur': 'ur-IN', 'sd': 'sd-IN', 'sa': 'sa-IN', 'ks': 'ks-IN',
        'kok': 'kok-IN', 'mai': 'mai-IN', 'ne': 'ne-IN'
    };

    const startVoiceRecording = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return;
        const recognition = new SpeechRecognition();
        recognition.lang = voiceLangCodes[currentLang] || 'en-IN';
        recognition.onstart = () => setIsRecording(true);
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setVoiceOutput(transcript);
            setFormData(prev => ({ ...prev, currentProblem: transcript }));
        };
        recognition.onend = () => setIsRecording(false);
        recognition.start();
    };

    const handleLocationDetect = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (pos) => {
                const { latitude, longitude } = pos.coords;
                try {
                    const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    setFormData(prev => ({ ...prev, location: `${res.data.address.city || res.data.address.town}, ${res.data.address.state}` }));
                } catch (e) { setFormData(prev => ({ ...prev, location: `Lat: ${latitude.toFixed(2)}` })); }
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsChatLoading(true); // Button pe loading start
        const backendURL = 'https://kisan-sakhi-new.onrender.com';
        
        try {
            // STEP 1: Pehle data save karo
            const response = await axios.post(`${backendURL}/api/farms/submit`, formData);

            if (response.data.success) {
                // STEP 2: AI se report lo - 30 seconds tak wait karenge [IMPORTANT CHANGE]
                try {
                    const aiRes = await axios.post(`${backendURL}/api/ai/chat`, {
                        prompt: "Technical agricultural advice for: " + (formData.currentProblem || "general health"),
                        farmData: { ...formData, healthScore: response.data.score }
                    }, { timeout: 30000 }); // Intezaar badha diya taaki jawab khul sake

                    setChatReply(aiRes.data.reply);
                } catch (aiTimeout) {
                    // Agar 30s baad bhi na aaye
                    setChatReply("Data saved! Your report is being generated. Please check 'My Farm' history in 1 minute.");
                }
                setIsChatOpen(true);
            }
        } catch (error) {
            console.error("Submit Error:", error);
            alert("Submission error. Please ensure backend is live.");
        }
        setIsChatLoading(false); // Loading khatam
    };

    return (
        <section className="py-12 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-center text-4xl font-bold text-green-600 mb-8">{langData.formHeading}</h2>
                <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col lg:flex-row gap-8">
                    
                    {/* Voice Card */}
                    <div className="flex-1 p-8 rounded-2xl bg-green-50/50 border border-green-100 flex flex-col items-center">
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${isRecording ? 'bg-red-100 animate-pulse' : 'bg-green-100'}`}>
                            <i className={`fa-solid fa-microphone text-3xl ${isRecording ? 'text-red-500' : 'text-green-600'}`}></i>
                        </div>
                        <select className="p-3 border border-gray-200 rounded-xl w-full mb-4 shadow-sm" value={currentLang} onChange={(e) => onLangChange(e.target.value)}>
                            {Object.keys(languageMap).map(lang => (
                                <option key={lang} value={lang}>{languageMap[lang]}</option>
                            ))}
                        </select>
                        <button type="button" onClick={startVoiceRecording} className="px-8 py-3 rounded-full font-bold text-white bg-green-600 w-full hover:bg-green-700 transition">
                            {isRecording ? 'Listening...' : 'Start Voice Input'}
                        </button>
                        <div className="mt-6 p-4 bg-white border rounded-xl text-sm min-h-[80px] w-full italic text-gray-500">
                            {voiceOutput || "Your voice transcript will appear here..."}
                        </div>
                    </div>

                    {/* Form Inputs */}
                    <div className="flex-1 p-2">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <FormInputs langData={langData} setFormData={setFormData} formData={formData} onLocationDetect={handleLocationDetect} />
                            <button type="submit" disabled={isChatLoading} className="w-full py-4 bg-green-600 text-white font-bold rounded-2xl shadow-xl hover:bg-green-700 disabled:bg-gray-400">
                                {isChatLoading ? 'Analyzing & Saving Expert Advice...' : langData.submitBtn}
                            </button>
                        </form>
                    </div>
                </div>

                {/* AI Popup Box */}
                {isChatOpen && (
                    <div className="fixed bottom-10 right-10 w-96 bg-white shadow-2xl rounded-3xl p-6 border-t-8 border-green-600 z-50 animate-bounce-in">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-bold text-gray-800 flex items-center gap-2">
                                <i className="fa-solid fa-robot text-green-600"></i> KrishiSakhi AI Expert
                            </h4>
                            <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-red-500">✖</button>
                        </div>
                        <div className="max-h-60 overflow-y-auto pr-2">
                             <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{chatReply}</p>
                        </div>
                        <div className="mt-4 text-center border-t pt-2">
                            <a href="/myfarm" className="text-xs font-bold text-green-600 hover:underline">View History Tracking →</a>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FormSection;
