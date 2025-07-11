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
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    // Get the company name as input
    const companyName = 'Tesla';
    const companySymbol = 'TSLA';
    // Get the company profile from the API
    getCompanyProfile(companyName, companySymbol);

    // Prevent double call in dev mode
    return () => {
      console.log('Company profile fetched');
    };
  }, []);

  // Functions
  const getCompanyProfile = async (
    companyName: string,
    companySymbol: string
  ) => {
    // Fetch the company full details from above all API's endpoint using Promise.all
    const [
      financialKeyMetrics,
      shareHoldingsStructure,
      stockPricePerformance,
      companySummary,
      companyManagement,
      companyStockDetails,
      companyOverview
    ] = await Promise.all([
      fetch(`http://127.0.0.1:8000/fmp/financial-key-metrics/${companySymbol}`),
      fetch(
        `http://127.0.0.1:8000/fmp/share-holdings-structure/${companySymbol}`
      ),
      fetch(
        `http://127.0.0.1:8000/fmp/stock-price-performance/${companySymbol}`
      ),
      fetch(`http://127.0.0.1:8000/company-summary/${companyName}`),
      fetch(`http://127.0.0.1:8000/company-management/${companyName}`),
      fetch(`http://127.0.0.1:8000/company-stock-details/${companyName}`),
      fetch(`http://127.0.0.1:8000/company-overview/${companyName}`)
    ]);

    const [
      financialKeyMetricsData,
      shareHoldingsStructureData,
      stockPricePerformanceData,
      companySummaryData,
      companyManagementData,
      companyStockDetailsData,
      companyOverviewData
    ] = await Promise.all([
      financialKeyMetrics.json(),
      shareHoldingsStructure.json(),
      stockPricePerformance.json(),
      companySummary.json(),
      companyManagement.json(),
      companyStockDetails.json(),
      companyOverview.json()
    ]);

    const companyProfile = {
      financialKeyMetrics: financialKeyMetricsData,
      shareHoldingsStructure: shareHoldingsStructureData,
      stockPricePerformance: stockPricePerformanceData,
      companySummary: companySummaryData,
      companyManagement: companyManagementData,
      companyStockDetails: companyStockDetailsData,
      companyOverview: companyOverviewData
    };

    // const companyProfile = demoCompanyProfile;

    setCompanyProfile(companyProfile);
  };

  //   If loading is true, show a loading spinner
  if (!companyProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="flex align-center justify-center">
        {/* <Header companyName="Tesla" /> */}

        {/* search box with search icon */}
        <div className="flex align-center justify-center">
          <input
            type="text"
            placeholder="Search for a company"
            className="w-full p-2 rounded-md border border-gray-300"
            onChange={e => setSearchValue(e.target.value)}
          />

          <button
            className="bg-blue-500 text-white p-2 rounded-md"
            onClick={() => {
              // get the company profile from the API
              getCompanyProfile(searchValue, searchValue);
            }}
          >
            {/* Search icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
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
            {/* Management members list */}
            <ul className="space-y-4">
              {companyProfile?.companyManagement?.top_management.map(
                (member: any) => (
                  <li
                    key={member.name}
                    className="flex flex-col bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-lg font-semibold text-gray-900">
                      {member.name}
                    </span>
                    <span className="text-sm text-gray-600">
                      {member.title}
                    </span>
                    <span className="text-xs text-gray-500">
                      Since {member.since}
                    </span>
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
