import React from 'react';

export default function FinancialMetrics({
  companyProfile
}: {
  companyProfile: any;
}) {
  const financialMetrics = companyProfile?.financialKeyMetrics || [];

  return (
    <section className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-2 text-gray-800">
        Financial Metrics
      </h2>
      <div className="overflow-x-auto">
        <table style={{ maxWidth: '100px' }} className="text-left text-gray-600">
          <thead>
            <tr>
              <th className="py-2 px-4 font-semibold">Year</th>
              <th className="py-2 px-4 font-semibold">Type</th>
              <th className="py-2 px-4 font-semibold">Revenue</th>
              <th className="py-2 px-4 font-semibold">EBITDA</th>
              <th className="py-2 px-4 font-semibold">EPS</th>
              {/* <th className="py-2 px-4 font-semibold">Net Income</th>
              <th className="py-2 px-4 font-semibold">ROE</th> */}
            </tr>
          </thead>
          <tbody>
            {financialMetrics.map((metric: any, index: number) => (
              <tr key={index}>
                <td className="py-2 px-4">{metric.year}</td>
                <td className="py-2 px-4">{metric.type}</td>
                <td className="py-2 px-4">${metric.revenue.toLocaleString()}M</td>
                <td className="py-2 px-4">${metric.ebitda.toLocaleString()}M</td>
                <td className="py-2 px-4">${metric.eps}</td>
                {/* <td className="py-2 px-4">${metric.netIncome.toLocaleString()}M</td>
                <td className="py-2 px-4">{metric.roe}</td> */}
              </tr>
            ))}
          </tbody>
          </table>
      </div>
    </section>
  );
}
