import CompanyOverview from './CompanyOverview';
import FinancialMetrics from './FinancialMetrics';
import Header from './Header';
import KeyEvents from './KeyEvents';
import ShareholdingStructure from './ShareholdingStructure';
import SharePriceChart from './SharePriceChart';
import Summary from './Summary';
import { useEffect, useState } from 'react';

// Load the company profile from the JSON file
import demoCompanyProfile from '../../../assets/demoCompanyProfile.json';

export default function CompanyProfile() {
  // Variables
  const [companyProfile, setCompanyProfile] = useState<any>(null);

  useEffect(() => {
    // Get the company name as input
    const companyName = 'Tesla';
    const companySymbol = 'TSLA';
    // Get the company profile from the API
    getCompanyProfile(companyName, companySymbol);
  }, []);

  // Functions
  const getCompanyProfile = async (
    companyName: string,
    companySymbol: string
  ) => {
    // // Fetch the company full details from above all API's endpoint using Promise.all
    // const [
    //   financialKeyMetrics,
    //   shareHoldingsStructure,
    //   stockPricePerformance,
    //   companySummary,
    //   companyManagement,
    //   companyStockDetails
    // ] = await Promise.all([
    //   fetch(`http://127.0.0.1:8000/fmp/financial-key-metrics/${companySymbol}`),
    //   fetch(
    //     `http://127.0.0.1:8000/fmp/share-holdings-structure/${companySymbol}`
    //   ),
    //   fetch(
    //     `http://127.0.0.1:8000/fmp/stock-price-performance/${companySymbol}`
    //   ),
    //   fetch(`http://127.0.0.1:8000/company-summary/${companyName}`),
    //   fetch(`http://127.0.0.1:8000/company-management/${companyName}`),
    //   fetch(`http://127.0.0.1:8000/company-stock-details/${companyName}`)
    // ]);

    // const [
    //   financialKeyMetricsData,
    //   shareHoldingsStructureData,
    //   stockPricePerformanceData,
    //   companySummaryData,
    //   companyManagementData,
    //   companyStockDetailsData
    // ] = await Promise.all([
    //   financialKeyMetrics.json(),
    //   shareHoldingsStructure.json(),
    //   stockPricePerformance.json(),
    //   companySummary.json(),
    //   companyManagement.json(),
    //   companyStockDetails.json()
    // ]);

    // const companyProfile = {
    //   financialKeyMetrics: financialKeyMetricsData,
    //   shareHoldingsStructure: shareHoldingsStructureData,
    //   stockPricePerformance: stockPricePerformanceData,
    //   companySummary: companySummaryData,
    //   companyManagement: companyManagementData,
    //   companyStockDetails: companyStockDetailsData
    // };

    const companyProfile = demoCompanyProfile;

    setCompanyProfile(companyProfile);
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <Header companyName="Tesla" />
      <div
        className="grid p-2"
        style={{
          gridTemplateColumns: '1fr 1.4fr 1fr',
          gap: '1rem',
          width: '100%',
          maxWidth: '100%'
        }}
      >
        {/* First Column */}
        <div className="flex flex-col gap-4">
          <Summary companyProfile={companyProfile} />
          <SharePriceChart companyProfile={companyProfile} />
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold mb-2">Management Members</h2>
            {/* Placeholder for management members */}
            <ul className="list-disc pl-5 text-gray-700">
              {companyProfile?.companyManagement?.top_management.map(
                (member: any) => (
                  <li key={member.name}>
                    {member.name} - {member.title} - {member.since}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
        {/* Second Column */}
        <div className="flex flex-col gap-4">
          <CompanyOverview companyProfile={companyProfile} />
          <KeyEvents companyProfile={companyProfile} />
        </div>
        {/* Third Column */}
        <div className="flex flex-col gap-4">
          <FinancialMetrics companyProfile={companyProfile} />
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold mb-2">
              Shareholding Structure by Business
            </h2>
            {/* Placeholder for shareholding by business */}
            <ShareholdingStructure companyProfile={companyProfile} />
          </div>
        </div>
      </div>
    </div>
  );
}
