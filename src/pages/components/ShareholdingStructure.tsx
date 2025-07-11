import React from 'react';

export default function ShareholdingStructure({ companyProfile }: { companyProfile: any }) {
  return (
    <section className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-2 text-gray-800">Shareholding Structure</h2>
      <div className="flex space-x-8">
        <div className="flex flex-col items-center">
          <svg width="80" height="80" viewBox="0 0 32 32">
            <circle r="16" cx="16" cy="16" fill="#e5e7eb" />
            <path d="M16 16 L16 0 A16 16 0 0 1 32 16 Z" fill="#3b82f6" />
          </svg>
          <span className="mt-2 text-gray-700">Promoter</span>
        </div>
        <div className="flex flex-col items-center">
          <svg width="80" height="80" viewBox="0 0 32 32">
            <circle r="16" cx="16" cy="16" fill="#e5e7eb" />
            <path d="M16 16 L16 0 A16 16 0 0 1 16 32 Z" fill="#10b981" />
          </svg>
          <span className="mt-2 text-gray-700">Public</span>
        </div>
      </div>
    </section>
  );
} 