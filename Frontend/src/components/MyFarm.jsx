import React, { useState, useEffect } from "react";
import axios from "axios";

const MyFarm = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const BACKEND_URL = "https://kisan-sakhi-new.onrender.com";

  // Fetch all history from backend
  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/farms/history`);
      setHistory(res.data);
    } catch (err) {
      console.log("History could not be fetched.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <header className="flex justify-between items-center border-b pb-6">
          <div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Farm Issue History</h2>
            <p className="text-gray-500 text-sm italic">Tracking your farm's health timeline over the last few days.</p>
          </div>
          <button onClick={fetchHistory} className="bg-green-600 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg hover:bg-green-700 transition">
            Refresh Feed
          </button>
        </header>

        {/* Timeline List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center p-20 space-y-4">
            <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium">Retrieving history from server...</p>
          </div>
        ) : history.length > 0 ? (
          <div className="space-y-8">
            {history.map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-[2.5rem] shadow-xl border-l-[12px] border-green-500 hover:shadow-2xl transition-all group">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <span className="text-xs font-bold text-green-600 uppercase tracking-widest bg-green-50 px-3 py-1 rounded-full">Report #{history.length - index}</span>
                    <h3 className="text-2xl font-black text-gray-800 mt-2">{item.crop} - {new Date(item.createdAt).toLocaleDateString()}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 uppercase font-bold">Health Score</p>
                    <p className="text-3xl font-black text-green-600">{item.healthScore}%</p>
                  </div>
                </div>

                {/* Problem Box */}
                <div className="p-6 bg-red-50 border border-red-100 rounded-3xl">
                  <h4 className="text-xs font-black text-red-600 uppercase tracking-tighter mb-2">Detected Issue</h4>
                  <p className="text-red-900 font-bold text-lg leading-tight">
                    {item.currentProblem || "Optimized Conditions - No Issues"}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-500">
                   <span className="flex items-center gap-1"><i className="fa-solid fa-location-dot"></i> {item.location}</span>
                   <span className="flex items-center gap-1"><i className="fa-solid fa-layer-group"></i> {item.landSize}</span>
                   <span className="flex items-center gap-1"><i className="fa-solid fa-flask"></i> {item.soilType}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-20 bg-white rounded-[3rem] border-4 border-dashed border-gray-100">
            <p className="text-gray-400 text-lg italic">Kisan bhai, pehle Home page par form bharein taaki timeline shuru ho sake!</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default MyFarm;
