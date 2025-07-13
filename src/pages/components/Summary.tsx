import React from 'react';

export default function Summary({ companyProfile }: { companyProfile: any }) {

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
      <h3 className="text-sm font-semibold text-slate-900 mb-3">
        Company Summary
      </h3>
      <div
        className="text-xs text-slate-600 leading-relaxed"
        dangerouslySetInnerHTML={{
          __html: (
            companyProfile?.companySummary || 'Loading company summary...'
          ).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        }}
      />
    </div>
  );
}
