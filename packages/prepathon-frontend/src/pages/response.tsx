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
import { useState } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface YearlyValue {
    year: number;
    value: number;
}

interface CompanyDataInterface {
    name: string;
    country: string;
    countryCode: string;
    diversity: string;
    marketCap: number;
    totalCompaniesInCountry: number;
    domesticRanking: {
        diversityRanking: string;
        stock: string;
        expense: string;
        revenue: string;
        marketShare: string;
    };
    globalRanking: {
        stock: string;
        expense: string;
        revenue: string;
        marketShare: string;
    };
    stockPrice: YearlyValue[];
    expense: YearlyValue[];
    revenue: YearlyValue[];
    marketShare: YearlyValue[];
}

export default function ResponsePage() {
    const [lightMode, setLightMode] = useState(true);
    const [companyData, setCompanyData] = useState<CompanyDataInterface>({
        name: 'Zooxo',
        country: 'Ukraine',
        countryCode: 'UAH',
        diversity: '43.5',
        marketCap: 2340000000.0,
        totalCompaniesInCountry: 25,
        domesticRanking: {
            diversityRanking: '1',
            stock: '1',
            expense: '1',
            revenue: '1',
            marketShare: '1',
        },
        globalRanking: {
            stock: '1',
            expense: '1',
            revenue: '1',
            marketShare: '1',
        },
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
    });

    const years = companyData.stockPrice.map((item) => item.year);

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
                data: companyData.stockPrice.map((item) => item.value),
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
                data: companyData.marketShare.map((item) => item.value),
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                fill: true,
            },
        ],
    };

    return (
        <div className={`flex min-h-screen bg-background`}>
            <Sidebar />
            <div className="flex-1 p-2">
                <div className="flex">
                    <div className="w-5/6">
                        <CompanyInfo
                            data={companyData}
                            // domesticRanking={}
                            // globalRanking={}
                        />
                    </div>
                    <div className="flex w-1/6 items-center justify-center">
                        <Button className="bg-button_secondary h-12 w-36 rounded-lg text-xl shadow-box_shadow hover:bg-slate-50 dark:hover:bg-[#303030]">
                            <span className="gemini-gradient"> Ask Gemini</span>
                        </Button>
                    </div>
                </div>

                {/* <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
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
                </div> */}
            </div>
        </div>
    );
}
