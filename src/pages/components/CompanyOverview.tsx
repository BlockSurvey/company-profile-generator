import React from 'react';

export default function CompanyOverview({
  companyProfile
}: {
  companyProfile: any;
}) {
  const renderOverviewWithCitations = (overview: string, citations: any) => {
    if (!overview) return '';
    
    // Replace citation markers [1], [2], etc. with clickable links
    let processedOverview = overview.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    if (citations) {
      Object.keys(citations).forEach(key => {
        const citationRegex = new RegExp(`\\[${key}\\]`, 'g');
        processedOverview = processedOverview.replace(
          citationRegex,
          `<a href="${citations[key]}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-xs">[${key}]</a>`
        );
      });
    }
    
    return processedOverview;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
      <h3 className="text-sm font-semibold text-slate-900 mb-3">
        Company Overview
      </h3>
      {companyProfile?.companyOverview?.overview && (
        <>
          <div
            className="text-xs text-slate-600 leading-relaxed space-y-2 whitespace-pre-wrap"
            dangerouslySetInnerHTML={{
              __html: renderOverviewWithCitations(
                companyProfile.companyOverview.overview,
                companyProfile.companyOverview.citations
              )
            }}
          />
          
          {/* Citations Section */}
          {companyProfile?.companyOverview?.citations && (
            <div className="mt-4 pt-3 border-t border-slate-200">
              <h4 className="text-xs font-medium text-slate-700 mb-2">Sources:</h4>
              <div className="space-y-1">
                {Object.entries(companyProfile.companyOverview.citations).map(([key, url]: [string, any]) => (
                  <div key={key} className="flex items-start text-xs">
                    <span className="text-slate-500 mr-2">[{key}]</span>
                    <a 
                      href={url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline flex-1 break-all"
                    >
                      {url}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
