import React, { useState } from 'react';
import axios from 'axios';

const KrishiChat = ({ cropContext }) => {
    const [input, setInput] = useState('');
    const [chat, setChat] = useState([]);

    const askAI = async () => {
        const userMsg = { role: 'user', text: input };
        setChat([...chat, userMsg]);
        
        try {
            const res = await axios.post('http://localhost:5000/api/ai/chat', {
                question: input,
                crop: cropContext || "General",
                mlData: "Yield prediction is 94%" // PPT ke liye static/dynamic
            });
            setChat(prev => [...prev, { role: 'bot', text: res.data.reply }]);
        } catch (err) {
            console.error("AI Error");
        }
        setInput('');
    };

    return (
        <div className="chat-container p-4 border rounded-lg shadow-lg bg-white">
            <h3 className="text-green-700 font-bold mb-2">🤖 KrishiSakhi AI Expert</h3>
            <div className="h-64 overflow-y-auto mb-4 p-2 bg-gray-50 rounded">
                {chat.map((m, i) => (
                    <div key={i} className={`mb-2 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                        <span className={`inline-block p-2 rounded ${m.role === 'user' ? 'bg-green-100' : 'bg-gray-200'}`}>
                            {m.text}
                        </span>
                    </div>
                ))}
            </div>
            <div className="flex gap-2">
                <input 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 border p-2 rounded"
                    placeholder="Kisan bhai, apna sawal puchein..."
                />
                <button onClick={askAI} className="bg-green-600 text-white px-4 py-2 rounded">Bhejein</button>
            </div>
        </div>
    );
};

export default KrishiChat;