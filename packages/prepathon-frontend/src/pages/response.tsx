import BarChartCard from '@/components/layout/barChartCard';
import ChartCard from '@/components/layout/chartcard';
import CompanyInfo from '@/components/layout/companyinforesponse';
import Sidebar from '@/components/layout/responsesidebar';
import { Button } from '@/components/ui/button';
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
import { useEffect, useRef, useState } from 'react';
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
    total_companies_in_country: number;
    domestic_ranking: {
        diversity_ranking: number;
        stock: number;
        expense: number;
        revenue: number;
        market_share: number;
    };
    global_ranking: {
        stock: number;
        expense: number;
        revenue: number;
        market_share: number;
    };
    stock_price: SyntheticYearlyData[];
    expense: YearlyData[];
    revenue: YearlyData[];
    market_share: YearlyData[];
};

export default function ResponsePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const barRef = useRef(null);
    const theme = localStorage.getItem('theme') || 'light';
    const [darkMode, setdarkMode] = useState(theme === 'dark');

    const [companyData, setCompanyData] = useState<CompanyData>({
        sl_no: 1,
        company: 'Zooxo',
        country: 'Ukraine',
        country_code: 'UAH',
        diversity: 43.5,
        market_cap: {
            // Fixed to match `CompanyData` type
            value: 2340000000.0,
            synthetic: false,
        },
        total_companies_in_country: 25,
        domestic_ranking: {
            diversity_ranking: 1,
            stock: 1,
            expense: 1,
            revenue: 1,
            market_share: 1,
        },
        global_ranking: {
            stock: 1,
            expense: 1,
            revenue: 1,
            market_share: 1,
        },
        stock_price: [
            // Fixed to match `CompanyData` type
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
                    navigate('/chat');
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
    }, [location.search, navigate]);

    const years = companyData.stock_price.map((item) => item.year); // Fixed property name

    useEffect(() => {
        setdarkMode(theme === 'dark');
        console.log('darkMode', darkMode);
    }, [darkMode, theme]);

    const barChartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            x: {
                ticks: { color: '#828282' },
                grid: {
                    display: false,
                },
            },
            y: {
                ticks: { color: '#828282' },
                grid: {
                    display: false,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
                position: 'top' as const,
                labels: {
                    font: {
                        size: 12,
                    },
                },
            },
            tooltip: {
                enabled: true,
                mode: 'index' as const,
                intersect: true,
            },
        },
    };

    const stockChartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            x: {
                ticks: { color: '#828282' },
                grid: {
                    display: false,
                },
            },
            y: {
                border: { dash: [2, 2] },
                ticks: { color: '#828282' },
                grid: {
                    display: true,
                    color: darkMode ? '#2D2D2D' : '#E5E7EB',
                },
            },
        },
        plugins: {
            legend: {
                display: false,
                position: 'top' as const,
                labels: {
                    font: {
                        size: 12,
                    },
                },
            },
            tooltip: {
                enabled: true,
                mode: 'index' as const,
                intersect: false,
            },
        },
    };

    const spendActivityOptions = {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            x: {
                ticks: { color: '#828282' },
                grid: {
                    display: false,
                },
            },
            y: {
                border: { dash: [2, 2] },
                ticks: { color: '#828282' },
                grid: {
                    display: true,
                    color: darkMode ? '#2D2D2D' : '#E5E7EB',
                },
            },
        },
        plugins: {
            legend: {
                display: false,
                position: 'top' as const,
                labels: {
                    font: {
                        size: 12,
                    },
                },
            },
            tooltip: {
                enabled: true,
                mode: 'index' as const,
                intersect: false,
            },
        },
    };

    const stockPriceData = {
        labels: years,
        datasets: [
            {
                label: 'Stock Price',
                data: companyData.stock_price.map((item) => item.value), // Fixed property name
                borderColor: (() => {
                    if (
                        companyData.stock_price[
                            companyData.stock_price.length - 1
                        ].value > companyData.stock_price[0].value
                    ) {
                        return darkMode ? '#00D693' : '#10B981';
                    } else {
                        return darkMode ? '#993030' : '#EF4444';
                    }
                })(),
                backgroundColor: (() => {
                    if (
                        companyData.stock_price[
                            companyData.stock_price.length - 1
                        ].value > companyData.stock_price[0].value
                    ) {
                        return darkMode
                            ? 'rgba(0, 214, 147, 0.1)'
                            : 'rgba(16, 185, 129, 0.1)';
                    } else {
                        return darkMode
                            ? 'rgba(153, 48, 48, 0.1)'
                            : 'rgba(239, 68, 68, 0.1)';
                    }
                })(),
                borderWidth: 2,
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const spendActivityData = {
        labels: years,
        datasets: [
            {
                label: 'Expense',
                data: companyData.expense.map((item) => item.value),
                borderColor: 'rgba(244, 98, 94, 1)',
                backgroundColor: 'rgba(244, 98, 94, 0.2)',

                fill: false,
                borderWidth: 1,
            },
            {
                label: 'Revenue',
                data: companyData.revenue.map((item) => item.value),
                borderColor: 'rgba(0, 210, 190, 1)',
                backgroundColor: '#009164',
                fill: false,
                borderWidth: 1,
            },
        ],
    };

    const marketShareData = {
        labels: years,
        datasets: [
            {
                label: 'Market Share',
                data: companyData.market_share.map((item) => item.value),
                backgroundColor: function (context) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) {
                        return null;
                    }

                    const gradient = ctx.createLinearGradient(
                        chartArea.left,
                        chartArea.bottom,
                        chartArea.left,
                        chartArea.top
                    );

                    if (darkMode) {
                        gradient.addColorStop(0, '#1F1F20');
                        gradient.addColorStop(0.5, '#2D2D2F');
                        gradient.addColorStop(1, '#2D2D2F');

                        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
                        ctx.shadowBlur = 10;
                        ctx.shadowOffsetX = 0;
                        ctx.shadowOffsetY = 4;
                    } else {
                        ctx.shadowColor = 'rgba(0, 0, 0, 0)';
                        ctx.shadowBlur = 0;
                        ctx.shadowOffsetX = 0;
                        ctx.shadowOffsetY = 0;
                        gradient.addColorStop(1, '#FF3300');
                        gradient.addColorStop(0, '#FF653F');
                    }

                    ctx.fillStyle = gradient;

                    return gradient;
                },
                hoverBackgroundColor: function (context) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) {
                        return null;
                    }

                    const hoverGradient = ctx.createLinearGradient(
                        chartArea.left,
                        chartArea.bottom,
                        chartArea.left,
                        chartArea.top
                    );

                    if (darkMode) {
                        hoverGradient.addColorStop(0, '#BD6955');
                        hoverGradient.addColorStop(1, '#F24A21');
                    } else {
                        hoverGradient.addColorStop(1, '#2D2D2D');
                        hoverGradient.addColorStop(0, '#4B4B4B');
                    }

                    return hoverGradient;
                },
                borderRadius: {
                    topLeft: 4,
                    topRight: 4,
                },
                borderSkipped: false,
            },
        ],
    };

    return (
        <div className={`flex min-h-full bg-background`}>
            <Sidebar />
            <div className="flex-1 p-2">
                <div className="flex">
                    <div className="w-5/6">
                        <CompanyInfo data={companyData} />
                    </div>
                    <div className="flex w-1/6 items-center justify-center">
                        <Button className="bg-button_secondary h-12 w-36 rounded-lg text-xl shadow-box_shadow hover:bg-slate-50 dark:hover:bg-[#303030]">
                            <span className="gemini-gradient"> Ask Gemini</span>
                        </Button>
                    </div>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <BarChartCard
                            title="Market Share"
                            ref={barRef}
                            data={marketShareData}
                            options={barChartOptions}
                            height={100}
                        />
                    </div>
                    <div>
                        <ChartCard
                            title="Stock Price"
                            data={stockPriceData}
                            options={stockChartOptions}
                            height={100}
                        />
                    </div>
                    <div className="col-span-2 h-1/3 w-full">
                        <ChartCard
                            title="Spend Activity"
                            data={spendActivityData}
                            options={spendActivityOptions}
                            height={60}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
