import {
    CategoryScale,
    ChartData,
    Chart as ChartJS,
    ChartOptions,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface SidebarProps {
    lightMode: boolean;
}

function Sidebar({ lightMode }: SidebarProps) {
    const companies = [
        { name: 'Zooxo', flag: '🇺🇦' },
        { name: 'Abatz', flag: '🇵🇱' },
        { name: 'Youbridge', flag: '🇧🇷' },
    ];

    return (
        <div
            className={`w-1/4 p-4 ${lightMode ? 'bg-neutral-200 text-neutral-900' : 'bg-neutral-800 text-neutral-100'} h-full`}
        >
            <h3 className="mb-4 text-lg font-bold">Recently Searched</h3>
            <ul>
                {companies.map((company, index) => (
                    <li key={index} className="mb-2 flex items-center">
                        <span className="mr-2">{company.flag}</span>
                        {company.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

interface CompanyInfoProps {
    data: {
        country: string;
        countryCode: string;
        diversity: string;
        marketCap: number;
    };
    theme: 'light' | 'dark';
}

function CompanyInfo({ data, theme }: CompanyInfoProps) {
    return (
        <div
            className={`rounded-lg p-4 shadow-md ${
                theme === 'dark'
                    ? 'bg-neutral-800 text-neutral-100'
                    : 'bg-white text-neutral-900'
            }`}
        >
            <h2 className="mb-4 text-2xl font-bold">Company Information</h2>
            <p>
                <strong>Country:</strong> {data.country}
            </p>
            <p>
                <strong>Country Code:</strong> {data.countryCode}
            </p>
            <p>
                <strong>Diversity Index:</strong> {data.diversity}
            </p>
            <p>
                <strong>Market Cap:</strong> ${data.marketCap.toLocaleString()}
            </p>
        </div>
    );
}

interface ChartCardProps {
    title: string;
    data: ChartData<'line'>;
    options: ChartOptions<'line'>;
    lightMode: boolean;
}

function ChartCard({ title, data, options, lightMode }: ChartCardProps) {
    return (
        <div
            className={`p-4 ${lightMode ? 'bg-white text-neutral-900' : 'bg-neutral-800 text-neutral-100'} rounded-lg shadow-md`}
        >
            <h3 className="mb-2 text-xl font-semibold">{title}</h3>
            <Line data={data} options={options} />
        </div>
    );
}

export default function ResponsePage() {
    const [lightMode, setLightMode] = useState(false);

    const zooxoData = {
        name: 'Zooxo',
        country: 'Ukraine',
        countryCode: 'UAH',
        diversity: '43.5',
        marketCap: 2340000000.0,
        stockPrice: [
            { year: 2015, value: 636190000 },
            { year: 2016, value: 36170000000 },
            { year: 2017, value: 18615000000 },
            { year: 2018, value: 1060000000 },
            { year: 2019, value: 308220000 },
            { year: 2020, value: 514130000 },
            { year: 2021, value: 21660000 },
            { year: 2022, value: 555700000 },
            { year: 2023, value: 355280000 },
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
        marketShare: [
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
    };

    const years = zooxoData.stockPrice.map((item) => item.year);

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
                data: zooxoData.stockPrice.map((item) => item.value),
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
                data: zooxoData.expense.map((item) => item.value),
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
                data: zooxoData.revenue.map((item) => item.value),
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
                data: zooxoData.marketShare.map((item) => item.value),
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
                        Zooxo Company Overview
                    </h1>
                    <button
                        onClick={() => setLightMode(!lightMode)}
                        className={`rounded-md p-2 ${lightMode ? 'bg-neutral-700 text-white' : 'bg-neutral-200 text-black'}`}
                    >
                        {lightMode ? 'Enable Dark Mode' : 'Enable Light Mode'}
                    </button>
                </header>

                <div className="mb-8">
                    <CompanyInfo
                        data={zooxoData}
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
