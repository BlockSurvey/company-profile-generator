import React, { useEffect } from 'react';

export default function Summary({ companyProfile }: { companyProfile: any }) {
  useEffect(() => {
    console.log(companyProfile?.companySummary);
  }, [companyProfile]);

  return (
    <section className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-2 text-gray-800">Summary</h2>

      <div
        className="text-gray-600"
        dangerouslySetInnerHTML={{
          __html: (
            companyProfile?.companySummary || 'Loading company summary...'
          ).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        }}
      />
    </section>
  );
}
