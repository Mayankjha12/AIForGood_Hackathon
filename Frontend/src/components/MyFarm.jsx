import React, { useState, useEffect } from "react";
import axios from "axios";

const MyFarm = () => {
  const [farmData, setFarmData] = useState(null); 
  const [aiAnalysis, setAiAnalysis] = useState({ health: 76, issues: 0, urgent: "No" });
  const [loading, setLoading] = useState(false);

  // Render Backend URL
  const BACKEND_URL = "https://kisan-sakhi-new.onrender.com";

  // 1. Backend se latest farm data fetch karna
  const fetchLatestFarm = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/farms/latest`);
      setFarmData(res.data);
      
      // Agar data mein problem pehle se hai toh AI state update karo
      if(res.data.currentProblem) {
          setAiAnalysis(prev => ({ ...prev, issues: 1, urgent: "Yes" }));
      }
    } catch (err) {
      console.log("Abhi tak koi data nahi mila.");
    }
  };

  useEffect(() => {
    fetchLatestFarm();
  }, []);

  // 2. Upload & Analyze Button Logic (Gemini API Call)
  const handleAnalyze = async () => {
    if (!farmData) return alert("Pehle Home page par form bharein!");
    
    setLoading(true);
    try {
      const res = await axios.post(`${BACKEND_URL}/api/ai/chat`, {
        prompt: "Analyze my farm health based on the data and give me: 1. Health Percentage, 2. Number of Issues, 3. Urgent (Yes/No).",
        farmData: farmData
      });
      
      console.log("Gemini Report:", res.data.reply); //
      
      // AI response ke basis par score generate karna (Mock logic for UI update)
      setAiAnalysis({
        health: farmData.currentProblem ? Math.floor(Math.random() * 15) + 60 : 92,
        issues: farmData.currentProblem ? 1 : 0,
        urgent: farmData.currentProblem ? "Yes" : "No"
      });
      
      alert("AI Analysis Report Taiyar Hai!");
    } catch (err) {
      console.error(err);
      alert("AI analysis fail ho gayi. Server check karein.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white p-8 font-inter">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header */}
        <header className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Farm Dashboard</h2>
            <p className="text-gray-500 text-sm italic">Smart insights for your {farmData?.crop || "crops"}</p>
          </div>
          <button className="bg-white border px-5 py-2 rounded-xl text-sm shadow-md hover:shadow-lg transition">
            Voice Assistance
          </button>
        </header>

        {/* AI & SCAN CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* AI Report Card */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-3xl shadow-xl transition-all hover:scale-[1.01]">
            <h3 className="text-xl font-bold">AI Farm Health Report</h3>
            <p className="text-sm opacity-90 mt-1">Latest automated analysis summary</p>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="bg-white/15 p-3 rounded-xl text-center backdrop-blur-sm">
                <p className="text-xs opacity-80">Health</p>
                <p className="text-2xl font-bold">{aiAnalysis.health}%</p>
              </div>
              <div className="bg-white/15 p-3 rounded-xl text-center backdrop-blur-sm">
                <p className="text-xs opacity-80">Issues</p>
                <p className="text-2xl font-bold">{aiAnalysis.issues}</p>
              </div>
              <div className="bg-white/15 p-3 rounded-xl text-center backdrop-blur-sm">
                <p className="text-xs opacity-80">Urgent</p>
                <p className={`text-2xl font-bold ${aiAnalysis.urgent === 'Yes' ? 'text-yellow-300' : 'text-white'}`}>
                    {aiAnalysis.urgent}
                </p>
              </div>
            </div>

            <button className="mt-5 bg-white text-green-700 px-5 py-2 rounded-xl font-medium hover:bg-gray-100 transition shadow-lg">
              View Full AI Report
            </button>
          </div>

          {/* Scan Image Card */}
          <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
            <h3 className="font-bold text-gray-800 text-lg">Drone / Field Scan</h3>
            <p className="text-gray-500 text-sm mt-1">Upload image for AI-powered disease detection</p>

            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center mt-4 bg-gray-50/50">
              <p className="text-sm text-gray-600 mb-3">Click to upload field scan</p>
              <input type="file" className="w-full cursor-pointer text-xs" />
            </div>

            <button 
              onClick={handleAnalyze}
              disabled={loading}
              className={`mt-5 w-full py-2 rounded-xl font-bold text-white transition-all shadow-md ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700 shadow-green-100'}`}
            >
              {loading ? "AI is Analyzing..." : "Upload & Analyze"}
            </button>
          </div>

        </div>

        {/* Main Dashboard Layout */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-gray-700">Latest Field Condition</h3>

            {farmData ? (
              <div className="bg-white p-8 shadow-lg border border-gray-100 rounded-[2rem] border-l-8 border-green-500 hover:shadow-2xl transition-all">
                <div className="flex justify-between items-start">
                    <h4 className="text-2xl font-bold text-gray-800">{farmData.crop} Field</h4>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-bold uppercase tracking-wider">
                        {farmData.cropStage}
                    </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Location: {farmData.location}</p>

                <div className="mt-6 p-5 bg-red-50 border border-red-100 rounded-2xl">
                  <h5 className="text-xs font-black text-red-600 uppercase tracking-widest mb-2">Current Problem Reported</h5>
                  <p className="text-sm text-red-900 font-medium">
                      {farmData.currentProblem || "Koi samasya nahi hai. Sab theek hai!"}
                  </p>
                </div>

                <div className="mt-6 bg-green-50/50 p-5 border border-green-100 rounded-2xl">
                  <h5 className="text-xs font-bold text-green-700 uppercase mb-2">AI Recommended Actions</h5>
                  <ul className="text-sm text-green-900 space-y-2">
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-[10px]"></i> Check soil moisture level in Zone 1.</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-[10px]"></i> Follow current {farmData.crop} schedule.</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2rem] p-20 text-center">
                  <p className="text-gray-400 font-medium italic">Kisan bhai, pehle Home page par form bharein taaki dashboard update ho sake.</p>
              </div>
            )}
          </div>

          {/* Sidebar: Overview */}
          <aside className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-50">
              <h4 className="font-bold text-gray-800 mb-4 border-b pb-2">Farm Overview</h4>
              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex justify-between"><span>Area</span><b className="text-gray-800">{farmData?.landSize || "N/A"}</b></div>
                <div className="flex justify-between"><span>Soil Type</span><b className="text-gray-800">{farmData?.soilType || "N/A"}</b></div>
                <div className="flex justify-between"><span>Irrigation</span><b className="text-gray-800">{farmData?.irrigationSource || "N/A"}</b></div>
              </div>
            </div>

            <div className="bg-green-600 p-6 rounded-3xl shadow-xl text-center text-white">
              <p className="text-xs font-bold opacity-80 mb-2 uppercase">Need More Help?</p>
              <button className="w-full py-3 bg-white text-green-600 font-bold rounded-xl hover:bg-gray-100 transition shadow-inner">
                Chat with KrishiSakhi
              </button>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
};

export default MyFarm;
