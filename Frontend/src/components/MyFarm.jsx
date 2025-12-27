import React, { useState, useEffect } from "react";
import axios from "axios";

const MyFarm = () => {
  const [farmData, setFarmData] = useState(null); 
  const [aiAnalysis, setAiAnalysis] = useState({ health: 100, issues: 0, urgent: "No" });
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = "https://kisan-sakhi-new.onrender.com";

  const fetchLatestFarm = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/farms/latest`);
      setFarmData(res.data);
      
      // Backend se asli Health Score uthana
      setAiAnalysis({
        health: res.data.healthScore || 100,
        issues: res.data.currentProblem && res.data.currentProblem !== "None" ? 1 : 0,
        urgent: res.data.currentProblem && res.data.currentProblem !== "None" ? "Yes" : "No"
      });
    } catch (err) {
      console.log("No farm data found yet.");
    }
  };

  useEffect(() => {
    fetchLatestFarm();
  }, []);

  const handleAnalyze = async () => {
    if (!farmData) return alert("Please submit the form on the Home page first!");
    
    setLoading(true);
    try {
      const res = await axios.post(`${BACKEND_URL}/api/ai/chat`, {
        prompt: "Provide a detailed technical crop health analysis in English based on my profile.",
        farmData: farmData
      });
      
      alert("English AI Technical Report is ready!");
      console.log("Full Report:", res.data.reply);
    } catch (err) {
      alert("AI Analysis failed. Please check the server.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white p-8 font-inter text-gray-900">
      <div className="max-w-6xl mx-auto space-y-10">
        
        <header className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">My Farm Dashboard</h2>
            <p className="text-gray-500 text-sm italic">ML-Powered insights for your {farmData?.crop || "crops"}</p>
          </div>
          <button className="bg-white border px-5 py-2 rounded-xl text-sm shadow-md">Voice Assistance</button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-3xl shadow-xl">
            <h3 className="text-xl font-bold">ML Health Report (English)</h3>
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
                <p className={`text-2xl font-bold ${aiAnalysis.urgent === 'Yes' ? 'text-yellow-300' : 'text-white'}`}>{aiAnalysis.urgent}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
            <h3 className="font-bold text-gray-800 text-lg">Field Scan Analysis</h3>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center mt-4 bg-gray-50/50">
               <input type="file" className="w-full text-xs" />
            </div>
            <button onClick={handleAnalyze} disabled={loading} className={`mt-5 w-full py-2 rounded-xl font-bold text-white ${loading ? 'bg-gray-400' : 'bg-green-600'}`}>
              {loading ? "Analyzing ML Data..." : "Run ML Diagnostics"}
            </button>
          </div>
        </div>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold">Field Statistics</h3>
            {farmData ? (
              <div className="bg-white p-8 shadow-lg border border-gray-100 rounded-[2rem] border-l-8 border-green-500">
                <div className="flex justify-between">
                  <h4 className="text-2xl font-bold">{farmData.crop} - English Analysis</h4>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-bold uppercase">{farmData.cropStage}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Location: {farmData.location}</p>
                <div className="mt-6 p-5 bg-red-50 border border-red-100 rounded-2xl">
                  <h5 className="text-xs font-black text-red-600 uppercase mb-2">Technical Issue Log</h5>
                  <p className="text-sm text-red-900 font-medium">{farmData.currentProblem || "Optimized: No active issues detected."}</p>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2rem] p-20 text-center text-gray-400">Please complete the form to see ML insights.</div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-lg border">
              <h4 className="font-bold mb-4 border-b pb-2">Technical Overview</h4>
              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex justify-between"><span>Area</span><b className="text-gray-800">{farmData?.landSize || "N/A"}</b></div>
                <div className="flex justify-between"><span>Soil Type</span><b className="text-gray-800">{farmData?.soilType || "N/A"}</b></div>
              </div>
            </div>
            <div className="bg-green-600 p-6 rounded-3xl shadow-xl text-center text-white">
              <button className="w-full py-3 bg-white text-green-600 font-bold rounded-xl">Expert AI Support</button>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
};

export default MyFarm;
