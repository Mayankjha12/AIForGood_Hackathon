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

  const startVoiceFeedback = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Browser not supported");
    const recognition = new SpeechRecognition();
    recognition.onstart = () => setIsRecording(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setVoiceTranscript(transcript);
      // Voice ko written box mein sync kar raha hai
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
        alert("✅ Feedback submitted successfully! Dhanyawad."); // Success Alert
        setRating(0); setWrittenFeedback(""); setVoiceTranscript("");
      }
    } catch (err) { alert("Server connection error."); }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-10 bg-gray-50/30 min-h-screen">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black text-gray-800">Share Your Crop Feedback</h2>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white rounded-[2rem] p-8 shadow-sm text-center">
          <div className="flex justify-center gap-4 text-4xl mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} onClick={() => setRating(star)} className={star <= rating ? 'text-yellow-400' : 'text-gray-200'}>
                <i className="fa-solid fa-star"></i>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[2rem] p-10 shadow-sm text-center border-2 border-dashed border-green-100">
          <button onClick={startVoiceFeedback} className={`w-20 h-20 rounded-full text-3xl mb-4 text-white ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-green-600'}`}>
            <i className="fa-solid fa-microphone"></i>
          </button>
          <p className="font-bold text-green-600">{isRecording ? "Listening..." : "Record Feedback"}</p>
        </div>

        <div className="bg-white rounded-[2rem] p-8 shadow-sm">
          <textarea
            value={writtenFeedback}
            onChange={(e) => setWrittenFeedback(e.target.value)}
            className="w-full h-40 bg-gray-50 rounded-3xl p-6 text-sm focus:ring-2 focus:ring-green-500/20"
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
