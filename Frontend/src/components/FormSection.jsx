import React, { useState } from 'react';
import axios from 'axios';
import FormInputs from './FormInputs';

const FormSection = ({ langData, currentLang, onLangChange }) => {
    const [formData, setFormData] = useState({});
    const [voiceOutput, setVoiceOutput] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatReply, setChatReply] = useState("");
    const [isChatLoading, setIsChatLoading] = useState(false);

    // --- VOICE INPUT FEATURE (Wapas Add Kar Diya) ---
    const startVoiceRecording = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Voice recognition not supported in this browser.");
            return;
        }
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-IN'; // Aap ise currentLang ke hisaab se badal sakte hain
        recognition.onstart = () => setIsRecording(true);
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setVoiceOutput(transcript);
            setFormData(prev => ({ ...prev, currentProblem: transcript }));
        };
        recognition.onend = () => setIsRecording(false);
        recognition.start();
    };

    // --- LOCATION FEATURE ---
    const handleLocationDetect = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (pos) => {
                const { latitude, longitude } = pos.coords;
                try {
                    const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    const city = res.data.address.city || res.data.address.town || res.data.address.village || "Unknown City";
                    const state = res.data.address.state || "Unknown State";
                    setFormData(prev => ({ ...prev, location: `${city}, ${state}` }));
                } catch (e) { 
                    setFormData(prev => ({ ...prev, location: `Lat: ${latitude.toFixed(2)}` })); 
                }
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsChatLoading(true);
        const backendURL = 'https://kisan-sakhi-new.onrender.com';
        
        try {
            const response = await axios.post(`${backendURL}/api/farms/submit`, formData);
            if (response.data.success) {
                try {
                    const aiRes = await axios.post(`${backendURL}/api/ai/chat`, {
                        prompt: "Technical advice for " + (formData.currentProblem || "crop health"),
                        farmData: { ...formData, healthScore: response.data.score }
                    }, { timeout: 30000 });
                    setChatReply(aiRes.data.reply);
                } catch (aiErr) {
                    setChatReply("Data saved! Analysis is loading in My Farm.");
                }
                setIsChatOpen(true);
            }
        } catch (error) {
            console.error("Submit Error:", error);
            alert("Backend error. Check if Render is live.");
        }
        setIsChatLoading(false);
    };

    return (
        <section className="py-12 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-center text-4xl font-bold text-green-600 mb-8">{langData.formHeading}</h2>
                <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col lg:flex-row gap-8">
                    
                    {/* Voice Card Section (Wapas Add Kar Diya) */}
                    <div className="flex-1 p-8 rounded-2xl bg-green-50/50 border border-green-100 flex flex-col items-center">
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${isRecording ? 'bg-red-100 animate-pulse' : 'bg-green-100'}`}>
                            <i className={`fa-solid fa-microphone text-3xl ${isRecording ? 'text-red-500' : 'text-green-600'}`}></i>
                        </div>
                        <button type="button" onClick={startVoiceRecording} className="px-8 py-3 rounded-full font-bold text-white bg-green-600 w-full hover:bg-green-700 transition">
                            {isRecording ? 'Listening...' : 'Start Voice Input'}
                        </button>
                        <div className="mt-6 p-4 bg-white border rounded-xl text-sm min-h-[80px] w-full italic text-gray-500">
                            {voiceOutput || "Your voice transcript will appear here..."}
                        </div>
                    </div>

                    {/* Form Inputs Section */}
                    <div className="flex-1 p-2">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <FormInputs 
                                langData={langData} 
                                setFormData={setFormData} 
                                formData={formData} 
                                onLocationDetect={handleLocationDetect} 
                            />
                            <button type="submit" disabled={isChatLoading} className="w-full py-4 bg-green-600 text-white font-bold rounded-2xl shadow-xl hover:bg-green-700 disabled:bg-gray-400">
                                {isChatLoading ? 'Analyzing & Saving...' : langData.submitBtn}
                            </button>
                        </form>
                    </div>
                </div>

                {/* AI Popup */}
                {isChatOpen && (
                    <div className="fixed bottom-10 right-10 w-80 md:w-96 bg-white shadow-2xl rounded-3xl p-6 border-t-8 border-green-600 z-50">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-bold text-gray-800 flex items-center gap-2">
                                <i className="fa-solid fa-robot text-green-600"></i> AI Expert Advice
                            </h4>
                            <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-red-500">✖</button>
                        </div>
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{chatReply}</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FormSection;
