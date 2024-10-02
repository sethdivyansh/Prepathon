import { useEffect, useState } from 'react';
import Sidebar from '@/components/layout/responsesidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
    const navigate = useNavigate()
    const [lightMode, setLightMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [companies,setCompanies] = useState<Company[]>([
        {
            sl_no: 1,
            company: 'Zooxo',
            country: 'Ukraine',
            country_code: 'UAH',
            diversity: '43.5',
            market_cap: 2340000000.0
        },
        {
            sl_no: 2,
            company: 'TechCorp',
            country: 'USA',
            country_code: 'USD',
            diversity: '38.2',
            market_cap: 1580000000.0
        },
    ]);

    const handleSubmit = (company: Company) => {
        navigate(`/response?id=${company.sl_no}`)
        console.log('Submitting computation for:', company);
    };

    const filteredCompanies = companies.filter(company =>
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
                const response = await fetch('http://localhost:5000/companies',
                    {method:'GET',headers: {
                        'Content-Type': 'application/json',
                    }},
                    
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
        <div className={`flex min-h-screen ${
            lightMode ? 'bg-neutral-100 text-neutral-900' : 'bg-neutral-900 text-neutral-100'
        }`}>
            <Sidebar lightMode={lightMode} />
            <div className="flex-1 p-8">
                <header className="mb-8 flex justify-between items-center">
                    <h1 className="text-4xl font-bold">Submit Computations</h1>
                    <button
                        onClick={() => setLightMode(!lightMode)}
                        className={`rounded-md p-2 ${
                            lightMode 
                                ? 'bg-neutral-700 text-white' 
                                : 'bg-neutral-200 text-black'
                        }`}
                    >
                        {lightMode ? 'Enable Dark Mode' : 'Enable Light Mode'}
                    </button>
                </header>

                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search by company name, S.No, or country"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-full p-3 rounded-md ${
                            lightMode 
                                ? 'bg-white border border-neutral-300 text-neutral-900' 
                                : 'bg-neutral-800 border border-neutral-700 text-neutral-100'
                        }`}
                    />
                </div>

                <Card className={`${
                    lightMode ? 'bg-white' : 'bg-neutral-800'
                } p-4 rounded-lg`}>
                    <div className="overflow-x-auto">
                        <table className={`w-full ${
                            lightMode ? 'text-neutral-900' : 'text-neutral-100'
                        }`}>
                            <thead>
                                <tr className={`border-b ${
                                    lightMode ? 'border-neutral-200' : 'border-neutral-700'
                                }`}>
                                    <th className="p-4 text-left font-semibold">S.No</th>
                                    <th className="p-4 text-left font-semibold">Company</th>
                                    <th className="p-4 text-left font-semibold">Country</th>
                                    <th className="p-4 text-left font-semibold">Country Code</th>
                                    <th className="p-4 text-left font-semibold">Diversity (%)</th>
                                    <th className="p-4 text-left font-semibold">Market Cap</th>
                                    <th className="p-4 text-left font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCompanies.map((company) => (
                                    <tr key={company.sl_no} className={`border-b ${
                                        lightMode ? 'border-neutral-200' : 'border-neutral-700'
                                    }`}>
                                        <td className="p-4">{company.sl_no}</td>
                                        <td className="p-4">{company.company}</td>
                                        <td className="p-4">{company.country}</td>
                                        <td className="p-4">{company.country_code}</td>
                                        <td className="p-4">{company.diversity}%</td>
                                        <td className="p-4">{formatMarketCap(company.market_cap)}</td>
                                        <td className="p-4">
                                            <Button
                                                onClick={() => handleSubmit(company)}
                                                variant={lightMode ? "default" : "secondary"}
                                                size="sm"
                                                className={`${
                                                    lightMode 
                                                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                                                }`}
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