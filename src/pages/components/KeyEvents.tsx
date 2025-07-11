import React from 'react';

export default function KeyEvents({ companyProfile }: { companyProfile: any }) {
  return (
    <section className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-2 text-gray-800">Key Events</h2>
      <ul className="list-disc pl-5 text-gray-600 space-y-1">
        <li>2020: Tesla joins S&P 500</li>
        <li>2019: Model Y unveiled</li>
        <li>2017: Model 3 mass production</li>
        <li>2015: Powerwall launch</li>
        <li>2012: Model S launch</li>
      </ul>
    </section>
  );
} 