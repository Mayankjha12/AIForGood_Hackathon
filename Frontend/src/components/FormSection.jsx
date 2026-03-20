import React, { useState } from 'react';
import axios from 'axios';
import FormInputs from './FormInputs';

const FormSection = ({ langData, currentLang }) => {
    const [formData, setFormData] = useState({
        location: '', landSize: '', crop: '', soilType: '', 
        soilCharacter: '', irrigationSource: '', sowingType: '', 
        sowingDate: '', cropStage: '', currentProblem: ''
    });
    const [isRecording, setIsRecording] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatReply, setChatReply] = useState("");
    const [isChatLoading, setIsChatLoading] = useState(false);

    const handleLocationDetect = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (pos) => {
                const { latitude, longitude } = pos.coords;
                try {
                    const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    const addr = res.data.address;
                    const locationStr = `${addr.city || addr.town || addr.village || "Unknown City"}, ${addr.state || ""}`;
                    setFormData(prev => ({ ...prev, location: locationStr }));
                } catch (e) { setFormData(prev => ({ ...prev, location: "GPS Location Set" })); }
            });
        }
    };

    const startVoiceRecording = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return alert("Voice input not supported in this browser.");
        
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
        setIsChatLoading(true);
        setChatReply("KrishiSakhi AI is analyzing your data... Please wait.");
        setIsChatOpen(true); 

        try {
            // ✅ Netlify Path Fixed
            const res = await axios.post('/.netlify/functions/api/chat', {
                farmData: formData,
                lang: currentLang
            });
            setChatReply(res.data.reply);
        } catch (error) {
            console.error("API Error:", error);
            setChatReply("Error connecting to AI expert. Please ensure Netlify functions are deployed.");
        }
        setIsChatLoading(false);
    };

    return (
        <section className="py-12 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-center text-4xl font-black text-green-600 mb-8 uppercase">
                    {langData.formHeading}
                </h2>
                
                <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl flex flex-col lg:flex-row gap-10 border border-green-50">
                    <div className="flex-1 p-10 rounded-3xl bg-green-50/30 border-2 border-dashed border-green-100 flex flex-col items-center justify-center">
                        <button 
                            type="button" 
                            onClick={startVoiceRecording} 
                            className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-lg transition-all ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-green-600'}`}
                        >
                            <i className="fa-solid fa-microphone text-4xl text-white"></i>
                        </button>
                        <p className="font-bold text-green-700">{isRecording ? "Listening..." : "Click to Speak Problem"}</p>
                    </div>

                    <div className="flex-1">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <FormInputs langData={langData} setFormData={setFormData} formData={formData} onLocationDetect={handleLocationDetect} />
                            <button type="submit" className="w-full py-5 bg-green-600 text-white font-black text-2xl rounded-2xl hover:bg-green-700 transition-all">
                                {isChatLoading ? 'Processing...' : langData.submitBtn}
                            </button>
                        </form>
                    </div>
                </div>

                {isChatOpen && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[100] p-4">
                        <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden border-t-[12px] border-green-600">
                            <div className="p-8 border-b flex justify-between items-center bg-green-50/40">
                                <h4 className="font-black text-2xl text-gray-800">KrishiSakhi AI Report</h4>
                                <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-red-500">
                                    <i className="fa-solid fa-xmark text-2xl"></i>
                                </button>
                            </div>
                            <div className="p-10 max-h-[50vh] overflow-y-auto whitespace-pre-wrap text-lg leading-relaxed text-gray-700">
                                {chatReply}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FormSection;