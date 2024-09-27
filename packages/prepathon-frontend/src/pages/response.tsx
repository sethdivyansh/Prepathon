import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

// Register Chart.js components
Chart.register(...registerables);

export default function ResponsePage() {
    const chartRef = useRef<HTMLCanvasElement | null>(null); // Reference to the canvas

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext("2d");
            if (ctx) {
                const myChart = new Chart(ctx, {
                    type: "bar", // You can change this to 'line', 'pie', etc.
                    data: {
                        labels: ["Company A", "Company B", "Company C", "Company D", "Company E"],
                        datasets: [
                            {
                                label: "Revenue in Millions",
                                data: [randomData(), randomData(), randomData(), randomData(), randomData()],
                                backgroundColor: [
                                    "rgba(255, 99, 132, 0.2)",
                                    "rgba(54, 162, 235, 0.2)",
                                    "rgba(255, 206, 86, 0.2)",
                                    "rgba(75, 192, 192, 0.2)",
                                    "rgba(153, 102, 255, 0.2)",
                                ],
                                borderColor: [
                                    "rgba(255, 99, 132, 1)",
                                    "rgba(54, 162, 235, 1)",
                                    "rgba(255, 206, 86, 1)",
                                    "rgba(75, 192, 192, 1)",
                                    "rgba(153, 102, 255, 1)",
                                ],
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
                });
                
                // Clean up the chart on component unmount
                return () => {
                    myChart.destroy();
                };
            }
        }
    }, []);

    // Function to generate random data for the chart
    const randomData = () => Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100

    return (
        <div className="min-h-screen bg-gradient-to-r from-slate-600 to-slate-950 text-white p-6 flex flex-col items-center">
            <header className="text-center py-4">
                <h1 className="text-3xl font-bold">Chart for Indian Companies</h1>
                <p className="text-lg text-gray-400">Revenue data visualization</p>
            </header>

            <div className="mt-8">
                <canvas ref={chartRef} width="400" height="400"></canvas>
            </div>
        </div>
    );
}
