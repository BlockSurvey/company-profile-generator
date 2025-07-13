# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev` (uses Turbo for faster builds)
- **Build for production**: `npm run build`
- **Start production server**: `npm start`
- **Lint code**: `npm run lint`
- **Type check**: `tsc --noEmit`

## Code Quality

The project uses:
- **Husky + lint-staged** for pre-commit hooks
- **ESLint** with Next.js and Prettier configurations
- **TypeScript** with strict type checking
- **Prettier** for code formatting
- **Tailwind CSS** for styling

Pre-commit hooks automatically run:
1. TypeScript type checking (`tsc --noEmit`)
2. ESLint on TS/JS files
3. Prettier formatting on all relevant files

## Architecture Overview

This is a **Next.js 13** application for generating AI-powered company profiles with the following structure:

### Core Architecture
- **Frontend**: Next.js with TypeScript, pages router architecture
- **State Management**: Zustand store (currently has placeholder bear state)
- **Styling**: Tailwind CSS with custom component styling
- **Charts**: Recharts library for financial data visualization
- **Data Fetching**: REST API calls to local backend at `http://127.0.0.1:8000`

### Key Components Structure
- **Main entry**: `src/pages/index.tsx` → `CompanyProfile` component
- **Layout**: 3-column grid layout with responsive design
- **Component organization**: All UI components in `src/pages/components/`

### Data Flow
The application fetches company data from multiple API endpoints:
- Financial metrics from FMP API (`/fmp/*` endpoints)
- Company details from custom backend (`/company-*` endpoints)
- All API calls made in parallel using `Promise.all`
- Demo data available in `assets/demoCompanyProfile.json`

### Component Hierarchy
```
CompanyProfile (main container)
├── Search functionality (inline)
├── Column 1: Summary, SharePriceChart, Management
├── Column 2: CompanyOverview, KeyEvents  
└── Column 3: FinancialMetrics, ShareholdingStructure
```

## Backend Integration

The frontend expects a local backend server running on port 8000 with these endpoints:
- `/fmp/financial-key-metrics/{symbol}`
- `/fmp/share-holdings-structure/{symbol}`
- `/fmp/stock-price-performance/{symbol}`
- `/company-summary/{name}`
- `/company-management/{name}`
- `/company-stock-details/{name}`
- `/company-overview/{name}`

## Development Notes

- Uses hardcoded "Tesla" as default company for development
- Search functionality implemented but uses company name as both name and symbol
- Demo data can be used by uncommenting line 87 in `company-profile.tsx`
- Components expect specific data structure from API responses
- Loading state shown while API calls are in progress