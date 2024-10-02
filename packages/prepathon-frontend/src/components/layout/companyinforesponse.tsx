interface CompanyInfoProps {
    data: {
        country: string;
        countryCode: string;
        diversity: number;  // Changed from string to number
        marketCap: {
            value: number;
            synthetic: boolean;
        };
    };
    theme: 'light' | 'dark';
}

export default function CompanyInfo({ data, theme }: CompanyInfoProps) {
    return (
        <div
            className={`rounded-lg p-4 shadow-md ${
                theme === 'dark'
                    ? 'bg-neutral-800 text-neutral-100'
                    : 'bg-white text-neutral-900'
            }`}
        >
            <h2 className="mb-4 text-2xl font-bold">Company Information</h2>
            <p>
                <strong>Country:</strong> {data.country}
            </p>
            <p>
                <strong>Country Code:</strong> {data.countryCode}
            </p>
            <p>
                <strong>Diversity Index:</strong> {data.diversity}
            </p>
            <p>
                <strong>Market Cap:</strong> ${data.marketCap.value.toLocaleString()}
                {data.marketCap.synthetic && ' (Synthetic Data)'}
            </p>
        </div>
    );
}
