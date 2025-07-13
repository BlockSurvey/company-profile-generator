import React from 'react';

export default function KeyEvents({ companyProfile }: { companyProfile: any }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
      <h3 className="text-sm font-semibold text-slate-900 mb-3">Key Events</h3>
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs border-b border-slate-100 pb-1">
          <span className="font-medium text-slate-900">S&P 500 inclusion</span>
          <span className="text-slate-500">2020</span>
        </div>
        <div className="flex justify-between items-center text-xs border-b border-slate-100 pb-1">
          <span className="font-medium text-slate-900">Model Y unveiled</span>
          <span className="text-slate-500">2019</span>
        </div>
        <div className="flex justify-between items-center text-xs border-b border-slate-100 pb-1">
          <span className="font-medium text-slate-900">
            Model 3 mass production
          </span>
          <span className="text-slate-500">2017</span>
        </div>
        <div className="flex justify-between items-center text-xs border-b border-slate-100 pb-1">
          <span className="font-medium text-slate-900">Powerwall launch</span>
          <span className="text-slate-500">2015</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="font-medium text-slate-900">Model S launch</span>
          <span className="text-slate-500">2012</span>
        </div>
      </div>
    </div>
  );
}
