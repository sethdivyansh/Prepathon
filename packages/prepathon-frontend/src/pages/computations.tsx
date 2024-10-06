import Sidebar from '@/components/layout/responsesidebar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Company {
    sl_no: number;
    company: string;
    country: string;
    country_code: string;
    diversity: string;
    market_cap: number;
}

export default function ComputationsPage() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [companies, setCompanies] = useState<Company[]>([
        {
            sl_no: 1,
            company: 'Zooxo',
            country: 'Ukraine',
            country_code: 'UAH',
            diversity: '43.5',
            market_cap: 2340000000.0,
        },
        {
            sl_no: 2,
            company: 'TechCorp',
            country: 'USA',
            country_code: 'USD',
            diversity: '38.2',
            market_cap: 1580000000.0,
        },
    ]);

    const handleSubmit = (company: Company) => {
        navigate(`/response?id=${company.sl_no}&company=${company.company}`);
        console.log('Submitting computation for:', company);
    };

    const filteredCompanies = companies.filter(
        (company) =>
            company.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            company.sl_no.toString().includes(searchQuery) ||
            company.country.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatMarketCap = (value: number) => {
        return `$${(value / 1000000000).toFixed(2)}B`;
    };

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch(
                    'http://localhost:5000/companies',
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch companies');
                }
                const data: Company[] = await response.json();
                setCompanies(data);
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        };

        fetchCompanies();
    }, []);

    return (
        <div className={`flex min-h-screen`}>
            <Sidebar />
            <div className="flex-1 p-2">
                <div className="mb-6 rounded-full shadow-box_shadow">
                    <input
                        type="text"
                        placeholder="Search by company name, S.No, or country"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-full rounded-md border border-neutral-300 bg-white p-3 text-primary dark:border-neutral-700 dark:bg-neutral-800`}
                    />
                </div>

                <Card
                    className={`rounded-lg bg-white p-4 shadow-box_shadow dark:bg-neutral-800`}
                >
                    <div className="overflow-x-auto">
                        <table className={`w-full text-primary`}>
                            <thead>
                                <tr
                                    className={`border-b border-neutral-200 dark:border-neutral-700`}
                                >
                                    <th className="p-4 text-left font-semibold">
                                        S.No
                                    </th>
                                    <th className="p-4 text-left font-semibold">
                                        Company
                                    </th>
                                    <th className="p-4 text-left font-semibold">
                                        Country
                                    </th>
                                    <th className="p-4 text-left font-semibold">
                                        Country Code
                                    </th>
                                    <th className="p-4 text-left font-semibold">
                                        Diversity (%)
                                    </th>
                                    <th className="p-4 text-left font-semibold">
                                        Market Cap
                                    </th>
                                    <th className="p-4 text-left font-semibold">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCompanies.map((company) => (
                                    <tr
                                        key={company.sl_no}
                                        className={`border-b border-neutral-200 dark:border-neutral-700`}
                                    >
                                        <td className="p-4">{company.sl_no}</td>
                                        <td className="p-4">
                                            {company.company}
                                        </td>
                                        <td className="p-4">
                                            {company.country}
                                        </td>
                                        <td className="p-4">
                                            {company.country_code}
                                        </td>
                                        <td className="p-4">
                                            {company.diversity}%
                                        </td>
                                        <td className="p-4">
                                            {formatMarketCap(
                                                company.market_cap
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <Button
                                                onClick={() =>
                                                    handleSubmit(company)
                                                }
                                                size="sm"
                                                className={`bg-button_primary text-white hover:bg-[#ff6b3d] dark:hover:bg-[#FF5126]`}
                                            >
                                                Submit
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
}
