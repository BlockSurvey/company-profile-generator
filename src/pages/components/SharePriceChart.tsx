'use client'; // if you're using Next.js App Router with SSR

import React, { useEffect, useState } from 'react';
import {
  CartesianGrid,
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
      companyProfile.stockPricePerformance.stock.labels.forEach(
        (label: string, index: number) => {
          chartData.push({
            date: label,
            stockPrice:
              companyProfile.stockPricePerformance.stock.datasets[0].data[
                index
              ][0],
            indexPrice:
              companyProfile.stockPricePerformance.index.datasets[0].data[
                index
              ][0]
          });
        }
      );
    }

    setStockPricePerformance(chartData);
  }, [companyProfile]);

  return (
    <>
      <div className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={stockPricePerformance}
            margin={{
              top: 5,
              right: 5,
              left: 5,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="#64748b" />
            <YAxis tick={{ fontSize: 10 }} stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '12px'
              }}
            />
            <Line
              type="monotone"
              dataKey="stockPrice"
              name="Stock Price"
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="indexPrice"
              name="Index Price"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
