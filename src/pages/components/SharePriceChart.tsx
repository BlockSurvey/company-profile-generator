import React from 'react';

export default function SharePriceChart({ companyProfile }: { companyProfile: any }) {
  return (
    <section className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-2 text-gray-800">Share Price Performance</h2>
      <div className="w-full h-40 bg-gray-100 flex items-center justify-center rounded">
        {/* Placeholder for chart */}
        <svg width="100%" height="100%" viewBox="0 0 300 100">
          <polyline
            fill="none"
            stroke="#3b82f6"
            strokeWidth="4"
            points="0,80 40,60 80,65 120,20 160,40 200,10 240,60 280,30 300,80"
          />
        </svg>
      </div>
    </section>
  );
} 