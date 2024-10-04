import { useState } from 'react';
import { Input } from '../ui/input';

// interface SidebarProps {
//     lightMode: boolean;
// }

interface CompanyInterface {
    name: string;
    flag: string;
}

// export default function Sidebar({ lightMode }: SidebarProps) {
export default function Sidebar() {
    const [companies, setCompanies] = useState<CompanyInterface[]>([
        { name: 'Zooxo', flag: '🇺🇦' },
        { name: 'Abatz', flag: '🇵🇱' },
        { name: 'Youbridge', flag: '🇧🇷' },
    ]);

    return (
        <div className={`mt-1 h-screen w-1/5 bg-background`}>
            <Input
                type="text"
                placeholder="Search"
                className="h-9 w-5/6 rounded-lg bg-white p-2 text-primary placeholder:text-secondary dark:bg-[#1F1F1F]"
            />
            <h3 className="my-2 ml-2 font-light text-black dark:text-secondary">
                Recently Searched
            </h3>
            <ul>
                {companies.map((company, index) => (
                    <li
                        key={index}
                        className="mb-2 ml-2 flex items-center font-medium text-primary"
                    >
                        <span className="mr-5">{company.flag}</span>
                        {company.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
