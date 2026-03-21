import React, { useState } from 'react';
import { Star, Send, CheckCircle, MessageSquare } from 'lucide-react';
import axios from 'axios';

// Render URL ya Localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Feedback = ({ userName }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) return;
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/feedback`, {
        userName: userName || 'Anjaan Kisan',
        rating,
        comment,
      });
      setSubmitted(true);
    } catch (err) {
      alert("Feedback bhejte waqt error aaya. Dubara koshish karein!");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto my-10 p-12 bg-white rounded-[40px] shadow-2xl border-4 border-green-500 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="text-green-600" size={50} />
        </div>
        <h2 className="text-4xl font-black text-gray-900 mb-2 italic uppercase">Shukriya!</h2>
        <p className="text-xl font-bold text-gray-600">Aapka feedback hamare liye bohot zaroori hai.</p>
      </div>
    );
  }

  return (
    <section className="max-w-2xl mx-auto my-10 p-10 bg-white rounded-[40px] shadow-2xl border-b-8 border-indigo-600 relative overflow-hidden">
      {/* Decorative Background Circle */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-50 rounded-full z-0"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-center gap-3 mb-6">
          <MessageSquare className="text-indigo-600" size={32} />
          <h2 className="text-3xl font-black text-gray-900 italic uppercase tracking-tighter">App Kaise Lagi?</h2>
        </div>
        
        <p className="text-center font-bold text-gray-500 mb-8">Humein batayein taki hum ise aur behtar bana sakein</p>

        {/* Star Rating Section */}
        <div className="flex justify-center gap-4 mb-10">
          {[1, 2, 3, 4, 5].map((star) => (
            <button 
              key={star} 
              onClick={() => setRating(star)}
              className="transform transition-transform hover:scale-125 duration-200"
            >
              <Star
                size={56}
                fill={rating >= star ? "#4f46e5" : "none"}
                strokeWidth={2.5}
                className={rating >= star ? "text-indigo-600" : "text-gray-200"}
              />
            </button>
          ))}
        </div>

        {/* Comment Input */}
        <div className="space-y-4">
          <textarea
            placeholder="Kuch aur kehna chahte hain?..."
            className="w-full p-6 rounded-[25px] border-4 border-gray-100 bg-gray-50 outline-none focus:border-indigo-600 focus:bg-white transition-all font-bold text-lg min-h-[150px] shadow-inner"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={rating === 0 || loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-[25px] font-black text-xl flex items-center justify-center gap-4 shadow-xl shadow-indigo-200 transition-all active:scale-95 disabled:bg-gray-300 disabled:shadow-none uppercase tracking-widest"
          >
            {loading ? "Bhej rahe hain..." : (
              <>
                <Send size={28} />
                Bhejein
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Feedback;