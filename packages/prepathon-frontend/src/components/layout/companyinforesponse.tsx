interface CompanyInfoProps {
    data: {
        sl_no: number;
        company: string;
        country: string;
        country_code: string;
        diversity: number;
        market_cap: {
            value: number;
            synthetic: boolean;
        };
        total_companies_in_country: number;
        domestic_ranking: {
            diversity_ranking: number;
            stock: number;
            expense: number;
            revenue: number;
            market_share: number;
        };
        global_ranking: {
            stock: number;
            expense: number;
            revenue: number;
            market_share: number;
        };
    };
}

export default function CompanyInfo({ data }: CompanyInfoProps) {
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
                            <span>{data.country_code}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <span className="text-secondary">Market Cap</span>
                            <span>${data.market_cap.value}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <span className="text-secondary">
                                Diversity Index
                            </span>
                            <span>
                                {data.diversity}
                                <p>
                                    (#{data.domestic_ranking.diversity_ranking}/
                                    {data.total_companies_in_country} in{' '}
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
                                #{data.domestic_ranking.stock}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <span className="text-secondary">Market Share</span>
                            <span className="">
                                #{data.domestic_ranking.stock}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <span className="text-secondary">Revenue</span>
                            <span className="">
                                #{data.domestic_ranking.revenue}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <span className="text-secondary">Expense</span>
                            <span className="">
                                #{data.domestic_ranking.expense}
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
                            <span>#{data.global_ranking.stock}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <span className="text-secondary">Market Share</span>
                            <span>#{data.global_ranking.stock}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <span className="text-secondary">Revenue</span>
                            <span>#{data.global_ranking.revenue}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <span className="text-secondary">Expense</span>
                            <span>#{data.global_ranking.expense}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
