export default function HistoryItem({ title, description, time }: { title: string; description: string; time: string }) {
    return (
        <div className="p-4 bg-gray-800 hover:bg-gray-700 transition-colors duration-200 ease-in-out rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
        <span className="text-gray-500 text-xs">{time}</span>
        </div>
    );
}