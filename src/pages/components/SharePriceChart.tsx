'use client'; // if you're using Next.js App Router with SSR

import React, { useEffect, useState } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

export default function SharePriceChart({
  companyProfile
}: {
  companyProfile: any;
}) {
  // Variables
  const [stockPricePerformance, setStockPricePerformance] = useState<any>([]);

  useEffect(() => {
    // Convert the data to the format that recharts expects
    const chartData: any[] = [];

    if (companyProfile) {
      companyProfile.stockPricePerformance.stock.labels.forEach((label: string, index: number) => {
        chartData.push({
          date: label,
          stockPrice: companyProfile.stockPricePerformance.stock.datasets[0].data[index][0],
          indexPrice: companyProfile.stockPricePerformance.index.datasets[0].data[index][0]
        });
      });
    }

    setStockPricePerformance(chartData);
  }, [companyProfile]);

  return (
    <>
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-2 text-gray-800">
          Share Price Performance
        </h2>
        <div className="w-full bg-gray-100 flex items-center justify-center rounded">
          {/* Draw the chart here using recharts */}
          <div style={{ width: '100%', height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={100}
                data={stockPricePerformance}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 0
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="stockPrice"
                  name="Stock Price"
                  stroke="#17925e"
                />
                <Line
                  type="monotone"
                  dataKey="indexPrice"
                  name="Index Price"
                  stroke="#82ca9d"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </>
  );
}
