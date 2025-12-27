import React, { useState } from 'react';
import axios from 'axios';
import FormInputs from './FormInputs';

const FormSection = ({ langData, currentLang, onLangChange }) => {
    const [formData, setFormData] = useState({});
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatReply, setChatReply] = useState("");
    const [isChatLoading, setIsChatLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsChatLoading(true);
        const backendURL = 'https://kisan-sakhi-new.onrender.com';
        
        try {
            // STEP 1: Save Data
            const response = await axios.post(`${backendURL}/api/farms/submit`, formData);

            if (response.data.success) {
                // STEP 2: Call AI with 30s timeout
                try {
                    const aiRes = await axios.post(`${backendURL}/api/ai/chat`, {
                        prompt: "Provide agricultural advice for " + (formData.currentProblem || "general health"),
                        farmData: { ...formData, healthScore: response.data.score }
                    }, { timeout: 30000 });

                    setChatReply(aiRes.data.reply);
                } catch (aiErr) {
                    setChatReply("Data saved! Your AI report is being generated in My Farm.");
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
                    <div className="flex-1 p-2">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <FormInputs langData={langData} setFormData={setFormData} formData={formData} />
                            <button type="submit" disabled={isChatLoading} className="w-full py-4 bg-green-600 text-white font-bold rounded-2xl shadow-xl hover:bg-green-700 disabled:bg-gray-400">
                                {isChatLoading ? 'Analyzing...' : langData.submitBtn}
                            </button>
                        </form>
                    </div>
                </div>
                {/* AI Popup */}
                {isChatOpen && (
                    <div className="fixed bottom-10 right-10 w-96 bg-white shadow-2xl rounded-3xl p-6 border-t-8 border-green-600 z-50">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-bold text-gray-800 flex items-center gap-2">
                                <i className="fa-solid fa-robot text-green-600"></i> AI Expert Advice
                            </h4>
                            <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-red-500">✖</button>
                        </div>
                        <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{chatReply}</p>
                    </div>
                )}
            </div>
        </section>
    );
};
export default FormSection;
