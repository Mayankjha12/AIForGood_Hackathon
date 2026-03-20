import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ChatbotResult({ langData }) {
    const [latestData, setLatestData] = useState(null);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState([]);

    // Load the latest data from Local Storage
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('krishiSakhiData'));
        if (storedData && storedData.length > 0) {
            const data = storedData[storedData.length - 1];
            setLatestData(data);
            // Initial AI message with basic simulation while waiting for input
            setMessages([{ 
                sender: 'ai', 
                text: `Namaste! Aapke ${data.crop} farm ki report taiyaar hai. Aap mujhse koi bhi sawal puch sakte hain.` 
            }]);
        }
    }, []);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        
        const userMsg = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setIsLoading(true);
        
        try {
            // ✅ Real API Call to Groq Backend
            const res = await axios.post('/.netlify/functions/api/chat', {
                farmData: { 
                    ...latestData, 
                    problem: input // Current question is the new problem
                },
                lang: 'hi'
            });
            
            const aiMsg = { sender: 'ai', text: res.data.reply };
            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, { 
                sender: 'ai', 
                text: "Maaf kijiyega kisan bhai, abhi network mein thodi dikkat hai. Kripya thodi der baad koshish karein." 
            }]);
        }
        
        setIsLoading(false);
        setInput('');
    };

    if (!latestData) {
        return <div className="text-center text-lg text-gray-500 py-20">Loading results...</div>;
    }

    return (
        <div className="flex justify-center py-12 px-4 bg-gray-100 min-h-screen">
            <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col border border-gray-200">
                
                {/* Chat Header */}
                <div className="p-5 bg-green-600 text-white font-poppins font-bold text-xl flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <i className="fa-solid fa-robot"></i>
                        <span>KrishiSakhi AI Assistant</span>
                    </div>
                    <span className="text-sm font-normal opacity-80 italic">Powered by Groq AI</span>
                </div>

                {/* Chat History */}
                <div className="chat-window h-[55vh] overflow-y-auto p-6 space-y-4 bg-gray-50">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm text-sm whitespace-pre-wrap ${
                                msg.sender === 'user' 
                                ? 'bg-green-600 text-white rounded-br-none' 
                                : 'bg-white text-gray-800 border border-green-100 rounded-bl-none'
                            }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                         <div className="flex justify-start">
                            <div className="bg-white text-gray-500 p-3 rounded-xl shadow-sm border border-gray-100 text-xs animate-pulse">
                                KrishiSakhi is thinking...
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Form */}
                <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100 flex gap-3 items-center">
                    <textarea 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-grow p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 resize-none text-sm" 
                        rows="1" 
                        placeholder="Kisan bhai, apna sawal puchein..."
                        disabled={isLoading}
                    />
                    <button 
                        type="submit" 
                        className={`p-3 rounded-full text-white transition-all ${isLoading ? 'bg-gray-300' : 'bg-green-600 hover:bg-green-700 shadow-md'}`}
                        disabled={isLoading}
                    >
                        <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ChatbotResult;