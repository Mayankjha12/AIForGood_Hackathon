import React, { useState, useEffect } from "react";
import axios from "axios";

const MyFarm = () => {
  const [history, setHistory] = useState([]); 
  const [loading, setLoading] = useState(true);
  const BACKEND_URL = "https://kisan-sakhi-new.onrender.com";

  // Sabhi pichle issues fetch karna
  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/farms/history`);
      setHistory(res.data);
    } catch (err) {
      console.log("Data fetch nahi ho paya.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Latest issue for top cards (Health score etc.)
  const latestItem = history[0] || null;

  return (
    <div className="min-h-screen bg-white p-8 font-inter">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header - Same UI */}
        <header className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Farm Dashboard</h2>
            <p className="text-gray-500 text-sm italic">Tracking all your farm reports</p>
          </div>
          <button onClick={fetchHistory} className="bg-green-600 text-white px-5 py-2 rounded-xl text-sm shadow-md">
            Refresh Data
          </button>
        </header>

        {/* AI & SCAN CARDS - Same Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-3xl shadow-xl">
            <h3 className="text-xl font-bold">Latest Health Report</h3>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="bg-white/15 p-3 rounded-xl text-center">
                <p className="text-xs opacity-80">Health</p>
                <p className="text-2xl font-bold">{latestItem?.healthScore || 0}%</p>
              </div>
              <div className="bg-white/15 p-3 rounded-xl text-center">
                <p className="text-xs opacity-80">Reports</p>
                <p className="text-2xl font-bold">{history.length}</p>
              </div>
              <div className="bg-white/15 p-3 rounded-xl text-center">
                <p className="text-xs opacity-80">Urgent</p>
                <p className="text-2xl font-bold">{latestItem?.currentProblem ? "Yes" : "No"}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 flex flex-col justify-center items-center">
             <p className="text-gray-500 text-sm">Drone Scan / Field Photo</p>
             <button className="mt-3 bg-gray-100 text-gray-700 px-6 py-2 rounded-xl border border-dashed border-gray-300 w-full">Upload New Scan</button>
          </div>
        </div>

        {/* ISSUES FEED - Frontend Same, but 2-3 issues will stack here */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-xl font-bold text-gray-700 underline decoration-green-500 decoration-4">Issue History (Timeline)</h3>

            {history.length > 0 ? (
              history.map((item, index) => (
                <div key={index} className="bg-white p-8 shadow-lg border border-gray-100 rounded-[2rem] border-l-8 border-green-500 hover:shadow-2xl transition-all">
                  <div className="flex justify-between items-start">
                      <h4 className="text-2xl font-bold text-gray-800">{item.crop} - <span className="text-gray-400 text-lg">{new Date(item.createdAt).toLocaleDateString()}</span></h4>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-bold uppercase">
                          Health: {item.healthScore}%
                      </span>
                  </div>
                  
                  <div className="mt-6 p-5 bg-red-50 border border-red-100 rounded-2xl">
                    <h5 className="text-xs font-black text-red-600 uppercase tracking-widest mb-2">Problem Reported</h5>
                    <p className="text-sm text-red-900 font-bold">{item.currentProblem || "No issue"}</p>
                  </div>

                  <div className="mt-4 flex gap-4 text-xs text-gray-400">
                    <span>Location: {item.location}</span> | <span>Soil: {item.soilType}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed">No issues reported yet.</p>
            )}
          </div>

          <aside className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-50 sticky top-10">
              <h4 className="font-bold text-gray-800 mb-4 border-b pb-2">Latest Farm Details</h4>
              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex justify-between"><span>Latest Crop</span><b className="text-gray-800">{latestItem?.crop || "N/A"}</b></div>
                <div className="flex justify-between"><span>Total Issues</span><b className="text-gray-800">{history.length}</b></div>
                <div className="flex justify-between"><span>Last Location</span><b className="text-gray-800">{latestItem?.location || "N/A"}</b></div>
              </div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
};
export default MyFarm;
