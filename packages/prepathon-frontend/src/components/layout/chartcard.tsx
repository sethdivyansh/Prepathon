import { ChartData, ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';

interface ChartCardProps {
    title: string;
    data: ChartData<'line'>;
    options: ChartOptions<'line'>;
    height: number;
}

export default function ChartCard({
    title,
    data,
    options,
    height,
}: ChartCardProps) {
    return (
        <div
            className={`rounded-xl bg-white p-4 shadow-box_shadow dark:bg-gradient-to-b dark:from-[#222120] dark:via-[#1A1919] dark:to-[#171717]`}
        >
            <h3 className="mb-2 text-center text-xl font-semibold text-primary">
                {title}
            </h3>
            <Line data={data} options={options} height={height} />
        </div>
    );
}
