export default function HistoryItem({
    title,
    description,
    time,
}: {
    title: string;
    description: string;
    time: string;
}) {
    return (
        <div className="rounded-lg bg-gray-800 p-4 shadow-md transition-colors duration-200 ease-in-out hover:bg-gray-700">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="text-sm text-gray-400">{description}</p>
            <span className="text-xs text-gray-500">{time}</span>
        </div>
    );
}
