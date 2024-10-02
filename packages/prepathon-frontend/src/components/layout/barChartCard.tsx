import { ChartData, ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';

interface BarChartProps {
    title: string;
    ref: React.RefObject<HTMLCanvasElement>;
    data: ChartData<'bar'>;
    options: ChartOptions<'bar'>;
    height: number;
}

export default function BarChartCard({
    title,
    data,
    options,
    ref,
    height,
}: BarChartProps) {
    return (
        <div
            className={`rounded-xl bg-white p-4 shadow-box_shadow dark:bg-gradient-to-b dark:from-[#222120] dark:via-[#1A1919] dark:to-[#171717]`}
        >
            <h3 className="mb-2 text-center text-xl font-semibold text-primary">
                {title}
            </h3>
            <Bar ref={ref} data={data} options={options} height={height} />
        </div>
    );
}
