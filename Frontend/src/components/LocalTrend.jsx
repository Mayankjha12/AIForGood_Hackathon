import React from 'react';
// Imports ko uncomment kar diya taaki build pass ho jaye
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const LocalTrend = () => {
  const prices = [
    { name: 'Wheat', price: '₹2,450', value: 2450, change: '+5%', color: '#4ade80' },
    { name: 'Rice', price: '₹3,200', value: 3200, change: '+3%', color: '#22c55e' },
    { name: 'Cotton', price: '₹6,800', value: 6800, change: '-2%', color: '#16a34a' },
    { name: 'Soybean', price: '₹4,500', value: 4500, change: '+8%', color: '#86efac' }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 min-h-screen bg-white">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Local Market Trends</h2>
        <button className="px-6 py-2 border rounded-full text-sm font-medium bg-white shadow-sm">
          Listen
        </button>
      </div>

      {/* Price Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {prices.map((item, idx) => (
          <div key={idx} className="bg-white border border-gray-100 rounded-3xl p-6 flex justify-between items-center shadow-sm">
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase">{item.name}</p>
              <p className="text-2xl font-bold text-gray-800">{item.price}/quintal</p>
            </div>
            <span className={`font-bold px-3 py-1.5 rounded-xl text-sm ${item.change.startsWith('+') ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
              {item.change}
            </span>
          </div>
        ))}
      </div>

      {/* Bar Chart Section (As per your Screenshot) */}
      <div className="bg-white border border-gray-50 rounded-[2rem] p-8 shadow-sm">
        <h3 className="text-xl font-bold text-gray-700 mb-8">Market Price Comparison</h3>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={prices}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
              <YAxis hide domain={[0, 'dataMax + 1000']} />
              <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '12px'}} />
              <Bar dataKey="value" radius={[15, 15, 15, 15]} barSize={120}>
                {prices.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default LocalTrend;
