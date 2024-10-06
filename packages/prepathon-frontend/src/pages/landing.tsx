import { Button } from '@/components/ui/button';
import { useSession } from '@hono/auth-js/react';
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import { useEffect, useMemo } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

interface LandingPageProps {
    isDarkMode: boolean;
}

const generateRandomData = (count: number, min: number, max: number) => {
    return Array.from({ length: count }, () =>
        Math.floor(Math.random() * (max - min + 1) + min)
    );
};

const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

const lineChartData = {
    labels: months,
    datasets: [
        {
            label: 'Revenue',
            data: generateRandomData(12, 1000, 5000),
            borderColor: '#10B981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
        },
        {
            label: 'Expenses',
            data: generateRandomData(12, 800, 4000),
            borderColor: '#EF4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
        },
    ],
};

const barChartData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
        {
            label: 'Sales',
            data: generateRandomData(4, 5000, 15000),
            backgroundColor: '#3B82F6',
        },
        {
            label: 'Profit',
            data: generateRandomData(4, 1000, 5000),
            backgroundColor: '#10B981',
        },
    ],
};

const LandingPage: React.FC<LandingPageProps> = ({ isDarkMode }) => {
    const navigate = useNavigate();
    const chartOptions = useMemo(
        () => ({
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top' as const,
                    labels: {
                        color: isDarkMode ? '#CCCCCC' : '#000',
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
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        color: isDarkMode ? '#CCCCCC' : '#000',
                    },
                },
                y: {
                    grid: {
                        color: isDarkMode ? '#d9d9ff26' : '#E5E7EB',
                    },
                    ticks: {
                        color: isDarkMode ? '#CCCCCC' : '#000',
                    },
                },
            },
        }),
        [isDarkMode]
    );

    const { data: session } = useSession();
    useEffect(() => {
        if (session?.user) return navigate('/computation');
    });

    return (
        <>
            <div className="flex h-full w-full flex-col items-center justify-center">
                <div className="animate-bg-slide mb-4 flex w-full flex-col items-center bg-[url('/public/LineChart.svg')] bg-contain bg-center bg-no-repeat dark:bg-[url('/public/LineChartDark.svg')]">
                    <p className="text-8xl text-primary">Business insights,</p>
                    <p className="text-7xl text-primary">at your fingertips.</p>
                    <p className="mt-4 text-xl text-secondary">
                        Engineered for Real-Time Innovation.
                    </p>
                </div>
                <Button
                    className="h-10 w-24 bg-[#00A874] text-white hover:bg-[#009164] dark:bg-[#1B906C] dark:hover:bg-[#00A874]"
                    onClick={() => navigate('/login')}
                >
                    Get Started
                </Button>
                <div className="mt-16 grid w-full grid-cols-1 md:grid-cols-2">
                    <div className="h-80 w-full px-8">
                        <Line data={lineChartData} options={chartOptions} />
                    </div>
                    <div className="h-80 w-full px-8">
                        <Bar data={barChartData} options={chartOptions} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default LandingPage;
