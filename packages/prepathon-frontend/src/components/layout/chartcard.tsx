import { ChartData, ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";

interface ChartCardProps {
    title: string;
    data: ChartData<'line'>;
    options: ChartOptions<'line'>;
    lightMode: boolean;
}

export default function ChartCard({ title, data, options, lightMode }: ChartCardProps) {
    return (
        <div
            className={`p-4 ${lightMode ? 'bg-white text-neutral-900' : 'bg-neutral-800 text-neutral-100'} rounded-lg shadow-md`}
        >
            <h3 className="mb-2 text-xl font-semibold">{title}</h3>
            <Line data={data} options={options} />
        </div>
    );
}