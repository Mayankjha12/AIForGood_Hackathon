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

    // Voice Recording Logic
    const startVoiceRecording = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return;
        const recognition = new SpeechRecognition();
        recognition.lang = voiceLangCodes[currentLang] || voiceLangCodes.en;
        recognition.onstart = () => setIsRecording(true);
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setVoiceOutput(transcript);
            setFormData(prev => ({ ...prev, currentProblem: transcript }));
        };
        recognition.onend = () => setIsRecording(false);
        recognition.start();
    };

    // Location Detect Logic
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
                () => alert("Please grant GPS permission.")
            );
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const backendURL = 'https://kisan-sakhi-new.onrender.com';
        try {
            const response = await axios.post(`${backendURL}/api/farms/submit`, {
                ...formData,
                voiceTranscript: voiceOutput,
                dateSubmitted: new Date().toISOString()
            });

            if (response.data.success) {
                setIsChatLoading(true);
                const aiRes = await axios.post(`${backendURL}/api/ai/chat`, {
                    prompt: "Provide technical agricultural advice for this submission.",
                    farmData: { ...formData, healthScore: response.data.score }
                });
                setChatReply(aiRes.data.reply);
                setIsChatOpen(true);
                setIsChatLoading(false);
            }
        } catch (error) {
            alert("Submission error. Check server.");
        }
    };

    return (
        <section className="py-12 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-center text-4xl font-bold text-green-600 mb-8">{langData.formHeading}</h2>
                <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col lg:flex-row gap-8">
                    
                    {/* Left Panel: Voice & Language */}
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

                    {/* Right Panel: Form Inputs */}
                    <div className="flex-1 p-2">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <FormInputs langData={langData} setFormData={setFormData} formData={formData} onLocationDetect={handleLocationDetect} />
                            <button type="submit" className="w-full py-4 bg-green-600 text-white font-bold rounded-2xl shadow-xl hover:bg-green-700">
                                {isChatLoading ? 'Analyzing...' : langData.submitBtn}
                            </button>
                        </form>
                    </div>
                </div>

                {/* PREMIUM CHATBOT UI */}
                {isChatOpen && (
                    <div className="fixed bottom-10 right-10 w-96 bg-white shadow-2xl rounded-3xl p-6 border-t-8 border-green-600 z-50">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-bold text-gray-800 flex items-center gap-2">
                                <i className="fa-solid fa-robot text-green-600"></i> KrishiSakhi AI Expert
                            </h4>
                            <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-red-500">✖</button>
                        </div>
                        <p className="text-sm italic bg-gray-50 p-4 rounded-2xl border">"{chatReply}"</p>
                        <div className="mt-4 text-center">
                            <a href="/myfarm" className="text-xs font-bold text-green-600 hover:underline">View Farm History tracking →</a>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FormSection;
