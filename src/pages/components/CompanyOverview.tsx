import React from 'react';

export default function CompanyOverview({ companyProfile }: { companyProfile: any }) {
  return (
    <section className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-2 text-gray-800">Company Overview</h2>
      <ul className="list-disc pl-5 text-gray-600 space-y-1">
        <li>Founded: 2003</li>
        <li>Headquarters: Palo Alto, CA</li>
        <li>CEO: Elon Musk</li>
        <li>Employees: 70,000+</li>
        <li>Industry: Automotive, Energy</li>
      </ul>
    </section>
  );
} 