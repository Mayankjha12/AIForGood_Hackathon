import React, { useState } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios'; // Backend connection ke liye
import ActionAreaCard from './card_Feed';

const Feedback = ({ langData }) => {
  const [rating, setRating] = useState(0);
  const [writtenFeedback, setWrittenFeedback] = useState("");
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const [loading, setLoading] = useState(false);

  // API Submission Logic
  const handleSubmit = async () => {
    if (rating === 0 && !writtenFeedback) {
      alert("Kisan bhai, kripya rating ya message dein.");
      return;
    }

    setLoading(true);
    try {
      const backendURL = 'https://kisan-sakhi-new.onrender.com'; // Tera Live Render URL
      const response = await axios.post(`${backendURL}/api/feedback`, {
        rating,
        writtenFeedback,
        voiceTranscript,
        date: new Date().toISOString()
      });

      if (response.data.success) {
        alert("Dhanyawad! Aapka feedback MongoDB mein save ho gaya.");
        // Reset form
        setRating(0);
        setWrittenFeedback("");
        setVoiceTranscript("");
      }
    } catch (err) {
      console.error("Feedback Error:", err);
      alert("Maaf kijiye, server connect nahi ho paya.");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-10 bg-gray-50/30 min-h-screen font-lato">
      
      {/* Page Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-1.5 rounded-full text-xs font-bold border border-green-100 mx-auto">
          <i className="fa-regular fa-comment-dots"></i>
          <span>We Value Your Input</span>
        </div>
        <h2 className="text-4xl font-black text-gray-800">Share Your Recent Crop Feedback</h2>
        <p className="text-gray-500 max-w-md mx-auto text-sm">
          Help us improve KrishiSakhi for farmers like you.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Star Rating Card */}
        <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm text-center space-y-6">
          <h4 className="font-bold text-gray-800 text-lg">Rate Your Crop Experience</h4>
          <div className="flex justify-center gap-4 text-4xl">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`transition-all transform hover:scale-110 ${star <= rating ? 'text-yellow-400' : 'text-gray-200'}`}
              >
                <i className="fa-solid fa-star"></i>
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 font-medium italic">{rating > 0 ? `You rated: ${rating} Stars` : "Tap to rate"}</p>
        </div>

        {/* Existing Feedbacks Section */}
        <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4">Feedbacks about previous Crops</h2>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
          <ActionAreaCard title="Paddy" url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGQddur2XKt9TVxN3g7IRKz-vj_GMisUDf3A&s" description="My paddy yield increased by 25% this year." name="— Rajesh Kumar" />
          <ActionAreaCard title="Wheat" url="https://cdn.britannica.com/18/122518-050-A0740F9F/Field-durum-wheat.jpg" description="The local trends gave me the exact data I needed." name="— Suresh Singh" />
          <ActionAreaCard title="Maize" url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4TmRTwyo1lVOyMz4Y-ZDMHWLEPafDpcl0Rg&s" description="KrishiSakhi chatbot is truly a friend." name="— Anil Meena" />
        </Box>

        {/* Voice Feedback Card */}
        <div className="bg-white border border-gray-100 rounded-[2rem] p-10 shadow-sm text-center space-y-6">
          <h4 className="font-bold text-gray-800 text-lg text-left">Voice Feedback</h4>
          <div className="flex flex-col items-center gap-4 border-2 border-dashed border-gray-100 rounded-3xl py-10">
            <button className="w-20 h-20 bg-green-600 text-white rounded-full flex items-center justify-center text-3xl shadow-xl hover:bg-green-700 transition active:scale-90">
              <i className="fa-solid fa-microphone"></i>
            </button>
            <p className="font-bold text-green-600">Record Feedback</p>
          </div>
        </div>

        {/* Written Feedback Card */}
        <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm space-y-6">
          <h4 className="font-bold text-gray-800 text-lg">Written Feedback</h4>
          <textarea
            value={writtenFeedback}
            onChange={(e) => setWrittenFeedback(e.target.value)}
            className="w-full h-40 bg-gray-50 border border-gray-100 rounded-3xl p-6 text-sm focus:ring-2 focus:ring-green-500/20 transition-all resize-none shadow-inner"
            placeholder="Tell us how we can improve..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <button 
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-5 rounded-[1.5rem] font-black text-xl shadow-2xl transition flex items-center justify-center gap-3 active:scale-[0.98] ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700 shadow-green-200'}`}
        >
          <i className="fa-solid fa-paper-plane text-sm opacity-80"></i>
          <span>{loading ? "Sending..." : "Submit Feedback"}</span>
        </button>

      </div>
    </div>
  );
};

export default Feedback;
