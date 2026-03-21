import React, { useState } from 'react';
import axios from 'axios';
import FormInputs from './FormInputs';
import { Mic, Navigation, Send, X, Bot, Sparkles } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://kisan-sakhi-new.onrender.com';

const FormSection = ({ langData, currentLang, userName }) => {
    const [formData, setFormData] = useState({
        location: '', landSize: '', crop: '', soilType: '', 
        soilCharacter: '', irrigationSource: '', sowingType: '', 
        sowingDate: '', cropStage: '', currentProblem: ''
    });
    const [isRecording, setIsRecording] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatReply, setChatReply] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLocationDetect = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (pos) => {
                const { latitude, longitude } = pos.coords;
                try {
                    const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    const addr = res.data.address;
                    const locationStr = `${addr.city || addr.town || addr.village || "Unknown"}, ${addr.state || ""}`;
                    setFormData(prev => ({ ...prev, location: locationStr }));
                } catch (e) { setFormData(prev => ({ ...prev, location: "GPS Location Set" })); }
            });
        }
    };

    const startVoiceRecording = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return alert("Voice input not supported.");
        const recognition = new SpeechRecognition();
        recognition.lang = currentLang === 'hi' ? 'hi-IN' : 'en-IN';
        recognition.onstart = () => setIsRecording(true);
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setFormData(prev => ({ ...prev, currentProblem: transcript }));
        };
        recognition.onend = () => setIsRecording(false);
        recognition.start();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setChatReply("KrishiSakhi AI is analyzing your field data... Please wait.");
        setIsChatOpen(true); 

        try {
            const res = await axios.post(`${API_URL}/api/chat`, {
                farmData: formData,
                lang: currentLang,
                userName: userName
            });
            setChatReply(res.data.reply);
            await axios.post(`${API_URL}/api/myfarm/update`, { userName, farmData: formData });
        } catch (error) {
            setChatReply("Error: Backend se connect nahi ho pa raha. Check Render Logs.");
        }
        setLoading(false);
    };

    return (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white min-h-screen">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-5xl font-black text-green-600 mb-4 uppercase italic tracking-tighter italic">
                        {langData.formHeading}
                    </h2>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">AI Powered Field Analysis</p>
                </div>

                <div className="bg-white p-2 rounded-[3.5rem] shadow-2xl border border-green-50">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Left Side: Voice Control */}
                        <div className="lg:w-1/3 p-10 rounded-[3rem] bg-green-600 flex flex-col items-center justify-center text-white text-center">
                            <Sparkles className="mb-4 opacity-50" size={40} />
                            <h3 className="text-2xl font-black mb-6 uppercase">Bol Kar Batayein</h3>
                            <button 
                                onClick={startVoiceRecording} 
                                className={`w-32 h-32 rounded-full flex items-center justify-center mb-6 shadow-2xl transition-all ${isRecording ? 'bg-red-500 animate-ping' : 'bg-white text-green-600 hover:scale-110'}`}
                            >
                                <Mic size={48} fill={isRecording ? "white" : "none"} />
                            </button>
                            <p className="font-bold text-lg">{isRecording ? "Sun raha hoon..." : "Click to Speak"}</p>
                        </div>

                        {/* Right Side: Form Inputs */}
                        <div className="flex-1 p-10">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <FormInputs 
                                    langData={langData} 
                                    setFormData={setFormData} 
                                    formData={formData} 
                                    onLocationDetect={handleLocationDetect} 
                                />
                                <button type="submit" className="w-full py-6 bg-green-600 text-white font-black text-2xl rounded-[2rem] hover:bg-green-700 transition-all shadow-xl shadow-green-100 flex items-center justify-center gap-4 uppercase tracking-widest">
                                    {loading ? 'AI Analysis in Progress...' : langData.submitBtn}
                                    <Send size={24} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* AI Chat Result Modal */}
                {isChatOpen && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-xl flex items-center justify-center z-[200] p-4">
                        <div className="bg-white w-full max-w-3xl rounded-[3rem] shadow-2xl overflow-hidden border-t-[15px] border-green-600 animate-in zoom-in duration-300">
                            <div className="p-8 border-b flex justify-between items-center bg-green-50/50">
                                <div className="flex items-center gap-3">
                                    <Bot className="text-green-600" size={32} />
                                    <h4 className="font-black text-2xl text-gray-800 uppercase italic">KrishiSakhi AI Report</h4>
                                </div>
                                <button onClick={() => setIsChatOpen(false)} className="bg-gray-100 p-3 rounded-full hover:bg-red-50 hover:text-red-500 transition-all">
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="p-10 max-h-[60vh] overflow-y-auto text-xl leading-relaxed text-gray-700 font-medium italic">
                                {chatReply}
                            </div>
                            <div className="p-6 bg-gray-50 text-center">
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">This is an AI generated advice for {userName}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
export default FormSection;