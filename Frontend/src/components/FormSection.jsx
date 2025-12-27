import React, { useState } from 'react';
import axios from 'axios';
import FormInputs from './FormInputs';

const FormSection = ({ langData, currentLang, onLangChange }) => {
    const [formData, setFormData] = useState({});
    const [voiceOutput, setVoiceOutput] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatReply, setChatReply] = useState({ solution: "", predictions: [] });
    const [isChatLoading, setIsChatLoading] = useState(false);

    const handleLocationDetect = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (pos) => {
                const { latitude, longitude } = pos.coords;
                try {
                    const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    const city = res.data.address.city || res.data.address.town || "Unknown City";
                    setFormData(prev => ({ ...prev, location: `${city}, ${res.data.address.state || ""}` }));
                } catch (e) { setFormData(prev => ({ ...prev, location: `Lat: ${latitude.toFixed(2)}` })); }
            });
        }
    };

    const startVoiceRecording = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return;
        const recognition = new SpeechRecognition();
        recognition.onstart = () => setIsRecording(true);
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setVoiceOutput(transcript);
            setFormData(prev => ({ ...prev, currentProblem: transcript }));
        };
        recognition.onend = () => setIsRecording(false);
        recognition.start();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsChatLoading(true);
        const backendURL = 'https://kisan-sakhi-new.onrender.com';
        
        try {
            const response = await axios.post(`${backendURL}/api/farms/submit`, formData);
            if (response.data.success) {
                // Instant Expert Call
                const aiRes = await axios.post(`${backendURL}/api/ai/chat`, {
                    farmData: { ...formData, healthScore: response.data.score }
                });
                setChatReply(aiRes.data);
                setIsChatOpen(true);
            }
        } catch (error) { console.error("Error:", error); }
        setIsChatLoading(false);
    };

    return (
        <section className="py-12 bg-gray-50 min-h-screen font-lato">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-center text-4xl font-black text-green-600 mb-8">{langData.formHeading}</h2>
                <div className="bg-white p-8 rounded-[3rem] shadow-xl flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 p-8 rounded-3xl bg-green-50/50 flex flex-col items-center">
                        <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-inner ${isRecording ? 'bg-red-100 animate-pulse' : 'bg-green-100'}`}>
                            <i className={`fa-solid fa-microphone text-4xl ${isRecording ? 'text-red-500' : 'text-green-600'}`}></i>
                        </div>
                        <button type="button" onClick={startVoiceRecording} className="px-8 py-4 rounded-2xl font-black text-white bg-green-600 w-full hover:bg-green-700 shadow-lg transition">
                            {isRecording ? 'KrishiSakhi is listening...' : 'Start Voice Input'}
                        </button>
                        <p className="mt-6 text-sm italic text-gray-500 text-center">{voiceOutput || "Speak your farm problem here..."}</p>
                    </div>
                    
                    <div className="flex-1">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <FormInputs langData={langData} setFormData={setFormData} formData={formData} onLocationDetect={handleLocationDetect} />
                            <button type="submit" disabled={isChatLoading} className="w-full py-5 bg-green-600 text-white font-black text-lg rounded-[2rem] shadow-2xl hover:bg-green-700 transition disabled:bg-gray-400">
                                {isChatLoading ? 'Analyzing Soil & Health...' : langData.submitBtn}
                            </button>
                        </form>
                    </div>
                </div>

                {/* --- BIG SMART CHATBOT MODAL --- */}
                {isChatOpen && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[100] p-4">
                        <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
                            <div className="bg-green-600 p-8 text-white flex justify-between items-center border-b-8 border-green-700">
                                <div className="flex items-center gap-4">
                                    <i className="fa-solid fa-robot text-3xl"></i>
                                    <div>
                                        <h3 className="text-2xl font-black">KrishiSakhi Expert Analysis</h3>
                                        <p className="text-xs text-green-100 font-bold">Health Score: {chatReply.score}/100</p>
                                    </div>
                                </div>
                                <button onClick={() => setIsChatOpen(false)} className="text-white hover:rotate-90 transition text-2xl">✖</button>
                            </div>

                            <div className="p-8 space-y-8 overflow-y-auto max-h-[70vh]">
                                {/* 1. Crop Predictions Card */}
                                <div className="bg-green-50 p-6 rounded-[2rem] border border-green-100">
                                    <h4 className="text-green-800 font-black mb-4 flex items-center gap-2">
                                        <i className="fa-solid fa-seedling"></i> Top 3 Recommended Crops
                                    </h4>
                                    <div className="grid grid-cols-3 gap-3">
                                        {chatReply.predictions?.map((crop, i) => (
                                            <div key={i} className="bg-white p-3 rounded-xl shadow-sm text-center font-bold text-green-700 border border-green-200">
                                                {crop}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 2. Technical Solution */}
                                <div className="space-y-4">
                                    <h4 className="text-gray-800 font-black flex items-center gap-2">
                                        <i className="fa-solid fa-list-check text-green-600"></i> Expert Recommendation
                                    </h4>
                                    <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 text-gray-700 whitespace-pre-wrap leading-relaxed text-sm italic">
                                        {chatReply.solution}
                                    </div>
                                </div>

                                <button 
                                    onClick={() => window.location.href='/myfarm'}
                                    className="w-full py-5 bg-gray-900 text-white font-black rounded-[1.5rem] shadow-xl hover:bg-black transition flex items-center justify-center gap-2"
                                >
                                    <i className="fa-solid fa-chart-line"></i> Go to My Farm Dashboard
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
export default FormSection;
