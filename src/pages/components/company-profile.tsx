import CompanyOverview from './CompanyOverview';
import FinancialMetrics from './FinancialMetrics';
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);

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

  // Popular company suggestions for demo
  const popularCompanies = [
    'AAPL - Apple Inc.',
    'GOOGL - Alphabet Inc.',
    'MSFT - Microsoft Corporation',
    'AMZN - Amazon.com Inc.',
    'TSLA - Tesla Inc.',
    'META - Meta Platforms Inc.',
    'NVDA - NVIDIA Corporation',
    'BRK.B - Berkshire Hathaway',
    'JPM - JPMorgan Chase & Co.',
    'JNJ - Johnson & Johnson'
  ];

  // Handle search input changes
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    
    if (value.length > 0) {
      // Filter suggestions based on input
      const filtered = popularCompanies.filter(company =>
        company.toLowerCase().includes(value.toLowerCase())
      );
      setSearchSuggestions(filtered.slice(0, 5)); // Show max 5 suggestions
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setSearchSuggestions([]);
    }
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: string) => {
    const symbol = suggestion.split(' - ')[0];
    const companyName = suggestion.split(' - ')[1];
    setSearchValue(symbol);
    setShowSuggestions(false);
    getCompanyProfile(companyName, symbol);
  };

  // Functions
  const getCompanyProfile = async (
    companyName: string,
    companySymbol: string
  ) => {
    setIsLoading(true);
    try {
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
        fetch(
          `http://127.0.0.1:8000/fmp/financial-key-metrics/${companySymbol}`
        ),
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
    } catch (error) {
      console.error('Error fetching company profile:', error);
      // Fallback to demo data on error
      setCompanyProfile(demoCompanyProfile);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !companyProfile) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading company profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-slate-900">
                Company Profile
              </h1>
              <div className="hidden sm:block h-6 w-px bg-slate-300"></div>
              <span className="text-sm text-slate-500 hidden sm:inline">
                {companyProfile?.companyOverview?.company_name || 'Tesla Inc.'}
              </span>
            </div>

            {/* Search */}
            <div className="flex items-center max-w-md">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search company (e.g., TSLA, AAPL)"
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchValue}
                  onChange={e => handleSearchChange(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      setShowSuggestions(false);
                      getCompanyProfile(searchValue, searchValue);
                    } else if (e.key === 'Escape') {
                      setShowSuggestions(false);
                    }
                  }}
                  onBlur={() => {
                    // Delay hiding suggestions to allow for clicks
                    setTimeout(() => setShowSuggestions(false), 200);
                  }}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-4 w-4 text-slate-400"
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
                </div>
                
                {/* Search Suggestions Dropdown */}
                {showSuggestions && searchSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
                    {searchSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-slate-50 focus:bg-slate-50 focus:outline-none border-b border-slate-100 last:border-0"
                        onClick={() => handleSuggestionSelect(suggestion)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-slate-900">
                            {suggestion.split(' - ')[0]}
                          </span>
                          <span className="text-slate-500 text-xs">
                            {suggestion.split(' - ')[1]}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={() => {
                  setShowSuggestions(false);
                  getCompanyProfile(searchValue, searchValue);
                }}
                disabled={isLoading}
                className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Company Info */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <Summary companyProfile={companyProfile} />

            {/* Share Price Performance - Moved here */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">
                Share Price Performance
              </h3>
              <div className="h-48">
                <SharePriceChart companyProfile={companyProfile} />
              </div>
            </div>

            {/* Management - Compact */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">
                Key Management
              </h3>
              <div className="space-y-2">
                {companyProfile?.companyManagement?.top_management
                  ?.slice(0, 4)
                  .map((member: any, index: number) => (
                    <div
                      key={index}
                      className="flex justify-between items-start text-xs"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-900 truncate">
                          {member.name}
                        </p>
                        <p className="text-slate-500 truncate">
                          {member.title}
                        </p>
                      </div>
                      <span className="text-slate-400 ml-2">
                        Since {member.since}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Center Column - Overview & Events */}
          <div className="col-span-12 lg:col-span-5 space-y-6">
            <CompanyOverview companyProfile={companyProfile} />
            <KeyEvents companyProfile={companyProfile} />
          </div>

          {/* Right Column - Financial Data */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            <FinancialMetrics companyProfile={companyProfile} />

            {/* Shareholding Structure - Compact */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">
                Shareholding Structure
              </h3>
              <ShareholdingStructure companyProfile={companyProfile} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
