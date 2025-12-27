import React, { useState } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios'; 
import ActionAreaCard from './card_Feed';

const Feedback = ({ langData }) => {
  const [rating, setRating] = useState(0);
  const [writtenFeedback, setWrittenFeedback] = useState("");
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  // --- VOICE TO TEXT SYNC ---
  const startVoiceFeedback = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Browser not supported");
    const recognition = new SpeechRecognition();
    recognition.onstart = () => setIsRecording(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setVoiceTranscript(transcript);
      // Voice feedback box mein type karega
      setWrittenFeedback(prev => prev + (prev ? " " : "") + transcript);
    };
    recognition.onend = () => setIsRecording(false);
    recognition.start();
  };

  const handleSubmit = async () => {
    if (rating === 0 && !writtenFeedback) return alert("Kisan bhai, rating ya message dein.");
    setLoading(true);
    try {
      const response = await axios.post('https://kisan-sakhi-new.onrender.com/api/feedback', {
        rating, writtenFeedback, voiceTranscript, date: new Date()
      });
      if (response.data.success) {
        alert("✅ Feedback submitted successfully! Dhanyawad.");
        setRating(0); setWrittenFeedback(""); setVoiceTranscript("");
      }
    } catch (err) { alert("Server error."); }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-10 bg-gray-50/30 min-h-screen">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black text-gray-800">Share Your Crop Feedback</h2>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Previous Feedback Cards */}
        <h2 className="text-2xl font-bold text-gray-800">Feedbacks about previous Crops</h2>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
          <ActionAreaCard title="Paddy" url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGQddur2XKt9TVxN3g7IRKz-vj_GMisUDf3A&s" description="My paddy yield increased by 25% this year." name="— Rajesh Kumar" />
          <ActionAreaCard title="Wheat" url="https://cdn.britannica.com/18/122518-050-A0740F9F/Field-durum-wheat.jpg" description="The local trends gave me the exact data I needed." name="— Suresh Singh" />
          {/* Maize Card Added */}
          <ActionAreaCard title="Maize" url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4TmRTwyo1lVOyMz4Y-ZDMHWLEPafDpcl0Rg&s" description="KrishiSakhi chatbot is truly a friend." name="— Anil Meena" />
        </Box>

        {/* Voice Feedback */}
        <div className="bg-white rounded-[2rem] p-10 shadow-sm text-center border-2 border-dashed border-green-100">
          <button onClick={startVoiceFeedback} className={`w-20 h-20 rounded-full text-3xl mb-4 text-white ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-green-600'}`}>
            <i className="fa-solid fa-microphone"></i>
          </button>
          <p className="font-bold text-green-600">Record Feedback</p>
        </div>

        {/* Written Feedback */}
        <div className="bg-white rounded-[2rem] p-8 shadow-sm">
          <textarea
            value={writtenFeedback}
            onChange={(e) => setWrittenFeedback(e.target.value)}
            className="w-full h-40 bg-gray-50 rounded-3xl p-6 text-sm"
            placeholder="Tell us how we can improve..."
          ></textarea>
        </div>

        <button onClick={handleSubmit} disabled={loading} className="w-full py-5 rounded-[1.5rem] font-black text-xl bg-green-600 text-white shadow-xl">
          {loading ? "Sending..." : "Submit Feedback"}
        </button>
      </div>
    </div>
  );
};
export default Feedback;
