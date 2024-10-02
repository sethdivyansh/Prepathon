import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/layout/responsesidebar';
import CompanyInfo from '@/components/layout/companyinforesponse';
import ChartCard from '@/components/layout/chartcard';
import { useLocation, useNavigate } from 'react-router-dom';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export type YearlyData = {
    year: number;
    value: number;
};

export type SyntheticYearlyData = {
    year: number;
    value: number;
    synthetic: boolean;
};

export type CompanyData = {
    sl_no: number;
    company: string;
    country: string;
    country_code: string;
    diversity: number;
    market_cap: {
        value: number;
        synthetic: boolean;
    };
    stock_price: SyntheticYearlyData[];
    expense: YearlyData[];
    revenue: YearlyData[];
    market_share: YearlyData[];
};

export default function ResponsePage() {
    const location = useLocation();
    const navigate = useNavigate()
    const [lightMode, setLightMode] = useState(false);
    const [companyData, setCompanyData] = useState<CompanyData>({
        sl_no: 1,
        company: 'Zooxo', // Fixed to match `CompanyData` type
        country: 'Ukraine',
        country_code: 'UAH', // Fixed to match `CompanyData` type
        diversity: 43.5,
        market_cap: { // Fixed to match `CompanyData` type
            value: 2340000000.0,
            synthetic: false,
        },
        stock_price: [ // Fixed to match `CompanyData` type
            { year: 2015, value: 636190000, synthetic: false },
            { year: 2016, value: 36170000000, synthetic: false },
            { year: 2017, value: 18615000000, synthetic: false },
            { year: 2018, value: 1060000000, synthetic: false },
            { year: 2019, value: 308220000, synthetic: false },
            { year: 2020, value: 514130000, synthetic: false },
            { year: 2021, value: 21660000, synthetic: false },
            { year: 2022, value: 555700000, synthetic: false },
            { year: 2023, value: 355280000, synthetic: false },
        ],
        expense: [
            { year: 2015, value: 20101562.63 },
            { year: 2016, value: 51007842.36 },
            { year: 2017, value: 62056576.98 },
            { year: 2018, value: 79478124.95 },
            { year: 2019, value: 52885481.03 },
            { year: 2020, value: 71228506.48 },
            { year: 2021, value: 17224689.73 },
            { year: 2022, value: 96688655.13 },
            { year: 2023, value: 67582493.42 },
        ],
        revenue: [
            { year: 2015, value: 11889859.91 },
            { year: 2016, value: 12926239.97 },
            { year: 2017, value: 26106119.1 },
            { year: 2018, value: 86658338.25 },
            { year: 2019, value: 21961920.16 },
            { year: 2020, value: 93825082.89 },
            { year: 2021, value: 50393952.13 },
            { year: 2022, value: 78632245.86 },
            { year: 2023, value: 95627554.77 },
        ],
        market_share: [
            { year: 2015, value: 28.24 },
            { year: 2016, value: 42.01 },
            { year: 2017, value: 73.14 },
            { year: 2018, value: 90.64 },
            { year: 2019, value: 56.8 },
            { year: 2020, value: 48.79 },
            { year: 2021, value: 35.4 },
            { year: 2022, value: 65.88 },
            { year: 2023, value: 38.85 },
        ],
    });

    useEffect(() => {
        const fetchRawData = async () => {
            try {
                const params = new URLSearchParams(location.search);
                const id = params.get('id');

                if (!id) {
                    navigate('/chat')
                }
                const response = await fetch(
                    `http://localhost:5000/companies/raw-data/${id}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch company data');
                }
                const fetchedData: CompanyData = await response.json(); // Assuming API returns correct data structure
                setCompanyData(fetchedData);
            } catch (error) {
                console.error('Error fetching company data:', error);
            }
        };

        fetchRawData();
    }, [location.search]);

    const years = companyData.stock_price.map((item) => item.year); // Fixed property name

    const chartOptions = {
        scales: {
            x: {
                ticks: { color: lightMode ? '#000000' : '#FFFFFF' },
            },
            y: {
                ticks: { color: lightMode ? '#000000' : '#FFFFFF' },
            },
        },
        plugins: {
            legend: {
                labels: { color: lightMode ? '#000000' : '#FFFFFF' },
            },
        },
    };

    const stockPriceData = {
        labels: years,
        datasets: [
            {
                label: 'Stock Price',
                data: companyData.stock_price.map((item) => item.value), // Fixed property name
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    const expenseData = {
        labels: years,
        datasets: [
            {
                label: 'Expense',
                data: companyData.expense.map((item) => item.value),
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
            },
        ],
    };

    const revenueData = {
        labels: years,
        datasets: [
            {
                label: 'Revenue',
                data: companyData.revenue.map((item) => item.value),
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: true,
            },
        ],
    };

    const marketShareData = {
        labels: years,
        datasets: [
            {
                label: 'Market Share',
                data: companyData.market_share.map((item) => item.value), // Fixed property name
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                fill: true,
            },
        ],
    };

    return (
        <div
            className={`flex ${lightMode ? 'bg-neutral-100 text-neutral-900' : 'bg-neutral-900 text-neutral-100'} min-h-screen`}
        >
            <Sidebar lightMode={lightMode} />
            <div className="flex-1 p-8">
                <header className="mb-8 flex justify-between">
                    <h1 className="text-4xl font-bold">
                        {companyData.company} Company Overview {/* Fixed to use correct property */}
                    </h1>
                    <button
                        onClick={() => setLightMode(!lightMode)}
                        className={`rounded-md p-2 ${lightMode ? 'bg-neutral-700 text-white' : 'bg-neutral-200 text-black'}`}
                    >
                        Toggle Dark/Light Mode {/* Updated button label */}
                    </button>
                </header>

                <div className="mb-8">
                    <CompanyInfo
                        data={{
                            country: companyData.country,
                            countryCode:companyData.country_code,
                            diversity: companyData.diversity,
                            marketCap:{
                                value: companyData.market_cap.value,
                                synthetic:companyData.market_cap.synthetic
                            }
                        }}
                        theme={lightMode ? 'light' : 'dark'}
                    />
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <ChartCard
                        title="Stock Price"
                        data={stockPriceData}
                        options={chartOptions}
                        lightMode={lightMode}
                    />
                    <ChartCard
                        title="Expense"
                        data={expenseData}
                        options={chartOptions}
                        lightMode={lightMode}
                    />
                    <ChartCard
                        title="Revenue"
                        data={revenueData}
                        options={chartOptions}
                        lightMode={lightMode}
                    />
                    <ChartCard
                        title="Market Share"
                        data={marketShareData}
                        options={chartOptions}
                        lightMode={lightMode}
                    />
                </div>
            </div>
        </div>
    );
}
