import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
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
    <div className="space-y-4">
      {/* Industry Distribution */}
      <div>
        <h4 className="text-xs font-medium text-slate-700 mb-2">By Industry</h4>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={businessChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={40}
                fill="#8884d8"
              >
                {businessChartData.map((entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  fontSize: '10px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {businessChartData.map((entry: any, index: number) => (
            <div key={index} className="flex items-center text-xs">
              <div
                className="w-2 h-2 rounded-full mr-1"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <span className="text-slate-600 truncate">{entry.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Region Distribution */}
      <div>
        <h4 className="text-xs font-medium text-slate-700 mb-2">By Region</h4>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={regionChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={40}
                fill="#8884d8"
              >
                {regionChartData.map((entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  fontSize: '10px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {regionChartData.map((entry: any, index: number) => (
            <div key={index} className="flex items-center text-xs">
              <div
                className="w-2 h-2 rounded-full mr-1"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <span className="text-slate-600 truncate">{entry.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
