import React from 'react';

export default function FinancialMetrics({
  companyProfile
}: {
  companyProfile: any;
}) {
  const financialMetrics = companyProfile?.financialKeyMetrics || [];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
      <h3 className="text-sm font-semibold text-slate-900 mb-3">
        Financial Metrics
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-slate-600">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="py-2 px-1 font-medium text-left">Year</th>
              <th className="py-2 px-1 font-medium text-left">Type</th>
              <th className="py-2 px-1 font-medium text-right">Revenue</th>
              <th className="py-2 px-1 font-medium text-right">EBITDA</th>
              <th className="py-2 px-1 font-medium text-right">EPS</th>
            </tr>
          </thead>
          <tbody>
            {financialMetrics.map((metric: any, index: number) => (
              <tr
                key={index}
                className="border-b border-slate-100 last:border-0"
              >
                <td className="py-1.5 px-1 font-medium">{metric.year}</td>
                <td className="py-1.5 px-1 text-slate-500">{metric.type}</td>
                <td className="py-1.5 px-1 text-right">
                  ${metric.revenue?.toLocaleString() || 0}M
                </td>
                <td className="py-1.5 px-1 text-right">
                  ${metric.ebitda?.toLocaleString() || 0}M
                </td>
                <td className="py-1.5 px-1 text-right">${metric.eps || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
