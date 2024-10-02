interface CompanyInfoProps {
    data: {
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
    };
}

export default function CompanyInfo({
    data,
    // domesticRanking,
}: CompanyInfoProps) {
    return (
        <div className="flex w-full flex-row gap-4 bg-background">
            <div className="w-1/3">
                <div className="w-full rounded-lg text-primary">
                    <h2 className="mb-1 text-xl font-bold">
                        Company Information
                    </h2>
                    <div className="text-sm">
                        <div className="grid grid-cols-2 gap-4">
                            <span className="text-secondary">
                                {data.country}
                            </span>
                            <span>Ukraine</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <span className="text-secondary">Country Code</span>
                            <span>{data.countryCode}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <span className="text-secondary">Market Cap</span>
                            <span>${data.marketCap}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <span className="text-secondary">
                                Diversity Index
                            </span>
                            <span>
                                {data.diversity}
                                <p>
                                    (#{data.domesticRanking.diversityRanking}/
                                    {data.totalCompaniesInCountry} in{' '}
                                    {data.country})
                                </p>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-1/3">
                <div className="w-full rounded-lg text-primary">
                    <h2 className="mb-1 text-xl font-bold">Domestic Ranking</h2>
                    <div className="text-sm">
                        <div className="grid grid-cols-2 gap-4">
                            <span className="text-secondary">Stock Price</span>
                            <span className="">
                                #{data.domesticRanking.stock}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <span className="text-secondary">Market Share</span>
                            <span className="">
                                #{data.domesticRanking.stock}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <span className="text-secondary">Revenue</span>
                            <span className="">
                                #{data.domesticRanking.revenue}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <span className="text-secondary">Expense</span>
                            <span className="">
                                #{data.domesticRanking.expense}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-1/3">
                <div className="w-full rounded-lg text-primary">
                    <h2 className="mb-1 text-xl font-bold">Global Ranking</h2>
                    <div className="text-sm">
                        <div className="grid grid-cols-2 gap-4">
                            <span className="text-secondary">Stock Price</span>
                            <span>#{data.globalRanking.stock}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <span className="text-secondary">Market Share</span>
                            <span>#{data.globalRanking.stock}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <span className="text-secondary">Revenue</span>
                            <span>#{data.globalRanking.revenue}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <span className="text-secondary">Expense</span>
                            <span>#{data.globalRanking.expense}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
