import { useEffect } from 'react';

export default function CompanyOverview({
  companyProfile
}: {
  companyProfile: any;
}) {
  // useEffect(() => {
  //   console.log('Company overview', companyProfile);
  // }, [companyProfile]);

  return (
    <section className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-2 text-gray-800">Company Overview</h2>
      {companyProfile?.companyOverview?.overview && (
        <div
          className="text-gray-600 space-y-1 whitespace-pre-wrap"
          dangerouslySetInnerHTML={{
            __html: companyProfile.companyOverview.overview.replace(
              /\*\*(.*?)\*\*/g,
              '<strong>$1</strong>'
            )
          }}
        />
      )}
    </section>
  );
}
