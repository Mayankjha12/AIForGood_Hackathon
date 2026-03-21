import React, { useState, useEffect } from "react";
import axios from "axios";
import { LayoutDashboard, Activity, AlertCircle, Calendar, CloudUpload, Zap } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://kisan-sakhi-new.onrender.com';

const MyFarm = ({ userName, langData }) => {
  const [history, setHistory] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [aiAnalysis, setAiAnalysis] = useState({ health: 82, issues: 0, urgent: "No" });

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/myfarm/${userName}`);
        if(res.data.userName) {
            setHistory([res.data]);
            setAiAnalysis({
                health: res.data.currentProblem ? 65 : 88,
                issues: res.data.currentProblem ? 1 : 0,
                urgent: res.data.currentProblem ? "Yes" : "No"
            });
        }
      } catch (err) { console.log("Fetch error"); }
      setLoading(false);
    };
    fetchHistory();
  }, [userName]);

  return (
    <div className="min-h-screen bg-gray-50/50 p-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase italic flex items-center gap-3">
                <LayoutDashboard className="text-green-600" size={40} />
                My Farm Dashboard
            </h2>
            <p className="text-gray-500 font-bold italic ml-12">Welcome back, {userName}! Real-time insights for your field.</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-white border-2 border-gray-100 px-6 py-3 rounded-2xl font-black text-sm shadow-sm flex items-center gap-2">
                <Calendar size={18} className="text-green-600" />
                {new Date().toLocaleDateString()}
            </button>
          </div>
        </header>

        {/* TOP STATUS CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-green-600 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
            <Zap className="absolute top-[-20px] right-[-20px] text-white/10" size={200} />
            <div className="relative z-10">
                <h3 className="text-2xl font-black uppercase italic mb-6">Live Farm Health</h3>
                <div className="grid grid-cols-3 gap-6">
                    <div className="bg-white/20 backdrop-blur-md p-6 rounded-3xl border border-white/30 text-center">
                        <Activity className="mx-auto mb-2 opacity-80" />
                        <p className="text-xs font-black uppercase opacity-70">Health Score</p>
                        <p className="text-4xl font-black">{aiAnalysis.health}%</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md p-6 rounded-3xl border border-white/30 text-center">
                        <AlertCircle className="mx-auto mb-2 opacity-80" />
                        <p className="text-xs font-black uppercase opacity-70">Active Issues</p>
                        <p className="text-4xl font-black">{aiAnalysis.issues}</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md p-6 rounded-3xl border border-white/30 text-center">
                        <Zap className="mx-auto mb-2 opacity-80" />
                        <p className="text-xs font-black uppercase opacity-70">Urgent Action</p>
                        <p className="text-4xl font-black">{aiAnalysis.urgent}</p>
                    </div>
                </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] shadow-xl border-4 border-gray-50 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <CloudUpload className="text-green-600" size={40} />
            </div>
            <h3 className="font-black text-xl text-gray-800 uppercase mb-2">Field Analysis</h3>
            <p className="text-gray-400 font-bold text-sm mb-6 px-4">Upload drone or field images for AI scanning</p>
            <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all">Start Scan</button>
          </div>
        </div>

        {/* DETAILED FEED */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <h3 className="text-2xl font-black text-gray-800 uppercase italic">Recent Activity Log</h3>
                {history.length > 0 ? history.map((item, idx) => (
                    <div key={idx} className="bg-white p-10 rounded-[3rem] shadow-xl border-l-[12px] border-green-600 hover:scale-[1.02] transition-all cursor-default">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h4 className="text-3xl font-black text-gray-900 uppercase italic">{item.crop} Field</h4>
                                <p className="text-gray-400 font-bold mt-1 uppercase tracking-widest text-xs">Updated: {new Date(item.lastUpdated).toLocaleString()}</p>
                            </div>
                            <span className="px-5 py-2 bg-green-100 text-green-700 rounded-full font-black text-xs uppercase italic tracking-wider shadow-sm">
                                {item.soilType} Soil
                            </span>
                        </div>
                        <div className="p-6 bg-red-50 rounded-3xl border-2 border-red-100 border-dashed">
                            <p className="text-xs font-black text-red-500 uppercase tracking-widest mb-2">Problem Detected</p>
                            <p className="text-lg font-bold text-red-900 italic">"{item.currentProblem || "Everything looks perfect!"}"</p>
                        </div>
                    </div>
                )) : (
                    <div className="bg-white p-20 rounded-[3rem] border-4 border-dashed border-gray-100 text-center">
                        <p className="text-gray-300 font-black text-xl uppercase">No farm data yet.</p>
                    </div>
                )}
            </div>

            <div className="space-y-8">
                <div className="bg-white p-10 rounded-[3rem] shadow-xl border-4 border-indigo-50">
                    <h4 className="font-black text-indigo-700 uppercase italic mb-6 border-b-4 border-indigo-50 pb-2">Quick Info</h4>
                    <div className="space-y-6">
                        <div className="flex justify-between items-center font-bold">
                            <span className="text-gray-400 uppercase text-xs">Total Area</span>
                            <span className="text-gray-900">{history[0]?.landSize || "N/A"} Acres</span>
                        </div>
                        <div className="flex justify-between items-center font-bold">
                            <span className="text-gray-400 uppercase text-xs">Soil Quality</span>
                            <span className="text-green-600">Excellent</span>
                        </div>
                        <div className="flex justify-between items-center font-bold">
                            <span className="text-gray-400 uppercase text-xs">Sowing Method</span>
                            <span className="text-gray-900">{history[0]?.sowingType || "Traditional"}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
export default MyFarm;