import { useState } from "react";

interface SidebarProps {
    lightMode: boolean;
}

interface CompanyInterface {
    name: string,
    flag: string
}

export default function Sidebar({ lightMode }: SidebarProps) {

    const [companies,setCompanies] = useState<CompanyInterface[]>([
        { name: 'Zooxo', flag: '🇺🇦' },
        { name: 'Abatz', flag: '🇵🇱' },
        { name: 'Youbridge', flag: '🇧🇷' },
    ])

    return (
        <div
            className={`w-1/4 p-4 ${lightMode ? 'bg-neutral-200 text-neutral-900' : 'bg-neutral-800 text-neutral-100'} h-full`}
        >
            <h3 className="mb-4 text-lg font-bold">Recently Searched</h3>
            <ul>
                {companies.map((company, index) => (
                    <li key={index} className="mb-2 flex items-center">
                        <span className="mr-2">{company.flag}</span>
                        {company.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}