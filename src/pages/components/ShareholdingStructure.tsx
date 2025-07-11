import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function ShareholdingStructure({
  companyProfile
}: {
  companyProfile: any;
}) {
  const shareHoldingsStructure = companyProfile?.shareHoldingsStructure;

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  const [businessChartData, setBusinessChartData] = useState([]);
  const [regionChartData, setRegionChartData] = useState([]);

  useEffect(() => {
    console.log(shareHoldingsStructure);

    // Business chart data
    let businessChartData = [];
    if (shareHoldingsStructure?.business?.data?.labels) {
      businessChartData = shareHoldingsStructure?.business?.data?.labels.map(
        (label: string, index: number) => ({
          name: label,
          value:
            shareHoldingsStructure?.business?.data?.datasets[0]?.data[index]
        })
      );
    }

    // Region chart data
    let regionChartData = [];
    if (shareHoldingsStructure?.region?.data?.labels) {
      regionChartData = shareHoldingsStructure?.region?.data?.labels.map(
        (label: string, index: number) => ({
          name: label,
          value: shareHoldingsStructure?.region?.data?.datasets[0]?.data[index]
        })
      );
    }

    setBusinessChartData(businessChartData);
    setRegionChartData(regionChartData);
  }, [shareHoldingsStructure]);

  return (
    <section className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-2 text-gray-800">
        Shareholding Structure
      </h2>

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-black">Industry</h3>
      </div>
      <div className="w-full h-full" style={{ width: '100%', height: '300px' }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={businessChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              fill="#8884d8"
              label
            >
              {businessChartData.map((entry: any, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-black">Region</h3>
      </div>
      <div className="w-full h-full" style={{ width: '100%', height: '300px' }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={regionChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              fill="#8884d8"
              label
            >
              {regionChartData.map((entry: any, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
