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

    // --- 1. LOCATION FEATURE ---
    const handleLocationDetect = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (pos) => {
                const { latitude, longitude } = pos.coords;
                try {
                    const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    const city = res.data.address.city || res.data.address.town || res.data.address.village || "Unknown City";
                    const state = res.data.address.state || "";
                    setFormData(prev => ({ ...prev, location: `${city}${state ? ', ' + state : ''}` }));
                } catch (e) { 
                    setFormData(prev => ({ ...prev, location: `Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}` })); 
                }
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    // --- 2. VOICE INPUT FEATURE ---
    const startVoiceRecording = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Voice recognition not supported in this browser.");
            return;
        }
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-IN'; 
        recognition.onstart = () => setIsRecording(true);
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setVoiceOutput(transcript);
            setFormData(prev => ({ ...prev, currentProblem: transcript }));
        };
        recognition.onend = () => setIsRecording(false);
        recognition.start();
    };

    // --- 3. SUBMIT & INSTANT CHATBOT LOGIC ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsChatLoading(true);
        
        // Click hote hi turant bada chatbot kholo
        setChatReply("KrishiSakhi AI is analyzing your farm data... Please wait.");
        setIsChatOpen(true); 

        const backendURL = 'https://kisan-sakhi-new.onrender.com';
        
        try {
            // Data save karo
            const response = await axios.post(`${backendURL}/api/farms/submit`, formData);

            if (response.data.success) {
                // Expert advice fetch karo
                const aiRes = await axios.post(`${backendURL}/api/ai/chat`, {
                    farmData: { ...formData, healthScore: response.data.score }
                });
                // Popup update karo real answer ke saath
                setChatReply(aiRes.data.reply);
            }
        } catch (error) {
            console.error("Submit Error:", error);
            setChatReply("Data saved! Our AI expert is a bit busy, but you can see your full report in 'My Farm' history soon.");
        }
        setIsChatLoading(false);
    };

    return (
        <section className="py-12 bg-gray-50 min-h-screen font-lato">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-center text-4xl font-black text-green-600 mb-8 uppercase tracking-tight">
                    {langData.formHeading || "Enter the Form Detail"}
                </h2>
                
                <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl flex flex-col lg:flex-row gap-10 border border-green-50">
                    
                    {/* Voice Section Card */}
                    <div className="flex-1 p-10 rounded-3xl bg-green-50/30 border-2 border-dashed border-green-100 flex flex-col items-center justify-center">
                        <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-lg transition-all ${isRecording ? 'bg-red-100 animate-pulse scale-110' : 'bg-white'}`}>
                            <i className={`fa-solid fa-microphone text-4xl ${isRecording ? 'text-red-500' : 'text-green-600'}`}></i>
                        </div>
                        <button 
                            type="button" 
                            onClick={startVoiceRecording} 
                            className="px-10 py-4 rounded-2xl font-black text-white bg-green-600 w-full hover:bg-green-700 shadow-xl shadow-green-100 active:scale-95 transition-all text-lg"
                        >
                            {isRecording ? 'Listening...' : 'Start Voice Input'}
                        </button>
                        <p className="mt-6 text-sm italic text-gray-500 font-medium">
                            {voiceOutput || "Transcript will appear here..."}
                        </p>
                    </div>

                    {/* Form Fields Section */}
                    <div className="flex-1">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <FormInputs 
                                langData={langData} 
                                setFormData={setFormData} 
                                formData={formData} 
                                onLocationDetect={handleLocationDetect} 
                            />
                            <button 
                                type="submit" 
                                className="w-full py-5 bg-green-600 text-white font-black text-2xl rounded-2xl shadow-2xl shadow-green-200 hover:bg-green-700 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                            >
                                <i className="fa-solid fa-paper-plane text-lg"></i>
                                {isChatLoading ? 'Processing...' : (langData.submitBtn || 'Submit')}
                            </button>
                        </form>
                    </div>
                </div>

                {/* --- BADA CHATBOT POPUP (MODAL STYLE) --- */}
                {isChatOpen && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
                        <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden border-t-[12px] border-green-600 transform transition-all animate-in zoom-in-95 duration-300">
                            
                            {/* Header */}
                            <div className="p-8 border-b flex justify-between items-center bg-green-50/40">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg rotate-3">
                                        <i className="fa-solid fa-robot text-3xl text-white"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-black text-2xl text-gray-800">KrishiSakhi AI Expert</h4>
                                        <p className="text-xs text-green-600 font-bold uppercase tracking-widest">Personalized Farm Report</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setIsChatOpen(false)} 
                                    className="w-12 h-12 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all flex items-center justify-center bg-white shadow-sm"
                                >
                                    <i className="fa-solid fa-xmark text-2xl"></i>
                                </button>
                            </div>

                            {/* Main Answer Area */}
                            <div className="p-10 max-h-[50vh] overflow-y-auto">
                                <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100 shadow-inner">
                                    <p className="text-xl text-gray-700 leading-relaxed font-semibold italic">
                                        "{chatReply}"
                                    </p>
                                </div>
                            </div>

                            {/* Footer Action */}
                            <div className="p-8 bg-white border-t text-center">
                                <button 
                                    onClick={() => window.location.href='/myfarm'} 
                                    className="px-8 py-3 bg-green-50 text-green-700 font-black rounded-full hover:bg-green-100 transition-all flex items-center justify-center gap-2 mx-auto"
                                >
                                    <i className="fa-solid fa-chart-line"></i>
                                    Check My Farm Growth History
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
