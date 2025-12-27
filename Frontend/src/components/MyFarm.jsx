import React, { useState, useEffect } from "react";
import axios from "axios";

const MyFarm = () => {
  const [history, setHistory] = useState([]); 
  const [aiAnalysis, setAiAnalysis] = useState({ health: 76, issues: 0, urgent: "No" });
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = "https://kisan-sakhi-new.onrender.com";

  // 1. History fetch karna (Stacking issues ke liye)
  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/farms/history`);
      setHistory(res.data);
      if(res.data.length > 0 && res.data[0].healthScore) {
          setAiAnalysis(prev => ({ 
              ...prev, 
              health: res.data[0].healthScore,
              issues: res.data[0].currentProblem ? 1 : 0,
              urgent: res.data[0].currentProblem ? "Yes" : "No"
          }));
      }
    } catch (err) {
      console.log("Data fetch error.");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // 2. FIXED: Upload & Analyze Button Logic
  const handleAnalyze = async () => {
    if (history.length === 0) return alert("Pehle Home page par form bharein!");
    
    setLoading(true);
    try {
      const latestFarm = history[0];
      const res = await axios.post(`${BACKEND_URL}/api/ai/chat`, {
        prompt: "Analyze my farm health based on the data and give me: 1. Health Percentage, 2. Number of Issues, 3. Urgent (Yes/No).",
        farmData: latestFarm
      });
      
      console.log("AI Report:", res.data.reply);
      alert("AI Analysis Report Taiyar Hai! Report console mein check karein.");
      
      // UI update logic as per original design
      setAiAnalysis(prev => ({ ...prev, health: latestFarm.healthScore || 76 }));
    } catch (err) {
      alert("AI analysis fail ho gayi. Server check karein.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white p-8 font-inter">
      <div className="max-w-6xl mx-auto space-y-10">
        
        <header className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Farm Dashboard</h2>
            <p className="text-gray-500 text-sm italic">Smart insights for your crops</p>
          </div>
          <button className="bg-white border px-5 py-2 rounded-xl text-sm shadow-md">Voice Assistance</button>
        </header>

        {/* ORIGINAL CARDS UI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-3xl shadow-xl">
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
                <p className="text-2xl font-bold">{aiAnalysis.urgent}</p>
              </div>
            </div>
            <button className="mt-5 bg-white text-green-700 px-5 py-2 rounded-xl font-medium shadow-lg">View Full AI Report</button>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
            <h3 className="font-bold text-gray-800 text-lg">Drone / Field Scan</h3>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center mt-4 bg-gray-50/50">
              <p className="text-sm text-gray-600 mb-3">Click to upload field scan</p>
              <input type="file" className="w-full cursor-pointer text-xs" />
            </div>
            <button 
              onClick={handleAnalyze}
              disabled={loading}
              className={`mt-5 w-full py-2 rounded-xl font-bold text-white transition-all shadow-md ${loading ? 'bg-gray-400' : 'bg-green-600'}`}
            >
              {loading ? "AI is Analyzing..." : "Upload & Analyze"}
            </button>
          </div>
        </div>

        {/* ISSUES FEED (Stacking One Below Another) */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-xl font-bold text-gray-700">Latest Field Conditions</h3>
            {history.length > 0 ? (
              history.map((item, index) => (
                <div key={index} className="bg-white p-8 shadow-lg border border-gray-100 rounded-[2rem] border-l-8 border-green-500 hover:shadow-2xl transition-all">
                  <div className="flex justify-between items-start">
                      <h4 className="text-2xl font-bold text-gray-800">{item.crop} Field</h4>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-bold uppercase tracking-wider">{item.cropStage}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Reported on: {new Date(item.createdAt).toLocaleDateString()}</p>
                  <div className="mt-6 p-5 bg-red-50 border border-red-100 rounded-2xl">
                    <h5 className="text-xs font-black text-red-600 uppercase tracking-widest mb-2">Problem Reported</h5>
                    <p className="text-sm text-red-900 font-medium">{item.currentProblem || "Sab theek hai!"}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2rem] p-20 text-center">
                  <p className="text-gray-400 font-medium italic">Kisan bhai, pehle Home page par form bharein.</p>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-50">
              <h4 className="font-bold text-gray-800 mb-4 border-b pb-2">Farm Overview</h4>
              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex justify-between"><span>Area</span><b className="text-gray-800">{history[0]?.landSize || "N/A"}</b></div>
                <div className="flex justify-between"><span>Soil Type</span><b className="text-gray-800">{history[0]?.soilType || "N/A"}</b></div>
              </div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
};

export default MyFarm;
