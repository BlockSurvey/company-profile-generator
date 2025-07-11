import React from 'react';

export default function FinancialMetrics({ companyProfile }: { companyProfile: any }) {
  return (
    <section className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-2 text-gray-800">Financial Metrics</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-gray-600">
          <thead>
            <tr>
              <th className="py-2 px-4 font-semibold">Metric</th>
              <th className="py-2 px-4 font-semibold">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4">Revenue</td>
              <td className="py-2 px-4">$81.5B</td>
            </tr>
            <tr>
              <td className="py-2 px-4">Net Income</td>
              <td className="py-2 px-4">$12.6B</td>
            </tr>
            <tr>
              <td className="py-2 px-4">Market Cap</td>
              <td className="py-2 px-4">$800B</td>
            </tr>
            <tr>
              <td className="py-2 px-4">EPS</td>
              <td className="py-2 px-4">$3.62</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
} 