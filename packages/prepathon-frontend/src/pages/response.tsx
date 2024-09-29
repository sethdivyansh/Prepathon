import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function ResponsePage() {
  const zooxoData = {
    name: "Zooxo",
    country: "Ukraine",
    countryCode: "UAH",
    diversity: "43.5",
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
        ticks: {
          color: '#000000', // Brighter color for x-axis labels
        },
      },
      y: {
        ticks: {
          color: '#000000', // Brighter color for y-axis labels
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#00000', // Brighter color for the legend text
        },
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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-6xl m-10">
        <h1 className="text-4xl font-bold text-center mb-6 text-neutral-800">Zooxo Company Overview</h1>

        {/* Company Info Section */}
        <div className="p-6 rounded-lg mb-6 w-full">
          <h2 className="text-2xl font-bold mb-4">Company Information</h2>
          <p className=""><strong>Name:</strong> {zooxoData.name}</p>
          <p className=""><strong>Country:</strong> {zooxoData.country}</p>
          <p className=""><strong>Country Code:</strong> {zooxoData.countryCode}</p>
          <p className=""><strong>Diversity Index:</strong> {zooxoData.diversity}</p>
          <p className=""><strong>Market Cap:</strong> ${zooxoData.marketCap.toLocaleString()}</p>
        </div>

        {/* Chart Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-neutral-800">Stock Price</h2>
            <Line data={stockPriceData} options={chartOptions} />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 text-neutral-800">Expense</h2>
            <Line data={expenseData} options={chartOptions} />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 text-neutral-800">Revenue</h2>
            <Line data={revenueData} options={chartOptions} />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 text-neutral-800">Market Share</h2>
            <Line data={marketShareData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
