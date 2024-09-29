export type YearlyData = {
    year: number;
    value: number;
}

export type SyntheticYearlyData = {
    year: number;
    value: number;
    synthetic: boolean;
}

export type CompanyData = {
    sl_no: number;
    company: string;
    country: string;
    country_code: string;
    diversity: number;
    market_cap: {
        value: number;
        synthetic: boolean;
    };
    stock_price: SyntheticYearlyData[];
    expense: YearlyData[];
    revenue: YearlyData[];
    market_share: YearlyData[];
};

import data from './data.json';

export default data as CompanyData[];